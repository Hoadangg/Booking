import { useEffect,useState } from "react";
import ReactPaginate from 'react-paginate';
import SearchItem from "../searchItem/SearchItem.jsx";


export default function Images(props){
    const {data,itemsPerPage} = props
    const [currentItems,setCurrentItems] = useState([])
    const [pageCount,setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);
   
  
    useEffect(()=>{
        const endOffset = itemOffset +itemsPerPage;
        setCurrentItems(data.slice(itemOffset,endOffset))
        setPageCount(Math.ceil(data.length/itemsPerPage))
},[itemOffset,itemsPerPage,data])

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.length;
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <div className="listImages">
        {currentItems.map((item, index) =>{
            return(
             

                <SearchItem key={index} item={item}/>
             
            )

        })}    
        </div>    
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName ="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      </>
    );
}
