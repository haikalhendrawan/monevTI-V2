import pool from "../config/db.js";
import moment from "moment-timezone";


// -------------------------------------------------------------------

// 1. Endpoint mendapatkan data checklist By User, Batch, dan Period
const addChecklist = async (req, res) => {
    try{
        const {title, description, instruksi, contoh_file, ws_section, peraturan} = req.body; 

        // if (Object.values(req.body).some(value => value === null)) {
        //     return res.status(400).json({ errMsg: "One or more properties in req.body are null" });
        // }

        const q = `INSERT INTO 
                    checklist (title, description, instruksi, contoh_file, ws_section, peraturan) 
                    VALUES (?, ?, ?, ?, ?, ?)`;

        await pool.execute(q, [title, description, instruksi, contoh_file, ws_section, peraturan]);
        return res.status(200).json({msg:"data inserted successfully"});

    }catch(err){
        if(err.req.body){
            console.log(err);
            return res.status(403).json({errMsg:"error in request body"});
        };
        console.log(err);
        return res.status(500).json({errMsg:'Internal Server Error"'});
    }  
};

// 2. fungsi mengedit data masing2 checklist
const editChecklist = async (req, res) => {
    try{
        const {id, title, description, instruksi, contoh_file, ws_section, peraturan} = req.body;
        
        // if (Object.values(req.body).some(value => value === null)) {
        //     return res.status(400).json({ errMsg: "One or more properties in req.body are null" });
        // }

        const q = ` UPDATE checklist
                    SET title=?, description=?, instruksi=?, contoh_file=?, ws_section=?, peraturan=? 
                    WHERE checklist_id=?`;

        await pool.execute(q, [title, description, instruksi, contoh_file, ws_section, peraturan, id]);
        return res.status(200).json({msg:"data updated successfully"});

    }catch(err){
        if(err.req.body){
            console.log(err);
            return res.status(403).json({errMsg:"Error in request body"});
        };
        console.log(err);
        return res.status(500).json({errMsg:'Internal Server Error"'});
    }  
};

// 3. Endpoint mendapatkan data checklist By User, Batch, dan Period
const getChecklistByUser = async (req, res) => {
    try{
        const userId = req.payload.id;
        const batch = req.params.batchId; 
        const q = ` SELECT checklistjunction.*, checklist.*
                    FROM checklistjunction 
                    LEFT JOIN checklist ON checklistjunction.checklist_id = checklist.checklist_id
                    WHERE checklistjunction.user_id=? AND checklistjunction.batch_id =? `;

        const [rows] = await pool.execute(q, [userId, batch]);
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

// 4. 
const deleteChecklist = async (req, res) => {
    console.log('deleteChecklist');
};


// 5. Fungsi menambah batch worksheet baru
const addBatch = async (req, res) => {
    try{
        const {batchInfo, period, openPeriod, closePeriod, status} = req.body; 
        const q = `INSERT INTO 
                    batch (batch_info, period, open_period, close_period, status) 
                    VALUES (?, ?, ?, ?, ?)`;
        await pool.execute(q, [batchInfo, period, openPeriod, closePeriod, status]);
        return res.status(200).json({msg:"data inserted successfully"});

    }catch(err){
        if(err.req.body){
            console.log(err);
            return res.status(403).json({errMsg:"error in request body"});
        };
        console.log(err);
        return res.status(500).json({errMsg:'Internal Server Error"'});
    }  
};

// 6. fungsi ketika user sudah submit batch junction.
const editBatch = async (req, res) => {
    // status 0 artinya batch open, status 1 artinya batch close
    try{
        const {id, batchInfo, period, openPeriod, closePeriod, status} = req.body; 
        const q = ` UPDATE batch
                    SET batch_info= ?, period=?, open_period=?, close_period=?, status=? 
                    WHERE batch_id=? `;

        await pool.execute(q, [batchInfo, period, openPeriod, closePeriod, status, id]);
        return res.status(200).json({msg:"data updated successfully"});

    }catch(err){
        if(err.req.body){
            console.log(err);
            return res.status(403).json({errMsg:"Error in request body"});
        };
        console.log(err);
        return res.status(500).json({errMsg:'Internal Server Error"'});
    }  
};

// 7. fungsi mendapatkan info batch
const getBatchByUser = async (req, res) => {
    try{ 
        const userId = req.params.userId;
        const batchId = req.params.batchId;
        const q = ` SELECT batch_junction.*, batch.batch_info, batch.periode, batch.open_period, batch.close_period, batch.status 
                    FROM batch_junction  
                    INNER JOIN batch ON batch_junction.batch_id = batch.batch_id
                    WHERE batch_junction.user_id=? AND batch_junction.batch_id=?`;

        const [rows]= await pool.execute(q, [userId, batchId]);
        return res.status(200).json({rows:rows, msg:"data retreived successfully"})
    }catch(err){
        if(err.response){
            console.log(err);
            return res.status(403).json({errMsg:"Error executing sql query"});
        };
        console.log(err);
        return res.status(500).json({errMsg:'Internal Server Error"'});
    }  
};

// 8. 
const deleteBatch = async (req, res) => {
    console.log('deleteBatch');
};

// 9.  Fungsi utama menginisiasi kertas kerja per batch. 
const assignChecklist = async (req, res) => {
    try{
        const connection = await pool.getConnection();
        const {batchId} = req.body;
        await connection.beginTransaction();
        
            // get all available user
        const q = `SELECT user_id FROM USER`;
        const [userArray] = await connection.execute(q);
        
            // get all checklist
        const q2 = `SELECT checklist_id FROM checklist`
        const [checklistArray] = await connection.execute (q2);

            // for each loop assign checklist
        userArray?.map(async (item) => {

            const userId = item.user_id;
            checklistArray?.map(async(item) => {
                
                const checklistId = item.checklist_id
                const q3 = `INSERT INTO checklistjunction(checklist_id, user_id, batch_id) VALUE (?, ?, ?)`;
                await connection.execute(q3, [checklistId, userId, batchId])
            })
        })

            // get all batch
        const q4 = `SELECT batch_id FROM batch`
        const [batchArray] = await connection.execute (q4);

            // for each loop assign batch
        userArray?.map(async (item) => {

            const userId = item.user_id;
            batchArray?.map(async(item) => {
                
                const batchId = item.batch_id;
                const q5 = `INSERT INTO batch_junction(batch_id, user_id) VALUE (?, ?)`;
                await connection.execute(q5, [batchId, userId])
            })
        })

        await connection.commit();
        return res.status(200).json({msg: `Successfuly asign checklist`})
    }catch(err){
        console.log(err);
        await connection.rollback();
    }
};


// 10. Fungsi ketika user mengisi kertas kerja
const editChecklistJunction = async (req, res) => {
    try{
        const userId = req.payload.id;
        const {csJunctionId, kppnResponse, kppnNote, kanwilNote, file1, file2} = req.body; 
        const q = ` UPDATE checklistjunction
                    SET kppn_response= ?, kppn_note=?, kanwil_note=?, file1=?, file2=? 
                    WHERE csjunction_id=? AND user_id=? `;

        await pool.execute(q, [kppnResponse, kppnNote, kanwilNote, file1, file2,csJunctionId, userId]);
        return res.status(200).json({msg:"data updated successfully"});

    }catch(err){
        if(err.userId){
            console.log(err);
            return res.status(403).json({errMsg:"Problem Authenticating"});
        };
        console.log(err);
        return res.status(500).json({errMsg:'Internal Server Error"'});
    }  
}

const editBatchJunction = async (req, res) => {
    try{
        const userId = req.payload.id;
        const {id, result, isDone, isStartSurvey, surveyStart, surveyEnd} = req.body;
        const q = `UPDATE batch_junction 
                    SET result=?, isDone=?, isStartSurvey=?, surveyStart=?, surveyEnd=?
                    WHERE junction_id=? AND user_id=?`

        const start = moment(parseInt(surveyStart)).format('YYYY-MM-DD HH:mm:ss');
        const end = moment(parseInt(surveyEnd)).format('YYYY-MM-DD HH:mm:ss');
        
        await pool.execute(q, [result, isDone, isStartSurvey, start, end, id, userId]);
        return res.status(200).json({msg:"Data updated successfully"});
    }catch(err){
        console.log(err)
    }
}


export {addChecklist, editChecklist, getChecklistByUser, deleteChecklist, addBatch, 
    editBatch, getBatchByUser, assignChecklist, editChecklistJunction, editBatchJunction}