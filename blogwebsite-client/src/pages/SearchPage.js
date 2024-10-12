import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'ForendonBlog | Blog ara';
    window.scrollTo(0, 0);
    const getAllPosts = async () => {
      try {
          const res = await axios.get("http://localhost:1562/api/posts/");
          console.log('API Response:', res.data);
  
          // Extract posts array from the response
          const posts = res.data.posts || []; // Use an empty array as a fallback
          const reversedPosts = posts.reverse();
          setBlogs(reversedPosts.slice(0, 10)); // Set the state with the first 10 reversed posts
      } catch (error) {
          console.error("Error fetching posts:", error);
      }
  };
  
  

    getAllPosts(); 
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', options);
  };

 
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);





  return (
    <div className="flex  justify-center w-screen min-h-screen">
      <div className="flex flex-col items-center w-screen min-h-screen">
       
      <div className="flex w-screen items-center justify-center mt-8 pb-10">
            <div className="relative w-[90%] flex items-center  flex-col">
                <h1 className="text-3xl font-bold text-black mb-4"> 
                    Blog Ara
                </h1>
                <input
                    type="text"
                    placeholder="Blog ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="xl:w-[50%] w-[95%] md:w-[85%] py-2.5 pl-3 pr-5 text-gray-900 bg-white border  rounded-lg shadow focus:outline-none   transition duration-150 ease-in-out" />
            </div>
        </div>

     
<div className='flex flex-wrap  w-[90%] pb-[100px]'>
  {currentBlogs.map((blog) => (
    <div className="flex flex-col items-center w-full sm:w-1/1 md:w-1/1 xl:w-1/2 p-4 md:pt-10" key={blog.id}>
      <p className="text-green-600 font-semibold pb-2">{blog?.cate?.toUpperCase()}</p>
      <h1 className="text-2xl font-black hover:underline text-center">{blog?.title.length > 30 ? blog?.title.slice(0, 25) + "..." : blog?.title }
      </h1>
      <div className="flex flex-row pt-5 gap-4">

        <p className="flex flex-row gap-2">
          <CalendarIcon className="h-6 w-6 text-black" />
          {formatDate(blog.date)}
        </p>
      </div>
      <img className="mt-5 w-full h-[400px] 2xl:h-[50vh] rounded-xl shadow-lg bg-black text-white object-cover" src={`/uploads/${blog?.img}`} alt={blog.title} />
      <div className='w-[80%] min-h-[20vh] flex items-center justify-center overflow-hidden'>
            <p className='w-[100%]  pt-5 text-xl font-medium text-black' dangerouslySetInnerHTML={{ __html: blog?.desc.slice(0,200) + "...." }}></p>
      </div>
      <button className="px-4 py-2 mt-5 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={() => navigate(`/blog/${blog.id}`)}>
        Devamını oku
      </button>
      <div className='xl:hidden w-[100%]  items-center justify-center flex flex-row pt-10'>
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
</div>
  </div>
    </div>
  );
}
