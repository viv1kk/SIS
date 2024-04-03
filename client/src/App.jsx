import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthenticatedRoute, AnonymousRoute, IndependentRoute } from './components/route/RouteElement'

import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import ProfileSettings from './pages/ProfileSettings'
import InterviewExperiences from './pages/InterviewExperiences'
import InterviewExperienceIndividual from './pages/InterviewExperienceIndividual'
import Notes from './pages/Notes'
import PYQ from './pages/PYQ'
import Timeline from './pages/Timeline'

const App = ()=>{
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AnonymousRoute />}>
          <Route path="/" element={<Signin />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>
      </Routes>
      <Routes>
        <Route element={<AuthenticatedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/settings" element={<ProfileSettings />} />
            <Route path="/interview" element={<InterviewExperiences />} />
            <Route path='/interview/:post_id' element={<InterviewExperienceIndividual/>}/>
            <Route path="/notes" element={<Notes />} />
            <Route path="/pyq" element={<PYQ />} />
            <Route path="/feed" element={<Timeline />} />
        </Route>
      </Routes>
      <Routes>
        <Route element={<IndependentRoute />}>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
