"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast"

export default function SignUpPage(){
    const router = useRouter()
    const [ user, setUser] = React.useState({
        email:"",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false)

    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        if(
            user.email.length > 0 && 
            user.password.length > 0 &&
            user.username.length > 0
        )
            setButtonDisabled(false)
        else
            setButtonDisabled(true)
    }, [user])

    const onSignUp = async() => {
        try {
            setLoading(true)

            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data)

            toast.success("User Sign Successfully, Verify it ASAP!")
            router.push("/login")
        } catch (error: unknown) {
            let errorMessage = "Something went wrong"

            if(error instanceof Error)
                errorMessage = error.message

            toast.error(errorMessage);
        } finally{
            setLoading(false)
        }
    } 

    return (
        <div>
            <h1>{loading ? "Processing" : "Sign Up"}</h1>
            <hr />
            <Toaster />
            <label htmlFor="username">username</label>
            <input 
                id="username"
                type="text"  
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input 
                id="email"
                type="email"  
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input 
                id="password"
                type="password"  
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button onClick={onSignUp}>
                {buttonDisabled? "No Sign Up" : "Sign Up"}
            </button>
            <br />
            <Link href="/login">Visit login page</Link>
        </div>

    )
}