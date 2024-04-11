import { useState, useEffect } from 'react';
import { getExperienceAll, getExperienceByID } from '../../Api/GET/GetExperience'; // replace with your actual file path
import { DeleteExperience } from 'src/Api/DELETE/DeleteExperience';
 

export const useExperienceAll = () => {
  const [ExperienceList, setExperienceList] = useState<IExperience[]>([]); 

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExperienceAll();
         setExperienceList(data);
         setLoading(false);
      } catch (error) {
         setError(error);
         setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ExperienceList, loading, error };
};
export const useExperienceByID = (idExperience:string) => {
    const [ExperienceData, setExperienceData] = useState<IExperience>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getExperienceByID(idExperience);
          setExperienceData(data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { ExperienceData, loading, error };
  };
  export const useDeleteExperience= (id:String) => {
  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
    const [message, setMessage] = useState<String>();

    const handleDelete = async () => {
      try {
        const data = await DeleteExperience(id);
         setMessage(data);
         setLoading(false);
      } catch (error) {
         setError(error);
         setLoading(false);
      }
    };
   
    return { message, loading, error,handleDelete};
  };