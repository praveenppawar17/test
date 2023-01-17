import jwt from "jsonwebtoken"

export const verifyToken = (request,response,next) => {
    try {
        const token = request.headers['authorization'].split(" ")[1]
        if(!token) return response.status(401).json('Unauthorize user')
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY)
        request.user = decoded
        next()
    } catch (error) {
        response.status(400).json("Token not valid")
    }
}