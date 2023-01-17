import jwt from 'jsonwebtoken';
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

export const accessToken = async (user) => {
    console.log("user....", user)
    const tokenres =  jwt.sign({email:user.email, userId:user.userId}, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
     return tokenres
}

export const refreshToken = async (user) => {
    const tokenres = jwt.sign({email:user.email}, process.env.REFRESH_SECRET_KEY);
     return tokenres
}
