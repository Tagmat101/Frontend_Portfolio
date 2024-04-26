// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended' 
import SchoolIcon from 'mdi-material-ui/School';
import BriefcaseOutline from 'mdi-material-ui/BriefcaseOutline'; 
import { Book, Folder } from 'mdi-material-ui'
import BookAlphabet from 'mdi-material-ui'
// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: 'Portfolio Settings',
      icon: AccountCogOutline,
      path: '/portfolio-settings'
    },
    {
      sectionTitle: 'My Personal Details'
    },
    {
      title: 'Project',
      icon: SchoolIcon,
      path: '/details/project'
    }, 
    {
      title: 'Education',
      icon: SchoolIcon,
      path: '/details/education'
    },  
    {
      title: 'Experience',
      icon: BriefcaseOutline,
      path: '/details/experience'
    }, 
    {
      sectionTitle: 'Portfolio details'
    },
    {
      title: 'Portfolio',
      icon: Folder,
      path: '/portfolio',
    },
    {
      title: 'Portfolio Categories',
      icon: Folder,
      path: '/categorie-portfolio',
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
