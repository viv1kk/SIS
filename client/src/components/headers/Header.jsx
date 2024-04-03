import { Link } from "react-router-dom"
import { Dropdown, Avatar } from 'rsuite'


const Header = () => {
  const logged = true
  const imgURL = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
  const renderToggle = props => (
    <Avatar circle {...props} src={imgURL}/>
  );

  return (
    <header className="sticky z-20 top-0 start-0 bg-slate-200">
      <nav className="flex max-w-7xl items-center p-3 mx-auto text-gray-750 my-0.5">
        <div className="flex flex-">
          <Link to='/'>
            <span className='self-center text-2xl font-semibold whitespace-nowrap'>Student Interaction System</span>
          </Link>
        </div>
        <div className="flex-auto">
          <ul className="flex gap-9 justify-center font-semibold">
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
          {
            logged?(
            <div className="mr-5 basis-32 gap-3 items-center">
              <Dropdown renderToggle={renderToggle} className="">
                <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
                  <p>Signed in as</p>
                  <strong>Vivek</strong>
                </Dropdown.Item>
                <Dropdown.Separator />
                <Link to='/profile'><Dropdown.Item>Your profile</Dropdown.Item></Link>
                <Dropdown.Separator />
                <Link to='/profile/settings'><Dropdown.Item>Profile Settings</Dropdown.Item></Link>
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
            ):(
              <div className="flex mr-5 basis-1/6 gap-3 items-center">
                <Link to='/sign-in' className="text-green-700 border-solid border-2 border-green-700 rounded-md px-3 p-2 hover:bg-green-700 hover:text-white" >
                  <span className="font-semibold">Sign In</span>
                </Link>
                <Link to='/sign-up' className="bg-blue-500 border-2 border-solid border-blue-400 p-2 px-4 text-white rounded-md mx-2 hover:opacity-80">
                  <span className="">Sign Up</span>
                </Link>
              </div>
            )
          }
        
      </nav>
    </header>
  )
}

export default Header