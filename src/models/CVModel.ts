import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to your User model
      required: true,
    },

    // Personal Information
    personal: {
      fullName: { type: String, required: true },
      title: { type: String }, // e.g., "Software Engineer"
      email: { type: String },
      phone: { type: String },
      address: { type: String },
      website: { type: String },
      linkedin: { type: String },
      github: { type: String },
      summary: { type: String }, // short intro/bio
    },

    // Education
    education: [
      {
        school: { type: String, required: true },
        degree: { type: String },
        fieldOfStudy: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        grade: { type: String },
        description: { type: String },
      },
    ],

    // Work Experience
    experience: [
      {
        company: { type: String, required: true },
        position: { type: String, required: true },
        location: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String }, // responsibilities, achievements
      },
    ],

    // Skills
    skills: [
      {
        name: { type: String, required: true },
        level: { type: String, enum: ["Beginner", "Intermediate", "Advanced", "Expert"] }, // optional
      },
    ],

    // Projects
    projects: [
      {
        name: { type: String, required: true },
        description: { type: String },
        technologies: [String],
        link: { type: String },
      },
    ],

    // Certifications
    certifications: [
      {
        name: { type: String, required: true },
        issuer: { type: String },
        date: { type: Date },
        credentialId: { type: String },
        credentialUrl: { type: String },
      },
    ],

    // Languages
    languages: [
      {
        name: { type: String },
        proficiency: {
          type: String,
          enum: ["Basic", "Conversational", "Fluent", "Native"],
        },
      },
    ],

    // Extra Sections (for flexibility, like hobbies, achievements, etc.)
    customSections: [
      {
        title: { type: String },
        items: [{ type: String }], // simple list
      },
    ],

    // CV Settings (template, theme, etc.)
    settings: {
      template: { type: String, default: "default" },
      theme: { type: String, default: "light" },
      font: { type: String, default: "Arial" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("CV", cvSchema);
