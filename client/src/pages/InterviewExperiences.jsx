import React from 'react'
import { useState, useEffect } from 'react'
import {InterviewPostCard} from '../components/interview/InterviewExperiencesComponents'

const InterviewExperiences = () => {

  const [posts, setPosts] = useState([]);
    // console.log(posts)
    const fetchNewPosts = async () => {
        try {
        const response = await fetch('/api/interview/getInterviewPostList', {
            method : 'POST',
            headers : { 
              'Content-Type' : 'application/json',
            }});
        const newPosts = await response.json();

        // Update posts state with new posts
        setPosts((prevPosts) => [...newPosts]);
        } catch (error) {
        console.error('Error fetching new posts:', error);
        }
    };
    useEffect(() => {
      fetchNewPosts()
      // Set up a timer to fetch new posts every 1 sec (adjust interval as needed)
      const timerId = setInterval(fetchNewPosts, 1000); // 1 sec in milliseconds
  
      // Clean up timer on unmount
      return () => clearInterval(timerId);
    }, []);
    // Function to fetch new posts
    

  return (
    <div className='flex flex-col mt-9 w-3/4'>
      {
        posts.map((post, key)=>{
          return (<InterviewPostCard postId={post._id} key={key} postTitle={post.postTitle} author={post.userId} postContent={post.postContent} timestamp={post.createdAt} />)
        })
      }
        
    </div>
  )
}

export default InterviewExperiences