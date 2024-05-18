import React, { useEffect, useRef, useState } from 'react'
import {DownloadComponent, UploadComponent} from '../components/notes/NotesComponents';
import {Link} from 'react-router-dom'

const Notes = () => {
    const[uploadMode, setUploadMode] = useState()

    const handleUploadMode = ()=>{
        setUploadMode(!uploadMode)
    }

  return (
    <div className='flex flex-col bg-white p-9 my-9 w-4/5 rounded-xl h-max shadow-2xl'>
        <h1 className='font-bold text-3xl text-gray-700 font-mono'>Access Study Material</h1>
        <hr className='border-2 my-5 border-black'/>
        <p className='text-xl text-gray-600'>Access the extensive catalog of handwritten self-study and lecture notes shared by students for the latest B.Tech curriculum.</p>
        <Link onClick={handleUploadMode} className="inline-flex mt-4 text-md items-center px-3 py-2 font-medium text-center w-fit text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          {
            (!uploadMode)?"Upload Your Notes":"Download Notes"
          }
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </Link>
        <hr className='border-2 my-8 border-gray-200'/>
        <div className='flex flex-col'>
            {
                (uploadMode)?<UploadComponent/>:<DownloadComponent/>
            }  
        </div>
    </div>
  )
}

export default Notes