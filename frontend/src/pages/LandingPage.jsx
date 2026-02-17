import FeaturePageLanding from './FeaturesPageLanding'
import FooterPageLanding from './FooterPageLanding'
import MainPageLanding from './MainPageLanding'
import Navbar from './NavBarLanding'
import PricingPageLanding from './PricingPageLanding'
import Requirement from './Requirement'

const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      <MainPageLanding/>
      <FeaturePageLanding/>
      <PricingPageLanding/>
      <Requirement/>
      <FooterPageLanding/>
    </div>
  )
}

export default LandingPage
