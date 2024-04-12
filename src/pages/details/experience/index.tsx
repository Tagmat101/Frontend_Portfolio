import React from 'react'
 

import { useEducationAll } from 'src/@core/hooks/useEducation';
import EducationCard from '../../../views/cards/CardEducation';
 

// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card' 
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline' 

 
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import ArrowDownDropCircleOutline from 'mdi-material-ui/ArrowDownDropCircleOutline'
import Stack from '@mui/material/Stack'
import Plus from 'mdi-material-ui/Plus'
import School from 'mdi-material-ui/School'
import Button from '@mui/material/Button'
import { useExperienceAll } from 'src/@core/hooks/useExperience';
import BriefcaseOutline from 'mdi-material-ui/BriefcaseOutline';
import CardExperience from 'src/views/cards/CardExperience';
import AddEducationModal from 'src/views/modals/AddEducation';
import AddExperience from 'src/views/modals/AddExperience';

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
      {ExperienceList?.map((item:IExperience) => (
          <CardExperience  experienceData={item} />
      ))}
    </div>
    <AddExperience open={openModal} setOpen={setOpenModal}/>

    </Card>
  )
}

 