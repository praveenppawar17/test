import bcrypt from "bcrypt";
import { loginUserDao, signupUserDao } from "../dao/userDao.js";
import { accessToken, refreshToken } from "../utils/token.js";

export const signupUserService = async (userDetails) => {
  try {
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);

    const user = {
      email: userDetails.email,
      name: userDetails.name,
      password: hashedPassword,
    };
    const userResponse = await signupUserDao(user);
    return userResponse;
  } catch (error) {
    return error;
  }
};

export const userLoginService = async (userDetails) => {
  try {
    const userLoginResponse = await loginUserDao(userDetails);
    if (!userLoginResponse) {
      return false;
    }
    let userTokenDetails = {
      email: userLoginResponse.email,
    };
    return {
      name: userLoginResponse.name,
      userId: userLoginResponse._id,
      accessToken: await accessToken(userTokenDetails),
      refreshToken: await refreshToken(userTokenDetails),
    };
  } catch (error) {
    return error;
  }
};
