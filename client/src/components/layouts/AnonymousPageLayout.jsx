

const AnonymousPageLayout = ({children}) => {
    const bgImage = 'https://uat.dl.geu.ac.in/uploads/image/geu-campus-main-front-image.jpg'
    const layoutStyle = {
        backgroundImage: `url(${bgImage})`,
      };
    return (
    <div style={layoutStyle} className="w-full min-w-full min-h-dvh bg-cover">
        {children[0]}
        <div className="flex flex-col items-center overflow-y-auto">
          { children.map((child, ind)=>{return ind!==0 && child})}
        </div>

    </div>
  )
}

export default AnonymousPageLayout