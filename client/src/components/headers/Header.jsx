import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="sticky z-20 top-0 start-0 relative bg-slate-200">
      <nav className="flex max-w-7xl items-center justify-between p-4 mx-auto text-gray-750">
        <div className="flex">
          <Link to='/'>
            <span className='self-center text-2xl font-semibold whitespace-nowrap'>Student Interaction System</span>
          </Link>
        </div>
        <div>
          <ul className="flex gap-9 font-semibold">
            <Link to='/'>
              <li className="hover:text-blue-700">Home</li>
            </Link>
            <Link to='/about'>
              <li className="hover:text-blue-700">About</li>
            </Link>
            <Link to='/contact'>
              <li className="hover:text-blue-700">Contact Us</li>
            </Link>
          </ul>
        </div>
        <div className="flex gap-3 items-center">
          <Link to='/sign-in' className="text-green-700 border-solid border-2 border-green-700 rounded-md px-3 p-1 hover:bg-green-700 hover:text-white" >
            <span className="font-semibold">Sign In</span>
          </Link>
          <Link to='/sign-up' className="bg-blue-500 border-2 border-solid border-blue-400 p-1 px-4 text-white rounded-md mx-2 hover:opacity-80">
            <span className="">Sign Up</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header