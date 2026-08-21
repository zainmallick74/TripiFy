const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;



const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["guest", "landlord"],
    required: true
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);