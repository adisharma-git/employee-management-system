import FeaturePageLanding from './FeaturesPageLanding'
import FooterPageLanding from './FooterPageLanding'
import MainPageLanding from './MainPageLanding'
import Navbar from './NavBarLanding'
import PricingPageLanding from './PricingPageLanding'

const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      <MainPageLanding/>
      <FeaturePageLanding/>
      <PricingPageLanding/>
      <FooterPageLanding/>
    </div>
  )
}

export default LandingPage
