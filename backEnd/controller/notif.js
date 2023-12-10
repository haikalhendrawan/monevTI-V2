import pool from "../config/db.js";

const getNotif = async (req, res) => {
    try{
        const userID = req.payload.id; // payload jwt yang udh di decode di middleware authenticate
        const q = `SELECT *, notifications.notif_msg, notifications.notif_title, notifications.notif_created_at, notifications.notif_type 
                    FROM notifjunction INNER JOIN notifications on notifjunction.notif_fk_id = notifications.notif_id 
                    WHERE receiver_fk_id = ?`;
        const [rows] = await pool.execute(q, [userID]);
        return res.status(200).json(rows);
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:"failed to make database query"});
    }
};

const addNotif = async (req, res) => {
    try{
        const connection = await pool.getConnection();
        const {notifTitle, notifMessage, notifType} = req.body;
        const creatorID = req.payload.id; // payload jwt yang udh di decode di middleware authenticate
        await connection.beginTransaction();
        const q = "INSERT INTO notifications(notif_title, notif_msg, notif_type) VALUES (?,?, ?)"; // masukkan data ke table notifications
        await connection.execute(q, [notifTitle, notifMessage, notifType]);

        const q1 = "SELECT MAX(notif_id) FROM notifications"; // dapetin id dari notification yg baru dibuat
        const [rows1] =  await connection.query(q1);
        const notifID = rows1[0]['MAX(notif_id)'];  

        const q2 = "SELECT user_id from user"; 
        const [rows] = await connection.query(q2);
        
        rows.map((row) => { // sebarin notif ke seluruh user
            const q3 = "INSERT INTO notifjunction(notif_fk_id, creator_fk_id, receiver_fk_id) VALUES (?, ?, ?)";
            connection.execute(q3, [notifID, creatorID, row.user_id]);
        })
        await connection.commit();
        return res.status(200).json({msg:"Data inserted successfully"});
    }catch (err){
        console.log(err);
        await connection.rollback();
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const updateNotif = async(req, res) => {
    try{
        const {notifJunctionId} = req.body;
        const creatorID = req.payload.id; // payload jwt yang udh di decode di middleware authenticate
        const q = "UPDATE notifjunction SET status = ? WHERE notif_junction_id = ? AND creator_fk_id = ?"  // masukkan data ke table notifications
        await pool.execute(q, [1, notifJunctionId, creatorID]);
        return res.status(200).json({msg:"notif updated successfully"}); 

    }catch(err){
        console.log(err);
        return res.status(500).json({ msg: "Internal Server Error" + err});
    }
}



export {getNotif, addNotif, updateNotif};