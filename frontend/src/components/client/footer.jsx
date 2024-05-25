import React from 'react'
import Image from 'next/image'
const Footer = () => { 
 return ( 
 <div className="container overflow-hidden">
 <div className="row gy-5">
 <div className="col-12">
 <div className="p-3 border bg-light">
 <Image 
 src="https://res.cloudinary.com/iset-sfax/image/upload/v1703777135/images/footer_pwl1jb.png" 
 width={1400} height={400}
 alt="footer"
 />
 </div>
 </div>
 </div>
 </div>
 ) 
} 
export default Footer