// ** React Imports
import { ChangeEvent, MouseEvent, useState, SyntheticEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'
import { MenuItem } from '@mui/material'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import CardPortfolio from './CardPortfolio'
import { PortfolioData } from 'src/utils/interfaces/int'
import { GetAllPortfolios } from 'src/pages/api/PortfolioServices/Services'



const ViewPortfolios = () => {
  // ** States
  const [data,setData] = useState<PortfolioData[]>([])
  useEffect(() => {
     async function GetData() {
        const responsePortfolios = await GetAllPortfolios() 
        setData(responsePortfolios)
     }

     GetData()
  },[])

  return (
    <Grid container spacing={6} padding={10} >
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>View all</Typography>
      </Grid>
      {
        data.length > 0 && data.map((portfolio,index) => {
          return(
            <Grid key={index} item xs={12} sm={6} md={4}>
               <CardPortfolio portfolio={portfolio} />
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default ViewPortfolios
