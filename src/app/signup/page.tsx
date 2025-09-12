"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

export default function SignUpPage(){
    const [ user, setUser] = React.useState({
        email:"",
        password: "",
        username: "",
    })

    const onSignUp = async() => {} 


    return (
        <div>
            <h1>Sign Up</h1>
            <hr />
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
                value={user.email}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button onClick={onSignUp}>
                Signup Here
            </button>
            <Link href="/login">Visit login page</Link>
        </div>

    )
}