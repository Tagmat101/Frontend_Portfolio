import axios from "axios";
import Cookies from 'universal-cookie';


const root = 'api/project';
const cookie = new Cookies() 
export const GetDataProjects = async() => {
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
export const AddProject = async (data: IProject,previewImages:any) => {
  try {
   
    const cookie_ = cookie.get('token-cookie');

    const formData = new FormData(); 
    formData.append('project',  JSON.stringify(data));
 
    if (previewImages && previewImages.length > 0) {
      for (const image of previewImages) {
          formData.append('images', image);
      }
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/create`;
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${cookie_}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  } 
}

export const UpdateProject= async(data:IProject) => {
  try{
      console.log(data)
      const cookie_ = cookie.get('token-cookie')

       const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/${data.id}`;
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
export async function getProjectByID(iProject:string) {
    try {   
        const cookie_ = cookie.get('token-cookie')

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/${iProject}`, {
        headers: {
          'Authorization': cookie_
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
export async function DeleteProject(idProject:String) {
  try {   
    const cookie_ = cookie.get('token-cookie')

    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/${idProject}`, {
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
 