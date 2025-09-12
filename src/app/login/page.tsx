"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter()
    const [ user, setUser] = React.useState({
        email:"",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        if(
            user.email.length > 0 &&
            user.password.length > 0
        )
            setButtonDisabled(false)
        else
            setButtonDisabled(true)
    }, [user])
    
    const onLogin = async() => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login Success", response.data)
            toast.success("Login Success")
            router.push("/profile")
        } catch (error: unknown) {
            let errorMessage = "Something Went Wrong"

            if(error instanceof Error)
                errorMessage = error.message
            console.log("Login Failed", errorMessage)
            toast.error(errorMessage)
        } finally{
            setLoading(false)
        }
    } 

    return (
        <div>
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
            <Toaster />
            <label htmlFor="email">email: </label>
            <input 
                id="email"
                type="email"  
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password">password: </label>
            <input 
                id="password"
                type="password"  
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button onClick={onLogin}>
                {buttonDisabled ? "No Login": "Login here"}
            </button>
            <hr />
            <Link href="/signup">Visit Signup page</Link>
        </div>

    )
}