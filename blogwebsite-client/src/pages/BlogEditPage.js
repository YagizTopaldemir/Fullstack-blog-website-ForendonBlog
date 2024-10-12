import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css"; 
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment"
import Cookies  from "js-cookie"

export default function BlogEditPage() {
  const state = useLocation().state
    const [title, setTitle] = useState(state?.title || "");
    const [description, setDescription] = useState(state?.desc || "");
    const [category, setCategory] = useState(state?.cate || "Teknoloji");
    const [image, setImage] = useState(state?.img || "");
    const [imagefile, setImagefile] = useState(null);
    const quillRef = useRef(null);
    const navigate = useNavigate()
  
    const handleImageChange = (e) => {
      const url = e?.target.files[0].name;
      setImagefile(e.target.files[0])
      console.log(url)
      setImage(Date.now() + url)
    }
    
    console.log(image)

    const upload = async () => {
      try{
        const formData = new FormData();

        formData.append("file",imagefile,image)
    
        const res = await axios.post("http://localhost:1562/api/upload",formData)
      
        return res.data;
      }catch(err){
        console.log(err)
      }
    }


    console.log(title,description,category,image)
    
    const handleClick = async () => {
      try {
          upload();
          const value = {
              title,
              desc: description,
              img: image,  
          };
    
          await axios.put(`http://localhost:1562/api/posts/${state.id}`, value, {
              withCredentials: true, 
          });
          
         
    
      } catch (error) {
          console.error("Error processing the request:", error);
      }
      navigate("/")
    };
    

      document.title = `ForendonBlog | ${state?.title}`;
      window.scrollTo(0, 0);
     


  
    return (
    <div className=" flex max-w-[100vw] min-h-[80vh] items-center mt-10  flex-col">
        <div className="w-[95%]  mx-auto p-6 justify-center gap-[60px] flex-col">
        <h1 className="text-3xl font-semibold mb-4">Yeni Blog Ekle</h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Blog Başlığı</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Blog başlığını girin"
          />
        </div>
  
        <div className="mb-10 ">
          <label className="block text-gray-700 font-medium mb-2">Açıklama</label>
          <ReactQuill
            ref={quillRef}
            value={description}
            onChange={setDescription}
            className="border rounded-md h-[250px] bg-white"
            placeholder="Blog açıklamanızı yazın"
          />
        </div>
  
        <div className="mb-4 mt-5 pt-8">
          <label className="block text-gray-700 font-medium mb-2 mt-2">Görsel Yükle</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-50 file:text-green-600 hover:file:bg-green-100"
          />
        </div>
        
        <button
         onClick={() => handleClick()}
          className="bg-[#1a930f] w-full h-11 text-white py-2 px-4 rounded-md hover:bg-green-900"
        >
          Taslağı Kaydet
        </button>
      </div>
    </div>
    );
}
