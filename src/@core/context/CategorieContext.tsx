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
    modify: boolean;
    openCatDelete: boolean;
    dataCategorieMod: Categorie;
    openCatModal: boolean;
    idToDelete: string;
    setDataCategorieMod: Dispatch<SetStateAction<Categorie>>;
    setOpenCatDelete: Dispatch<SetStateAction<boolean>>;
    setModify: Dispatch<SetStateAction<boolean>>;
    setOpenCatModal: Dispatch<SetStateAction<boolean>>;
    setIdDelete: Dispatch<SetStateAction<string>>;
}

export const CategorieContext = createContext<StateContextType>({
    modify: false,
    openCatDelete: false,
    openCatModal: false,
    dataCategorieMod: { id: "", name: "", state: false },
    idToDelete: '',
    setIdDelete: () => {},
    setModify: () => {},
    setDataCategorieMod: () => {},
    setOpenCatDelete: () => {},
    setOpenCatModal: () => {}
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
    const [modify, setModify] = useState<boolean>(false);
    const [openCatModal, setOpenCatModal] = useState<boolean>(false);
    const [openCatDelete,setOpenCatDelete] = useState<boolean>(false);
    const [idToDelete,setIdDelete] = useState<string>('');
    return (
        <CategorieContext.Provider value={{ idToDelete, setIdDelete, openCatDelete,setOpenCatDelete, setOpenCatModal, openCatModal, setDataCategorieMod, dataCategorieMod, modify, setModify }}>
            {children}
        </CategorieContext.Provider>
    );
};

export const useStateContext = () => useContext(CategorieContext);
