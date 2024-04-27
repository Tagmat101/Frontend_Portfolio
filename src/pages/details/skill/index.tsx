import {useState} from 'react'

import { useSkillAll } from '@hooks/useSkill'; 
import CardSkill from '@cards/CardSkill'; 
import AddEdit_Skill from '@modals/AddEdit_Skill'; 
// ** React Imports 

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card' 
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Import 
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css' 
import Plus from 'mdi-material-ui/Plus'
import School from 'mdi-material-ui/School'
import Button from '@mui/material/Button'

 
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))


export default function page(){
  // ** State
  const { skillList, loading, error } = useSkillAll();

   const [openModal,setOpenModal] = useState(false)
 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreate =  () => {
     setOpenModal(true)
  };
 
  return (
    <Card>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' ,padding:"15px"}}>
 
           <Box sx={{ display: 'flex', alignItems: 'center' }}> 
                <School />
                <TabName>Skill</TabName>
            </Box>  
            <Button variant="outlined" onClick={handleCreate} endIcon={<Plus />}> 
               Add 
            </Button>  
        </div>
        <div >
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-arround' ,padding:"15px"}}>
              {skillList?.map((item: ISkill, index: number) => (
                <CardSkill key={index} skillData={item} />
              ))} 
          </div>
    
    </div>
    <AddEdit_Skill open={openModal} dataskill={null} setOpen={setOpenModal}/>

    </Card>
  )
}

 