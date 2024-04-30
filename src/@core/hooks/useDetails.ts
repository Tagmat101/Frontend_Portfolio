import { useState, useEffect } from 'react';
import { getSkillAll, getSkillByID,DeleteSkill } from '@api/SkillServices/Services';  
import { DeleteProject, getProjectAll, getProjectByID } from '@api/ProjectServices/Services';  
import { DeleteExperience, getExperienceAll, getExperienceByID } from '@api/ExperienceServices/Service';
import { DeleteEducation, getEducationAll, getEducationByID } from '@api/EducationServices/Services';
import { ConsoleLine } from 'mdi-material-ui';
   
  
export const useSkill = (idSkill?: string) => {
  const [skillData, setSkillData] = useState<ISkill>();
  const [skillList, setSkillList] = useState<ISkill[]>([]); 
  const [message, setMessage] = useState<string>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  const fetchData = async () => {
    try {
      if (idSkill) { 
        const data = await getSkillByID(idSkill);
        setSkillData(data);
      }else{
        const skillListData = await getSkillAll();
        setSkillList(skillListData);  
      } 
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const deleteSkill = async (idSkillToDelete: string) => {
    try {
   
      const data = await DeleteSkill(idSkillToDelete);
      setMessage(data); 
      setLoading(false);  
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {  
      fetchData();  
  }, []);

  return { message,skillList, skillData, loading,setLoading, error, deleteSkill,fetchData };
};

  export const useProject = (idProject?: string) => {
    const [projectData, setProjectData] = useState<IProject>();
    const [projectList, setprojectList] = useState<IProject[]>([]); 
    const [message, setMessage] = useState<string>();
  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
  
    const fetchData = async () => {
      try {
        if (idProject) {
          const data = await getProjectByID(idProject);
          setProjectData(data);
        }
        const projectListData = await getProjectAll();
        setprojectList(projectListData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    const deleteProject = async (idProjectToDelete: string) => {
      try {
        const data = await DeleteProject(idProjectToDelete);
        setMessage(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return { message,projectList, projectData, loading, error, deleteProject };
  };
  export const useExperience = (idExperience?: string) => {
    const [experienceData, setExperienceData] = useState<IExperience>();
    const [experienceList, setExperienceList] = useState<IExperience[]>([]); 
    const [message, setMessage] = useState<string>();
  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
  
    const fetchData = async () => {
      try {
        if (idExperience) {
             const data = await getExperienceByID(idExperience);
            setExperienceData(data);
        }
        const projectListData = await getExperienceAll();
        setExperienceList(projectListData);
        
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
  
    const deleteExperience = async (idExperienceToDelete: string) => {
      try {
        const data = await DeleteExperience(idExperienceToDelete);
        setMessage(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return { message,experienceData, experienceList, loading, error, deleteExperience };
  };
  
  export const useEducation = (idEducation?: string) => {
    const [educationList, setEducationList] = useState<IEducation[]>([]); 
    const [educationData, setEducationData] = useState<IEducation>();

    const [message, setMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
 
    const fetchData = async () => {
      try {
        if (idEducation) {
             const data = await getEducationByID(idEducation);
            setEducationData(data);
        }
        const projectListData = await getEducationAll();
        setEducationList(projectListData);
        
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
  
    const deleteEducation = async (idEducationToDelete: string) => {
      try {
        const data = await DeleteEducation(idEducationToDelete);
        setMessage(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return { message,educationData, educationList, loading, error, deleteEducation };
  };