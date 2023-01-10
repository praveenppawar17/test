import jwt from 'jsonwebtoken';
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

export const accessToken = async (user) => {
    console.log("user.... ", user)
    console.log(',,,,, ', process.env.ACCESS_SECRET_KEY)
    const tokenres =  jwt.sign({email:user.email}, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
    console.log("accesstoken token res.. ", tokenres)
     return tokenres
}

export const refreshToken = async (user) => {
    console.log(',,,,, ', process.env.REFRESH_SECRET_KEY)
    const tokenres = jwt.sign({email:user.email}, process.env.REFRESH_SECRET_KEY);
    console.log("refresh token res.. ", tokenres)
     return tokenres
}
