import { useParams } from 'react-router-dom'
import { ProfileInfo, InterviewExperiencePost } from '../components/interview/InterviewExperienceIndividualComponent';

const InterviewExperienceIndividual = () => {
    const params = useParams()
    let data = require('../dummy/data.json');
    data.forEach(element => {
      if (element.post_id === params.post_id){
        data = element
        return
      }
    });

  return (
    // <StickyScrollingLayout/>
    <div className='flex gap-4 w-4/5 pt-4 h-full'>
        <ProfileInfo/>
        <InterviewExperiencePost data={data}/>
    </div>
  )
}

export default InterviewExperienceIndividual