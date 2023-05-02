const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id :{
      type : mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    name: {
      type: String,
      required: [true, "Please fill the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please fill the contact email"],
    },
    phone: {
      type: String,
      required: [true, "Please fill the contact phone"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
