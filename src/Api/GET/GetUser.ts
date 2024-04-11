"use server"
import axios from "axios";
 

export async function getUserByID(idUser:string) {
    try {   
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${idUser}`, {
        headers: {
          'Authorization': `Bearer ${process.env.AuthorizationToken}`
        }
      });
       console.log(response.data)
       return response.data;
    } catch (error) {
      throw error
    }
}