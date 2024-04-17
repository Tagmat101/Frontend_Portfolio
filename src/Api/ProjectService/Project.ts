import axios from "axios";  
import {token} from "../token"
export const AddProject= async(data:IProject) => {
    try{
        console.log(data)
         const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/create`;
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
export const UpdateProject= async(data:IProject) => {
  try{
      console.log(data)
       const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/${data.id}`;
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
export async function getProjectByID(iProject:string) {
    try {   
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/${iProject}`, {
        headers: {
          'Authorization': token
        }
      }); 
      return response.data.data;
    } catch (error) {
      throw error
    }
}  

export async function getProjectAll() {
  try {   
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/all`;
   
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
export async function DeleteProject(idProject:String) {
  try {   
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/${idProject}`, {
      headers: {
        'Authorization': token
      }
    }); 
    return response.data.data;
  } catch (error) {
    throw error
  }
}  

// if (axios.isAxiosError(error)) {
//   handleAxiosError(error);
// } else {
//   handleUnexpectedError(error);
// }   const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/all`;
 