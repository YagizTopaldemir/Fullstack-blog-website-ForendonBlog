import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getAllpost = (req, res) => {
  console.log("Fetching all posts");
  
  // Sayfa ve limit parametrelerini al
  const page = parseInt(req.query.page) || 1; // Varsayılan 1
  const limit = parseInt(req.query.limit) || 10; // Varsayılan 10
  const offset = (page - 1) * limit; // Offset hesapla

  // Kategori sorgusu
  const q = req.query.cate ? 
      "SELECT * FROM posts WHERE cate = ? LIMIT ? OFFSET ?" : 
      "SELECT * FROM posts LIMIT ? OFFSET ?";

  // Kategori parametresini ekle
  const queryParams = req.query.cate ? [req.query.cate, limit, offset] : [limit, offset];

  db.query(q, queryParams, (err, data) => {
      if (err) return res.send(err);
      
      // Toplam post sayısını almak için ayrı bir sorgu
      const countQuery = req.query.cate ? 
          "SELECT COUNT(*) as total FROM posts WHERE cate = ?" : 
          "SELECT COUNT(*) as total FROM posts";
      
      const countParams = req.query.cate ? [req.query.cate] : [];
      
      db.query(countQuery, countParams, (err, countData) => {
          if (err) return res.send(err);
          const totalPosts = countData[0].total; // Toplam post sayısını al
          const totalPages = Math.ceil(totalPosts / limit); // Toplam sayfa sayısını hesapla
          
          return res.status(200).json({
              posts: data,
              totalPages: totalPages,
              currentPage: page,
              totalPosts: totalPosts,
          });
      });
  });
}


export const getSinglePost = (req, res) => {
    console.log("Fetching post");
    const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cate`, `date` FROM user u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
  
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data[0]);
    });
  };
  


export const createSinglepost = (req,res) => {
  console.log(req.cookies.access_token)
    const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cate`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cate,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
   

}

export const updateSinglepost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

    
      const postId = req.params.id;
      const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=? WHERE `id` = ? AND `uid` = ?";
      const values = [req.body.title, req.body.desc, req.body.img];

      db.query(q, [...values, postId, userInfo.id], (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.affectedRows === 0) return res.status(403).json("You can update only your post!");
          return res.json("Post has been updated.");
      });
  });
};



export const deleteSinglepost = (req,res) => {
    const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
}