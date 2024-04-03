import { ProfileInfo, ProfileMain } from "../components/profile/ProfileComponents"

const Profile = () => {
  return (
    <div className="flex gap-4 max-w-7xl mt-3 mb-5">
      <div className="flex-1 flex w-full">
        <ProfileInfo/>
      </div>
      <div className="flex-2">
        <ProfileMain/>
      </div> 
    </div>
  )
}

export default Profile