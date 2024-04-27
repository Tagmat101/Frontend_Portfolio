// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Theme } from '@mui/material/styles';
import { useContext, useState } from 'react'
import { PortfolioContext } from 'src/@core/context/PortfolioContext'
import { DeletePortfolio } from 'src/pages/api/PortfolioServices/Services'
import { ThemeColor } from 'src/@core/layouts/types'
import Chip from '@mui/material/Chip';

interface CardPortfolioProps {
  portfolio: PortfolioData;
}
interface StatusObj {
  [key: string]: {
    color: ThemeColor;
  };
}

const statusObj: StatusObj = {
  public: { color: 'success' },
  private: { color: 'error' },
};


const CardPortfolio = ({ portfolio }: CardPortfolioProps) => {
  // ** States
  const {setModify,modify,setValue,setDataPortfolioMod} = useContext(PortfolioContext)
  // ** Functions 
  const handleModifyButton = () => {
    setModify(true)
    setValue('portfolio')
    setDataPortfolioMod(portfolio)
  }

  const handleDeleteButton = async () => {
      try
      {
        const response = await DeletePortfolio(portfolio.id)
        alert(response.data.message)
        document.location.reload()
      } catch(error:any) {
         console.log(error)
         alert(error.response.data.message)
      }
  }
  return (
    <Card>
      <div style={{ height: '9.375rem', backgroundColor: portfolio.color }} ></div>
      <CardContent sx={(theme: Theme) => ({ padding: `${theme.spacing(3)} ${theme.spacing(5.25)} ${theme.spacing(4)} !important` })}>
        <div style={{display: 'flex' , justifyContent: 'space-between'}}>
          <Typography variant='h6' sx={{ marginBottom: 2 }}>
            {portfolio?.name}
          </Typography>
            <Chip
              label={portfolio?.visible ? 'public' : 'private'}
              color={statusObj[portfolio?.visible ? 'public' : 'private'].color}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
              }}
            />
        </div>
        <Typography sx={{ marginBottom: 2 }}><span >Category : </span>{portfolio?.categorie.name}</Typography>
        <Button onClick={handleModifyButton}>Modify</Button>
        <Button>View portfolio</Button>
      </CardContent>
      <Button onClick={handleDeleteButton} variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        Delete
      </Button>
    </Card>
  )
}

export default CardPortfolio
