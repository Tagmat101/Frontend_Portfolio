
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
    idPortfolio: string;
    dataPortfolioCrea: any;
    openPortCrea: boolean;
    setValue: Dispatch<SetStateAction<string>>;
    setModify: Dispatch<SetStateAction<boolean>>;
    setDataPortfolioCrea: Dispatch<SetStateAction<any>>;
    setOpenPortCrea: Dispatch<SetStateAction<boolean>>;
    setIdPortfolio: Dispatch<SetStateAction<string>>;
  }
  
  export const PortfolioContext = createContext<StateContextType>({
    modify: false,
    value: 'portfolio' ,
    openPortCrea: false,
    dataPortfolioCrea: {},
    idPortfolio: '',
    setModify: () => {},
    setValue: () => {},
    setDataPortfolioCrea: () => {},
    setOpenPortCrea: () => {},
    setIdPortfolio: () => {}
  });
  
  type ContextProviderProps = {
    children?: ReactNode;
  };
  
  export const ContextPortfolioProvider = ({ children }: ContextProviderProps) => {
    const [idPortfolio, setIdPortfolio] = useState<string>('')
    const [dataPortfolioCrea , setDataPortfolioCrea] = useState<any>({})
    const [modify, setModify] = useState<boolean>(false);
    const [value,setValue] = useState<string>('portfolio')
    const [openPortCrea , setOpenPortCrea] = useState<boolean>(false)
    return (
      <PortfolioContext.Provider value={{ idPortfolio,setIdPortfolio, openPortCrea, setOpenPortCrea, dataPortfolioCrea, setDataPortfolioCrea, value,setValue, modify, setModify }}>
        {children}
      </PortfolioContext.Provider>
    );
  };
  
  export const useStateContext = () => useContext(PortfolioContext);
  