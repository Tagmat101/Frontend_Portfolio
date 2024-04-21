import React from 'react'
  
// ** React Imports
import {  useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card' 
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
 
 
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'  
import Plus from 'mdi-material-ui/Plus' 
import Button from '@mui/material/Button'
import { useExperienceAll } from '@hooks/useExperience';
import BriefcaseOutline from 'mdi-material-ui/BriefcaseOutline';
import CardExperience from '@cards/CardExperience'; 
import ActionExperienceModal from '@modals/AddEdit_Experience'; 

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
 
export default function experience(){
  // ** State
  const { ExperienceList, loading, error  }= useExperienceAll();
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
              <BriefcaseOutline /> 
                <TabName>Experience</TabName>
            </Box>  
            <Button variant="outlined" onClick={handleCreate} endIcon={<Plus />}> 
                <TabName>Add</TabName>
            </Button>  
        </div>
        <div>
      {ExperienceList?.map((item:IExperience, index: number) => (
          <CardExperience key={index} experienceData={item} />
      ))}
     
    </div>
    <ActionExperienceModal open={openModal} dataExperience={null} setOpen={setOpenModal}/>

    </Card>
  )
}

 