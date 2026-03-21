import FeaturePageLanding from './FeaturesPageLanding'
import FooterPageLanding from './FooterPageLanding'
import MainPageLanding from './MainPageLanding'
import Navbar from './NavBarLanding'
import PricingPageLanding from './PricingPageLanding'
import Requirement from './Requirement'
import ReviewsHome from './ReviewHome'
import CostFilter from './CostFilter'

const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      <MainPageLanding/>
      <FeaturePageLanding/>
      <PricingPageLanding/>
      <CostFilter/>
      <Requirement/>
      <ReviewsHome/>
      <FooterPageLanding/>
    </div>
  )
}

export default LandingPage
