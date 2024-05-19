import { useFetcher, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ProfileInfo, InterviewExperiencePost } from '../components/interview/InterviewExperienceIndividualComponent';
import { toast, Toaster }  from 'react-hot-toast'

const InterviewExperienceIndividual = () => {
    const params = useParams()
    const [post, setPost] = useState({})

    const fetchPost = async (postId)=>{
      try {
        const response = await fetch('/api/interview/getPostById', {
            method : 'POST',
            headers : { 
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify({ postId })
          });
        const post = await response.json();
        if(!post)
          toast.error("Error fetching new posts")

        setPost(post);
        } catch (error) {
          toast.error("Error fetching new posts")

          console.error('Error fetching new posts:', error);
        }      
    }
  
    useEffect(()=>{
      const id = params.post_id
      fetchPost(id)
    }, [])

  return (
    // <StickyScrollingLayout/>
    <div className='flex gap-4 w-4/5 pt-4 h-full'>
        <ProfileInfo profileId={post.userId} />
        <InterviewExperiencePost data={post}/>
    </div>
  )
}

export default InterviewExperienceIndividual