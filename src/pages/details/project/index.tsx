 

// ** React Imports
import { SyntheticEvent, useContext, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card' 
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline' 

 
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css' 
import Stack from '@mui/material/Stack'
import Plus from 'mdi-material-ui/Plus'
import Button from '@mui/material/Button'
import { useProjectAll } from '@hooks/useProject';
import BriefcaseOutline from 'mdi-material-ui/BriefcaseOutline';
import CardProject from '@cards/CardProject';
import AddProject from '@modals/AddEdit_Project';
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
 
export default function project(){
  // ** State
  const { ProjectList, loading, error  }= useProjectAll();
   const { setOpenProject} = useContext(DetailsPortfolioContext); 
 
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreate =  () => {
    setOpenProject(true)
 };
  return (
    <Card>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' ,padding:"15px"}}>
 
           <Box sx={{ display: 'flex', alignItems: 'center' }}> 
              <BriefcaseOutline /> 
                <TabName>Project</TabName>
            </Box>  
            <Button variant="outlined" onClick={handleCreate} endIcon={<Plus />}> 
                <TabName>Add</TabName>
            </Button>  
        </div>
        <div>
      {ProjectList?.map((item:IProject, index: number) => (
          <CardProject key={index} projectData={item} />
      ))}
      
    </div>
 
    </Card>
  )
}

 