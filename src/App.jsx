import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card'; // Assuming Card component exists

const App = () => {
    
    // --- State Management ---
    const [userdata, setUserdata] = useState([]);
    const [index, setIndex] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); //  New state for search input
    const [isLoading, setIsLoading] = useState(false); // New state for better loading control

    // --- Data Fetching Logic ---
    const getdata = async () => {
        setIsLoading(true); // Start loading
        try {
            const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=21`);
            setUserdata(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    // --- Effects & Handlers ---
    useEffect(function() {
        // Clear previous data and fetch new page data whenever 'index' changes
        setUserdata([]);
        getdata();
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [index]);

    const handleSearch = (event) => {
        //  Update the search term on every key stroke
        setSearchTerm(event.target.value);
    };

    // --- Filtering Logic (Runs on every render when userdata or searchTerm changes) ---
    const filteredData = userdata.filter(elem =>
        // Convert both to lowercase for case-insensitive search on the author name
        elem.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Conditional Rendering for Content ---
    let contentToDisplay;

    if (isLoading && userdata.length === 0) {
        // Show centered loading message when fetching data
        contentToDisplay = (
            <div className='w-full text-center p-20'>
                <h1 className='text-gray-300 text-xl font-semibold'>Loading Images...</h1>
            </div>
        );
    } else if (filteredData.length === 0 && searchTerm) {
         // Show 'No results' if data is filtered but no matches are found
        contentToDisplay = (
            <div className='w-full text-center p-20'>
                <h1 className='text-gray-300 text-xl font-semibold'>No authors found matching "{searchTerm}"</h1>
            </div>
        );
    } else {
        // Map over the filtered data for display
        contentToDisplay = filteredData.map(function(elem) {
            return ( 
                <div key={elem.id} className=''> 
                    <Card elem={elem} />
                    <h6 className='w-18 text-[8px] sm:text-sm md:w-44 text-gray-300 font-bold text-center mt-1 truncate'>{elem.author}</h6>
                </div>
            );
        });
    }

    // --- JSX Return ---
    return (
        <div className='text-white w-full min-h-screen bg-black overflow-auto'>

            {/* Header / Navbar */}
            <div className='sticky top-0 z-10 w-full h-16 md:h-16 bg-white text-black px-4 md:px-10 flex items-center justify-between shadow-lg'>
                <h1 className='font-bold text-xl md:text-2xl text-amber-500'>Image Gallery</h1>
                
                {/* Search Input Field */}
                <input 
                    className='text-black w-1/2 md:w-1/3 border-2 rounded-full px-4 py-2 text-sm h-10 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition' 
                    type="text" 
                    placeholder='Search Author...' 
                    value={searchTerm} //  Connect value to state
                    onChange={handleSearch} //  Handle input change
                />
            </div>
            
            {/* Main Image Grid */}
            <div className='flex gap-2 sm:gap-4 flex-wrap justify-center p-4 pt-8 min-h-[80vh]'>
                {contentToDisplay}
            </div>

            {/* Pagination Controls */}
            <div className='flex justify-center gap-6 py-6 border-t border-gray-800 sticky bottom-0 bg-black/80 backdrop-blur-sm'>
                <button 
                    style={{opacity: index === 1 ? 0.5 : 1}} 
                    onClick={() => {
                        if (index > 1) {
                            setIndex(index - 1);
                            setSearchTerm(''); // Clear search when changing page
                        }
                    }} 
                    className='text-black text-sm font-bold bg-amber-400 px-4 py-1 sm:px-6 sm:py-2 rounded-lg transition duration-200 active:scale-95 disabled:opacity-50'
                    disabled={index === 1}
                >
                    Prev
                </button>

                <h1 className='text-white text-lg font-semibold self-center'>Page {index}</h1>
                
                <button 
                    onClick={() => {
                        setIndex(index + 1);
                        setSearchTerm(''); // Clear search when changing page
                    }} 
                    className='text-black text-sm font-bold bg-amber-400 px-4 py-1 sm:px-6 sm:py-2 rounded-lg transition duration-200 active:scale-95'
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default App;
