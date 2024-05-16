import React from 'react'
// import { Carousel } from 'flowbite'
import { HomeCard } from '../components/HomeCompnents'
// import HomeCarousel from './HomeCarousel'

const Home = () => {
  return (
   <>
    {/* <HomeCarousel /> */}
    <div className=' grid grid-cols-2 gap-8 m-3 my-8'>
      <HomeCard url='/interview' img_url="https://www.glassdoor.com/employers/app/uploads/sites/2/2021/05/GoogleDrive_640X469_How-to-Improve-Your-Interview-Process-02.png" title="Interview Experiences" body="Read the latest Interview Experiences shared by Final Year Students..."/>
      <HomeCard url='/feed' img_url="https://www.healthbyprinciple.com/cdn/shop/articles/Connection_Blog_Big.jpg?v=1562700128" title="Explore the Timeline" body="Connect with peers and Seniors for their guidance and collaboration..."/>
      <HomeCard url='/notes' img_url="https://ddsa.in/wp-content/uploads/2021/07/study-material.jpeg" title="Access Study Material" body="Access the extensive catalog of handwritten study notes shared by students..."/>
      <HomeCard url='/pyq' img_url="https://images.deccanherald.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticleimages%2F2021%2F05%2F08%2Fexams-istock-983653-1620424355.png?w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop" title="Previous Year Questions" body="Access the catalog of Previous Year Question Papers of all semesters.."/>
    </div>
   </>
  )
}
export default Home