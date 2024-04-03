import { Link } from "react-router-dom"

export const ProfileInfo = ()=>{
    const pfp = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
    return (
        <div className="flex flex-col items-center p-3 min-w-[300px] w-[300px] bg-black/20 rounded-xl self-start">
            <img src={pfp} alt="Profile Picture" className="w-[200px] rounded-full my-3 cursor-pointer border-2 hover:border-8 duration-800 hover:brightness-90 hover:transition-all"/>
            <span className="text-white font-bold text-2xl">Vivek</span>
            <div className="flex flex-wrap m-3 mt-6 bg-black/30 min-w-[95%] p-3 text-white rounded-xl">
                <div className="flex flex-wrap">
                    <strong className="mr-3">Tags : </strong>
                    <Tags tagName="Web Development"/><Tags tagName="C" /><Tags tagName="C++" /><Tags tagName="Python"/>
                </div>
            </div>
        </div>
    )
}

const Tags = (props)=>{
    return (
        <div className="flex w-fit text-gray-600 bg-white px-2 py-1 mx-1 mb-1 rounded-lg">
            <span className="font-semibold">{props.tagName}</span>
        </div>
    )
}

export const InterviewExperiencePost = ({data})=>{
    return (
        <div className='flex flex-col w-4/5'>
        <div className='bg-gray-200/90 mb-4 p-10 rounded-xl'>
          <h1 className='text-4xl font-bold text-green-700 '>{data.title}</h1>
          <hr className='border-2 my-6 border-green-800'/>
          <pre className='whitespace-pre-wrap font-mono'>{data.body}</pre>
        </div>
      </div>
    )
}