import { Link } from "react-router"

const ExploreBtn = () => {
  return (
    <div className="flex justify-center mt-10">
    <Link to='#events'><button className="button-rounded">Explore </button></Link>
    </div>
  )
}

export default ExploreBtn