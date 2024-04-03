import React from 'react'
import {InterviewPostCard} from '../components/interview/InterviewExperiencesComponents'

const InterviewExperiences = () => {
  return (
    <div className='flex flex-col mt-9 w-3/4'>
        <InterviewPostCard post_id={1} title='Interview Experience At Google' author='Vivek Kohli' body="I am going to share the experience of the first interview of my life it was with Google so let's start I was quite nervous…" />
        <InterviewPostCard post_id={2} title='Interview Experience At Uber' author='XYZ' body="This Year around February Uber came to my college to hire htmlFor an SDE intern role. Uber team conducted coding around and asked 3 DSA…"/>
        <InterviewPostCard post_id={3} title='Barclays Interview Experience htmlFor BA3' author='XYZ' body="The company came to our campus in mid-August htmlFor the role of BA3. One of the most confusing things to clear here is BA3 role…"/>
    </div>
  )
}

export default InterviewExperiences