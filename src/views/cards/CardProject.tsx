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
import { useProject } from '@hooks/useDetails'
import AddEdit_Project from "@modals/AddEdit_Project"
import { DetailsPortfolioContext } from 'src/@core/context/PortfolioDetailsContext'

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
export default function CardProject ({ projectData }: { projectData: IProject }) {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null) 
  const { setOpenProject,setDataProjectMod} = useContext(DetailsPortfolioContext); 
 
    const { loading, error,message,deleteProject } = useProject(); 
 
  
    const handleDeleteBtn = () => {
       deleteProject(projectData.id);
      window.location.reload(); 
    }
  
  const handleUpdate = () => {  
    setDataProjectMod(projectData)
    setOpenProject(true)
  }

  const open = Boolean(anchorEl) 
 
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
 
 
  
  return (
    <Card sx={{  maxHeight: '30%',margin:"10px"}}>  
    <Grid container spacing={6}>
        <StyledGrid  md={3} >
       
            {/* <img width={137} height={176} alt='Apple iPhone 11 Pro' src='/images/cards/iPhone-11-pro.png' /> */}
            <img  style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
            src={projectData.media[0]}
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

                name :
                </Typography> 
              {
                 <Typography variant='body2'>
                     {projectData.name}
                </Typography>
              } 
              
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",marginBottom: 3.5}}>
            <Typography variant='body2'sx={{fontWeight: 'bold'}} >

            description :
                </Typography> 
              {
                 <Typography variant='body2'>
                     {projectData.description}
                </Typography>
              } 
              
            </Box>
            
           
            <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>
            {formatDate(projectData.startDate)} -   
              <Box component='span' sx={{ fontWeight: 'bold' }}>
               {formatDate(projectData.endDate)}
              </Box>
            </Typography>

            <Box sx={{display:"flex",flexDirection:"row",marginBottom: 3.5}}>
                <Typography variant='body2' >
                responsibilities :
                </Typography> 
              {
                projectData.responsibilities.map((item, index) => (
                  <Typography key={index} variant='body2' sx={{marginRight: 2}}>
                    {item}
                  </Typography> 
                ))
              } 
              
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",marginBottom: 3.5 }}>
                <Typography variant='body2' >
                achievements : 
                </Typography> 
              {
                projectData.achievements.map((item, index) => (
                  <Typography key={index} variant='body2'  sx={{marginRight: 2}}>
                    {item}
                  </Typography> 
                ))
              } 
              
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",marginBottom: 3.5 }}>
                <Typography variant='body2' >
                skills : 
                </Typography> 
              {
                projectData.skills.map((item, index) => (
                  <Typography key={index} variant='body2' sx={{marginRight: 2}}>
                    {item.name}
                  </Typography> 
                ))
              } 
              
            </Box>
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
 
