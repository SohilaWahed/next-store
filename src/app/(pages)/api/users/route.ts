import { NextRequest, NextResponse } from "next/server"

const users=[
    {
        username:'Ali omer' ,
        age:'20'
    }
]
export async function GET()
{
    return NextResponse.json(users)
}
export async function POSt({req}:{req:NextRequest})
{
    const body= await req.json();
     users.push(body)
      return NextResponse.json({
        message: 'suceess' ,
        users
      })
}