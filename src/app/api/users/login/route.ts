import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import {NextResponse, NextRequest} from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//this will connect to db out of the box
await connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log(reqBody)

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json(
                {error: "User does not exists"},
                {status: 400}
            )
        }
        console.log("user exists")

        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json(
                {error: "Invalid Passsword"},
                {status: 400}
            )
        }
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "12h"})

        //sent response with cookies
        const response = NextResponse.json({
            message: "Login Successful",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response
        
    } catch (error: unknown) {
        error = "Something Went Wrong"
        
        if(error instanceof Error)
            error = error.message

        console.log("/login error: ", error)

        return NextResponse.json(
            {error},
            {status: 500}
        )
    }
}