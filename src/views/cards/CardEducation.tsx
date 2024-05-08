// ** React Imports
import { MouseEvent, useState,useContext } from 'react'

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
import { Alert } from '@mui/material';

// ** Icons Imports
import Twitter from 'mdi-material-ui/Twitter'
import CartPlus from 'mdi-material-ui/CartPlus'
import Facebook from 'mdi-material-ui/Facebook'
import Linkedin from 'mdi-material-ui/Linkedin'
import GooglePlus from 'mdi-material-ui/GooglePlus'
import ShareVariant from 'mdi-material-ui/ShareVariant'
import Plus from 'mdi-material-ui/Plus'
import Pen from 'mdi-material-ui/Pen'
import Delete from 'mdi-material-ui/Delete'
 
import AddEdit_Education from "@modals/AddEdit_Education"
import {  DetailsPortfolioContext } from 'src/@core/context/PortfolioDetailsContext'
import { useEducation } from '@hooks/useDetails'
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
const EducationCard = ({ educationData }: { educationData: IEducation }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { message, loading, error ,deleteEducation} = useEducation();
 
  const { setDataEducationMod,setOpenEducation} = useContext(DetailsPortfolioContext); 
  
  const handleDeleteBtn =  () => {
     deleteEducation(educationData.id);
    window.location.reload(); 
  }
  const handleUpdate = () => {  
    setDataEducationMod(educationData)
    setOpenEducation(true)
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

        src={educationData.institutionLogo}
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
             
            <Box sx={{display:"flex",flexDirection:"row",marginBottom: 3.5}}>
            <Typography variant='body2'sx={{fontWeight: 'bold'}} >

                institution :
                </Typography> 
              {
                 <Typography variant='body2' sx={{fontWeight: 400 ,marginRight: 2}}>
                  {educationData.institution}
                </Typography>
              } 
              
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",marginBottom: 3.5}}>
            <Typography variant='body2'sx={{fontWeight: 'bold'}} >

                degree :
                </Typography> 
              {
                 <Typography variant='body2'>
                  {educationData.degree}
                </Typography>
              } 
              
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",marginBottom: 3.5}}>
            <Typography variant='body2'sx={{fontWeight: 'bold'}} >

                location :
                </Typography> 
              {
                 <Typography variant='body2'sx={{fontWeight: 400 ,marginRight: 2}}>
                  {educationData.location}
                </Typography>
              } 
              
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",marginBottom: 3.5}}>
            <Typography variant='body2'sx={{fontWeight: 'bold'}} >
                fieldOfStudy :
                </Typography> 
              {
                 <Typography variant='body2'sx={{fontWeight: 400 ,marginRight: 2}}>
                  {educationData.fieldOfStudy}
                </Typography>
              } 
              
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",marginBottom: 3.5}}>
                <Typography variant='body2'sx={{fontWeight: 'bold'}} >
                description :
                </Typography> 
              {
                 <Typography variant='body2' sx={{fontWeight: 400 ,marginRight: 2}}>
                  {educationData.description}
                </Typography>
              } 
              
            </Box>
            <Typography sx={{ fontWeight: 400, marginBottom: 3 ,display:"flex",flexDirection:"row" }} >
            <Box   sx={{ fontWeight: 400,paddingRight:"10px"}}>
            {formatDate(educationData.startDate)}  
            </Box>
   
              <Box component='span' sx={{ fontWeight: 400}}>
                 {formatDate(educationData.endDate)} 
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

export default EducationCard
 
