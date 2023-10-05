import pool from "../config/db.js";

const getNotif = async (req, res) => {
    try{
        const userID = req.payload.id;
        const q = `SELECT *, notifications.notif_msg, notifications.notif_title, notifications.notif_created_at, notifications.notif_type 
                    FROM notifjunction INNER JOIN notifications on notifjunction.notif_fk_id = notifications.notif_id 
                    WHERE receiver_fk_id = ?`;
        const [rows] = await pool.execute(q, [userID]);
        res.status(200).json(rows);
    }catch(err){
        res.status(500).json({msg:"failed to make database query"});
        console.log(err);
    }
}

const addNotif = async (req, res) => {
    const {notifTitle, notifMessage, notifType} = req.body;
    const creatorID = req.payload.id;
    try{
        await pool.beginTransaction();
        const q = "INSERT INTO notifications(notif_title, notif_msg, notif_type) VALUES (?,?, ?)"; // masukkan data ke table notifications
        await pool.execute(q, [notifTitle, notifMessage, notifType]);

        const q1 = "SELECT MAX(notif_id) FROM notifications";
        const [rows1] =  await pool.query(q1);
        const notifID = rows1[0]['MAX(notif_id)'];  

        const q2 = "SELECT user_id from user";
        const [rows] = await pool.query(q2);
        
        rows.map((row) => {
            const q3 = "INSERT INTO notifjunction(notif_fk_id, creator_fk_id, receiver_fk_id) VALUES (?, ?, ?)";
            pool.execute(q3, [notifID, creatorID, row.user_id]);
        })
        await pool.commit();
        res.status(200).json({msg:"Data inserted successfully"});
    }catch (err){
        console.log(err);
        await pool.rollback();
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export {getNotif, addNotif};