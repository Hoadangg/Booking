import React from 'react'
import "./ggMap.css";

export default function GGmap() {
  return (
    <div>
        <div class="mapouter">
            <div class="gmap_canvas">
                <iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=390&amp;height=305&amp;hl=en&amp;q=1 Đ. Võ Văn NgânBình Thọ, Thủ Đức, Thành phố Hồ Chí Minh&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">

                </iframe>
                <a href="https://piratebay-proxys.com/">Pirate proxy</a>
                <div className='mapModal'>
                  <div className='mapModalIcon' >
                  <span className="d0438f59a5" data-testid="map-entry-pin-icon">
                    <span className="e75db87696">
                      <span className="b56c581c9f"></span>
                      <svg viewBox="-1 -1 26 32" className="b2873bf9cb"><path d="M24 12.4286C24 19.2927 12 29 12 29C12 29 0 19.2927 0 12.4286C0 5.56446 5.37258 0 12 0C18.6274 0 24 5.56446 24 12.4286Z"></path></svg>
                      </span>
                      <svg className="ae0a00836a" viewBox="0 0 12 4"><ellipse cx="6" cy="2" rx="6" ry="2"></ellipse></svg>
                      </span>
                  
                  </div>
                  <a href="https://maps.google.com/maps?ll=10.850048,106.766314&amp;z=17&amp;t=m&amp;hl=en&amp;gl=US&amp;mapclient=embed&amp;q=1%20%C4%90.%20V%C3%B5%20V%C4%83n%20Ng%C3%A2nB%C3%ACnh%20Th%E1%BB%8D%2C%20Th%E1%BB%A7%20%C4%90%E1%BB%A9c%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh" >
                  <button  className='modalMapBtn'>Show on map</button>

                  </a>
                </div>
            </div>
         
        </div>
    </div>
  )
}
