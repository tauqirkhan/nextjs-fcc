import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import {NextResponse, NextRequest} from "next/server"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

//this will connect to db out of the box
await connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody)

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        // send verification email
        await sendEmail({
            email, 
            emailType: "VERIFY",
            userId: savedUser._id
        })

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch(error: unknown){
        let message = "Something went wrong";

        if(error instanceof Error)
            message = error.message

        console.log("/signup error: ", message)
        return NextResponse.json({message}, {status: 500})
    }
}