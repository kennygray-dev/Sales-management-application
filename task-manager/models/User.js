import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Modify JSON output to return `name` instead of `_id`
UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id; // Keep the ID if needed
    delete ret._id; // Remove default ObjectId
    delete ret.password; // Exclude password for security
    delete ret.__v; // Remove version key
    return ret;
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
