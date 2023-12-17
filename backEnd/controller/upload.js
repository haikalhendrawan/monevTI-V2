import pool from "../config/db.js";
import multer from "multer";
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
        const fileExt = req.file.mimetype.split("/")[1];
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


export {addProfilePicture, addDataDukung }


