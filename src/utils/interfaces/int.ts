export interface Education {
  id: string;
  institution: string;
}

export interface Experience {
  id: string;
  companyName: string;
}

export interface Project {
  id: string;
  name: string;
}

export interface Categorie {
  id: string;
  name: string;
  state: boolean;
}

export interface Categories {
  categories: Categorie[];
}

export interface PortfolioDataHelper { //this interface helps me to get data from db 
  categories: Categorie[];
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
  skills: string[]; 
}

export interface PortfolioData { // this one gets the effective portfolio in order to display it : 
    id: string;
    name: string;
    color: string;
    educations: Education[];
    experiences: Experience[];
    projects: Project[];
    skills: string[]; 
    categorie: Categorie;
}
