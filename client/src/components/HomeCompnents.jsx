import { Link } from 'react-router-dom'

export const HomeCard = (props) => {
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl">
          <Link to={props.url}>
              <img className="rounded-t-lg w-full object-cover h-[190px]" src={props.img_url} alt="" />
          </Link>
          <div className="p-5">
              <Link to={props.url}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{props.title}</h5>
              </Link>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{props.body}</p>
              <Link to={props.url} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Go
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </Link>
          </div>
      </div>
    )
  }