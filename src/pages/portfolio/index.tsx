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


// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Pencil, ViewAgenda } from 'mdi-material-ui'
import FormCreation from 'src/views/portfolio/FormCreation'
import ViewPortfolios from 'src/views/portfolio/ViewPortfolios'
import { PortfolioContext } from 'src/@core/context/PortfolioContext'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { useSettings } from 'src/@core/hooks/useSettings'

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

const Portfolio = () => {
  // ** State
  const {value,modify,setModify,setValue} = useContext(PortfolioContext)
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const theme = useSettings();
 console.log(value)
  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='portfolio tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='portfolio'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Pencil />
                <TabName>portfolio</TabName>
              </Box>
            }
          />
          <Tab
            value='view'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ViewAgenda />
                <TabName>view portfolios</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='portfolio'>  
          <FormCreation />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='view'>
          <ViewPortfolios  />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Portfolio
