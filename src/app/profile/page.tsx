"use client";
import axios from "axios";
import Link from "next/navigation";
import toast, {Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage(){
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
   
    return(
    <div>
        <Toaster />
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
    <hr />
    <button onClick={logout}>
        Log Out
    </button>
    </div>
   ) 
}