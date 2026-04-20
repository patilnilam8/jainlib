const mongoose = require("mongoose");

const granthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  englishName: { type: String },
  pdfUrl: { type: String, required: true },
  imageUrl: { type: String },         // Thumbnail
  coverPhoto: { type: String },       // Cover image
  pdfPublicId:{type: String },
imagePublicId: { type: String },
coverPublicId:{type: String },
  downloadCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// Auto-update `updatedAt`
granthSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model("Granth", granthSchema);
