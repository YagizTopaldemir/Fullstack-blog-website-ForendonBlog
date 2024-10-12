import { CalendarIcon } from '@heroicons/react/24/outline';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

export default function UserBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  // Fetch user blogs
  useEffect(() => {
    document.title = `ForendonBlog | ${currentUser.username}`;
    window.scrollTo(0, 0);
    const getAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:1562/api/posts/");
        console.log("API Response:", res.data); // Log the response for debugging
        if (res.data.posts && Array.isArray(res.data.posts)) {
          const userPosts = res.data.posts.filter(post => post.uid === currentUser.id);
          const reversedPosts = userPosts.reverse();
          setBlogs(reversedPosts);
        } else {
          console.error("Expected an array but got:", res.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getAllPosts();
  }, [currentUser.id]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', options);
  };

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBlog = currentPage * 10;
  const indexOfFirstBlog = indexOfLastBlog - 10;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Render component
  return (
    <div className="flex items-center justify-center w-screen min-h-screen">
      <div className="flex flex-col items-center justify-center w-screen min-h-[40vh]">
        <div className='w-[90%] flex flex-col pt-5 items-center'>
          <img src={currentUser.img} alt="User Avatar" className="w-25 h-25 mx-auto rounded-full mb-4" />
          <h1 className='text-3xl font-bold'>{currentUser.username}</h1>
          <h2 className='text-xl mt-1 opacity-60'>{currentUser.email}</h2>
        </div>

        <button onClick={() => navigate("/yeniblogekle")}
          className="text-white mt-5 bg-green-600 transition duration-300 ease-in-out hover:bg-green-900 px-4 py-2 rounded">
          Yeni Blog Ekle
        </button>

        <div className="flex w-screen items-center justify-center mt-8 pb-10">
          <div className="relative w-[90%] flex items-center justify-center flex-col">
            <h1 className="text-3xl font-bold text-black mb-4"> 
              Bloglarını Ara
            </h1>
            <input
              type="text"
              placeholder="Blog ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="xl:w-[50%] w-[95%] md:w-[85%] py-2.5 pl-3 pr-5 text-gray-900 bg-white border  rounded-lg shadow focus:outline-none   transition duration-150 ease-in-out" />
          </div>
        </div>

        <div className='flex flex-wrap w-[90%] min-h-[30vh] pb-[100px]'>
          <div className='flex justify-center w-[100%] '>
            {blogs.length === 0 ? "Henüz bir blogunuz yok" : null}
          </div>
          {currentBlogs.map((blog) => {
            const deletePost = async () => {
              try {
                await axios.delete(`http://localhost:1562/api/posts/${blog.id}`, { withCredentials: true });
                setBlogs(blogs.filter(b => b.id !== blog.id));
              } catch (error) {
                console.error("Error deleting post:", error);
              }
            };

            return (
              <div className="flex flex-col items-center w-full sm:w-1/1 md:w-1/1 xl:w-1/2 p-4 pt-10" key={blog.id}>
                <p className="text-green-600 font-semibold pb-2 2xl:text-2xl">{blog?.cate?.toUpperCase()}</p>
                <h1 className="text-2xl font-black hover:underline text-center 2xl:text-4xl 3xl:text-5xl">
                  {blog?.title.length > 30 ? blog?.title.slice(0, 25) + "..." : blog?.title}
                </h1>
                <div className="flex flex-row pt-5 gap-4">
                  <p className="flex flex-row gap-2 2xl:text-2xl">
                    <CalendarIcon className="h-6 w-6 text-black" />
                    {formatDate(blog.date)}
                  </p>
                </div>
                <img className="mt-5 w-full 3xl:h-[50vh] rounded-xl shadow-lg bg-black text-white object-cover" src={`/uploads/${blog?.img}`} alt={blog.title} />
                <div className='w-[80%] min-h-[20vh] flex items-center justify-center overflow-hidden pt-2'>
                  <p className='w-[100%]  3xl:text-2xl text-xl font-medium text-black' dangerouslySetInnerHTML={{ __html: blog?.desc.slice(0, 200) + "...." }}></p>
                </div>
                <div className='flex gap-4'>
                  <button className="px-4 py-2 mt-5 bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={() => navigate(`/blog/${blog.id}`)}>
                    Devamını oku
                  </button>
                  <Link to={"/blogdüzenle"} state={blog}>
                    <button className="px-4 py-2 mt-5 bg-[#286d98] text-white rounded-lg hover:bg-blue-500">
                      Düzenle
                    </button>
                  </Link>
                  <button className="px-4 py-2 mt-5 bg-red-400 text-white rounded-lg hover:bg-red-700" onClick={deletePost}>
                    Sil
                  </button>
                </div>
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
            )
          })}
        </div>
      </div>
    </div>
  );
}
