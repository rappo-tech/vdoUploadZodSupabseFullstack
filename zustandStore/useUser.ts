'use client'
import{create} from 'zustand'
export type Role = 'USER'|'ADMIN'|'MODERATOR'
export interface User{
userName:string, 
age:number,
role:Role
}
export interface UserStore{
user:User|null
setUser:(user:User)=>void
}
export const  UseUser=create<UserStore>((set)=>({
    user:null, 
    setUser:user=>set({user})
}))