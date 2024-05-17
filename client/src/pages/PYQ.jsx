import React, { useEffect, useRef, useState } from 'react'
import {DownloadListitemComponent} from '../components/pyq/pyqComponents';

const PYQ = () => {
    const subject = useRef(null);
    const semester = useRef(null);
    
    const [sem, setSem] = useState('1');
    const [sub, setSub] = useState(null)
    const [data, setData] = useState(require('../dummy/pyq.json'))

    useEffect(()=>{
        let x = require('../dummy/pyq.json')
        x.forEach(element => {
            if (element.semester === sem){
              setData(element)
              return;
            }
          });
    },[sem])
    useEffect(()=>{
        let x = require('../dummy/pyq.json')
        x.forEach(element => {
            if (element.semester === sem){
              setSub(element.subjects[0])
              return;
            }
          });
    },[sem])


    const handleSem = (e)=>{
        setSem(e.target.value);
    }
    const handleSub = (e)=>{
        setSub(e.target.value);
    }

  return (
    <div className='flex flex-col bg-white p-9 my-9 w-4/5 rounded-xl h-max  shadow-2xl'>
        <h1 className='font-bold text-3xl text-gray-700 font-mono'>Access Previous Year Question Papers</h1>
        <hr className='border-2 my-5 border-black'/>
        <p className='text-xl text-gray-600'>Access the extensive catalog of Previous Year Question Papers for the current B.Tech curriculum.</p>
        <hr className='border-2 my-10 border-gray-200'/>

        <div className='flex flex-col'>

        <div className='flex justify-center gap-4'>
            <div className='w-full'>
                <label htmlFor="semester" className="block mb-2 text-sm font-medium text-gray-900">Select the Semester</label>
                <select onChange={(e)=>{handleSem(e)}} ref={semester} id="semester" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                    <option value="7">Semester 7</option>
                    <option value="8">Semester 8</option>
                </select>
            </div>
            <div className='w-full'>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Select the Subject</label>
                <select ref={subject} id="subject" onChange={(e)=>{handleSub(e)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {
                        data?.subjects?.map((s, ind)=>(
                            <option value={s} key={ind}>{s}</option>
                        ))
                    }
                </select>
            </div>
            <div className='w-full'>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Select the Year</label>
                <select ref={subject} id="subject" onChange={(e)=>{handleSub(e)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {
                        
                        data?.subjects?.map((s, index)=>(
                            <option value={2016+index} key={index}>{2016+index}</option>
                        ))
                    }
                </select>
            </div>   
        </div>
        <div className='w-4/5 flex flex-col self-center my-7 border-2 border-gray-200 p-5'>
            { 
            // console.log(sub)
                data[sub]?.map((el, ind)=>(
                    <DownloadListitemComponent title={el} key={ind}/>
                ))
            }
        </div>
    </div>
    </div>
  )
}

export default PYQ