interface ISkill{
    id: string;
    name:string;
    icon:string; 
    type:string;
    category:string; 
}

interface IEducation {
    id: string;
    institution: string; 
    institutionLogo: string; 
    degree:string;
    startDate:Date;
    endDate:Date;
    fieldOfStudy:string;
    location:string;
    description:string;
}
  
   interface IExperience {
    id: string;
    companyName: string; 
    companyLogo: string; 
    jobTitle:string;
    startDate:Date;
    endDate:Date;
    location:string ;
    employmentType:string,
    description:string;
    responsibilities:string[];
    achievements:string[];
    skills:ISkill[];
  }
  
  interface IProject {
    id?: string;
    name: string;
    link: string;
    description: string;
    startDate: Date;
    endDate: Date;
    responsibilities: string[];
    achievements: string[];
    skills: ISkill[];
    imageUrl?: string;
  }
  
   interface Categorie {
    id: string;
    name: String;
    state: boolean;
  }
  
   interface Categories {
    categories: Categorie[];
  }
   
//these interfaces will help for displaying only for portfolio

interface Education {
    id: string;
    institution: string; 
}
  
interface Experience {
  id: string;
  companyName: string; 
}
  
interface Project {
  id: string;
  name: string;
} 

interface User {
  name: string;
  email: string;
  tel: string;
}
  
interface PortfolioDataHelper { //this interface helps me to get data from db 
  categories: Categorie[];
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
  skills: String[]; 
}

 interface PortfolioData {  
    id: string;
    name: string;
    color: string;
    educations: IEducation[];
    experiences: IExperience[];
    projects: IProject[];
    skills: string[]; 
    visible: boolean;
    categorie: Categorie;
    user: User;
    resume: string;
}



interface CategorieHelper {
  name: String;
  state: boolean;
}

