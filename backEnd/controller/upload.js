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

const limit = {
  fileSize:12000000
};

const fileFilter = (req, file, callback) => {
  if(file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png'){
    callback(null, true)
  }else{
    callback(null, false)
  }
}; 

const upload = multer({storage:storage, limits:limit, fileFilter:fileFilter}).single('avatar');

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
    res.status(500).json({ errMsg: "Internal server error"+err });
  }
};


export {addProfilePicture}


// ------------------- utility function
function checkFileSize(file){
  let valid = true

  if(file>200){
    valid = false
  }

  return valid
}
