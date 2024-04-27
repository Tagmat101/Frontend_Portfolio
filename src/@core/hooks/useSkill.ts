import { useState, useEffect } from 'react';
import { getSkillAll, getSkillByID,DeleteSkill } from '@api/SkillServices/Services';  
 
 
export const useSkillAll = () => {
  const [skillList, setSkillList] = useState<ISkill[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSkillAll();
         setSkillList(data);
         setLoading(false);
      } catch (error) {
         setError(error);
         setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { skillList, loading, error};
};
 
export const useSkillByID = (idSkill:string) => {
    const [skillData, setSkillData] = useState<ISkill>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getSkillByID(idSkill);
          setSkillData(data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { skillData, loading, error };
  };
  export const useDeleteSkill= (id:String) => {
  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
    const [message, setMessage] = useState<String>();

  
      const handleDelete = async () => {
        try {
          const data = await DeleteSkill(id);
           setMessage(data);
           setLoading(false);
        } catch (error) {
           setError(error);
           setLoading(false);
        }
      };
   
  
    return { message, loading, error , handleDelete};
  };