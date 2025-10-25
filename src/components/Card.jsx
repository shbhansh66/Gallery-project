import React from 'react'

const Card = (props) => {
  return (
    <div>
                     <a href={props.elem.url}> 
                <div className='h-20 w-18 sm:h-44 sm:w-44 rounded-xl overflow-hidden shadow-lg'>
                    <img 
                        className='w-full h-full object-cover transition duration-300 hover:scale-105' 
                        src={props.elem.download_url} 
                        alt={props.elem.author} 
                    />
                </div>
                </a>
    </div>
  )
}

export default Card
