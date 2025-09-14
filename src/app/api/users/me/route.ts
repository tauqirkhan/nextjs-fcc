import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig"

connect()

export async function GET(request: NextRequest) {
    try {
        const userId =  await getDataFromToken(request)

        //select every user data that matches _id except "password"
        const user = await User.findOne({_id: userId}).select("-password")
        
        return NextResponse.json({
            message: "User Found",
            data: user
        })
    } catch (error) {
        let errorMessage = "Something went wrong"

        if(error instanceof Error)
            errorMessage = error.message

        return NextResponse.json(
            {error: errorMessage},
            {status: 400}
        )
    }
}