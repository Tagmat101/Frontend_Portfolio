
import React, {
    createContext,
    useContext,
    ReactNode,
    SetStateAction,
    Dispatch,
    useState,
    useCallback
  } from "react";
  
  interface StateContextType {
    modify:boolean;
    value: string;
    dataPortfolioMod: PortfolioData;
    dataPortfolioCrea: any;
    openPortCrea: boolean;
    setValue: Dispatch<SetStateAction<string>>;
    setDataPortfolioMod: Dispatch<SetStateAction<PortfolioData>>;
    setModify: Dispatch<SetStateAction<boolean>>;
    setDataPortfolioCrea: Dispatch<SetStateAction<any>>;
    setOpenPortCrea: Dispatch<SetStateAction<boolean>>;
  }
  
  export const PortfolioContext = createContext<StateContextType>({
    modify: false,
    value: 'portfolio' ,
    openPortCrea: false,
    dataPortfolioMod: {categorie: {id: "" , name: "" , state: false},id: "",visible: false,name: "", color: "" , educations: [],experiences: [] , projects: [],skills: [],resume: '',user: {name: '',email: '' , tel: ''}},
    dataPortfolioCrea: {},
    setModify: () => {},
    setDataPortfolioMod: () => {},
    setValue: () => {},
    setDataPortfolioCrea: () => {},
    setOpenPortCrea: () => {}
  });
  
  type ContextProviderProps = {
    children?: ReactNode;
  };
  
  export const ContextPortfolioProvider = ({ children }: ContextProviderProps) => {
    const [dataPortfolioMod, setDataPortfolioMod] = useState<PortfolioData>({
        id: "",
        name: "",
        visible: false,
        color: "",
        educations: [],
        experiences: [],
        projects: [],
        categorie: {id: "" , name: "" , state: false},
        resume: '',
        user: {email: '',name: '',tel: ''},
        skills: []
    });
    const [dataPortfolioCrea , setDataPortfolioCrea] = useState<any>({})
    const [modify, setModify] = useState<boolean>(false);
    const [value,setValue] = useState<string>('portfolio')
    const [openPortCrea , setOpenPortCrea] = useState<boolean>(false)
    return (
      <PortfolioContext.Provider value={{ openPortCrea, setOpenPortCrea, dataPortfolioCrea, setDataPortfolioCrea, value,setValue, dataPortfolioMod , setDataPortfolioMod, modify, setModify }}>
        {children}
      </PortfolioContext.Provider>
    );
  };
  
  export const useStateContext = () => useContext(PortfolioContext);
  