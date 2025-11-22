import ExploreBtn from "../Components/ExploreBtn"
import InfiniteCarousal from "../Components/InfiniteCarousal"
import GeneralLayout from "../Components/Layouts/GeneralLayout"
import GradientLayout from "../Components/Layouts/GradientLayout"
import UpcomingEvents from "./UpcomingEvents"

const Home = () => {
  return (
    <GeneralLayout>
      <GradientLayout Gradient={1}/>
        <h1 className="heading text-center mt-40">The Hub for Every <span className="text-bg-main">Dev</span><br /> Event You Can't Miss</h1>
        <p className="text-center md:mt-5 mt-2 poppins-regular text-sm text-[#ffffff98] md:text-lg">Hackathons, Meetups, and Conferences, All in One Place</p>
        <ExploreBtn />
        <div className="mt-20">
        <InfiniteCarousal />
        </div>
        <div className="p-10">
          <UpcomingEvents />
        </div>
    </GeneralLayout>
  )
}

export default Home