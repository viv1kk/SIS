import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { toast, Toaster }  from 'react-hot-toast'
import { differenceInCalendarMonths } from "rsuite/esm/utils/dateUtils"

export const ProfileInfo = ({profileId})=>{
    const [profile, setProfile] = useState({})

    const getProfileData = async (id)=>{
        try{
            const res = await fetch('/api/profile/getUserData', {
                method : 'POST',
                headers : { 
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({userId : profileId})
                })
                const data = await res.json()
                if(!data || data.success === false){
                    console.log(data)
                    toast.error((data?.message)?data.message:"Error Fetching user data!")
                    return
                }
                return data
                    // console.log(id)
            }
            catch(e){
                toast.error((e.message)?e.message:"Error Fetching user data!")
                console.log(e);
            }
        }
        
    useEffect(()=>{
        if(profileId){
            getProfileData(profileId)
            .then(data=>{
                if(data) setProfile(data)
            })

        }
    })
    return (
        <div className="flex flex-col items-center p-3 max-w-[300px] max-w-[300px] bg-zinc-200 rounded-xl self-start">
            <img src={profile?.profilePicture} alt="Profile Picture" className="w-[200px] rounded-full my-3 cursor-pointer border-2 hover:border-8 duration-800 hover:brightness-90 hover:transition-all"/>
            <span className="text-gray-600 font-bold text-2xl">{profile?.fullName}</span>
            <div className="flex flex-col flex-wrap m-3 mt-6 gap-2 bg-black/30 min-w-[95%] p-3 text-white rounded-xl">
                <strong className=" ">LinkedIn : <Link to={`https://www.linkedin.com/in/${profile?.linkedin}`} target="_blank" rel="noopener noreferrer" className="before:content-['@']">{profile?.linkedin}</Link></strong>
                <div className="flex flex-wrap">
                    <strong className="mr-3">Tags : </strong>
                    {(profile?.tags)?<Tags tagList={profile?.tags}/>:<></>}
                </div>
            </div>
        </div>
    )
}

const Tags = (props)=>{
    return (
      props.tagList.map((m, index)=> (<Tag tag={m} key={index}/>))
    )
  }
  const Tag = (props)=>{
    return (
      <>
        <div className="flex w-fit text-gray-600 bg-white px-2 py-1 mx-1 mb-1 rounded-lg">
            <span className="font-semibold">{props.tag}</span>
        </div>
      </>
    )
  }

export const InterviewExperiencePost = ({data})=>{

    // console.log(JSON.parse(data))
    return (
        <div className='flex flex-col w-4/5'>
        <div className='bg-gray-200/90 mb-4 p-10 rounded-xl'>
          <h1 className='text-4xl font-bold text-green-700 '>{data.postTitle}</h1>
          <hr className='border-2 my-6 border-green-800'/>
          <ReactMarkdown className='whitespace-pre-wrap font-mono'>{data.postContent}</ReactMarkdown>
        </div>
      </div>
    )
}