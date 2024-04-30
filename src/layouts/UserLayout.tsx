// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'
// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'

// ** Component Import
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import { ContextPortfolioProvider } from 'src/@core/context/PortfolioContext'
import { ContextCategorieProvider } from 'src/@core/context/CategorieContext'
import { ContextPortfolioDetailsProvider } from 'src/@core/context/PortfolioDetailsContext'

import CategorieUCModal from '@modals/CategorieModals/CategorieUCModal'
import CategorieDModal from '@modals/CategorieModals/CategorieDModal'

import AddEdit_EducationModal from '@modals/AddEdit_Education'
import AddEdit_Experience from '@modals/AddEdit_Experience'
import AddEdit_Project from '@modals/AddEdit_Project'
import AddEdit_Skill from '@modals/AddEdit_Skill'

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const UpgradeToProImg = () => {
    return (
      <Box sx={{ mx: 'auto' }}>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://themeselection.com/products/materio-mui-react-nextjs-admin-template/'
        >
          <img width={230} alt='upgrade to premium' src={`/images/misc/upgrade-banner-${settings.mode}.png`} />
        </a>
      </Box>
    )
  }

  return (
    <ContextPortfolioDetailsProvider>
    <ContextPortfolioProvider>
      <ContextCategorieProvider> {/* Wrap UserLayout with ContextProvider */}
      <VerticalLayout
        hidden={hidden}
        settings={settings}
        saveSettings={saveSettings}
        verticalNavItems={VerticalNavItems()} // Navigation Items
        afterVerticalNavMenuContent={UpgradeToProImg}
        verticalAppBarContent={(
          props // AppBar Content
        ) => (
          <VerticalAppBarContent
            hidden={hidden}
            settings={settings}
            saveSettings={saveSettings}
            toggleNavVisibility={props.toggleNavVisibility}
          />
        )}
      >
        {children}
        {/* <UpgradeToProButton /> */}
        <CategorieUCModal />
        <CategorieDModal />
        <AddEdit_EducationModal/>
        <AddEdit_Experience/>
        <AddEdit_Project/>
        <AddEdit_Skill/>

      </VerticalLayout>
      </ContextCategorieProvider>
    </ContextPortfolioProvider> 
    </ContextPortfolioDetailsProvider>
  )
}

export default UserLayout
