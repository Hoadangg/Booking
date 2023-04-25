import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, Navigate, useLocation,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState();
  const [selection,setSelection] = useState([])
  const { data, loading, error } = useFetch(`http://localhost:8800/api/${path}`);
  console.log(data)
  useEffect(() => {
    setList(data);
  }, [data]);
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/${path}/${id}`,{ withCredentials: true });
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };
  const handleUpdate= (id)=>{
  
    navigate(`/admin/${path}/update`,{state:{id}})
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
            </Link> */}
              <div onClick={()=>{handleUpdate(params.row._id)}} className="viewButton" >Update</div>
              {/* <Link to={{pathname: `/admin/${path}/update`,state:params.row._id}} className="viewButton">
                    Update
              </Link> */}
              {/* <Link to={`/admin/${path}/new`} className="viewButton">
                    Add new
              </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  console.log(selection)

  const sendToMails = async()=>{
    try {
      await axios.post(`http://localhost:8800/api/${path}`,selection,{ withCredentials: true })
    } catch (error) {
      
    }
  }

  const handleEditContent =()=>{
    navigate(`/admin/${path}/edit`,{state:{selection}})
  }
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        {(path==="mails")? 
        // (<Link to={`/admin/${path}/edit`} className="link">
        // </Link>)
          <button onClick={handleEditContent} className="link">
            Edit Content

          </button>
        : (<Link to={`/admin/${path}/new`} className="link">
          Add New
        </Link>)}
      </div>

      {list && <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
        onSelectionModelChange={(newSelectionModel) => {
          setSelection(newSelectionModel);
        }}
        selectionModel={selection}  
      />}
    </div>
  );
};

export default Datatable;
