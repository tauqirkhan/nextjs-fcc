import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"
import User from "@/models/userModel"
import mongoose from "mongoose"

type SendEmailParams = {
    email: string
    emailType: "VERIFY" | "RESET"
    userId: mongoose.Types.ObjectId | string
}

export const sendEmail = async ({email, emailType, userId}: SendEmailParams) => {
    try {
        // create a hashes token
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPassword: hashedToken,
                    forgotPasswordExpiry: Date.now() + 3600000
                }
            )
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const mailOptions = {
            from: "test@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">Here</a> to ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse

    } catch (error: unknown) {
        let errorMessage = "Something went wrong"

        if(error instanceof Error)
                errorMessage = error.message
        
        throw new Error(errorMessage)
    }
}