"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

export default function LoginPage(){
    const [ user, setUser] = React.useState({
        email:"",
        password: "",
    })

    const onLogin = async() => {} 


    return (
        <div>
            <h1>Login</h1>
            <hr />
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
            <button onClick={onLogin}>
                Signup Here
            </button>
            <Link href="/signup">Visit Signup page</Link>
        </div>

    )
}