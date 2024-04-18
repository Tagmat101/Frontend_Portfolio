
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
    dataCategorieMod: Categorie;
    setDataCategorieMod: Dispatch<SetStateAction<Categorie>>;
    setModify: Dispatch<SetStateAction<boolean>>;
  }
  
  export const CategorieContext = createContext<StateContextType>({
    modify: false,
    setModify: () => {},
    setDataCategorieMod: () => {},
    dataCategorieMod: { id: "" , name: "" , state: false},
  });
  
  type ContextProviderProps = {
    children?: ReactNode;
  };
  
  export const ContextCategorieProvider = ({ children }: ContextProviderProps) => {
    const [dataCategorieMod, setDataCategorieMod] = useState<Categorie>({
       id: "",
       name: "",
       state: false
    });
    const [dataCategories,setDataCategories] = useState<Categorie[]>([])
    const [modify, setModify] = useState<boolean>(false);
    
    return (
      <CategorieContext.Provider value={{  setDataCategorieMod, dataCategorieMod , modify, setModify }}>
        {children}
      </CategorieContext.Provider>
    );
  };
  
  export const useStateContext = () => useContext(CategorieContext);
  