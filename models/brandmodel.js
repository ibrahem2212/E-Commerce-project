const mongoose = require("mongoose");

//\\\\\\\\\\\\\\\\\\ create schema\\\\\\\\\\\\\\\\\\\\\\\

const brandschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand required"],
      unique: [true, "brand must be unique"],
      minlength: [3, "Too short brand name"],
      maxlength: [32, "Too long brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    img: String,
  },

  { timestamps: true }
);

//\\\\\\\\\\\\\\\\\\ create model \\\\\\\\\\\\\\\\\\\\\\\

const brandmodel = mongoose.model("brand", brandschema);

module.exports = brandmodel;
