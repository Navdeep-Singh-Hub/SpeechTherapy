import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    phone: { type: String, trim: true, maxlength: 30 },
    college: { type: String, required: true, trim: true, maxlength: 160 },
    city: { type: String, trim: true, maxlength: 120 },
    course: { type: String, trim: true, maxlength: 120 },
    year: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th", "5th", "Postgrad", "Other"],
      default: "Other",
    },
    role: {
      type: String,
      enum: [
        "Software Developer",
        "AI/ML Engineer",
        "Speech-Language Pathology Student",
        "UI/UX Designer",
        "Game Developer",
        "Healthcare Innovator",
        "Psychology Student",
        "Product Builder",
        "Other",
      ],
      default: "Other",
    },
    skills: { type: [String], default: [] },
    teamName: { type: String, trim: true, maxlength: 120 },
    portfolio: { type: String, trim: true, maxlength: 300 },
    motivation: { type: String, trim: true, maxlength: 1200 },
    status: {
      type: String,
      enum: ["pending", "shortlisted", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Registration", RegistrationSchema);
