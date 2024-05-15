import { SearchResult, TimelineFeed, People } from "../components/timeline/TimelineComponents"
import {useState, useEffect} from 'react'

const Timeline = () => {
  const [searchToggle, setSearchToggle] = useState(false)
  const [timelineToggle, setTimelineToggle] = useState(true)
  const [searchInput, setSearchInput] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [people, setPeople] = useState([]);

  const handleSearchInput = (e)=>{
    setSearchInput(e.target.value)
  }

  const handleSearch = async (e)=>{
    e.preventDefault();
    setSearchToggle(true)
    setTimelineToggle(false)

    const res = await fetch('/api/feed/search', {
      method : 'POST',
      headers : { 
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({ search : searchInput})
      })
      const data = await res.json()
      // setPeople(data)
      if(data.success === false){
          console.log("Failed to create the post!")
          return
      }
      else{
        setPeople(data.people);
        setSearchResult(data.post)
      }
  }

  const handleTimeline = (e)=>{
    e.preventDefault();
    getPeopleData()
    setSearchToggle(false)
    setTimelineToggle(true)
  }


  const getPeopleData = async ()=>{
    const res = await fetch('/api/feed/getPeopleData', {
      method : 'POST',
      headers : { 
          'Content-Type' : 'application/json',
        }
      })
      const data = await res.json()
      setPeople(data)
      if(data.success === false){
          console.log("Failed to create the post!")
          return
      }
  }

  useEffect(()=>{
    getPeopleData()
  },[])

  return (
    <div className='flex gap-4 min-w-[90%] max-w-[90%] my-4'>
        <div className='flex flex-col basis-9/12 self-start'>
            {/* <SearchField/> */}
            <div className='mb-2 p-4 bg-zinc-200 rounded-xl'>
              <form className='flex gap-2 justify-center'>
                  <input type="text" onChange={handleSearchInput} placeholder="Search a Person or a Post" className='border-2 border-gray-400 p-2 rounded-xl max-w-80 w-80'/>
                  <button type="button" onClick={handleSearch} className='bg-blue-600 text-white font-semibold px-5 py-2 rounded-full'>Search</button>
                  <button type="button" onClick={handleTimeline} className='bg-blue-600 ml-5 text-white font-semibold px-5 py-2 rounded-full'>Timeline</button>
              </form>
            </div>
            {(searchToggle)?<SearchResult posts={searchResult}/>:<></>}
            
            {(timelineToggle)?<TimelineFeed/>:<></>}
        </div>
        <div className='basis-3/12 bg-zinc-200 rounded-xl max-h-screen min-h-[200px] p-3 overflow-y-auto border-2 self-start'>
            <People data={people} searchToggle={searchToggle}/>
        </div>
        
    </div>
  )
}

export default Timeline