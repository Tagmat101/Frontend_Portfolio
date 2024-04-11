import axios from "axios"; 
const root = 'api/experience';
const token ="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2NjEzZjZmZDI0YzU1MzFlNWExOGI3MWEiLCJpYXQiOjE3MTI4NTQyODcsImV4cCI6MTcxMjk0MDY4N30.Ac8wYbV7sYrtPcCV9yKSlpkuGQzo5kojTgtYQmK5zw_BPO7JkyhOlVc8tctVUMKu8OJDHwFwZvgEu4k4lmhSuA"
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
// if (axios.isAxiosError(error)) {
//   handleAxiosError(error);
// } else {
//   handleUnexpectedError(error);
// }   const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/all`;
 