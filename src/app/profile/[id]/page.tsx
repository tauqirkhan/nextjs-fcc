
type UserProfileProps = {
    params: {
        id: string
    }
}

export default async function UserProfile({params}: UserProfileProps){
   const { id } = await params;
    
    return(
    <div>
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <span>Profile page: {id}</span>
    </div>
   ) 
}