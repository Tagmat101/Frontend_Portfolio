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
    async function getData() {
      setLoading(true)
      const responsePortfolios = await GetAllPortfolios()
      setData(responsePortfolios)
      setLoading(false)
    }

    getData()
  }, [])

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
