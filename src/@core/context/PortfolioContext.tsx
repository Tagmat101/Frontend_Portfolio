
import React, {
    createContext,
    useContext,
    ReactNode,
    SetStateAction,
    Dispatch,
    useState,
    useCallback
  } from "react";
  import { Categorie, PortfolioData } from "src/utils/interfaces/int";
  
  interface StateContextType {
    modify:boolean;
    value: string,
    dataPortfolioMod: PortfolioData;
    setValue: Dispatch<SetStateAction<string>>;
    setDataPortfolioMod: Dispatch<SetStateAction<PortfolioData>>;
    setModify: Dispatch<SetStateAction<boolean>>;
  }
  
  export const PortfolioContext = createContext<StateContextType>({
    modify: false,
    value: 'portfolio' ,
    setModify: () => {},
    setDataPortfolioMod: () => {},
    setValue: () => {},
    dataPortfolioMod: {categorie: {id: "" , name: "" , state: false},id: "",name: "", color: "" , educations: [],experiences: [] , skills: [] , projects: []},
  });
  
  type ContextProviderProps = {
    children?: ReactNode;
  };
  
  export const ContextPortfolioProvider = ({ children }: ContextProviderProps) => {
    const [dataPortfolioMod, setDataPortfolioMod] = useState<PortfolioData>({
        id: "",
        name: "",
        color: "",
        educations: [],
        experiences: [],
        projects: [],
        skills: [],
        categorie: {id: "" , name: "" , state: false}
    });
    const [modify, setModify] = useState<boolean>(false);
    const [value,setValue] = useState<string>('portfolio')
    
    return (
      <PortfolioContext.Provider value={{ value,setValue, dataPortfolioMod , setDataPortfolioMod, modify, setModify }}>
        {children}
      </PortfolioContext.Provider>
    );
  };
  
  export const useStateContext = () => useContext(PortfolioContext);
  