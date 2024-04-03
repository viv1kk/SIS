import { SearchField, SearchResult, TimelineFeed, People } from "../components/timeline/TimelineComponents"

const Timeline = () => {
  return (
    <div className='flex gap-4 min-w-[90%] max-w-[90%] my-4'>
        <div className='flex flex-col basis-9/12 self-start'>
            <SearchField/>
            <SearchResult/>
            <TimelineFeed/>
        </div>
        <div className='basis-3/12 bg-zinc-200 rounded-xl max-h-screen min-h-[200px] p-3 overflow-y-auto border-2 self-start'>
            <People/>
        </div>
        
    </div>
  )
}

export default Timeline