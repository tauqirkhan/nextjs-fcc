import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


await connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody 
        console.log("token: ", token)

        const user = await User.findOne(
            {
                forgotPassword: token,
                forgotPasswordExpiry: {$gt: Date.now()} 
            }
        )
        console.log("user: ", user)

        if(!user) 
            return NextResponse.json(
                {
                    error: "Invalid Token", 
                    status: 400
                }
            )

        // setting undefined will remove the field, will not set it undefined on db
        user.forgotPassword = undefined
        user.forgotPasswordExpiry = undefined
        await user.save()

        return NextResponse.json(
                    {
                        message: "Authentication Successfull, Now Reset Password",
                        success: true
                    }
                )

        } catch (error: unknown) {
            let errorMessage = "Something went wrong"

            if(error instanceof Error)
                errorMessage = error.message

            return NextResponse.json(
                {error: errorMessage},
                {status: 500}
            )
        }
}