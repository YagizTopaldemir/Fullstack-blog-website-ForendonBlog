import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function BlogPage() {
    const {idblog}  = useParams();
    const [blog, setBlogs] = useState([]);
  

    useEffect(() => {
        
        const getSinglePost = async () => {
            try {
              const res = await axios.get(`http://localhost:1562/api/posts/${idblog}`);
            const blogtitle = res.data.title
              setBlogs(res.data);
              document.title = `ForendonBlog | ${blogtitle}`;
              window.scrollTo(0, 0);
            } catch (error) {
              console.error("Error fetching posts:", error.message);
              
            }
          }
      
          getSinglePost(); 
    
    }, [idblog]);

    console.log(blog)

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', options);
    };

    

 

    return (
        <div className="flex items-center justify-center w-screen min-h-screen ">
<div className="flex flex-col items-center justify-center w-screen min-h-screen  bg-gradient-to-b from-[#1D1D1D]  to-[#1D1D1D] xl:bg-[length:100%_70vh] md:bg-[length:100%_60vh] bg-[length:100%_50vh] bg-no-repeat">
<div className='w-screen h-16'></div>

                <div className="w-[90%] min-h-screen flex flex-col items-center pb-[100px] " key={blog?.id}>
                    <p className='text-green-600 font-semibold pb-2'>{blog?.cate?.toUpperCase()}</p>
                    <h1 className='text-4xl md:text-6xl text-white font-black underline text-center'>{blog?.title}</h1>
                    <div className='flex flex-row pt-5 gap-4'>
                        <p className='flex flex-row gap-2 text-white'>  
                            <UserIcon className="h-6 w-6 text-white" />
                            Yazar: <span className='hover:underline text-white'>{blog?.username}</span>
                        </p>
                        <p className='flex flex-row gap-2 text-white'>
                            <CalendarIcon className="h-6 w-6 text-white" />
                            {formatDate(blog?.date)}
                        </p>
                    </div>
                    <img className='mt-5 2xl:w-[80%] 2xl:h-[70vh] xl:w-[85%] xl:h-[50vh] rounded-xl shadow-lg  bg-black text-white '  src={`/uploads/${blog?.img}`} alt={blog.title} />
         <div className='w-[80%] md:w-[70%] 2xl:w-[40%] min-h-[20vh] flex  pt-5 justify-center overflow-hidden'>
                    <p className='w-[100%]  pt-5 text-xl 3xl:text-3xl font-medium text-black' dangerouslySetInnerHTML={{ __html: blog?.desc}}></p>
          </div>
                    
                </div>

                
            </div>
        </div>
    );
}
