import { Link } from "react-router-dom"

const Signup = () => {
  return (
    <div className='flex flex-col p-[2rem] my-[2rem] w-[400px] text-white rounded-2xl bg-black/20 backdrop-blur-md border-white border-4'>
    <h3 className="font-bold text-2xl">Sign-Up</h3>
    <hr className="w-full h-1 mx-auto my-3 bg-black-100 border-2 rounded md:my-4"/>
    {/* <div className=' m-2 grid grid-cols-2 items-center w-full gap-4'> */}
    <div className='flex flex-col w-full text-white mt-2'>
      <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium">Email</label>
      <div className="relative mb-6">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
          </svg>
        </div>
        <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="name@gmail.com"/>
      </div>
      <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-white">Full Name</label>
      <div className="flex relative mb-6">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md">
          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
          </svg>
        </span>
        <input type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="Full Name"/>
      </div>
      <div className='relative mb-6'>
        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium  dark:text-white">Password</label>
        <input type="password" id="signup-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" />
      </div>
      <div className='relative mb-6'>
        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium  dark:text-white">Confirm Password</label>
        <input type="password" id="signup-confirm-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Confirm Password" />
      </div>
      <div className='relative mb-4 text-center'>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 uppercase">Sign up</button>
      </div>
      <small>Don&apos;t have an account? <Link className='underline text-green-500' to='/sign-in'>Sign-In</Link></small>
    </div>
  </div>
  )
}

export default Signup