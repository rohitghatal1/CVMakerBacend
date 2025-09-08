import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    personal: {
      fullName: { type: String, required: true },
      title: { type: String }, 
      email: { type: String },
      phone: { type: String },
      address: { type: String },
      website: { type: String },
      linkedin: { type: String },
      github: { type: String },
      summary: { type: String },
    },

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

    experience: [
      {
        company: { type: String, required: true },
        position: { type: String, required: true },
        location: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],

    skills: [
      {
        name: { type: String, required: true },
        level: { type: String, enum: ["Beginner", "Intermediate", "Advanced", "Expert"] }, 
      },
    ],

    projects: [
      {
        name: { type: String, required: true },
        description: { type: String },
        technologies: [String],
        link: { type: String },
      },
    ],

    certifications: [
      {
        name: { type: String, required: true },
        issuer: { type: String },
        date: { type: Date },
        credentialId: { type: String },
        credentialUrl: { type: String },
      },
    ],

    languages: [
      {
        name: { type: String },
        proficiency: {
          type: String,
          enum: ["Basic", "Conversational", "Fluent", "Native"],
        },
      },
    ],

    customSections: [
      {
        title: { type: String },
        items: [{ type: String }], 
      },
    ],

    settings: {
      template: { type: String, default: "default" },
      theme: { type: String, default: "light" },
      font: { type: String, default: "Arial" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("CV", cvSchema);
