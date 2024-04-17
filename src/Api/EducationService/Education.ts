import axios from "axios"; 
const root = 'api/education'; 

import {token} from "../token"

export async function getEducationByID(idEducation:string) {
    try {   
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/education/${idEducation}`, {
        headers: {
          'Authorization': token
        }
      }); 
      return response.data.data;
    } catch (error) {
      throw error
    }
}  

export async function getEducationAll() {
  try {   
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/all`; 

    const response = await axios.get(url,{
        headers: {
            'Authorization': token
        }
    }) 

    return response.data.data;
  } catch (error) {
    throw error
  }
} 
 
 
export const AddEducation = async(data:IEducation) => {
    try{
        console.log("add")
         const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/education/create`;
        const response = await axios.post(url,data,{
            headers: {
                'Authorization': token
            }
        })
        return response.data
    } catch(error:any)
    {
        console.log(error)
    }
}

export const UpdateEducation= async(data:IEducation) => {
    try{
        console.log(data)
         const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/education/${data.id}`;
        const response = await axios.put(url,data,{
            headers: {
                'Authorization': token
            }
        })
        return response.data
    } catch(error:any)
    {
        console.log(error)
    }
  }


export async function DeleteEducation(idEducation:String) {
    try {   
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/education/${idEducation}`, {
        headers: {
          'Authorization': token
        }
      }); 
      return response.data.data;
    } catch (error) {
      throw error
    }
}  
 
