import { Schema, model, models } from "mongoose";

const DreamSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dream: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Dream = models.Dream || model("Dream", DreamSchema);
// cek dulu apakah User telah ada di models baru jika tidak ada maka buat, karena ini akan dipanggil terus terusan jika ada koneksi baru

export default Dream;
