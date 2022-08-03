import Link from "next/link";

const TableContent = (props)=>{
const {id,title,author,created} = props;

return (
    <tr>
    <td data-th="Title">
      {title}
    </td>
  
    <td data-th="Author">
      {author}

    </td>
    <td data-th="Created">

      {created.substr(0,10)}

    </td>
    <td data-th="View Details">
      <Link href={`/${id}`}>
        <a target="_blank">View</a>
      </Link>
    </td>
  </tr>
)
}
export default TableContent