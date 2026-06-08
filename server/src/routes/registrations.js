import { Router } from "express";
import rateLimit from "express-rate-limit";
import Registration from "../models/Registration.js";
import { requireAdmin } from "../middleware/auth.js";
import { dbUnavailable, ensureDb } from "../db.js";

const router = Router();

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many submissions, please try again later." },
});

// --- Public: create a registration ---
router.post("/", registerLimiter, async (req, res) => {
  if (!(await ensureDb())) return dbUnavailable(res);

  try {
    const {
      fullName,
      email,
      phone,
      college,
      city,
      course,
      year,
      role,
      skills,
      teamName,
      portfolio,
      motivation,
    } = req.body || {};

    if (!fullName || !email || !college) {
      return res
        .status(400)
        .json({ message: "Full name, email and college are required." });
    }

    const normalizedSkills = Array.isArray(skills)
      ? skills
      : typeof skills === "string"
      ? skills.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const registration = await Registration.create({
      fullName,
      email,
      phone,
      college,
      city,
      course,
      year,
      role,
      skills: normalizedSkills,
      teamName,
      portfolio,
      motivation,
    });

    res.status(201).json({
      message: "Registration successful! See you at the hackathon.",
      id: registration._id,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "This email is already registered." });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    console.error("Registration error:", err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

// --- Public: live count for the landing page ---
router.get("/count", async (_req, res) => {
  if (!(await ensureDb())) {
    return res.json({ total: 0 });
  }

  try {
    const total = await Registration.estimatedDocumentCount();
    res.json({ total });
  } catch (err) {
    console.error("Count error:", err.message);
    res.json({ total: 0 });
  }
});

// --- Admin: list with search / filter / pagination ---
router.get("/", requireAdmin, async (req, res) => {
  if (!(await ensureDb())) return dbUnavailable(res);

  try {
    const { q, role, status, page = 1, limit = 25 } = req.query;
    const filter = {};

    if (q) {
      filter.$or = [
        { fullName: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { college: { $regex: q, $options: "i" } },
      ];
    }
    if (role) filter.role = role;
    if (status) filter.status = status;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const perPage = Math.min(100, Math.max(1, parseInt(limit, 10) || 25));

    const [items, total] = await Promise.all([
      Registration.find(filter)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * perPage)
        .limit(perPage),
      Registration.countDocuments(filter),
    ]);

    res.json({ items, total, page: pageNum, pages: Math.ceil(total / perPage) });
  } catch (err) {
    console.error("List error:", err.message);
    dbUnavailable(res);
  }
});

// --- Admin: aggregate stats for the dashboard ---
router.get("/stats", requireAdmin, async (_req, res) => {
  if (!(await ensureDb())) return dbUnavailable(res);

  try {
    const [total, byRole, byStatus, byCollege, recent] = await Promise.all([
      Registration.countDocuments(),
      Registration.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Registration.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Registration.aggregate([
        { $group: { _id: "$college", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
      Registration.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.json({ total, byRole, byStatus, byCollege, recent });
  } catch (err) {
    console.error("Stats error:", err.message);
    dbUnavailable(res);
  }
});

// --- Admin: update status ---
router.patch("/:id", requireAdmin, async (req, res) => {
  if (!(await ensureDb())) return dbUnavailable(res);

  try {
    const { status } = req.body || {};
    const allowed = ["pending", "shortlisted", "accepted", "rejected"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err.message);
    dbUnavailable(res);
  }
});

// --- Admin: delete ---
router.delete("/:id", requireAdmin, async (req, res) => {
  if (!(await ensureDb())) return dbUnavailable(res);

  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete error:", err.message);
    dbUnavailable(res);
  }
});

export default router;
