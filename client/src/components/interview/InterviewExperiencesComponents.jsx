import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'

export const InterviewPostCard = (props) => {


  function formatDate(isoString) {
    const date = new Date(isoString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Pad the day with leading zero if necessary
    const paddedDay = day < 10 ? '0' + day : day;
    
    return `${month} ${paddedDay}, ${year}`;
  }

  const [author, setAuthor] = useState({});

  const fetchUserData = async () => {
    try {
    const response = await fetch('/api/profile/getUserData', {
        method : 'POST',
        headers : { 
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({ userId : props.author})
      });
    const userData = await response.json();
    return userData
    // Update posts state with new posts
    
    } catch (error) {
    console.error('Error fetching new posts:', error);
    }
  };

  useEffect((()=>{
    fetchUserData().then(userData=> setAuthor(userData))
    
    // console.log(userData)
  }),[])

  return (
    <div className='bg-zinc-200 p-7 m-2 rounded-xl'>
        <div className='flex justify-between text-zinc-500'>
            <div className='flex items-center max-w-[90%]'>
                <h1 className='bold text-2xl text-gray-800 my-2 font-bold truncate'>{props.postTitle}</h1>
                <span className="ml-4 before:content-['@']">
                    {author.fullName}
                </span>
            </div>
            <small>{formatDate(props.timestamp)}</small>
        </div>
        <p className='mb-6 text-gray-700 line-clamp-2'>{props.postContent}</p>
        <Link to={`/interview/${props.postId}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Read More
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </Link>
    </div>
  )
}
