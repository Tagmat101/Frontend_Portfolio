import { useState, useEffect } from 'react';
import { getCertificationAll, getCertificationByID,DeleteCertification } from '../../Api/CertificationService/Certification';  
 
 
export const useCertificationAll = () => {
  const [certificationList, setCertificationList] = useState<ICertification[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCertificationAll();
         setCertificationList(data);
         setLoading(false);
      } catch (error) {
         setError(error);
         setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { certificationList, loading, error};
};
 
export const useCertificationByID = (idCertification:string) => {
    const [CertificationData, setCertificationData] = useState<ICertification>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getCertificationByID(idCertification);
          setCertificationData(data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { CertificationData, loading, error };
  };
  export const useDeleteCertification= (id:String) => {
  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
    const [message, setMessage] = useState<String>();

  
      const handleDelete = async () => {
        try {
          const data = await DeleteCertification(id);
           setMessage(data);
           setLoading(false);
        } catch (error) {
           setError(error);
           setLoading(false);
        }
      };
   
  
    return { message, loading, error , handleDelete};
  };