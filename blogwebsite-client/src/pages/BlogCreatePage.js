import axios from "axios";
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css"; 
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment"
import Cookies  from "js-cookie"

export default function BlogCreatePage() {
  const state = useLocation().state
    const [title, setTitle] = useState(state?.title || "");
    const [description, setDescription] = useState(state?.desc || "");
    const [category, setCategory] = useState(state?.cate || "Teknoloji");
    const [image, setImage] = useState("");
    const [imagefile, setImagefile] = useState(null);
    const quillRef = useRef(null);
    const navigate = useNavigate()
    document.title = `ForendonBlog | ${title}`;

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
              cate: category,
              img: image,  
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          };
    
          await axios.post("http://localhost:1562/api/posts", value, {
              withCredentials: true, 
          });
          
         
    
      } catch (error) {
          console.error("Error processing the request:", error);
      }
      navigate("/")
    };
    
  
    return (
    <div className=" flex max-w-[100vw] min-h-[105vh] items-center   gap-5 flex-col">
        <div className="w-[95%]  mx-auto p-6 justify-center gap-5 flex-col">
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
  
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Açıklama</label>
          <ReactQuill
            ref={quillRef}
            value={description}
            onChange={setDescription}
            className="border rounded-md h-[250px] bg-white"
            placeholder="Blog açıklamanızı yazın"
          />
        </div>

        <div className="mt-10 pt-8">
          <label className="block text-gray-700 font-medium mb-2">Kategori</label>
          <div className="flex flex-col">
            <label className="flex items-center mb-2">
              <input
                type="radio"
                value="Teknoloji"
                checked={category === "Teknoloji"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Teknoloji
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                value="Seyahat"
                checked={category === "Seyahat"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Seyahat
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                value="Bilim"
                checked={category === "Bilim"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Bilim
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                value="Yemek"
                checked={category === "Yemek"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Yemek
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                value="Sağlık"
                checked={category === "Sağlık"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Sağlık
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                value="Finans"
                checked={category === "Finans"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Finans
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                value="Eğitim"
                checked={category === "Eğitim"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Eğitim
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                value="Haberler"
                checked={category === "Haberler"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Haberler
            </label>
          </div>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Görsel Yükle</label>
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
