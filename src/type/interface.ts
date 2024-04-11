interface IEducation {
    id: String;
    institution: String; 
    degree:String;
    startYear:Date;
    endYear:Date;
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
  
   interface Project {
    id: String;
    name: String;
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
    projects: Project[];
    skills: String[]; 
  }
  
   interface PortfolioData {  
      name: String;
      color: String;
      educations: IEducation[];
      experiences: IExperience[];
      projects: Project[];
      skills: String[]; 
  }
  