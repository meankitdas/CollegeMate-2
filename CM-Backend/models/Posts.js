const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chats = new Schema(
    {
      sender_id: {
        type: String,
        required: true,
        default: null
      },
      receiver_id: {
        type: String,
        required: true,
        default: null
      },
      message: {
        type: String,
        required: true,
        default: null
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  )

const PostSchema = new Schema({
  unique: {
    type: String,
    required: true,
  },
  messages: [chats]
});

module.exports = mongoose.model("Posts", PostSchema);
