'use server'

import { signIn } from "@/auth"
import { revalidatePath } from "next/cache"
import { signOut } from "../auth"

 export const loginGithub = async (provider: string) => {
    console.log(provider)
    await signIn(provider, { redirectTo: '/home'})
    revalidatePath('/home')
}

export const loginGoogle = async (provider: string) => {
    await signIn(provider, { redirectTo: '/home'})
    revalidatePath('/home')
}

export const logoutBtn = async () => {
    await signOut({redirectTo: '/'})    
    revalidatePath('/')
}