import bcrypt from "bcrypt";
import User from "../model/user.js";

export const signupUserDao = async (userDetails) => {
  try {
    const user = new User(userDetails);
    const userResponse = await user.save();
    return userResponse;
  } catch (error) {
    return error;
  }
};

export const loginUserDao = async (userDetails) => {
  try {
    let user = await User.findOne({ email: userDetails.email });
    if (!user) {
      return false;
    }
    let match = await bcrypt.compare(userDetails.password, user.password);
    return user;
  } catch (error) {}
};
