import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/headers/Header'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Anonymous from './components/route/Anonymous'
import AnonymousPageLayout from './components/layouts/AnonymousPageLayout'

const App = ()=>{
  return (
    <BrowserRouter>
        <AnonymousPageLayout>
        <Header/>
          <Routes>
            <Route element={<Anonymous />}>
                <Route path="/sign-in" element={<Signin />} />
                <Route path="/sign-up" element={<Signup />} />
            </Route>
          </Routes>
        </AnonymousPageLayout>
        
    </BrowserRouter>
  )
}

export default App
