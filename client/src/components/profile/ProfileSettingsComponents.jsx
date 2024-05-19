import { useSelector, useDispatch} from "react-redux"
import { useState,useRef } from "react"
import { updateSuccess } from '../../redux/user/userSlice'
import { Link } from 'react-router-dom'
import { toast, Toaster }  from 'react-hot-toast'

export const ProfileSummary = ()=>{
  const {currentUser} = useSelector(state=>state.user)
  return (
      <div className='flex flex-col basis-3/12 min-w-[300px] p-4 bg-zinc-200 text-black rounded-xl items-center self-start'>
          <img src={ `${currentUser?.profilePicture}`} key={Date.now()}  alt="" className='w-[200px] h-[200px] border-8 border-solid border-blue-300 rounded-full object-cover'/>
          <span className="mt-3 font-semibold text-lg  uppercase">{currentUser?.fullName}</span>
          <div className="flex flex-col self-start gap-3 w-full mt-5 p-3 bg-black/30 text-white rounded-xl  ">
              <strong className=" ">Semester : {currentUser?.semester}</strong>
              <strong className=" ">LinkedIn : <Link to={`https://www.linkedin.com/in/${currentUser?.linkedin}`} target="_blank" rel="noopener noreferrer" className="before:content-['@']">{currentUser?.linkedin}</Link></strong>
              <div className="flex flex-wrap ">
                  <strong>Tags : </strong>
                  <Tags tagList={currentUser?.tags}/>
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


export const EditProfile = ()=>{
  const {currentUser} = useSelector(state=>state.user)
  
  const dispatch = useDispatch()
  const [imagePreview, setImagePreview] = useState(currentUser?.profilePicture)
  const [formData, setFormData] = useState({})


  const handlePfpChange = (e)=>{
    if(e.target.files && e.target.files[0]){
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, [e.target.id] : reader.result, fileType : e.target.files[0].type, fileExt : e.target.files[0].name.split('.').pop()}) // upload the image to backend
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setImagePreview(null);
      }
    }
  }

  
  const handleChange = (e)=>{
    setFormData({ ...formData, [e.target.id] : e.target.value})
  }
  
  // console.log(formData)  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    const id = toast.loading("Updating...")
    const res = await fetch('/api/profile/update', {
      method : 'POST',
      headers : { 
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(formData)
    })
    const data = await res.json()
    
    if(!data || data.success === false){
      toast.error((data?.message)?data.message:"Updation Failed!", { id })
      return
    }
    else{
      toast.success("Profile Updated", { id })
      dispatch(updateSuccess(data))
      // console.log(data)
    }

  }
    return(
        <div className='flex flex-col flex-1 basis-9/12 min-w-[500px] bg-zinc-200 rounded-xl p-3'>
            {/* <Toaster position='top-right' toastOptions={{duration: 2000}} /> */}

        <h1 className='m-5 mb-3 text-xl font-semibold text-zinc-700'>Update Profile Information</h1>
        <hr className="my-2 border-t-2 border-2 border-gray-400" />
        <form className='flex flex-col gap-3 p-4' onSubmit={handleSubmit}>
          <div className='flex items-center gap-5'>
            <div className="shrink-0">
              <img className="h-16 w-16 object-cover rounded-full border-4 border-solid border-blue-300" src={imagePreview} alt="Current profile photo" />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input type="file" id="profilePicture" className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              " onChange={handlePfpChange} accept="image/*"/>
            </label>
          </div>
          {/* <input type="file"  id="" className='' hidden/> */}
          <input type="text" onChange={handleChange} id="fullName" placeholder='Full Name' className='p-3 rounded-lg text-gray-800'/>
          {/* <input type="email" placeholder='Email' className='p-3 rounded-lg text-gray-800'/> */}
          {/* <input type="password" placeholder='Password' className='p-3 rounded-lg text-gray-800'/>                     */}
          <select id="semester" defaultValue={""} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 ">
            <option value={""} disabled>Semester</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
          <input type="text" onChange={handleChange} id="linkedin" placeholder='Enter your LinkedIn Username' className='p-3 rounded-lg text-gray-800'/>
          <textarea id="tags" rows="3" onChange={handleChange} placeholder='Input Comma Separate Tags like (C,C++,Java)' className="p-3 rounded-xl"></textarea>
          <>
            <button className='bg-blue-600 w-fit self-center text-white font-semibold text-md px-6 py-2 rounded-xl'>Update</button>
          </>
        </form>
      </div>
    )
}