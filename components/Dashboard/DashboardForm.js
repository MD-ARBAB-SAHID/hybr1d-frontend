import useHttp from "../hooks/use-http"
import Input from "../Input/Input";
import Styles from "./DashboardForm.module.css"
import { useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner"
const DashboardForm = (props)=>{
    const {setResponseData,setIsError} = props;
    const {isLoading, isError,sendRequest,clearError} = useHttp();
    const [inputVal,setInputVal] = useState("");
    const searchHandler = async (event)=>{
        event.preventDefault();

        clearError();
        setIsError(null);
        
        
                    try {
                        const data = await sendRequest(
                          `/api/fetchData?query=${inputVal}`,
                          "GET",
                         
                        );

                        if(data)
                        {
                            setResponseData(data.hits)
                         
                        }
                    }catch(err){

                    }
    }
    return (
       <>
    {isLoading  &&  <LoadingSpinner />}
     <form onSubmit={searchHandler} className={Styles["form"]}>

        <h1>HN Search API</h1>

        <div className={`${Styles["form-inputs"]} `}>
         <Input 
        placeholder="Enter Query " 
        val={inputVal}
        setValue={setInputVal}

        />
            <div className={`${Styles["form-inputs-button"]} `}>
            <input type="submit" value="Search" />
            </div>
        </div>
  
            {isError && !isLoading && <p className={Styles["errorState"]}>{isError}</p>}
        </form>
        </>
    )
}
export default DashboardForm