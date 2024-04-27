import {useState} from 'react' 
import Card from '@mui/material/Card' 
 import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent' 
import { styled } from '@mui/material/styles'

// ** MUI Imports 
import Button from '@mui/material/Button' 
import Grid, { GridProps } from '@mui/material/Grid' 
import Pen from 'mdi-material-ui/Pen'
import Delete from 'mdi-material-ui/Delete'
import { useDeleteSkill } from '@hooks/useSkill'
import AddEdit_Skill from '@modals/AddEdit_Skill'
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
export default function CardSkill({ skillData }: { skillData: ISkill }) {
  const { message, loading, error,handleDelete } = useDeleteSkill(skillData.id);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null) 
  const [openModal,setOpenModal] = useState(false)

  const open = Boolean(anchorEl) 
  const handleClose = () => {
    setAnchorEl(null)
  }
  
  const handleDeleteBtn = () => {
    handleDelete();
    window.location.reload(); 
  }
  const handleUpdate = () => {
    setOpenModal(true)
  }
  return (
   <Card>  
      <Grid container spacing={10}> 
        {
        skillData?.icon!=""
        &&
        <StyledGrid item md={5} xs={12}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img width={100} height={100} alt={skillData.name} src={skillData.icon} /> 
          </CardContent>
        </StyledGrid> 
        } 
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
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              {skillData.name}
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
            {skillData.type}            
            </Typography>
            <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>
              {skillData.category}  
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
    <AddEdit_Skill open={openModal} dataSkill={skillData} setOpen={setOpenModal}/>

  </Card> 
  )
}
