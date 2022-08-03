import Styles from "../styles/Home.module.css"
import DashboardForm from "../components/Dashboard/DashboardForm"
import DashboardContent from "../components/Dashboard/DashboardContent"
import Head from "next/head"
import { useState } from "react"
const Home = (props)=>{
  const {data,error} = props

  const [responseData,setResponseData] = useState(data);
  const [isError,setIsError] = useState(error)
    return(
        <>
        <Head>
          <title>hybr1d | Frontend</title>
        </Head>
         <div className={Styles["dashboard"]}>
      <DashboardForm setResponseData={setResponseData} setIsError={setIsError}/>
     {!isError && responseData && responseData.length>0 && <DashboardContent setResponseData={setResponseData} responseData={responseData}/> }
      {isError && !responseData && <div className={Styles["error-box"]}>
        <p>{isError}</p>
      </div>
      
      }
      {!isError &&  responseData && responseData.length===0 && <div className={Styles["error-box"]}>
        <p>No Posts Found </p>
      </div>
      
      }
     </div> 
        </>
    )
}

export default Home

export async function getServerSideProps({req,res}){
  try{
    const response  =  await fetch(`http://hn.algolia.com/api/v1/search`);
    const data = await response.json();
    const resultData  = data.hits.splice(0,8)
// throw new Error("Something went wrong")
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
