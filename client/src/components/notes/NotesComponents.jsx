import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom' 
// import {DownloadListitemComponent} from '../components/notes/NotesComponents';

export const UploadComponent = ()=>{
  const subject = useRef(null);
  const semester = useRef(null);
  const fileName = useRef(null);
  const fileDesc = useRef(null);

  const [sem, setSem] = useState('1');
  const [sub, setSub] = useState(null)
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({})

  const getSubjectData = async()=>{
    try{
      const res = await fetch('/api/data/getSubjectData', {
      method : 'POST',
      headers : { 
          'Content-Type' : 'application/json',
      }
      })
      const r = await res.json()
      // console.log(r)
      if(r.success === false){
          console.log("Failed to create the post!")
          return 
      }
      return r
    }
    catch(e){
        // notify that update failed
        console.log(e)
    }
  }
  useEffect(()=>{
    getSubjectData().then(x =>{
      let d = []
      x.forEach(element => {
        if (element.semester === parseInt(sem)){
          d = [...d, element]
        }
      });
      setData(d)
    })
  },[sem])

  useEffect(()=>{
    if(data && data.length>0)
      setSub(data[0].subjectCode)
  }, [data])

  useEffect(()=>{
    setFormData({...formData, subjectCode: sub})
  }, [sub])

  const handleSem = (e)=>{
    setSem(e.target.value);
  }
  const handleSub = (e)=>{
    setSub(e.target.value);
  }
  const handleFormChange = (e)=>{
    setFormData({...formData,  [e.target.id] : e.target.value})
  } 
  // console.log(formData)
  const handleDocumentLoading = (e)=>{
    let dataDoc = {}
    if(e.target.files && e.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      // console.log(e.target.files[0])
      reader.onloadend = () => {
        // console.log(reader.result)
        dataDoc = { ...dataDoc, 
          subjectCode : sub,
          fileName :  e.target.files[0].name.split('.').slice(0, -1).join('.'),
          fileExt  : e.target.files[0].name.split('.').pop(),
          fileDescription : "",
          fileType : e.target.files[0].type
        }
        dataDoc = {...dataDoc, [e.target.id] : reader.result}
        fileName.current.value = dataDoc.fileName
        fileDesc.current.value = dataDoc.fileDescription
        setFormData(dataDoc)
        // console.log(dataDoc)
      };
    }
  }

  const handleUploadSubmit = async()=>{
    if(!formData.fileData || !formData.fileType || !formData.subjectCode){
      alert("Error with data")
      return;
    }
    console.log(formData)
    const res = await fetch('/api/notes/uploadFile', {
      method : 'POST',
      headers : { 
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(formData)
    })

    const data = await res.json()
    if(data.success === false){
      // error uploading file
    }
    else{
      // file uploaded successfully
    }
  }

  return (
    <>
    <div className='flex justify-center gap-4'>
            <div className='w-full'>
                <label htmlFor="semester" className="block mb-2 text-sm font-medium text-gray-900 ">Select the Semester</label>
                <select onChange={(e)=>{handleSem(e)}} ref={semester} id="semester" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
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
                        data?.map((s, ind)=>(
                            <option value={s.subjectCode} key={s.subjectCode}>{`${s.subjectName} (${s.subjectCode})`}</option>
                        ))
                    }
                </select>
            </div>  
        </div>
        <div className='w-4/5 flex flex-col self-center my-7 border-2 border-gray-200 p-5'>
        <div className='flex flex-col items-center gap-5 justify-center'>
          <div className='flex flex-row items-center gap-3'>
            <label className="block">
              <span className="sr-only">Select Document File</span>
              <input onChange={handleDocumentLoading} type="file" id="fileData" className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              "  accept=".pdf,.doc,.docx,.zip,.ppt,.pptx"/>
            </label>
            <input type="text" ref={fileName} onChange={handleFormChange} id="fileName" className='border-2 border-solid rounded-md w-96 p-2 focus:outline-gray-400' placeholder='Rename the File (without extension)' />
          </div>
            <textarea ref={fileDesc} name="" onChange={handleFormChange} id="fileDescription" className=' w-3/4 border-solid border-2 border-gray-200 rounded-2xl p-3 focus:outline-gray-400' cols="30" rows="2"  placeholder="Describe the content inside the File, any suggestions (optional)"></textarea>
            <button onClick={handleUploadSubmit} className='inline-flex mt-2 text-md items-center px-3 py-2 font-medium text-center w-fit text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'>Confirm Upload</button>
          </div>
        </div>
    </>
  )
}



export const DownloadComponent = ()=>{
  const subject = useRef(null);
  const semester = useRef(null);
  
  const [sem, setSem] = useState('1');
  const [sub, setSub] = useState("")
  const [data, setData] = useState([])
  const [notesList, setNotesList] = useState([])

  const getSubjectData = async()=>{
    try{
      const res = await fetch('/api/data/getSubjectData', {
      method : 'POST',
      headers : { 
          'Content-Type' : 'application/json',
      }
      })
      const r = await res.json()
      // console.log(r)
      if(r.success === false){
          console.log("Failed to create the post!")
          return 
      }
      return r
    }
    catch(e){
        // notify that update failed
        console.log(e)
    }
  }

  const getNotesList = async()=>{
    try{
      const res = await fetch('/api/notes/getNotesList', {
      method : 'POST',
      headers : { 
          'Content-Type' : 'application/json',
      }, 
      body : JSON.stringify({subjectCode : sub})
      })
      const r = await res.json()
      // console.log(r)
      if(r.success === false){
          console.log("Failed to fetch the notes List!")
          return 
      }
      return r
    }
    catch(e){
        // notify that update failed
        console.log(e)
    }
  }


  useEffect(()=>{
    getSubjectData().then(x =>{
      let d = []
      x.forEach(element => {
        if (element.semester === parseInt(sem)){
          d = [...d, element]
        }
      });
      setData(d)
      if(d && d.length > 0){
        setSub(d[0].subjectCode)
      }
    })  
  },[sem])

  // console.log(data)
    useEffect(()=>{
      console.log("Now fetch the list from server")
      getNotesList().then(x =>{
        if(x && x.length > 0)
          setNotesList(x)
      })
    },[sub])


    const handleSem = (e)=>{
        setSem(e.target.value);
    }
    const handleSub = (e)=>{
        setSub(e.target.value);
    }

  return (
    <>
    <div className='flex justify-center gap-4'>
            <div className='w-full'>
                <label htmlFor="semester" className="block mb-2 text-sm font-medium text-gray-900 ">Select the Semester</label>
                <select onChange={(e)=>{handleSem(e)}} defaultValue={"1"} ref={semester} id="semester" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
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
                        data?.map((s, ind)=>(
                            <option value={s.subjectCode} key={s.subjectCode}>{`${s.subjectName} (${s.subjectCode})`}</option>
                        ))
                    }
                </select>
            </div>  
        </div>
        <div className=' w-11/12 flex flex-col gap-2 self-center my-7 border-2 border-gray-200 p-5 cursor-pointer'>
            { 
            // console.log(sub)
                notesList?.map((el, ind)=>(
                    <DownloadListitemComponent data={el} key={ind}/>
                ))
            }
        </div>
    </>
  )
}

const DownloadListitemComponent = ({data}) => {
  const ext = { 
    "pdf" : "https://media.istockphoto.com/id/1298834280/vector/pdf-icon-major-file-format-vector-icon-illustration.jpg?s=612x612&w=0&k=20&c=uA4lg3z8Od32TGuT6zOhMkEVJqH2kCE-_OI8ybalmac=",
    "doc" : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/.docx_icon.svg/2048px-.docx_icon.svg.png",
    "docx" : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/.docx_icon.svg/2048px-.docx_icon.svg.png",
    "zip" : "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/folder_zip.png",
    "ppt" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0MLmAYQ6_XXQEuuWXY741t3cZexe5fFBFUwtwgJWmGA&s",
    "pptx" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0MLmAYQ6_XXQEuuWXY741t3cZexe5fFBFUwtwgJWmGA&s"
  }
  return (
    <Link to={data.fileLink}>
    <div  className='flex flex-row justify-between items-center w-full p-5 hover:outline rounded-xl border-2 text-gray-600 outline-gray-200 shadow-sm hover:shadow-md'>
        <div className='flex items-center w-full'>
            <img className="inline w-14 mr-3" src={ext[data.fileExt]} alt="" />
            {/* <i className={`fa-solid fa-file-${data.fileExt} fa-2xl mr-3`}></i> */}
            <div className='flex flex-col w-full'>
              <span className="text-md mx-2 font-semibold">
                  {`${data.fileName}.${data.fileExt}`}
              </span>
              <p className='p-2 text-gray-500'>{data.fileDescription}</p>
              
            </div>
        </div>

    
    </div>    
    </Link>
  )
}