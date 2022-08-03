import Styles from "./Comments.module.css"
const Comments = (props)=>{
    const {id} = props;
    
   return(
    <div className={Styles["comment"]}>

    <div className="row">
    <div className="col-lg-12">
   
            <img  src={`https://bootdey.com/img/Content/avatar/avatar${id%6+1}.png`} alt="Image Description" />

  
    </div>
    <div className={`col-lg-12 ${Styles["text-content"]}`} >
        <div>
    {props.children}

    </div>
    </div>
    </div>
    </div>
				
   )
             
}
export default Comments