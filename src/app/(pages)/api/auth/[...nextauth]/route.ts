import { User } from './../../../../../../node_modules/next-auth/core/types.d';

import { failsignin, successsignin } from "@/interfaces";
import { error } from "console";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { email } from "zod"
const handler = NextAuth({
  providers:[
  CredentialsProvider({
    name:'credantion',
    credentials:{
      email:{},
      password:{}
    },
    authorize :async(credentials)=>
    {
      const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( { email:credentials?.email , password :credentials?.password}), 
      }
    );

    const data = await response.json();
    console.log(data)
    if('token' in data)
    {
      return {
        id:data.user.email,
        user:data.user,
        token:data.token
      }
    }
    else{
        throw new Error(data.message)
    }
      
    }

  })
  ]
  , callbacks:
  {
    jwt:({token,user})=>
    {
        if(user)
        {
            token.token=user.token,
            token.user=user.user
        
        }
        return token
    },
   async session({ session, token }) 
   {
    session.user=token.user
  return session;
}

  },
  pages:
  {
    signIn:'/login', 
    error:'/login'
  },
  secret:process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }