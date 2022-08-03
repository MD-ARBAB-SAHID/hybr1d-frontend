


const Layout =(props)=>{
    return(
<>
 
{/* actual dom content */}
        <div>
            {props.children}
        </div>
        {/* overlay  */}
        <div id="overlays"></div>
      
</>
    )
}


export default Layout;