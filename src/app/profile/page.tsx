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
            await axios.get("/api/users/logout")
            toast.success("Log Out Successful")
            router.push("/login")
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
        setUserDetails(res.data.data._id);
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
    </div>
   ) 
}