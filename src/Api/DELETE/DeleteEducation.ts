import axios from "axios"; 
const root = 'api/education';
import {token} from "../token"
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
 
// if (axios.isAxiosError(error)) {
//   handleAxiosError(error);
// } else {
//   handleUnexpectedError(error);
// }   const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${root}/all`;
 