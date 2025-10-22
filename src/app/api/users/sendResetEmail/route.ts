import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        
        const {email, emailType, userId} = reqBody

        const res = await sendEmail({email, emailType, userId})

        return NextResponse.json(
            {
                success: true,
            }
        )

    }catch (error: unknown) {
                let errorMessage = "Something went wrong"
    
                if(error instanceof Error)
                    errorMessage = error.message
    
                return NextResponse.json(
                    {
                        error: errorMessage,
                        status: 500,
                        success: false
                    }
                )
    }
}