import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

// Simple env-credential admin login. For a hackathon panel this avoids
// needing to seed a users collection while still issuing a real JWT.
router.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  const validUser = process.env.ADMIN_USERNAME || "admin";
  const validPass = process.env.ADMIN_PASSWORD || "admin123";

  if (username !== validUser || password !== validPass) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { role: "admin", username: validUser },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  res.json({ token, username: validUser });
});

export default router;
