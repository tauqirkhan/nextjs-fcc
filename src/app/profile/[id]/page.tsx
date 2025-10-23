
type UserProfileProps = {
    params: {
        id: string
    }
}

export default function UserProfile({params}: UserProfileProps){
   const { id } = params;
    
    return(
    <div>
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <span>Profile id: {id}</span>
    </div>
   ) 
}