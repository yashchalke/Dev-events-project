import './style.css';

const InfiniteCarousel = () => {
  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {[
          'Aws', 'Amd', 'Meta', 'Canva', 'Clerk', 'Cloudinary_', 'Intel',
          'Aws', 'Amd', 'Meta', 'Canva', 'Clerk', 'Cloudinary_', 'Intel',
        ].map((logo, index) => (
          <div key={index} className="card">
            <img
              src={`/Logos/${logo}.svg`}
              alt={logo}
              className="md:w-[6vw] w-[20vw]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;






// import './style.css'

// const InfiniteCarousal = () => {
//   return (
//     <div className='carousel-container'>
//       <div className='carousel-track'>

//         <div className='card'>
//           <img src="/Logos/Aws.svg" alt='AWS' className='w-[6vw] '></img>
//         </div>
        
//         <div className='card'>
//           <img src="/Logos/Amd.svg" alt='Amd' className='w-[6vw] '></img>
//         </div>
        
//         <div className='card'>
//           <img src="/Logos/Meta.svg" alt='Meta' className='w-[6vw]'></img>
//           </div> 
       
//         <div className='card'>
//           <img src="/Logos/Canva.svg" alt='Canva' className='w-[6vw]'></img>
//         </div>
       
//         <div className='card'>
//           <img src="/Logos/Clerk.svg" alt='Clerk' className='w-[6vw]'></img>
//         </div>
        
//         <div className='card'>
//           <img src="/Logos/Cloudinary_.svg" alt='Cloudinary' className='w-[6vw]'></img>
//         </div>
        
//         <div className='card'>
//           <img src="/Logos/Intel.svg" alt='Intel' className='w-[6vw]'></img>
//         </div>
        

//         <div className='card'>
//           <img src="/Logos/Aws.svg" alt='AWS' className='w-[6vw]'></img>
//         </div>
        
//         <div className='card'>
//           <img src="/Logos/Amd.svg" alt='Amd' className='w-[6vw]'></img>
//         </div>
        
//         <div className='card'>
//           <img src="/Logos/Meta.svg" alt='Meta' className='w-[6vw]'></img>
//           </div> 
       
//         <div className='card'>
//           <img src="/Logos/Canva.svg" alt='Canva' className='w-[6vw]'></img>
//         </div>
       
//         <div className='card'>
//           <img src="/Logos/Clerk.svg" alt='Clerk' className='w-[6vw]'></img>
//         </div>
        
//         <div className='card'>
//           <img src="/Logos/Cloudinary_.svg" alt='Cloudinary' className='w-[6vw]'></img>
//         </div>
        
//         <div className='card'>
//           <img src="/Logos/Intel.svg" alt='Intel' className='w-[6vw]'></img>
//         </div>

//         </div>
//     </div>
//   )
// }

// export default InfiniteCarousal