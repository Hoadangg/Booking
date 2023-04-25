import React from 'react';
import './App_slide.css';


import Slideshow from './component/slideshow';

let img1 = "https://assets.mixkit.co/videos/preview/mixkit-curvy-road-on-a-tree-covered-hill-41537-large.mp4";
let img2 = "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/HyK36gOdmjm0pmnp3/videoblocks-river-in-a-tropical-forest-rainy-day-underwater-shot-slow-motion-martinique_sjgmv2bs_w__fec356502a75b1064e2b78668139f19e__P360.mp4";
let img3 = "https://assets.mixkit.co/videos/preview/mixkit-white-sand-beach-background-1564-large.mp4";
let img4 = "https://assets.mixkit.co/videos/preview/mixkit-countryside-meadow-4075-large.mp4";
let img5 = "https://assets.mixkit.co/videos/preview/mixkit-landscape-of-mountains-and-sunset-3128-large.mp4";
let img6= "https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-rocks-1090-large.mp4";


const collection = [
  { src: img1 },
  { src: img2 },
  { src: img3 },
  { src: img4 },
  { src: img5 },
  { src: img6 },

  
];

export default class App_slide extends React.Component {
  render() {
    return (
        
      <div className="App">
        
    

        <Slideshow
          input={collection}
          ratio={`16:3`}
          mode={`automatic`}
          timeout={`6000`}
        /> 
        
       

      </div>
    );
  }
}