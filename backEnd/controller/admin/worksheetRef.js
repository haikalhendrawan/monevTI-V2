import pool from "../../config/db.js";
import moment from "moment-timezone";


// 1. Endpoint mendapatkan data semua checklist junction
const getChecklistRef = async (req, res) => {
  try{
      const batch = req.params.batchId; 
      const q = ` SELECT checklistjunction.*, 
                  checklist.checklist_id, checklist.title, checklist.description, checklist.instruksi,
                  checklist.contoh_file, checklist.ws_section, checklist.peraturan
                  FROM checklistjunction 
                  LEFT JOIN checklist ON checklistjunction.checklist_id = checklist.checklist_id
                  WHERE checklistjunction.batch_id =? `;

      const [rows] = await pool.execute(q, [batch]);
      return res.status(200).json({rows:rows, msg:"data retreived successfully"});

  }catch(err){
      if(err.userId){
          console.log(err);
          return res.status(403).json({errMsg:"Authentication failed"});
      };
      if(err.batch){
          console.log(err);
          return res.status(403).json({errMsg:"Error in request body"});
      };
      console.log(err);
      return res.status(500).json({errMsg:'Internal Server Error"'});
  }  
};


export {getChecklistRef}