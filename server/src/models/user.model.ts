import { model, Schema, Model, Document } from "mongoose";
import crypto from "crypto";
type UserType = UserModel & Document;

export interface UserModel extends Document {
   username: {
      type: String,
      unique: true,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   validPassword: (password: string) => Promise<boolean>,
   setPassword: (password: string) => void
}

const userSchema = new Schema({
   username: {
      type: String,
      unique: true,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   salt: {
      type: String,
      required: true,
      select: false
   }
}, {
   timestamps: true
});

userSchema.methods.setPassword = function(password: string) {
   this.salt = crypto.randomBytes(16).toString("hex");

   this.password = crypto.pbkdf2Sync(
      password,
      this.salt,
      1000,
      64,
      "sha512"
   ).toString("hex")
}

userSchema.methods.validPassword = function(password: string) {
   const hash = crypto.pbkdf2Sync(
      password,
      this.salt,
      1000,
      64,
      "sha512"
   ).toString("hex");

   return this.password === hash;
}

const User: Model<UserType> = model<UserType>('User', userSchema);

export default User;