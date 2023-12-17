import pool from "../config/db.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
// -----------------------------

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/avatar');
  },
  filename: (req, file, callback) => {
    const fileExt = file.mimetype.split("/")[1];
    callback(null, `${req.params.filename}_${fileExt}.${fileExt}`);
  },
});

const storage2 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/dokumen');
  },
  filename: (req, file, callback) => {
    const mimeTypeToExtension = {
      'application/zip': 'zip',
      'application/x-zip-compressed': 'zip',
      "multipart/x-zip":'zip',
      'application/vnd.rar': 'rar',
      'application/x-rar-compressed': 'rar',
      "application/octet-stream":'rar',
      'image/jpeg':'jpeg',
      'image/jpg':'jpg',
      'image/png':'png',
      'application/pdf':'pdf'
    };
    const fileExt = mimeTypeToExtension[file.mimetype] || 'dat';
    const {chId, junctionId, wsSection, fileNum, username, date} = req.params;
    const userId = req.payload.id;
    callback(null, `${chId}_${wsSection}_${username}_${fileNum}_${date}.${fileExt}`);
  },
});

const limit = {
  fileSize:96000000
};

const fileFilter = (req, file, callback) => {
  if(file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png'){
    callback(null, true)
  }else{
    callback(null, false)
  }
}; 
const fileFilter2 = (req, file, callback) => {
  if(file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png' ||file.mimetype === 'application/pdf' || 
      file.mimetype === 'application/zip' || file.mimetype ==="application/vnd.rar" ||
      file.mimetype === 'application/x-rar-compressed' || file.mimetype ==="multipart/x-zip" 
      || file.mimetype ==="application/octet-stream" || file.mimetype ==="application/x-zip-compressed"){
    callback(null, true)
  }else{
    callback(null, false)
  }
}; 

const upload = multer({storage:storage, limits:limit, fileFilter:fileFilter}).single('avatar');
const uploadDokumen = multer({storage:storage2, limits:limit, fileFilter:fileFilter2}).single('dokumen');

// ---------------------------------------------------
const __filename = fileURLToPath(import.meta.url); //  dapetin url file index.js which is C:/monevTI-v2/backEnd/index.js
const __dirname = path.dirname(__filename); //  dapetin dirname which is C:/monevTI-v2/backEnd/

//1. upload profile picture
const addProfilePicture = async (req, res) => {
  try {
      upload(req, res, async(err) => {
        if(!req.file){return res.status(400).json({ errMsg: "Incorrect File Type" + err});}
        
        const userId = req.payload.id;
        const fileExt = req.file.mimetype.split("/")[1];
        const fileName =`${userId}_${fileExt}.${fileExt}`
        const q = "UPDATE user SET image = ? WHERE user_id = ?"
  
        await pool.execute(q, [fileName, userId]);

        if (err instanceof multer.MulterError) {
          return res.status(400).json({ errMsg: err.message });
        } else if (err) {
          return res.status(500).json({ errMsg: "Something went wrong" + err });
        }

        res.json({ fileName: fileName, msg: 'File uploaded successfully'});
      });
    }catch(err) {
      console.error(err);
      res.status(500).json({ errMsg: "Internal server error"+err });
  }
};

//2. upload data dukung
const addDataDukung = async (req, res) => {
  try {
      uploadDokumen(req, res, async(err) => {
        if(!req.file){return res.status(400).json({ errMsg: "Incorrect File Type" + err});}

        const userId = req.payload.id;
        const {chId, junctionId, wsSection, fileNum, username, date} = req.params;

        const mimeTypeToExtension = {
          'application/zip': 'zip',
          'application/x-zip-compressed': 'zip',
          "multipart/x-zip":'zip',
          'application/vnd.rar': 'rar',
          'application/x-rar-compressed': 'rar',
          "application/octet-stream":'rar',
          'image/jpeg':'jpeg',
          'image/jpg':'jpg',
          'image/png':'png',
          'application/pdf':'pdf'
        };
        const fileExt = mimeTypeToExtension[req.file.mimetype] || 'dat';
        const fileName =`${chId}_${wsSection}_${username}_${fileNum}_${date}.${fileExt}`;
        let q;
        fileNum==1
        ? q = "UPDATE checklistjunction SET file1 = ? WHERE csjunction_id = ? AND user_id = ?" 
        : q = "UPDATE checklistjunction SET file2 = ? WHERE csjunction_id = ? AND user_id = ?"
  
        await pool.execute(q, [fileName, junctionId, userId]);

        if (err instanceof multer.MulterError) {
          return res.status(400).json({ errMsg: err.message });
        } else if (err) {
          return res.status(500).json({ errMsg: "Something went wrong" + err });
        }
      
        res.json({ fileName: fileName, msg: 'File uploaded successfully'});
      });
    }catch(err) {
        console.error(err);
        res.status(500).json({ errMsg: "Internal server error"+err });
    }
};

// 3. hapus file name di db dan hapus file di server
const deleteDataDukung = async (req, res) => {
  const connection = await pool.getConnection();
  try{
    await connection.beginTransaction();
      const userId = req.payload.id;
      const {csJunctionId, kppnResponse, kppnNote, kanwilNote, file1, file2} = req.body; 

      const q1 = `SELECT * FROM checklistjunction WHERE csjunction_id = ?`;
      const [rows] = await connection.execute(q1, [csJunctionId]);
      const currentFile1 = rows[0]?.file1;
      const currentFile2 = rows[0]?.file2;

      const filePath1 = currentFile1?path.join(__dirname,`../uploads/dokumen/`, currentFile1):null
      const filePath2 = currentFile2?path.join(__dirname,`../uploads/dokumen/`, currentFile2):null

      if(currentFile2 === null){
        fs.unlinkSync(filePath1);
      }else{
        fs.unlinkSync(filePath1);
        fs.unlinkSync(filePath2);
      }

      const q2 = ` UPDATE checklistjunction
                  SET kppn_response= ?, kppn_note=?, kanwil_note=?, file1=?, file2=? 
                  WHERE csjunction_id=? AND user_id=? `;

      await connection.execute(q2, [kppnResponse, kppnNote, kanwilNote, file1, file2,csJunctionId, userId]);
      await connection.commit();
      return res.status(200).json({msg:"data updated successfully"});

  }catch(err){
      await connection.rollback();
      if(err.userId){
          console.log(err);
          return res.status(403).json({errMsg:"Problem Authenticating"});
      };
      console.log(err);
      return res.status(500).json({errMsg:'Internal Server Error"'});
  }finally{
      connection.release()
  }
}


export {addProfilePicture, addDataDukung, deleteDataDukung }


