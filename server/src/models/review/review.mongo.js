const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: "" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("review", ReviewSchema);
