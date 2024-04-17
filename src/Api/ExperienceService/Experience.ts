import axios from "axios"; 
const root = 'api/experience';
import {token} from "../token"


export const AddExperience = async(data:IExperience) => {
    try{
        console.log(data)
         const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/experience/create`;
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
export const UpdateExperience = async(data:IExperience) => {
  try{
      console.log(data)
       const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/experience/${data.id}`;
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
export async function getExperienceByID(iExperience:string) {
    try {   
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/experience/${iExperience}`, {
        headers: {
          'Authorization': token
        }
      }); 
      return response.data.data;
    } catch (error) {
      throw error
    }
}  

export async function getExperienceAll() {
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
 
export async function DeleteExperience(idExperience:String) {
    try {   
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/experience/${idExperience}`, {
        headers: {
          'Authorization': token
        }
      }); 
      return response.data.data;
    } catch (error) {
      throw error
    }
}  