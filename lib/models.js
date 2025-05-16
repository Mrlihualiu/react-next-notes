import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    default: () => crypto.randomUUID(),
    unique: true
  }
}, { timestamps: true });

export const Note = mongoose.models.Note || mongoose.model("Note", notesSchema);
