"use client";
import axios from "axios";
import Link from "next/link";
import toast, {Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage(){
    const [userDetails, setUserDetails] = React.useState("nothing")

    const router = useRouter()

    const logout = async () => {
        try {
            const res = await axios.get("/api/users/logout")
            if(res.data.success){
                toast.success("Log Out Successful")
                router.push("/login")
            } else 
                throw new Error(res.data.error)
        } catch (error: unknown) {
            let message = "Something went wrong"
        
            if(error instanceof Error)
                message = error.message

            console.log(message)
            toast.error(message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        if(res.data.success)
            setUserDetails(res.data.data._id);
    }

    const resetPassword = async () => {
        const res = await axios.get("/api/users/me")
        if(res.data.success){
            const status = await axios.post("/api/users/sendResetEmail", {email: res.data.data.email, emailType: "RESET",userId: res.data.data._id})
            if(status.data.success){
                toast.success("Reset password link send to your registered email")
            }
            // await sendEmail(
            //     {                 
            //         email: res.data.data.email,
            //         emailType: "RESET",
            //         userId: res.data.data._id
            //     }
            // )
            
        } else{
            toast.error(res.data.error)
        }
    }
   
    return(
    <div>
        <Toaster />
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <hr />
        <h2>
            {userDetails === "nothing" ? "Nothing" : <Link href={`/profile/${userDetails}`}> {userDetails} </Link>}
        </h2>
        <hr />
        <button onClick={getUserDetails}>
            Get Users Details
        </button>  
        <hr />
        <button onClick={logout}>
            Log Out
        </button>
        <hr />
        <button onClick={resetPassword}>
            Reset Password
        </button>
    </div>
   ) 
}