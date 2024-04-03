import { useState, useRef } from 'react'
import { ProfileSummary, EditProfile } from '../components/profile/ProfileSettingsComponents'

const ProfileSettings = () => {
    const [edit, setEdit] = useState(false)
    const viewProfile = useRef(null)
    const editProfile = useRef(null)
    
    const handleMenuOption = (e)=>{
        if(e.target.id === 'view-profile'){
            viewProfile.current.classList.add('text-green-400')
            editProfile.current.classList.remove('text-green-400')
            setEdit(false)
        }
        else{
            editProfile.current.classList.add('text-green-400')
            viewProfile.current.classList.remove('text-green-400')
            setEdit(true)
        }
    }
  return (
    <>
    <div className='flex gap-3 max-w-[80%] my-5'>
      <ProfileSummary />
      <EditProfile/>
    </div>
    </>
  )
}

export default ProfileSettings