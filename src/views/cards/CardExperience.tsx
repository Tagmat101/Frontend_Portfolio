// ** React Imports
import { MouseEvent, useContext, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid, { GridProps } from '@mui/material/Grid'

// ** Icons Imports
import Twitter from 'mdi-material-ui/Twitter'
import CartPlus from 'mdi-material-ui/CartPlus'
import Facebook from 'mdi-material-ui/Facebook'
import Linkedin from 'mdi-material-ui/Linkedin'
import GooglePlus from 'mdi-material-ui/GooglePlus'
import ShareVariant from 'mdi-material-ui/ShareVariant'
import Pen from 'mdi-material-ui/Pen'
import Delete from 'mdi-material-ui/Delete'
import { useDeleteExperience } from 'src/@core/hooks/useExperience'
import AddEdit_Experience from "@modals/AddEdit_Experience"
import { DetailsPortfolioContext } from 'src/@core/context/PortfolioDetailsContext'
import { useExperience } from '@hooks/useDetails'
// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))
function formatDate(date: string): string { 
  return date.split('T')[0];
}
export default function CardExperience ({ experienceData }: { experienceData: IExperience }) {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { message, loading, error,deleteExperience } = useExperience();
  
  const { setDataExperienceMod,setOpenExperience} = useContext(DetailsPortfolioContext); 
  const handleDeleteBtn =() => {
     deleteExperience(experienceData.id);
    window.location.reload(); 
  }
  const handleUpdate = () => {  
    setDataExperienceMod(experienceData)
    setOpenExperience(true)
  }

  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
 
 

  return (
    <Card sx={{margin:"10px"}}>
      <Grid container spacing={6}>
      <StyledGrid  md={3} >
       
       {/* <img width={137} height={176} alt='Apple iPhone 11 Pro' src='/images/cards/iPhone-11-pro.png' /> */}
       <img
       style={{ width: '100%', height: '100%', objectFit: 'contain' }}
       src={experienceData.companyLogo}
     />           
 
   </StyledGrid>
      
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
            paddingLeft: ['1.5rem !important', '1.5rem !important', '0 !important']
          }}
        >
          <CardContent>
           
            
             <Box sx={{fontWeight: 400,display:"flex",flexDirection:"row",marginBottom: 3.5}}>
                <Typography variant='body2'  sx={{fontWeight: 'bold'}}>
                job Title :
                </Typography> 
              {
                 <Typography variant='body2'>
                  {experienceData.jobTitle}
                </Typography>
              } 
              
            </Box>
             <Box sx={{dfontWeight: 400,display:"flex",flexDirection:"row",marginBottom: 3.5}}>
                <Typography variant='body2' sx={{fontWeight: 'bold'}} >
                company Name :
                </Typography> 
              {
                 <Typography variant='body2'>
                  {experienceData.companyName}
                </Typography>
              } 
              
            </Box>
            
             <Box sx={{ display:"flex",flexDirection:"row",marginBottom: 3.5}}>
                <Typography variant='body2'  sx={{fontWeight: 'bold' }}>
                employment Type :
                </Typography> 
              {
                 <Typography variant='body2' sx={{fontWeight: 400}}>
                 {experienceData.employmentType}
                </Typography>
              } 
              
            </Box>
            <Box sx={{ display:"flex",flexDirection:"row",marginBottom: 3.5}}>
                <Typography variant='body2'  sx={{fontWeight: 'bold'}}>
                responsibilities :
                </Typography> 
              {
                experienceData.responsibilities.map((item, index) => (
                  <Typography key={index} variant='body2'  sx={{fontWeight: 400 ,marginRight: 2}}>
                    {item}
                  </Typography> 
                ))
              } 
              
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",marginBottom: 3.5 }}>
                <Typography variant='body2'  sx={{fontWeight: 'bold'}}>
                achievements :
                </Typography> 
              {
                experienceData.achievements.map((item, index) => (
                  <Typography key={index} variant='body2' sx={{fontWeight: 400 ,marginRight: 2}}>
                    {item}
                  </Typography> 
                ))
              } 
              
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",marginBottom: 3.5 }}>
                <Typography variant='body2' sx={{fontWeight: 'bold'}}>
                skills :
                </Typography> 
              {
                experienceData.skills.map((item, index) => (
                  <Typography key={index} variant='body2' sx={{fontWeight: 400 ,marginRight: 2}}>
                    {item.name}
                  </Typography> 
                ))
              } 
              
            </Box>
            <Typography sx={{ fontWeight: 400, marginBottom: 3 ,display:"flex",flexDirection:"row" }} >
            <Box   sx={{ fontWeight: 400,paddingRight:"10px"}}>
            {formatDate(experienceData.startDate)}  
            </Box>
   
              <Box component='span' sx={{ fontWeight: 400}}>
                 {formatDate(experienceData.endDate)} 
              </Box>
            </Typography>
          </CardContent>
           
        </Grid>
      </Grid>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
   
        <Button onClick={handleUpdate}>
                <Pen fontSize='medium' sx={{ marginRight: 2 }} />
            
          </Button> 
        <Button onClick={handleDeleteBtn}>
                <Delete fontSize='medium' sx={{ marginRight: 2 }} /> 
        </Button>
      </div>
 
    </Card>
  )
}
 
