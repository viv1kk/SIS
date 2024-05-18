import React, { useEffect, useRef, useState } from 'react'
import {UploadComponent, DownloadComponent} from '../components/pyq/pyqComponents';
import {Link} from 'react-router-dom'

const PYQ = () => {
    const subject = useRef(null);
    const semester = useRef(null);
    const year = useRef(null);
    
    const[uploadMode, setUploadMode] = useState(false)

    const handleUploadMode = ()=>{
        setUploadMode(!uploadMode)
    }

  return (
    <div className='flex flex-col bg-white p-9 my-9 w-4/5 rounded-xl h-max  shadow-2xl'>
        <h1 className='font-bold text-3xl text-gray-700 font-mono'>Access Previous Year Question Papers</h1>
        <hr className='border-2 my-5 border-black'/>
        <p className='text-xl text-gray-600'>Access the extensive catalog of Previous Year Question Papers for the current B.Tech curriculum.</p>
        <Link onClick={handleUploadMode} className="inline-flex mt-4 text-md items-center px-3 py-2 font-medium text-center w-fit text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          {
            (!uploadMode)?"Upload PYQs":"Download PYQs"
          }
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </Link>
        <hr className='border-2 my-10 border-gray-200'/>
        <div className='flex flex-col'>
        <div className='flex flex-col'>
            {
                (uploadMode)?<UploadComponent/>:<DownloadComponent/>
            }  
        </div>
        </div>
    </div>
  )
}

export default PYQ