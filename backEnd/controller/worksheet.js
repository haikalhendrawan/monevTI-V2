import pool from "../config/db.js";


// 1. Endpoint mendapatkan data checklist By User, Batch, dan Period
const addChecklist = async (req, res) => {
    try{
        const {title, description, instruksi, contoh_file, ws_section, peraturan} = req.body; 
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
        const {batch} = req.body; 
        const q = ` SELECT * FROM checklistjunction WHERE user_id=? & batch_id =? `;

        [rows] = await pool.execute(q, [userId, batch]);
        return res.status(200).json({rows:rows, msg:"data updated successfully"});

    }catch(err){
        if(err.req.userId){
            console.log(err);
            return res.status(403).json({errMsg:"Authentication failed"});
        };
        if(err.req.body){
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

// 6. 
const editBatch = async (req, res) => {
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

// 7. 
const getBatch = async (req, res) => {
    try{ 
        const q = ` SELECT * FROM batch `;

        const [rows]= await pool.execute(q);
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

// 9. 
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

        // for each loop assign
        checklistArray?.map(async (item) => {

            const checklistId = item.checklist_id
            userArray?.map(async(item) => {
                
                const userId = item.user_id;
                const q3 = `INSERT INTO checklistjunction(checklist_id, user_id, batch_id) VALUE (?, ?, ?)`;
                await connection.execute(q3, [checklistId, userId, batchId])
            })
        })

        await connection.commit();
        return res.status(200).json({msg: `Successfuly asign checklist`})
    }catch(err){
        console.log(err);
        await connection.rollback();

    }
};

const editChecklistJunction = async (req, res) => {

}


export {addChecklist, editChecklist, getChecklistByUser, deleteChecklist, addBatch, editBatch, getBatch, assignChecklist}