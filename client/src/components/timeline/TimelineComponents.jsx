import { Link } from "react-router-dom";

export const SearchField = ()=>{
    return (
        <div className='mb-2 p-4 bg-zinc-200 rounded-xl'>
            <form action="" className='flex gap-2 justify-center'>
                <input type="text" placeholder="Search a Person or a Post" className='border-2 border-gray-400 p-2 rounded-xl max-w-80 w-80'/>
                <button className='bg-blue-600 text-white font-semibold px-5 py-2 rounded-full'>Search</button>
                <button className='bg-blue-600 ml-5 text-white font-semibold px-5 py-2 rounded-full'>Timeline</button>
            </form>
        </div>
    )
}

export const SearchResult = ()=>{
    return (
        <div className='bg-zinc-200 my-2 rounded-xl p-4'>
            <h1 className='font-bold text-2xl text-gray-800 mx-3 my-4'>Search Results!</h1>
            <hr className="my-2 border-t-2 border-gray-400" />
            <div>
                <Post/>
            </div>
        </div>
    );
}

export const TimelineFeed = ()=>{
    return (
        <div className="bg-zinc-200 my-2 rounded-xl p-4">
            {/* <h1 className='font-bold text-2xl text-gray-800 mx-3 my-4'>Recent Feed!</h1>
            <hr className="my-2 border-t-2 border-gray-400" /> */}
            <div>
                <Post/>
            </div>        
        </div>
    )
}

const Post = () =>{
    const pfp = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"

    return (
        <div className="flex p-4 mb-2 bg-gray-300 rounded-xl">
            <img src={pfp} alt="pic" className="w-14 h-14 mr-2 rounded-full border-4 border-blue-200 "/>
            <div className="flex flex-col pt-1 ml-1 w-">
                <div className="flex justify-between">
                    <Link className="font-semibold"><span>USER</span></Link>
                    <small className="font-semibold text-gray-400">Mar 12, 2024</small>
                </div>
                <hr className="my-2 border-t-2 border-gray-400" />
                <div className="flex flex-col max-w-[95%]">
                    <h1 className="font-semibold mt-1 mb-3 text-xl text-wrap line-clamp-1">Lorem ipsum dolor sit amet consectetur at. Nihil corrupti laborum iure, ullam quos qui! Laborum saepe qui nulla neque error, temporibus at architecto reprehenderit nisi repellat aut itaque sit eius eaque non aliquam libero! Eaque quia maiores consequuntur quibusdam unde nisi distinctio animi.</h1>
                    <pre className="whitespace-pre-wrap font-mono line-clamp-3 text-wrap">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et voluptatibus ab porro officia dolorum, mollitia saepe nihil quia? Fugit delectus natus cupiditate alias, animi sunt ad corrupti dolore perspiciatis at ex numquam eius a earum itaque veritatis dolorem libero. Quasi suscipit laudantium harum eius magni dolorem dolor molestias fuga iusto, officiis modi vero impedit a dolores ipsam rerum veritatis sequi itaque non laboriosam fugit, delectus voluptatibus ratione. Unde vitae veniam delectus consequatur placeat hic tempora repellat deleniti voluptatum, nulla maxime, dolorem sint recusandae. Voluptate maxime et expedita aut voluptatibus dignissimos quas esse dolor repudiandae! Aut laborum vero commodi expedita a?
                    </pre>
                </div>
                <Link className="flex items-center mt-4 mb-2 px-3 py-2 w-fit text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Full Post
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>
    )
}


export const People = ()=>{
    return (
        <div>
            <h1 className="font-semibold ">You Might Know!</h1>
            <hr className="my-2 border-t-2 border-gray-400" />
            <Person/>
            <Person/><Person/>
            <Person/><Person/>
            <Person/><Person/>
            <Person/>
        </div>
    )
}

const Person = ()=>{
    const pfp = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
    return (
        <div className="flex justify-between items-center my-6">
            <div className="flex">
                <img src={pfp} alt="" className="w-12 h-12 rounded-full"/>
                <div className="flex flex-col ml-2">
                    <span className="font-bold">Vivek Kohli</span>
                    <small>vivek@gmail.com</small>
                </div>
            </div>
            <Link className="bg-zinc-600 text-white font-semibold px-3 py-2 rounded-full"><span>Profile</span></Link>
        </div>
    )
}