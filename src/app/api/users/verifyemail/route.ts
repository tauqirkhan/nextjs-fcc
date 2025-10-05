import { connect } from "@/dbConfig/dbConfig";  
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


await connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log("token: ", token)

        const user = await User.findOne(
            {
                verifyToken: token,
                verifyTokenExpiry: {$gt: Date.now()}
            }
        )
        console.log("user: ", user)

        user.isVerified = true
        // setting undefined will remove the field, will not set it undefined on db
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json(
            {
                message: "Email Verified Successfully",
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
