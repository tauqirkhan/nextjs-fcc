"use client";

import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";

export default function ResetPassword(){

    const [token, setToken] = useState("")
    const [error, setError] = useState(false)
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const resetPassword = async(password: string) => {
        try {

            //hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const response = await axios.post("/api/users/resetpassword", {token, newPassword: hashedPassword})
            const status: boolean = response.data.status

            if(!status){
                setError(true)
                toast.error("Invalid Token")
                return
            }

            toast.success("Enter new password and submit")

        } catch (error: unknown) {
            setError(true)
            
            let errorMessage = "Something Went Wrong"

            if (error instanceof Error)
                errorMessage = error.message

            toast.error(errorMessage)
        }
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(password === newPassword){
            await resetPassword(password)
            toast.success("Password Reset Successfully")
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    // useEffect(() => {
    //     if(token.length > 0)
    // }, [token])

    return(
        <div>
            <Toaster />
            {!error ? 
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password">Enter Your New Password: </label>
                            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <div>
                            <label htmlFor="newPassword">Re-Enter Your New Password: </label>
                            <input type="password" id="newPassword" name="newPassword" onChange={(e) => setNewPassword(e.target.value)} required/>
                        </div>
                        <button type="submit" disabled={newPassword != password}>Submit</button>
                    </form>
                </div>
            : "Invalid Token"}
            Reset Password

        </div>
    )

}