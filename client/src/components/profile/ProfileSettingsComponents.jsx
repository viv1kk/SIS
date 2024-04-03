export const ProfileSummary = ()=>{
    const pfp = "https://media.licdn.com/dms/image/D4D03AQHWyPEOxAdvQQ/profile-displayphoto-shrink_800_800/0/1710451662974?e=1717632000&v=beta&t=ACYMVJQXq0B-0cfDNgEXfBH9KTSyFG_p41eNwZ45lhU"
    return (
        <div className='flex flex-col basis-3/12 min-w-[300px] p-4 bg-zinc-200 text-black rounded-xl items-center self-start'>
            <img src={pfp} alt="" className='w-[200px] h[200px] border-8 border-solid border-blue-300 rounded-full object-cover'/>
            <span className="mt-3 font-semibold text-lg  uppercase">Vivek Kohli</span>
            <div className="flex flex-col self-start gap-3 w-full mt-5 p-3 bg-black/30 text-white rounded-xl  ">
                <strong className=" ">Semester : </strong>
                <div className="flex flex-wrap ">
                    <strong>Tags : </strong>
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


export const EditProfile = ()=>{
    return(
        <div className='flex flex-col flex-1 basis-9/12 min-w-[500px] bg-zinc-200 rounded-xl p-3'>
        <h1 className='m-5 mb-3 text-xl font-semibold text-zinc-700'>Update Profile Information</h1>
        <hr className="my-2 border-t-2 border-2 border-gray-400" />
        <form className='flex flex-col gap-3 p-4'>
          <div className='flex items-center gap-5'>
            <div className="shrink-0">
              <img className="h-16 w-16 object-cover rounded-full border-4 border-solid border-blue-300" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input type="file" className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              "/>
            </label>
          </div>
          <input type="file"  id="" className='' hidden/>
          <input type="email" placeholder='Email' className='p-3 rounded-lg text-gray-800'/>
          <input type="password" placeholder='Password' className='p-3 rounded-lg text-gray-800'/>                    
          <select id="semester" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 ">
            <option selected value={null} disabled>Semester</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
          <textarea id=""  rows="3" placeholder='Input Comma Separate Tags like (C,C++,Java)' className="p-3 rounded-xl"></textarea>
          <>
            <button className='bg-blue-600 w-fit self-center text-white font-semibold text-md px-6 py-2 rounded-xl'>Update</button>
          </>
        </form>
      </div>
    )
}