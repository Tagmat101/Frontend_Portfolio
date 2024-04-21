interface IEducation {
    id: String;
    institution: String; 
    degree:String;
    startDate:Date;
    endDate:Date;
    fieldOfStudy:String;
    location:String;
    description:String;
  }
  
   interface IExperience {
    id: String;
    companyName: String; 
    jobTitle:String;
    startDate:Date;
    endDate:Date;
    description:String;
    responsibilities:String[];
    achievements:String[];
    skills:String[];
  }
  
   interface IProject {
    id: String;
    name: String;
    link:String; 
    description:String;
    startDate:Date;
    endDate:Date; 
    responsibilities:String[];
    achievements:String[];
    skills:String[]; 
  } 
  
   interface Categorie {
    id: String;
    name: String;
    state: boolean;
  }
  
   interface Categories {
    categories: Categorie[];
  }
  
   interface PortfolioDataHelper { //this interface helps me to get data from db 
    categories: Categorie[];
    educations: IEducation[];
    experiences: IExperience[];
    projects: IProject[];
    skills: String[]; 
  }
  
   interface PortfolioData {  
      name: String;
      color: String;
      educations: IEducation[];
      experiences: IExperience[];
      projects: IProject[];
      skills: String[]; 
  }
  