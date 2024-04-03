import { Link } from 'react-router-dom'

export const InterviewPostCard = (props) => {
  return (
    <div className='bg-zinc-200 p-7 m-2 rounded-xl'>
        <div className='flex justify-between text-zinc-500'>
            <div className='flex items-center '>
                <h1 className='bold text-2xl text-gray-800 my-2 font-bold'>{props.title}</h1>
                <span className="ml-4 before:content-['@']">
                    {props.author}
                </span>
            </div>
            <small>Mar 26, 2024</small>
        </div>
        <p className='mb-6 text-gray-700 line-clamp-2'>{props.body}</p>
        <Link to={"/interview/"+props.post_id} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Read More
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </Link>
    </div>
  )
}
