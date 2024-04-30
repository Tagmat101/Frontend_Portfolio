import React, { useContext } from 'react'
  
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
import { useExperience } from '@hooks/useDetails';
import BriefcaseOutline from 'mdi-material-ui/BriefcaseOutline';
import CardExperience from '@cards/CardExperience'; 
import ActionExperienceModal from '@modals/AddEdit_Experience'; 
import { DetailsPortfolioContext } from 'src/@core/context/PortfolioDetailsContext'

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
  const { experienceList, loading, error  }= useExperience();
   const { setOpenExperience} = useContext(DetailsPortfolioContext); 


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreate =  () => {
    setOpenExperience(true)
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
      {experienceList?.map((item:IExperience, index: number) => (
          <CardExperience key={index} experienceData={item} />
      ))}
     
    </div>
 
    </Card>
  )
}

 