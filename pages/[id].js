import Styles from "../styles/Home.module.css"
import ReactHtmlParser from 'react-html-parser';
import Head from "next/head"
import { useState } from "react"
import Comments from "../components/Comments/Comments";
const DetailsPage = (props)=>{
  const {data,error} = props

  const [responseData,setResponseData] = useState(data);
  const [isError,setIsError] = useState(error)
    return(
        <>
        <Head>
          <title>hybr1d | Frontend</title>
        </Head>

        <div className={Styles["dashboard"]}>
        <div className={Styles["outer-card"]}>

       <h1 className={Styles.title}>{responseData.title}</h1>

       <h2>Points : {responseData.points}</h2>

       <h1 className={Styles.comment_heading}>Comments</h1>

    {responseData.children.map((child,index)=>{
        const htmltext = child.text;
      
        return <Comments key={index} id={index+1}> <div>    {ReactHtmlParser(htmltext)}</div></Comments>
      
    })}


      {isError && !responseData && <div className={Styles["error-box"]}>
        <p>{isError}</p>
      </div>
      
      }
</div>
     </div> 
        </>
    )
}

export default DetailsPage

export async function getServerSideProps({req,res,params}){




  try{
    const response  =  await fetch(`http://hn.algolia.com/api/v1/items/${params.id}`);
    const data = await response.json();
    
    const resultData = {
        title:data.title,
        points:data.points,
        children:data.children
    }

    return {
      props:{
        data:resultData,
        error:null
      }
    };
  }
  catch(err)
  { 

    return {
      props:{
        data:null,
        error:err.message
      }
    };
  }
  
}
