import React, { useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from "@ckeditor/ckeditor5-react"
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import "./editContent.css"
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder'

const EditContent = ()=>{
    const location = useLocation()
    const [content, setContent] = useState(
    {   
        idList :location.state.selection ,
        title:'',
        detail:''
    })

    const handleChange = (e)=>{
        const {name, value} = e.target
        setContent({...content,title:e.target.value})
    }
    console.log(content)
    // ClassicEditor
    // .create( document.querySelector( '#editor' ), {
    //     plugins: [ CKFinder],
    //     toolbar: [ 'ckfinder', 'uploadImage' ], // Depending on your preference.
    //     ckfinder: {
    //         // Feature configuration.
    //     }
    // } )
    // .then(  )
    // .catch(  );
    const handSendMail= async()=>{
        await axios.post("http://localhost:8800/api/mails",
            content
        ,{ withCredentials: true })
    }

    return (
      <div className="EditContent">
        <h2 className='EditContent_title'>Content</h2>
        <div className="EditContent_content">
        <h3>Title</h3>
        <textarea onChange={handleChange} name="title" id="" cols="90" rows="1"></textarea>

        </div>
        <div className="EditContent_details">
        <h3>Details</h3>
        <CKEditor
            editor ={ClassicEditor}
            onReady ={ editor =>{
                //this initialize our application
            }}
            config = {
                
               { ckfinder:{
                    uploadUrl:'http://localhost:8800/uploads'
                }}
            }
            onChange={(event,editor)=>{
                const data = editor.getData();
                setContent({...content, detail:data})
                //console.log(data)
                
            }}
        />

        </div>
        
        <button onClick={handSendMail}>Send to Emails</button>
      </div>
    );
}
  


export default EditContent;