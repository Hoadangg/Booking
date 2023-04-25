import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";

const UpdateHotel = () => {
  const [files, setFiles] = useState("");
  const location = useLocation();
  
  const navigate = useNavigate();
  const {"data":dataRoom} = useFetch("http://localhost:8800/api/rooms");
  
  const [rooms, setRooms] = useState(dataRoom);
  const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/find/${location.state.id}`);
  const [info, setInfo] = useState(data);
  console.log(data)
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  
  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };
  


  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/djg95nkmk/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.put(`http://localhost:8800/api/hotels/${location.state.id}`, newhotel, { withCredentials: true });
      alert("successful updated the hotel");
      navigate("/admin/hotels");
    } catch (err) {console.log(err)}
  };
  const hotelInputsUpdate = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: data.name,
    },
    {
      id: "type",
      label: "Type",
      type: "text",
      placeholder: data.type,
    },
    {
      id: "city",
      label: "City",
      type: "text",
      placeholder: data.city,
    },
    {
      id: "address",
      label: "Address",
      type: "text",
      placeholder: data.address,
    },
    {
      id: "distance",
      label: "Distance from City Center",
      type: "text",
      placeholder: data.distance,
    },
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: data.title,
    },
    {
      id: "desc",
      label: "Description",
      type: "text",
      placeholder:data.desc,
    },
    {
      id: "cheapestPrice",
      label: "Price",
      type: "text",
      placeholder: data.cheapestPrice,
    },
  ];
  return (
    <div className="new">
     
      <div className="newContainer">
      
        <div className="top">
          <h1>Update Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputsUpdate.map((input,idx) => (
                <div className="formInput" key={idx}>
                  <label>{input.label}</label>
                  <input
                    
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : dataRoom &&
                      dataRoom.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default UpdateHotel;
