import React from 'react'
import {useState}from 'react'
import axios from 'axios'



const App = () => {

   const [userdata, setUserdata] = useState([]);

  const getdata = async () => {
    const response = await axios.get('https://picsum.photos/v2/list?page=2&limit=50');
    setUserdata(response.data);
    
  };



  let printUserdata='N0 user Available ✌️'

if (userdata.length > 0) {
    printUserdata = userdata.map(function(elem, idx) {
        return ( 
          
            <div key={elem.id || idx} className=''> 
              
                <div className='h-20 w-20 sm:h-44 sm:w-44 rounded-xl overflow-hidden shadow-lg'>
                    <img 
                        className='w-full h-full object-cover transition duration-300 hover:scale-105' 
                        src={elem.download_url} 
                        alt={elem.author} 
                    />
                </div>
                
                {/* Author Name (Uncommented and styled) */}
                
                    <h6 className=' w-20 text-[8px] sm:text-sm md:w-44 text-gray-300 font-bold'>{elem.author}</h6>
               
            </div>
        );
    });
}

  return (
    <div className='text-white w-full h-screen bg-black p-2 overflow-auto'>

      
      <button onClick={getdata}  className='w-40 h-12 border-2 rounded-xl m-4 bg-green-500 shadow-lg shadow-green-500 active:scale-95'>Get Data</button>

      <div className='flex gap-1 sm:gap-2 flex-wrap pl-4 mt-4'>
        
        {printUserdata}
      </div>

      <div>
        dsfdsf
      </div>
    </div>
  )
}

export default App
