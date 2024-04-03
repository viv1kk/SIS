import { Link } from "react-router-dom"

export const ProfileInfo = ()=>{
    const pfp = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
    return (
        <div className="flex flex-col items-center p-3 min-w-[300px] w-[300px] bg-zinc-200 rounded-xl self-start">
            <img src={pfp} alt="Profile Picture" className="w-[200px] rounded-full my-3 cursor-pointer border-2 hover:border-8 duration-800 hover:brightness-90 hover:transition-all"/>
            <span className="text-gray-600 font-bold text-2xl">Vivek</span>
            <div className="flex flex-wrap m-3 mt-6 bg-black/30 min-w-[95%] p-3 text-white rounded-xl">
                <div className="flex flex-wrap">
                    <strong className="mr-3">Tags : </strong>
                    <Tags tagName="Web Development"/><Tags tagName="C" /><Tags tagName="C++" /><Tags tagName="Python"/>
                </div>
            </div>
        </div>
    )
}

const Tags = (props)=>{
    return (
        <div className="flex w-fit text-gray-600 bg-white px-2 py-1 mx-1 mb-1 rounded-lg">
            <span className="font-semibold">{props.tagName}</span>
        </div>
    )
}

export const ProfileMain = ()=>{
    return(
        <div className="">
            <div className=" bg-gray-200 pt-5 rounded-xl">
                <MakeNewPost/>
            </div>
            <div className="bg-gray-200 p-2 px-4 rounded-xl my-2">
                <ShowPosts />
            </div>
        </div>
    )
}

const MakeNewPost = ()=>{
    return (
        <>
            <form className="flex flex-col items-center p-3">
                <input type="text" placeholder="Title of the Post" className="my-2 size-xl p-2 border-solid border-4 w-[70%] border-gray-400 rounded-2xl"/>
                <textarea  id="" placeholder="Write a New Post!" cols="30" rows="2" className=" w-[70%] border-solid border-4 border-gray-400 rounded-2xl p-3"></textarea>
                <button className="my-3 bg-blue-500 text-white p-2 px-8 rounded-full flex">Post</button>
            </form>
        </>
    )
}


const Post = () =>{
    const pfp = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"

    return (
        <div className="flex p-4 my-3 bg-gray-300 rounded-xl">
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

const ShowPosts = ()=>{
    return (
        <>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </>
    )
}








