import Styles from "./Table.module.css"

import TableContent from "./TableContent";
const Table = ({responseData})=>{

    return (
      <div className={Styles["outer"]}>
        <div className={Styles["container"]}>
        <h1>HN Posts</h1>
  <table className={Styles["rwd-table"]}>
    <tbody>

      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Created</th>
        <th>View Details</th>

      </tr>
      {/* Table Content represents body of table or rows of table */}
      {responseData.map((data)=>{

        return(
          <TableContent key={data.objectID} id={data.objectID}  title={data.title} author={data.author} created={data.created_at}/>
        )
      })}
     
      
    </tbody>
  </table>

</div>
</div>
    )
}

export default Table;