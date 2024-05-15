import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";

// export const SearchField = ()=>{
//     return (
//         // <div className='mb-2 p-4 bg-zinc-200 rounded-xl'>
//         //     <form action="" className='flex gap-2 justify-center'>
//         //         <input type="text" placeholder="Search a Person or a Post" className='border-2 border-gray-400 p-2 rounded-xl max-w-80 w-80'/>
//         //         <button className='bg-blue-600 text-white font-semibold px-5 py-2 rounded-full'>Search</button>
//         //         <button className='bg-blue-600 ml-5 text-white font-semibold px-5 py-2 rounded-full'>Timeline</button>
//         //     </form>
//         // </div>
//     )
// }

export const SearchResult = ({posts})=>{
    return (
        <div className='bg-zinc-200 my-2 rounded-xl p-4'>
            <h1 className='font-bold text-2xl text-gray-800 mx-3 my-4'>Search Results!</h1>
            <hr className="my-2 border-t-2 border-gray-400" />
            <div>
                { posts.map((post, index)=> <Post post={post} key={index}/>)}
            </div>
        </div>
    );
}

export const TimelineFeed = ()=>{
    const[feed, setFeed] = useState({})

    const getTimelineFeed = async()=>{
        try {
        const response = await fetch('/api/feed/timeline', {
            method : 'POST',
            headers : { 
                'Content-Type' : 'application/json',
            }
            });
        const feed = await response.json();
            console.log(feed)
        // Update posts state with new posts
        setFeed(feed);
        } catch (error) {
            console.error('Error fetching new posts:', error);
        }  
    }

    useEffect(()=>{
        getTimelineFeed()
    },[])

    return (
        <div className="bg-zinc-200 my-2 rounded-xl p-4">
            {/* <h1 className='font-bold text-2xl text-gray-800 mx-3 my-4'>Recent Feed!</h1>
            <hr className="my-2 border-t-2 border-gray-400" /> */}
            <div>
                {(feed && feed.length > 0)?feed.map((post, index) => (<Post key={index} post={post} />)):<></> }
            </div>        
        </div>
    )
}

const Post = ({post}) =>{
    const [userData, setUserData] = useState({})
    // we need to get the user data who posted them using the userId in the post
    const getUserData = async(userId)=>{
        try{
            const res = await fetch('/api/profile/getUserData', {
            method : 'POST',
            headers : { 
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({userId})
            })
            const data = await res.json()
            if(data.success === false){
                console.log("Failed to create the post!")
                return 
            }
            return data;
        }
        catch(e){
            console.log(e)
        }
        // console.log(data)
    }
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
    useEffect(()=>{ 
            getUserData(post.userId).then(res=>setUserData(res))
    },[post?.userId])
    return (
        <div className="flex p-4 my-3 bg-gray-300 rounded-xl">
            <img src={userData?.profilePicture} alt="pic" className="w-14 h-14 mr-2 rounded-full border-4 border-blue-200 "/>
            <div className="flex flex-col pt-1 ml-1 w-[100%]">
                <div className="flex justify-between">
                    <Link to={`/profile/${userData?._id}`}className="font-semibold"><span>{userData?.fullName}</span></Link>
                    <small className="font-semibold text-gray-400">{formatDate(post?.createdAt)}</small>
                </div>
                <hr className="my-2 border-t-2 border-gray-400" />
                <div className="flex flex-col max-w-[95%]">
                    <h1 className="font-semibold mt-1 mb-3 text-xl text-wrap line-clamp-1">{post?.postTitle}</h1>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} className="whitespace-pre-wrap font-mono line-clamp-3 text-wrap">
                        {post?.postContent}
                    </ReactMarkdown>
                </div>
                <Link to={`/interview/${post?._id}`} className="flex items-center mt-4 mb-2 px-3 py-2 w-fit text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Full Post
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>
    )
}


export const People = ({data, searchToggle})=>{
    console.log(data)
    return (
        <div>
            
            <h1 className="font-semibold ">{(searchToggle)?"Search Results!":"You Might Know!"}</h1>
            <hr className="my-2 border-t-2 border-gray-400" />
            {
                data?.map((person, index) => <Person data={person} key={index}/>)
            }
            
        </div>
    )
}

const Person = ({data})=>{
    return (
        <div className="flex justify-between items-center my-6">
            <div className="flex">
                <img src={data.profilePicture} alt="" className="w-12 h-12 rounded-full"/>
                <div className="flex flex-col ml-2">
                    <span className="font-bold">{data.fullName}</span>
                    <small>{data.email}</small>
                </div>
            </div>
            <Link to={`/profile/${data._id}`} className="bg-zinc-600 text-white font-semibold px-3 py-2 rounded-full"><span>Profile</span></Link>
        </div>
    )
}