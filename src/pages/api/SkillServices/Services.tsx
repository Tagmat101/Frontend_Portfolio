import axios from "axios";
import Cookies from 'universal-cookie';
 


const root = 'api/skill';
const cookie = new Cookies() 
export const GetDataSkills = async() => {
    try{
        const cookie_ = cookie.get('token-cookie')
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/all`;
        console.log(url)
        const response = await axios.get(url,{
            headers: {
                'Authorization': cookie_
            }
        })
        return response.data.data
    } catch(error:any)
    {
        console.log(error)
    }
}
 
/////////////////////////////////////////////////////////////////////////////
export const AddSkill= async(data:ISkill) => {
    try{
        console.log(data)
        const cookie_ = cookie.get('token-cookie')

         const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skill/create`;
        const response = await axios.post(url,data,{
            headers: {
                'Authorization': cookie_
            }
        })
        return response.data
    } catch(error:any)
    {
        console.log(error)
    }
}
export const UpdateSkill= async(data:ISkill) => {
  try{
      console.log(data)
      const cookie_ = cookie.get('token-cookie')

       const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skill/${data.id}`;
      const response = await axios.put(url,data,{
          headers: {
              'Authorization': cookie_
          }
      })
      return response.data
  } catch(error:any)
  {
      console.log(error)
  }
}
export async function getSkillByID(idSkill:string) {
    try {   
        const cookie_ = cookie.get('token-cookie')

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skill/${idSkill}`, {
        headers: {
          'Authorization': cookie_
        }
      }); 
      return response.data.data;
    } catch (error) {
      throw error
    }
}  

 
export async function getSkillAll() {
  try {   
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skill/all`;
    const cookie_ = cookie.get('token-cookie')

    const response = await axios.get(url,{
        headers: {
            'Authorization': cookie_
        }
    })  
    return response.data.data;
  } catch (error) {
    throw error
  }
} 
export async function DeleteSkill(idSkill:String) {
  try {   
    const cookie_ = cookie.get('token-cookie')

    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/skill/${idSkill}`, {
      headers: {
        'Authorization': cookie_
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
 