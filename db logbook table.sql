-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: monevti-v2
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `logbooktik`
--

DROP TABLE IF EXISTS `logbooktik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logbooktik` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` timestamp NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hostname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `clearance` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` int DEFAULT NULL,
  `isUnique` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logbooktik`
--

LOCK TABLES `logbooktik` WRITE;
/*!40000 ALTER TABLE `logbooktik` DISABLE KEYS */;
INSERT INTO `logbooktik` VALUES (1,'2023-01-17 17:00:00','Eka','KBN0300G450','Data pada USB drive tidak sengaja terhapus secara permanen. Query apakah masih dapat di restore','Diselesaikan dengan melakukan restore melalui  Command Prompt (CMD). input command sebagai berikut:\n\"chkdsk X: /f \" -> X = drive usb\n\"ATTRIB -H -R -S /S /D X:*.*\" -> X = drive usb',1,'0'),(2,'2023-01-25 17:00:00','Muthia M','KBNL0300G012','Akun google tidak dapat login dan sync pada google chrome. Terjadi sign in loop terus menerus saat membuka halaman chrome','Diselesaikan melalui re-sync akun google dan prevention melalui pengaktifan cookies pada chrome',1,'0'),(3,'2023-03-13 17:00:00','Multiple User','Multiple User','Tidak dapat akses ke beberapa domain website tertentu (35.186.224.25) ','penyesuaian kebijakan firewall oleh Kantor Pusat (SITP) setelah pemasangan link 1 astinet',1,'0'),(4,'2023-03-29 17:00:00','Multiple User','Multiple User','Non-Unique/Recurring case:\n\n1. Tidak dapat login akun kemenkeu/nadine/edjpb/office365\n2. Trouble akses website utama (nadine/sakti/office/dll)\n3. Lupa akun kemenkeu/nadine/edjpb/office/dll\n4. IP conflict perangkat\n5. kendala perangkat TIK (printer, driver, dll)\n6. Reset authenticator','\r\n1. cek IP, DNS, reload browser, reset akun terkait\r\n2. clear cache, cookies, history, incognito window, restart komputer\r\n3. Reset akun terkait\r\n4. penyesuaian IP configuration\r\n5. Reinstall printer/printer driver/penyesuaian IP printer/ penggantian perangkat (TURT)\r\n6. Pengajuan ke servicedesk',1,'0'),(5,'2021-10-31 17:00:00','Zainal Abidin','KBN0300G512','Terdapat konflik IP Adress pada Komputer dengan Hostname KBN0300G512. Diperlukan akses ke network setting, sedangkan User Admin PIC TIK tidak mendapatkan akses (Join Domain).','permasalahan pada kondisi Join Domain komputer yang bersangkutan. Perlu dilakukan pemindahan Organizational Unit (OU) di Active Directory Kemenkeu (akses di kantor pusat), untuk menyelesaikan masalah tersebut telah dimintakan User Admin sementara dari Hai DJPb yaitu user: .\\administrator, Pass:1S9B7a6M. User dan Password tersebut digunakan untuk mengakses komputer agar OU dapat dipindahkan oleh kantor pusat.',1,'0'),(6,'2021-12-05 17:00:00','Arsal','KBN0300G158','Setelah komputer dilakukan Join Domain dan Login menggunakan Akun Kemenkeu, pada komputer tidak ditemukan file-file lama yang tersimpan di akun sebelumnya.','Setiap user yang login komputer windows akan mendapatkan personal folder yang ada di C:\\users\\<personal folder>. Personal folder itu hanya bisa diakses dengan menggunakan akun pemilik personal folder itu. Namun akun admin PIC TIK dapat digunakan untuk mengakses semua personal folder tersebut, sehingga dilakukan login ke user admin PIC TIK kemudian dilakukan Copy Paste atas file-file yang terdapat di folder tersebut.',1,'0'),(7,'2022-03-13 17:00:00','Eka','KBN0300G452','Tidak dapat login email kemenkeu','Perlu dilakukan Reset Password email Kemenkeu, diselesaikan dengan pembuatan tiket melalui servicedesk ITSM 8.4',1,'0'),(8,'2022-03-01 17:00:00','Muhammad Maulana Khakim','KBN0300G153','Saved password pada Google Chrome tidak dapat diakses, membutuhkan user dan password akun login windows','Permsalahan tsb dapat muncul ketika suatu komputer telah di Join Domain, namun pengguna masuk (login) menggunakan akun non-kemenkeu atau (./user). Langkah penyelesaian permasalahan yaitu logout user windows-> Login menggunakan akun email kemenkeu pegawai -> buka google chrome dan sign in menggunakan akun pada user sebelumnya -> buka setting dan saved password -> saved password dapat diaksesa',1,'0'),(9,'2022-06-21 17:00:00','Mazia Gustini','KBN0300D004','MFA tidak dapat diakses untuk login OA Kemenkeu','Permasalahan muncul ketika pengguna melakukan uninstall aplikasi Google Authenticator/Microsoft Authenticator. Aplikasi OA Kemenkeu akan tetap merequest OTP sedangkan aplikasi di HP tidak akan menunjukan Kode tersebut, mengingat telah dilakukan uninstall. Diselesaikan dengan menghubungi servicedesk pusintek untuk dilakukan disable MFA, kemudian dilakukan setting ulang MFA. ',1,'0'),(10,'2022-06-05 17:00:00','Herlambang','KBN0300G158','Suspect virus CSRSS, komputer sering mengalami freeze/crash saat membuka google chrome.','Telah dilakukan check dan scanning virus, program CSRSS.exe yang berjalan merupakan program windows asli (bukan malware).  Penyebab freeze/crash disebabkan RAM Laptop yang kecil (2GB), untuk mencegah terjadi freeze/crash agar meminimalisir penggunaan Tab Chrome',1,'0'),(11,'2022-05-03 17:00:00','Fazrul Ichsan','KBN0300G577','Komputer lambat, sulit membuka tab chrome dan file.','Dilakukan pengecekan memory dan CPU Usage melalui task manager. Scheduled scan Anti Virus sedang berjalan memakan CPU usage yang cukup besar. Diselesaikan dengan melakukan force stop antivirus sementara, serta merubah power plan ke High performance di control panel. ',1,'0'),(12,'2022-04-10 17:00:00','Syafrizal','KBN0300G264','Tidak dapat login e-djpb','Pengguna belum memiliki akun Digit. Penyelesaian dilakukan dengan membuat akun Digit baru.',1,'0'),(13,'2022-05-19 17:00:00','Agus Pranoto','KBN0300G240','Tidak dapat login email kemenkeu','Disebabkan pengguna lupa password email kemenkeu. Diselesaikan melalui penyampaian tiket ke Servicedesk Pusintek ITSM 8.4',1,'0'),(14,'2022-07-06 17:00:00','Resty','Win-User','Printer tidak terdetect - telah diinstal driver melalui Web Browser','Driver yang bersumber dari Web Browser tidak support. Diselesaikan dengan install driver melalui CD Driver',1,'0'),(15,'2022-07-10 17:00:00','Benny','KBN0300G600','Komputer tidak dapat booting (Startup Repair Loop)','Disebabkan spesifikasi komputer yang rendah, diselesaikan dengan Reinstall Windows',1,'0'),(16,'2022-07-17 17:00:00','Eka, Aldo, Syafrizal','KBN0300G459, KBN0300G264, KBN0300G241','aplikasi SAKTI/OA tidak dapat diakses (stuck loading)','Permasalahan sejenis dapat diselesaikan melalui beberapa cara antara lain: Clear cache browser, clear cookies, gunakan incognito, ganti browser, update browser, restart komputer',1,'0'),(17,'2022-07-19 17:00:00','Simis','KBN0300G523','File PDF tidak dapat di read dan di Print','Dilakukan perubahan default software pembuka file PDF ke nitro reader',1,'0'),(18,'2022-07-24 17:00:00','Yasmi, Eka','KBN0300D006, KBN0300G459','Zoom tidak dapat diinstall','Disebabkan versi zoom installer yang bermasalah, dilakukan instalasi menggunakan file installer versi lebih rendah.',1,'0'),(19,'2022-08-21 17:00:00','Line Jaringan Komputer Es-4','','Line jaringan mati pada beberapa komputer, status kabel LAN ter connect','Dilakukan penyesuaian port di Switch. Port 47 di switch 1 terhubung ke port 47 di switch 2, dipindahkan menjadi port 47 di switch 1 ke port 48 di switch 2 (port Uplink)',1,'0'),(20,'2022-09-18 17:00:00','Resty dan akun PPA 1','Win-User','Data User kemenkeu terindikasi bocor berdasarkan ND-1340/PB.8/2022','Disebabkan instalasi software tidak resmi, dan komputer tidak support join domain. Penyelesaian dilakukan dengan reset password melalui servicedesk, instalasi anti virus, dan re-join domain',1,'0'),(21,'2022-09-29 17:00:00','Heru Priyantono','KBN0300G150','Komputer tidak dapat booting (Startup Repair Loop)','Disebabkan spesifikasi komputer yang rendah, diselesaikan dengan Reinstall Windows. Data di Harddisk dapat dipindahkan melalui adaptor. Disarankan agar saat booting computer tidak terdapat usb yang terconnect.',0,'0'),(22,'2022-11-14 17:00:00','Syafrizal','KBN0300G264','Join Printer PPA 1 tidak terdetect, sehingga tidak dapat melakukan print file','IP Conflict Printer Brother (IP 124) dan Printer HP (IP 124). Masalah diselesaikan dengan penyesuaian IP Printer HP ke (126)',1,'0'),(23,'2022-11-17 17:00:00','Muthia','KBN0300G409','Tidak dapat remote access computer','Sesuai dengan ND-352/PB.8/2020 Remote access computer non-SPAN memerlukan permintaan akses ke kantor pusat. Masalah diselesaikan melalui penyediaan form permintaan remote akses.',1,'0'),(24,'2022-12-05 17:00:00','Asep','KBN0300G403','Konsep nadine satu kemenkeu tidak dapat sync dengan office word online (request otp tidak masuk ke sms di Hp)','Hp mengakomodir dua sim card, namun hanya satu yang dapat aktif, masalah diselesaikan dengan restart setting SIM card yang aktif dan clear history sms lama dari microsoft',1,'0');
/*!40000 ALTER TABLE `logbooktik` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-25 17:18:04
