import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function HomePage() {
    const [blogs,setblogs] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);  
    const [totalPages, setTotalPages] = useState(1);    
    const limit = 15; 

    useEffect(() => {
      document.title = 'ForendonBlog | Ana sayfa';
        window.scrollTo(0, 0);
      const getAllPosts = async () => {
        try {
          const res = await axios.get(`http://localhost:1562/api/posts/?page=${currentPage}&limit=${limit}`);
          const reverseres = res.data.posts.reverse();
          setblogs(reverseres);
          setTotalPages(res.data.totalPages);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    
      getAllPosts(); 
    }, [currentPage]);
    
    const formatDate = (dateString) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', options);
  };


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };


  return (
    <div className="flex items-center justify-center w-screen min-h-screen overflow-x-hidden  bg-[#f9fafb]">
      <div className="flex flex-col items-center justify-center w-screen min-h-screen">
        <div className='w-screen h-16'></div>
        {blogs?.map((blog) => (
    <div className="w-[90%] min-h-screen flex flex-col items-center justify-center md:pb-[100px] sm:pb-[30px]" key={blog.id}>
        <p className='text-green-600 2xl:text-xl font-semibold pb-2'>{blog?.cate?.toUpperCase()}</p>
        <h1 className='lg:text-6xl font-black md:text-4xl text-3xl   hover:underline text-center'>{blog.title}</h1>
        <div className='flex flex-row pt-5 gap-4'>
        
            <p className='flex flex-row gap-2 2xl:text-xl'>
                <CalendarIcon className="h-6 w-6 text-black" />
                {formatDate(blog?.date)}
            </p>
        </div>
        <img className='mt-5 2xl:w-[80%] 2xl:h-[70vh] xl:w-[85%]xl:h-[50vh] rounded-xl shadow-lg  bg-black text-white '  src={`/uploads/${blog?.img}`} alt={blog.title} />
         <div className='w-[70%] md:w-[80%] 2xl:w-[50%] min-h-[20vh] flex pt-5 justify-center overflow-hidden'>
                    <p className='w-[100%]  pt-5 text-xl 3xl:text-3xl font-medium text-black' dangerouslySetInnerHTML={{ __html: blog?.desc.slice(0,500) + "...." }}></p>
          </div>
        <button className="px-4 py-2 mt-5 2xl:w-[200px] 2xl:h-[50px] 2xl:text-xl bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={() => navigate(`/blog/${blog.id}`) }>
            Devamını oku
        </button>
        <div className='w-[100%]  items-center justify-center flex flex-row pt-10'>
          <p className='text-2xl'>//</p>
          <div className=' bg-black w-[45%] h-[2px]'> </div>
          <p className='text-2xl'>//</p>
          <div className=' w-[3%] h-[2px]'></div>
          <p className='text-2xl'>//</p>
          <div className=' bg-black w-[45%] h-[2px]'></div>
          <p className='text-2xl'>//</p>
        </div>
    </div>
))}

<div className="flex items-center w-[90%] justify-between bg-[#f9fafb] px-4 py-3 sm:px-6 mt-auto">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 2xl:text-xl">
                  <span className="font-medium">{(currentPage - 1) * limit + 1}</span> ile 
                  <span className="font-medium">{currentPage * limit}</span> {' '}
                  arası gösteriliyor
                </p>
              </div>
              <div>
                <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                  {[...Array(totalPages).keys()].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === index + 1 ? 'bg-green-600 text-white' : 'text-gray-900'} ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
