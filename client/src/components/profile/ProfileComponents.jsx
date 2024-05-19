import { Link, useParams } from "react-router-dom"
import { useSelector} from "react-redux"
import { useState, useEffect } from "react"
import { updateSuccess } from '../../redux/user/userSlice'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, Avatar } from 'rsuite'
import { toast, Toaster }  from 'react-hot-toast'

export const ProfileInfo = ()=>{
    const [user, setUser] = useState({})
    const {currentUser} = useSelector(state=>state.user)
    const { id } = useParams();

    // console.log(id)

    const getProfileData = async (id)=>{
        try{
            const res = await fetch('/api/profile/getUserData', {
                method : 'POST',
                headers : { 
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({userId : id})
                })
                const data = await res.json()
                if(data.success === false){
                    toast.error("Failed to Fetch Profile!")
                    return
                }
                else{
                    setUser(data)
                }
            }
            catch(e){
                console.log(e);
            }
        }

    useEffect(()=>{
        if(id === currentUser._id){
            setUser(currentUser);
        }
        else{
            getProfileData(id)
        }
    },[currentUser,id])
    
    return (
        <div className="flex flex-col items-center p-3 min-w-[300px] max-w-[300px] bg-zinc-200 rounded-xl self-start">
            <img src={user?.profilePicture} alt="Profile Picture" className="w-[200px] rounded-full my-3 cursor-pointer border-2 hover:border-8 duration-800 hover:brightness-90 hover:transition-all"/>
            <span className="text-gray-600 font-bold text-2xl">{user?.fullName}</span>
            <div className="flex flex-col flex-wrap m-3 mt-6 gap-2 bg-black/30 min-w-[95%] p-3 text-white rounded-xl">
                <strong className=" ">LinkedIn : <Link to={`https://www.linkedin.com/in/${user?.linkedin}`} target="_blank" rel="noopener noreferrer" className="before:content-['@']">{user?.linkedin}</Link></strong>
                <div className="flex flex-wrap">
                    <strong className="mr-3">Tags : </strong>
                    {(user?.tags)?<Tags tagList={user?.tags}/>:<></>}
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

export const ProfileMain = ()=>{
    const {currentUser} = useSelector(state=>state.user)
    const { id } = useParams();
    return(
        <div className="">
            {
                (id == currentUser?._id+"")?
        
            <div className=" bg-gray-200 pt-5 rounded-xl">
                <MakeNewPost/>
            </div>:<></>

            }
            <div className="bg-gray-200 p-2 px-4 rounded-xl my-2">
                <ShowPosts />
            </div>
        </div>
    )
}

const MakeNewPost = ()=>{
    const [formData, setFormData] = useState({})

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.id] : e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const id = toast.loading("Creating Post...")
        const res = await fetch('/api/post/createPost', {
        method : 'POST',
        headers : { 
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData)
        })
        const data = await res.json()
        setFormData({})
        if(!data || data.success === false){
            toast.error((data?.message)?data.message:"Error Creating Post!", { id })
            return
        }else{
            toast.success((data?.message)?data.message:"Post Created!", { id })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col items-center p-3">
                <input type="text" id="postTitle" onChange={handleChange} placeholder="Title of the Post" className="my-2 size-xl p-2 border-solid border-4 w-[70%] border-gray-400 rounded-2xl"/>
                <textarea  id="postContent" onChange={handleChange} placeholder="Write a New Post!" cols="30" rows="2" className=" w-[70%] border-solid border-4 border-gray-400 rounded-2xl p-3"></textarea>
                <button className="my-3 bg-blue-500 text-white p-2 px-8 rounded-full flex">Post</button>
            </form>
        </>
    )
}


const Post = ({post}) =>{
    const pfp = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
    const {currentUser} = useSelector(state=>state.user)
    const [userData, setUserData] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [editedPost, setEditedPost] = useState({})
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
            if(!data || data.success === false){
                toast.error("Failed to Fetch Posts!")
                return 
            }
            return data;
        }
        catch(e){
            console.log(e)
        }
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

    const renderToggle = props => (
        <FontAwesomeIcon { ...props} className="text-gray-600 mx-1 px-2 hover:text-xl " icon={faEllipsisVertical} />
    );

    const handleChange = (e)=>{
        setEditedPost({...editedPost, [e.target.id] : e.target.value})
    }

    const handleInitEdit=()=>{
        const data = {
            userId : post?.userId,
            postId : post?._id,
            editedPostTitle : post?.postTitle,
            editedPostContent : post?.postContent
        }
        setEditedPost(data)
        setEditMode(!editMode)
    }
    const handleEditPost= async()=>{
        const data = {
            userId : post?.userId,
            postId : post?._id,
            postTitle : editedPost?.editedPostTitle,
            postContent : editedPost?.editedPostContent
        }

        try{
            const id = toast.loading("Updating Post...")
            const res = await fetch('/api/post/editPost', {
            method : 'POST',
            headers : { 
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data)
            })
            const r = await res.json()
            if(!r || r.success === false){
                toast.error((r?.message)?r.message:"Error Updating Post!", { id })
                return 
            }
            setEditMode(!editMode)
            setEditedPost({})
            toast.success((r?.message)?r.message:"Post Updated!", { id })
            return r;
        }
        catch(e){
            toast.error(e.message)
            console.log(e)
        }
    }

    const handleCancelEditPost = ()=>{
        setEditedPost({})
        setEditMode(false)
    }
    
    const handleDeletePost = async()=>{
        try{
            const id = toast.loading("Deleting Post...")
            const res = await fetch('/api/post/deletePost', {
            method : 'POST',
            headers : { 
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({postId : post?._id, userId : post?.userId})
            })

            const r = await res.json()
            if(r.success === false){
                toast.error((r?.message)?r.message:"Error Deleting Post!", { id })
                return 
            }
            setEditMode(false)
            setEditedPost({})
            toast.success((r?.message)?r.message:"Post Deleted!", { id })
            return r
        }
        catch(e){
            toast.error(e.message)
            // notify that update failed
            console.log(e)
        }
    }

    useEffect(()=>{ 
        getUserData(post.userId).then(res=>setUserData(res))
    },[post.userId])

    return (
        <div className="flex p-4 my-3 bg-gray-300 rounded-xl transition-all">
            <img src={userData?.profilePicture} alt="pic" className="w-14 h-14 mr-2 rounded-full border-4 border-blue-200 "/>
            <div className="flex flex-col pt-1 ml-1 w-[100%]">
                <div className="flex justify-between">
                    <Link to={`/profile/${userData._id}`}className="font-semibold"><span>{userData?.fullName}</span></Link>
                    <div className="flex items-center gap-5">
                        <small className="font-semibold text-gray-400">{formatDate(post?.createdAt)}</small>
                        {/* <small>sfd</small> */}
                        {
                            (post.userId == currentUser?._id+"")?
                            <Dropdown renderToggle={renderToggle} placement="bottomEnd" className="">
                                <Dropdown.Item style={{ width: 120 }}>
                                    <Link onClick={handleInitEdit} className="px-1">Edit Post</Link>
                                </Dropdown.Item>
                                <Dropdown.Item style={{ width: 120 }}>
                                    <Link onClick={handleDeletePost} className="px-1">Delete Post</Link>
                                </Dropdown.Item>
                            </Dropdown>:<></>

                        }
                    </div>
                </div>
                <hr className="my-2 border-t-2 border-gray-400" />
                <div className="flex flex-col max-w-[95%]">
                    {
                        (editMode)?
                        <>
                            <form className="flex flex-col items-center p-3">
                                <input type="text" id="editedPostTitle" onChange={handleChange} value={editedPost?.editedPostTitle} placeholder="Edit Post Title" className="my-2 size-xl p-2 border-solid border-4 w-[100%] border-gray-400 rounded-2xl"/>
                                <textarea id="editedPostContent" onChange={handleChange} placeholder="Edit Post Content..." cols="30" rows="2" className=" w-[100%] border-solid border-4 border-gray-400 rounded-2xl p-3">{editedPost?.editedPostContent}</textarea>
                            </form>
                        </>
                        :
                        <>
                            <h1 className="font-semibold mt-1 mb-3 text-xl text-wrap line-clamp-1">{post.postTitle}</h1>
                            <ReactMarkdown remarkPlugins={[remarkGfm]} className="whitespace-pre-wrap font-mono line-clamp-3 text-wrap">
                                {post.postContent}
                            </ReactMarkdown>
                        </>
                    }
                </div>
                {
                    (editMode)?
                    <>
                    <div className="flex gap-5 px-3">
                        <Link onClick={handleEditPost} className="flex items-center mt-4 mb-2 px-3 py-2 w-fit text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            Save Edit
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </Link>
                        <Link onClick={handleCancelEditPost} className="flex items-center mt-4 mb-2 px-3 py-2 w-fit text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            Cancel Edit
                        </Link>
                    </div>
                    </>
                    :
                    <>
                        <Link to={`/interview/${post._id}`} className="flex items-center mt-4 mb-2 px-3 py-2 w-fit text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            Full Post
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}

const ShowPosts = ()=>{

    const [posts, setPosts] = useState([]);
    const {id} = useParams()

    const fetchNewPosts = async (userId) => {
        try {
        const response = await fetch('/api/post/userPosts', {
            method : 'POST',
            headers : { 
              'Content-Type' : 'application/json',
            }, 
            body : JSON.stringify({ userId })
        });
        const newPosts = await response.json();
        
        // Update posts state with new posts
        if(newPosts && newPosts.length > 0)
            setPosts((prevPosts) => [...newPosts]);
        else 
            setPosts([])
            // setPosts(newPosts)
        } catch (error) {
            toast.error(error.message)
            console.error('Error fetching new posts:', error);
        }
    };

    useEffect(() => {
        fetchNewPosts(id)
        // Set up a timer to fetch new posts every 1 sec (adjust interval as needed)
        const timerId = setInterval(()=>fetchNewPosts(id), 1000); // 1 sec in milliseconds
    
        // Clean up timer on unmount
      return () => clearInterval(timerId);
    }, [id]);
    // Function to fetch new posts
    
    
    return (
        <>
        {
            posts?.map((post, index) =>(<Post post={post} key={index}/>))
        }
        </>
    )
}
