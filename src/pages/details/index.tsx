// ** React Imports
 
import { SyntheticEvent, useContext, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline' 
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import Education from 'src/views/details/Education'
import Experience from 'src/views/details/Experience'
import Project from 'src/views/details/Project'
import Skill from 'src/views/details/Skill'

import Button from '@mui/material/Button'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { School,BriefcaseOutline, Plus} from 'mdi-material-ui'  
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

const page = () => {
  // ** State
  const [value, setValue] = useState<string>('education')
  const { setOpenExperience,setOpenEducation,setOpenProject,setOpenSkill} = useContext(DetailsPortfolioContext); 
  
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const handleCreate =  () => {
    
    if(value=="education"){
      setOpenEducation(true)
    }
    else if(value=="experience"){
      setOpenExperience(true)
    }
    else if(value=="project"){
      setOpenProject(true)
    }
    else if(value=="skill"){
      setOpenSkill(true)
    }


  };

  return (
    <Card>
      <TabContext value={value}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' ,paddingX:"15px"}}>
            <TabList
              onChange={handleChange}
              aria-label='education tabs'
              sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            > 
                  <Tab
                    value='education'
                    label={ 
                      <Box sx={{ display: 'flex', alignItems: 'center' }}> 
                        <School />
                        <TabName>Education</TabName>
                      </Box>  
                    }
                  />
                  <Tab
                    value='experience'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BriefcaseOutline   />
                        <TabName>Experience</TabName>
                      </Box>
                    }
                  />
                   <Tab
                    value='project'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BriefcaseOutline   />
                        <TabName>Project</TabName>
                      </Box>
                    }
                  />
                   <Tab
                    value='skill'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BriefcaseOutline   />
                        <TabName>Skill</TabName>
                      </Box>
                    }
                  />
                  
            </TabList>
          <Box>
            <Tab value='add' label={
              // <Box sx={{ display: 'flex', alignItems: 'center' }}>
              //   <InformationOutline />
              //   <TabName>Add</TabName>
              // </Box>
                   <Button variant="outlined" onClick={handleCreate} endIcon={<Plus />}> 
                   Add 
                </Button>  
            } />
          </Box>
        </Box>
        <TabPanel sx={{ p: 0 }} value='education'>
          <Education />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='experience'>
          <Experience />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='project'>
              <Project />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='skill'>
          <Skill />
        </TabPanel>
        
       
     
              
           
           
        
      </TabContext>
       
    </Card>
  )
}

export default page
