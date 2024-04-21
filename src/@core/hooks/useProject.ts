import { useState, useEffect } from 'react';
import { DeleteProject, getProjectAll, getProjectByID } from '@api/ProjectServices/Services'; // replace with your actual file path
  

export const useProjectAll = () => {
  const [ProjectList, setProjectList] = useState<IProject[]>([]); 

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjectAll();
         setProjectList(data);
         setLoading(false);
      } catch (error) {
         setError(error);
         setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ProjectList, loading, error };
};
export const useProjectByID = (idProject:string) => {
    const [ProjectData, setProjectData] = useState<IProject>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getProjectByID(idProject);
          setProjectData(data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { ProjectData, loading, error };
  };
  export const useDeleteProject= (id:String) => {
  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
    const [message, setMessage] = useState<String>();

    const handleDelete = async () => {
      try {
        const data = await DeleteProject(id);
         setMessage(data);
         setLoading(false);
      } catch (error) {
         setError(error);
         setLoading(false);
      }
    };
   
    return { message, loading, error,handleDelete};
  };