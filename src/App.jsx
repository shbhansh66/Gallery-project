
import {useState, useEffect} from 'react'
import axios from 'axios'
import Card from './components/Card'



const App = () => {

   const [userdata, setUserdata] = useState([]);
   const [index, setIndex] = useState(1);

  const getdata = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=24`);
    setUserdata(response.data);
    
  };
 useEffect(function(){
  getdata();
 },[index])
 



  let printUserdata=<h1 className='text-gray-300  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold' >Loading...</h1>

if (userdata.length > 0) {
    printUserdata = userdata.map(function(elem, idx) {
        return ( 
          
            <div key={elem.id || idx} className=''> 
              
                 <Card elem={elem} />
                
                
                    <h6 className=' w-18 text-[8px] sm:text-sm md:w-44 text-gray-300 font-bold'>{elem.author}</h6>
               
            </div>
        );
    });
}

  return (
    <div className='text-white w-full h-screen bg-black overflow-auto'>

       <div className='w-full h-8 md:h-12 md:py-2 bg-white text-black px-10'>
        <h1 className='font-bold text-xl '>Gallery</h1>
       </div>
      <div className=' h-[89%] flex gap-1 sm:gap-2 flex-wrap pl-4 mt-4'>
        
        {printUserdata}
      </div>

      <div className='flex justify-center gap-6 '>
          <button style={{opacity:index==1?0.5:1}} onClick={()=>{
            if(index>1)
            setIndex(index-1);
            setUserdata([]);
          }} className='text-black text-sm font-bold bg-amber-400 px-4 py-1 sm:px-6 sm:py-2 rounded-lg '>Prev</button>

          <h1>Pages {index}</h1>
           <button onClick={()=>{
        
            setIndex(index+1);
             setUserdata([]);
          }} className='text-black text-sm font-bold bg-amber-400 px-4 py-1 sm:px-6 sm:py-2 rounded-lg '>Next</button>
      </div>
    </div>
  )
}

export default App
