// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'


import 'react-datepicker/dist/react-datepicker.css'
import { Pencil } from 'mdi-material-ui'
import FormCreation from 'src/views/categorie-settings/FormCreation'

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

const PortfolioSettings = () => {
  // ** State
  const [value, setValue] = useState<string>('categories')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='categories-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='categories'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Pencil />
                <TabName>Add a category</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='categories'>
            <FormCreation />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default PortfolioSettings
