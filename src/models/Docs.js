const mongoose = require("mongoose");

const DocsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  filename: {
    type: String,
  },
  editorState: {
    type: Object,
    default: {},
  },
});

const Docs = mongoose.models.Docs || mongoose.model("Docs", DocsSchema);

export default Docs;
