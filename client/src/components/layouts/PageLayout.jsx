import Header from '../headers/Header'

export const AuthenticatedPageLayout = ({children}) => {
  return (
    <div className="w-full min-w-full max-h-full min-h-screen bg-[#FAF9F6]">
        {/* {children[0]} */}
        <Header/>
        <div className="flex flex-col items-center overflow-y-auto max-h-full min-h-screen">
          {/* { children.map((child, ind)=>{return ind!==0 && child})} */}
          {children}
        </div>
    </div>
  )
}

export const AnonymousPageLayout = ({children}) => {
    const bgImage = 'https://uat.dl.geu.ac.in/uploads/image/geu-campus-main-front-image.jpg'
    const layoutStyle = {
        backgroundImage: `url(${bgImage})`,
      };
    return (
    <div style={layoutStyle} className="w-full min-w-full min-h-dvh bg-cover">
        <Header/>
      <div className="flex flex-col items-center overflow-y-auto">
        {/* { children.map((child, ind)=>{return ind!==0 && child})} */}
        {children}
      </div>
    </div>
  )
}

export const IndependentPageLayout = ({children}) => {
  return (
    <div className="w-full min-w-full min-h-dvh bg-white">
        {/* {children[0]} */}
        <Header/>
        <div className="flex flex-col items-center overflow-y-auto">
          {/* { children.map((child, ind)=>{return ind!==0 && child})} */}
          {children}
        </div>
    </div>
  )
}
