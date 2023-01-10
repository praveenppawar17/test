import { signupUserService, userLoginService } from "../service/userService.js";

export const signupUserController = async (request, response) => {
  try {
    const userResponse = await signupUserService(request.body);
    return response
      .status(200)
      .json({ statusCode: 200, msg: "signup successfull", userResponse });
  } catch (error) {
    return response.status(500).json({ msg: "Error while signup the user" });
  }
};

export const loginUserController = async (request, response) => {
  try {
    let user = await userLoginService(request.body);
    if (!user) {
      return response.status(400).json({ msg: "username does not match" });
    }
    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({ msg: "Error while login in user" });
  }
};
