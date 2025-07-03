'use client'
import { useSession,signIn,signOut } from "next-auth/react";
import Link from "next/link";
export  default function Home() {
const{status,data:session}=useSession()
if(status==='unauthenticated'){
return <button className="bg-green-500" onClick={()=>signIn('google')} > sign in  </button>
}  

if(status==='loading'){
return <p className="bg-amber-300"> cehckign info.....</p>
}

return (<div>
<p className="bg-violet-500">welcome !! {session?.user?.name}</p>
<button className="bg-red-600" onClick={()=>signOut()}>signOut</button>

<Link  href={'/createUser'}>
<button className="bg-blend-color-dodge" >go to  create user </button>
</Link>


</div>)
}