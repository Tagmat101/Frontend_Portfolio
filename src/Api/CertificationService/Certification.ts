import axios from "axios";  
import {token} from "../token"
export const AddCertification= async(data:ICertification) => {
    try{
        console.log(data)
         const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certification/create`;
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
export const UpdateCertification= async(data:ICertification) => {
  try{
      console.log(data)
       const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certification/${data.id}`;
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
export async function getCertificationByID(iCertification:string) {
    try {   
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certification/${iCertification}`, {
        headers: {
          'Authorization': token
        }
      }); 
      return response.data.data;
    } catch (error) {
      throw error
    }
}  

export async function getCertificationAll() {
  try {   
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certification/GetAllCerts`;
   
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
export async function DeleteCertification(idCertification:String) {
  try {   
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certification/${idCertification}`, {
      headers: {
        'Authorization': token
      }
    }); 
    return response.data.data;
  } catch (error) {
    throw error
  }
}