import { useState, useEffect } from 'react';
import { getEducationAll, getEducationByID,DeleteEducation } from '../../Api/EducationService/Education';  
 
 
export const useEducationAll = () => {
  const [educationList, setEducationList] = useState<IEducation[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEducationAll();
         setEducationList(data);
         setLoading(false);
      } catch (error) {
         setError(error);
         setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { educationList, loading, error};
};
 
export const useEducationByID = (idEducation:string) => {
    const [educationData, setEducationData] = useState<IEducation>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getEducationByID(idEducation);
          setEducationData(data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { educationData, loading, error };
  };
  export const useDeleteEducation= (id:String) => {
  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
    const [message, setMessage] = useState<String>();

  
      const handleDelete = async () => {
        try {
          const data = await DeleteEducation(id);
           setMessage(data);
           setLoading(false);
        } catch (error) {
           setError(error);
           setLoading(false);
        }
      };
   
  
    return { message, loading, error , handleDelete};
  };