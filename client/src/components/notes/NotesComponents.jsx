export const DownloadListitemComponent = (props) => {
  return (
    <div className='flex flex-row justify-between items-center w-full p-5 hover:outline rounded-xl border-2 text-gray-600 outline-gray-200 shadow-md hover:shadow-xl'>
        <div className='flex items-center'>
            <img className="inline w-10 mr-3" src="https://i.pinimg.com/474x/3a/0d/51/3a0d510e8aff0312920ce1bcb5b022ac.jpg" alt="" />
            <span className="text-xl ms-2">
                {props.title}
            </span>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download</button>
    </div>    
  )
}