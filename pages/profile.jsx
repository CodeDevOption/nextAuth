import React from 'react'
import { getSession, useSession } from 'next-auth/react'
import Image from 'next/image';

const Profile = () => {
    const {data:session} = useSession();
    return (
    <div className='flex flex-col items-center justify-center mt-10'>
        <Image className='rounded-full shadow-md' src={session?.user.image} width={150} alt="profile-image" height={150} />
        <div className='text-center'>
            <h5>{session.user?.name}</h5>
            <h5>{session.user?.email}</h5>
        </div>
    </div>
  )
}

export default Profile

export const getServerSideProps = async ({req})=>{
    const session = await getSession({req});
    if(!session){
        return {
            redirect:{
                destination:'/login',
                permanent:false
            }
        }
    }
    
    return{
        props:{
            session
        }
    }
}