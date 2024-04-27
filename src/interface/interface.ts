interface IEducation {
  id: string;
  institution: string; 
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
  jobTitle:string;
  startDate:Date;
  endDate:Date;
  description:string;
  responsibilities:string[];
  achievements:string[];
  skills:string[];
}

 interface IProject {
  id: string;
  name: string;
  link:string; 
  description:string;
  startDate:Date;
  endDate:Date; 
  responsibilities:string[];
  achievements:string[];
  skills:string[]; 
} 

interface Categorie {
  id: string;
  name: String;
  state: boolean;
}

 interface Categories {
  categories: Categorie[];
}

interface CategorieHelper {
name: String;
state: boolean;
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
  // skills: string[]; 
  categorie: Categorie;
  visible: boolean;
}





