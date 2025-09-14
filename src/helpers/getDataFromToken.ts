import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || ''
        
        // Type predicate: special way to tell TypeScript that a function will narrow down the type of a variable.
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload
        
        // it shows '_id' on mongo atlas but it's showing "id" on decoded token from cookies because I had set it when I created explicitly on login post request
        if(typeof decodedToken === "object" && "id" in decodedToken)
            return decodedToken.id

        throw new Error("Invalid token payload")
    } catch (error: unknown) {
        let errorMessage = "Something went wrong"

        if(error instanceof Error)
            errorMessage = error.message

        throw new Error(errorMessage)
    }
}