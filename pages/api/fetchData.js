import HttpError from "../../models/http-error";


const fetchData = async (req,res)=>{
    const queryParams = req.query;


    try{
        const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${queryParams.query}`,{
      
            method:req.method,
           
            
           })
           const data = await response.json();
   
           if(!response.ok)
           {
             throw new HttpError(data.error,response.status);
           }
        return res.status(response.status).json(data);
    }catch(err){

        return   res.status(err.code).json({error:err.message});
    }
}

export default fetchData;