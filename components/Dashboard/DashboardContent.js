import Table from "./Table/Table";
const DashboardContent = (props)=>{
    const {responseData} = props;
    return(
        <div>
            {/* passing response data to Table component */}
           <Table responseData={responseData}/>
           
        </div>
    )
}
export default DashboardContent

