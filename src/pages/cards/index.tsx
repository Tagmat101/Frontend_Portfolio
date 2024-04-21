// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardAppleWatch from 'src/views/cards/Helpers/CardAppleWatch'
import CardFacebook from 'src/views/cards/Helpers/CardFacebook'
import CardHorizontalRatings from 'src/views/cards/Helpers/CardHorizontalRatings'
import CardImgTop from 'src/views/cards/Helpers/CardImgTop'
import CardInfluencer from 'src/views/cards/Helpers/CardInfluencer'
import CardLinkedIn from 'src/views/cards/Helpers/CardLinkedIn'
import CardMembership from 'src/views/cards/Helpers/CardMembership'
import CardMobile from 'src/views/cards/Helpers/CardMobile'
import CardNavigation from 'src/views/cards/Helpers/CardNavigation'
import CardNavigationCenter from 'src/views/cards/Helpers/CardNavigationCenter'
import CardSupport from 'src/views/cards/Helpers/CardSupport'
import CardTwitter from 'src/views/cards/Helpers/CardTwitter'
import CardUser from 'src/views/cards/Helpers/CardUser'
import CardVerticalRatings from 'src/views/cards/Helpers/CardVerticalRatings'
import CardWithCollapse from 'src/views/cards/Helpers/CardWithCollapse'

// ** Demo Components Imports

const CardBasic = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Basic Cards</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardImgTop />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardUser />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardWithCollapse />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardMobile />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardHorizontalRatings />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardAppleWatch />
      </Grid>
      <Grid item xs={12} md={8}>
        <CardMembership />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardInfluencer />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardVerticalRatings />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSupport />
      </Grid>
      <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
        <Typography variant='h5'>Navigation Cards</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardNavigation />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardNavigationCenter />
      </Grid>
      <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
        <Typography variant='h5'>Solid Cards</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardTwitter />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardFacebook />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardLinkedIn />
      </Grid>
    </Grid>
  )
}

export default CardBasic
