import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
   const { cookies } = request;
   const token = cookies['token-cookie']
   const baseUrl = request.nextUrl.origin
   if(request.nextUrl.pathname == "/pages/login/")
   {
    console.log(request.nextUrl.pathname)
    if(token != undefined) 
        return NextResponse.redirect(baseUrl + '/')
   } else 
    {
        console.log("hna2")
        if(token == undefined)
            return NextResponse.redirect(baseUrl + "/pages/login/")
    }
}
 