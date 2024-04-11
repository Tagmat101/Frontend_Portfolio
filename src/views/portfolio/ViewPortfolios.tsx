import { ChangeEvent, MouseEvent, useState, SyntheticEvent, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardPortfolio from '../cards/PortfolioCards/CardPortfolio'
import { PortfolioData } from 'src/utils/interfaces/int'
import { GetAllPortfolios } from 'src/pages/api/PortfolioServices/Services'
import { CircularProgress } from '@mui/material'

const ViewPortfolios = () => {
  const [data, setData] = useState<PortfolioData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true; // Track whether the component is mounted
  
    async function getData() {
      setLoading(true);
      try {
        const responsePortfolios = await GetAllPortfolios();
        if (isMounted) {
          setData(responsePortfolios);
          setLoading(false);
        }
      } catch (error) {
        // Handle errors if necessary
        console.error(error);
        setLoading(false);
      }
    }
  
    getData();
  
    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);
  

  return (
    <Grid container spacing={6} padding={10}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>View all</Typography>
      </Grid>
        {loading ? (
          <CircularProgress style={{marginLeft: '10px'}} size={24} />
        ) : (
          <>
            {data.length > 0 &&
              data.map((portfolio, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <CardPortfolio portfolio={portfolio} />
                </Grid>
              ))}
          </>
        )}
      
    </Grid>
  )
}

export default ViewPortfolios
