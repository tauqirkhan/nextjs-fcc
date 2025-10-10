"use client";

import axios from "axios";
import React, {useState, useEffect} from "react";  
import Link from "next/link";
import toast, {Toaster} from "react-hot-toast";

export default function VerifyEmailPage(){

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", {token})
            const status: boolean = response.data.success;

            if(!status){
                setError(true)
                toast.error("Invalid token");
                return 
            }

            setVerified(true)
            toast.success("Verified Successfully")
        } catch (error: unknown) {
            setError(true)

            let errorMessage = "Something went wrong"

            if(error instanceof Error)
                errorMessage = error.message

            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        // left side of "=" in query is 0 and right is 1
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if(token.length > 0)
            verifyUserEmail()
    }, [token])

    return(
        <div>
            <h1>Verify Email</h1>
            <h2>{token ? `${token}` : "no token"}</h2>

            {verified && 
                <div>
                    <h1>Email Verified</h1>
                    <Link href="/login">Login</Link>
                </div>
            }

            {error && 
                <div>
                    <h1>Error</h1>
                    <Toaster />
                </div>
            }
        </div>
    )

}