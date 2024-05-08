import useDataFetching from "@hooks/useFetchingData";
import React, { createContext, useContext, ReactNode, SetStateAction, Dispatch, useState, useCallback } from "react";


  const projectInitialState = { id:"",link: "", name: "", description: "", achievements: [], skills: [], startDate: new Date(), endDate: new Date(), responsibilities: [], images: [] };
  const skillInitialState = { id:"",name: "", icon: "", category: "", type: "" };
  const educationInitialState = {id:"", degree: '', startDate: new Date(), endDate: new Date(), fieldOfStudy: '', location: '', description: '', institution: '' };
  const experienceInitialState = { id:"",startDate: new Date(), endDate: new Date(), responsibilities: [], achievements: [], skills: [], description: '', jobTitle: '', employmentType: "", companyName: '', location: "" };
 
 

interface StateContextType {
 
    openSkill:boolean,
    openEducation:boolean,
    openExperience:boolean, 
    openProject:boolean,

    setOpenSkill: Dispatch<SetStateAction<boolean>>,
    setOpenEducation: Dispatch<SetStateAction<boolean>>,
    setOpenExperience: Dispatch<SetStateAction<boolean>>,
    setOpenProject: Dispatch<SetStateAction<boolean>>,

    dataEducationMod: IEducation|null;
    dataProjectMod: IProject|null;
    dataExperienceMod: IExperience|null;
    dataSkillMod: ISkill|null;
 
    setDataProjectMod: Dispatch<SetStateAction<IProject|null>>;
    setDataEducationMod: Dispatch<SetStateAction<IEducation|null>>;
    setDataExperienceMod: Dispatch<SetStateAction<IExperience|null>>;
    setDataSkillMod: Dispatch<SetStateAction<ISkill|null>>;
}

export const DetailsPortfolioContext = createContext<StateContextType>({
    openSkill:false,
    openEducation:false,
    openExperience:false, 
    openProject:false,

    setOpenSkill:() => {},
    setOpenEducation:() => {},
    setOpenExperience:() => {},
    setOpenProject:() => {},

    setDataEducationMod: () => {},
    setDataProjectMod: () => {},
    setDataExperienceMod: () => {},
    setDataSkillMod: () => {},
  
    dataExperienceMod: null,  
    dataProjectMod: null,
    dataSkillMod: null,
    dataEducationMod: null,
});

type ContextProviderProps = {
    children?: ReactNode;
};

export const ContextPortfolioDetailsProvider = ({ children }: ContextProviderProps) => {
  

    const [dataEducationMod, setDataEducationMod] = useState<IEducation|null>(null);
    const [dataExperienceMod, setDataExperienceMod] = useState<IExperience|null>(null);
    const [dataProjectMod, setDataProjectMod] = useState<IProject|null>(null);
    const [dataSkillMod, setDataSkillMod] = useState<ISkill|null>(null);
 
    const [openEducation,setOpenEducation] = useState<boolean>(false)
    const [openExperience,setOpenExperience] = useState<boolean>(false)
    const [openProject,setOpenProject] = useState<boolean>(false)
    const [openSkill,setOpenSkill] = useState<boolean>(false)

    return (
        <DetailsPortfolioContext.Provider value={{openSkill,setOpenSkill,openProject,setOpenProject,openExperience,setOpenExperience,openEducation,setOpenEducation,  dataEducationMod, setDataEducationMod, dataExperienceMod, setDataExperienceMod, dataProjectMod, setDataProjectMod, dataSkillMod, setDataSkillMod  }}>
            {children}
        </DetailsPortfolioContext.Provider>
    );
};
