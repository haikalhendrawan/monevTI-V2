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
-- Table structure for table `app`
--

DROP TABLE IF EXISTS `app`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app` (
  `app_id` int NOT NULL AUTO_INCREMENT,
  `app_name` varchar(45) DEFAULT NULL,
  `app_desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`app_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app`
--

LOCK TABLES `app` WRITE;
/*!40000 ALTER TABLE `app` DISABLE KEYS */;
INSERT INTO `app` VALUES (0,'span',NULL),(1,'sakti',NULL),(2,'lainnya',NULL);
/*!40000 ALTER TABLE `app` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch`
--

DROP TABLE IF EXISTS `batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch` (
  `batch_id` int NOT NULL AUTO_INCREMENT,
  `batch_info` varchar(255) DEFAULT NULL,
  `periode` int DEFAULT NULL,
  `open_period` timestamp NULL DEFAULT NULL,
  `close_period` timestamp NULL DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `date_updated` date DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`batch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch`
--

LOCK TABLES `batch` WRITE;
/*!40000 ALTER TABLE `batch` DISABLE KEYS */;
INSERT INTO `batch` VALUES (0,'Monitoring TIK Semester 1 2023',0,'2023-12-18 17:00:00','2023-12-29 16:59:59','2023-12-11',NULL,0);
/*!40000 ALTER TABLE `batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batch_junction`
--

DROP TABLE IF EXISTS `batch_junction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch_junction` (
  `junction_id` int NOT NULL AUTO_INCREMENT,
  `batch_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `time_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `time_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `result` varchar(255) DEFAULT NULL,
  `isDone` int DEFAULT '0',
  `isStartSurvey` int DEFAULT '0',
  `surveyStart` timestamp NULL DEFAULT NULL,
  `surveyEnd` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`junction_id`),
  KEY `batchId_idx` (`batch_id`),
  KEY `userid_batchjunction_idx` (`user_id`),
  CONSTRAINT `batchId` FOREIGN KEY (`batch_id`) REFERENCES `batch` (`batch_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `userid_batchjunction` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_junction`
--

LOCK TABLES `batch_junction` WRITE;
/*!40000 ALTER TABLE `batch_junction` DISABLE KEYS */;
INSERT INTO `batch_junction` VALUES (17,0,7,'2023-12-18 06:42:43','2023-12-18 10:40:36',NULL,1,1,'2023-12-18 10:39:47','2023-12-18 10:59:47'),(18,0,9,'2023-12-18 06:42:43','2023-12-22 10:08:00',NULL,1,1,'2023-12-18 10:39:47','2023-12-18 10:59:47'),(19,0,11,'2023-12-18 06:42:43',NULL,NULL,0,0,NULL,NULL),(20,0,12,'2023-12-18 06:42:43',NULL,NULL,0,0,NULL,NULL),(21,0,13,'2023-12-18 06:42:43',NULL,NULL,0,0,NULL,NULL),(22,0,14,'2023-12-18 06:42:43','2023-12-21 05:23:47',NULL,0,1,'2023-12-21 05:23:47','2023-12-21 05:43:47'),(23,0,15,'2023-12-18 06:42:43',NULL,NULL,0,0,NULL,NULL);
/*!40000 ALTER TABLE `batch_junction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checklist`
--

DROP TABLE IF EXISTS `checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checklist` (
  `checklist_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `instruksi` text,
  `contoh_file` varchar(255) DEFAULT NULL,
  `ws_section` int DEFAULT NULL,
  `peraturan` varchar(255) DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`checklist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklist`
--

LOCK TABLES `checklist` WRITE;
/*!40000 ALTER TABLE `checklist` DISABLE KEYS */;
INSERT INTO `checklist` VALUES (1,'Perangkat Palo Alto standby dengan kondisi normal dan diletakkan pada tempat yang aman','','Observasi kondisi fisik Palo Alto <br><br>File terkait: Foto Perangkat Palo Alto','1.jpg',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-12 17:00:00'),(2,'Perangkat Switch SPAN standby dengan kondisi normal dan diletakkan pada tempat yang aman','','Observasi kondisi fisik Switch SPAN <br><br>File terkait: Foto Perangkat Switch SPAN','2.jpg',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-12 17:00:00'),(3,'Perangkat Switch non SPAN standby dengan kondisi normal dan diletakkan pada tempat yang aman','','Observasi kondisi fisik Switch non SPAN <br><br>File terkait: Foto Perangkat Switch Non SPAN','3.jpg',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-12 17:00:00'),(4,'Konfigurasi Port: Modem Link 1 terhubung ke Port 8 atau Port 1 Palo Alto','','Observasi kondisi Port Palo Alto <br><br>File terkait: Foto Port pada Palo Alto dan Port di Link 1','4.pdf',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-12 17:00:00'),(5,'Konfigurasi Port: Modem Link 2 terhubung ke Port 2 Palo Alto','','Observasi kondisi Port Palo Alto <br><br>File terkait: Foto Port pada Palo Alto dan Port di Link 2','5.pdf',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-12 17:00:00'),(6,'Konfigurasi Port: Modem Link 3 terhubung ke Port 6 Palo Alto','','Observasi kondisi Port Palo Alto <br><br>File terkait: Foto Port pada Palo Alto dan Port di Link 3','6.pdf',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-12 17:00:00'),(7,'Konfigurasi Port: Switch SPAN terhubung ke Port 5 Palo Alto','','Observasi kondisi Port Palo Alto <br><br>File terkait: Foto Port pada Palo Alto dan Port di Switch SPAN','7.pdf',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-12 17:00:00'),(8,'Konfigurasi Port: Switch non SPAN terhubung ke Port 3 Palo Alto','','Observasi kondisi Port Palo Alto <br><br>File terkait: Foto Port pada Palo Alto dan Port di Switch non SPAN','8.pdf',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-19 08:02:09'),(9,'Kabel LAN pada Switch di tata dengan baik dan diberikan penomoran','','Observasi kondisi kabel pada Switch <br><br>File terkait: Foto kabel yang tehubung dengan Switch','9.jpg',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-12 17:00:00'),(10,'Kabel LAN pada Switch menggunakan tipe Cat 6 (minimal pada Switch SPAN)','','Observasi kondisi kabel pada Switch <br><br>File terkait: Foto kabel yang tehubung dengan Switch','10.pdf',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-19 01:48:50'),(11,'Kabel LAN di wiring dengan baik dan sesuai ketentuan (TIA-568B) ','','Observasi kondisi kabel pada Switch <br><br>File terkait: Foto kabel yang tehubung dengan Switch','11.pdf',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-19 01:48:50'),(12,'Kabel keluaran dari Switch atau pada jalur lantai & dinding diproteksi secara memadai','','Observasi kondisi kabel keluaran<br><br>File terkait: Foto protektor keluaran switch atau pada jalur dinding & lantai','12.pdf',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-19 01:59:40'),(13,'Terdapat Peta Jaringan / minimal Denah Kantor','','File terkait: peta jaringan/denah kantor','13.pdf',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-12 17:00:00'),(14,'Pengamanan Fisik: Ruang server dijaga pada suhu dengan rentang ideal ','','Observasi kondisi ruang server<br><br>File terkait: Foto pengukur suhu ruang server','14.pdf',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-19 02:04:37'),(15,'Pengamanan Fisik: Minimal terdapat log pemeliharaan AC dan/atau UPS pada ruang server','','Observasi kondisi ruang server<br><br>File terkait: Foto log pemeliharaan ruang server','15.pdf',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-19 02:07:37'),(16,'Pengamanan Fisik: Ruang server tidak digunakan untuk kepentingan lain (ex.gudang, tempat kerja)','','Observasi kondisi ruang server<br><br>File terkait: Foto ruang server','16.pdf',1,'SE-93/PB/2016','2023-12-11 17:00:00','2023-12-19 02:12:04'),(17,'Komputer/laptop yang terhubung ke jaringan kemenkeu telah ter Join Domain','','Lakukan scanning pada Aplikasi IP Scanner sebagaimana panduan<br><br>File terkait: print out Scan jaringan pada IP Scanner','17.pdf',2,'SE-19/MK.1/2018, S-9258/PB/2016','2023-12-11 17:00:00','2023-12-12 17:00:00'),(18,'Penamaan Join Domain seluruh perangkat telah sesuai ketentuan ','','Lakukan scanning pada Aplikasi IP Scanner sebagaimana panduan<br><br>File terkait: print out Scan jaringan pada IP Scanner','18.pdf',2,'SE-19/MK.1/2018, S-9258/PB/2016','2023-12-11 17:00:00','2023-12-19 08:02:09'),(19,'Komputer/laptop telah terinstall Antivirus McAfee/Trellix','','File terkait: screenshot/foto konfigurasi antivirus pada perangkat','19.pdf',2,'KMK-942/2019 & PER-1/PB/2021','2023-12-11 17:00:00','2023-12-19 02:20:29'),(20,'Spesifikasi perangkat sesuai dengan standar','','Win+R->ketik msinfo32->enter<br><br>Filter terkait:Screenshot/foto msinfo32','20.pdf',2,'KCIO 1/SA.08/2022','2023-12-11 17:00:00','2023-12-19 02:20:29'),(21,'Komputer/laptop telah terinstall Office Desktop (lisensi LTSC)','','File terkait: screenshot/foto ms office -> menu account -> product information','21.pdf',2,'ND-1820/PB.8/2022','2023-12-11 17:00:00','2023-12-19 02:20:29'),(22,'Komputer/laptop telah terinstall OneDrive dan Ms Teams','','File terkait: screenshot/foto installed app windows','22.pdf',2,'ND-1820/PB.8/2022','2023-12-11 17:00:00','2023-12-19 02:20:29'),(23,'Tidak terdapat FTP/sharing folder windows   ','','Lakukan scanning pada Aplikasi IP Scanner sebagaimana panduan<br><br>File terkait: print out Scan jaringan pada IP Scanner','23.pdf',2,'ND-1892/PB.8/2022 & ND-1742/PB.8/2022','2023-12-11 17:00:00','2023-12-12 17:00:00'),(24,'Terdapat OneDrive/Sharepoint unit kerja bersama','','File terkait: screenshot/foto teams/onedrive unit kerja (kppn/seksi)','24.pdf',2,'ND-1892/PB.8/2022','2023-12-11 17:00:00','2023-12-12 17:00:00'),(25,'Konfigurasi network: Terdapat inventarisir IP Adress untuk mencegah konflik IP','','File terkait: catatan inventarisir ip perangkat pada excel/spreadsheet/lainnya','25.pdf',2,'Manual Konfigurasi IP Adress Dit. SITP','2023-12-11 17:00:00','2023-12-19 02:20:29'),(26,'Konfigurasi network: DNS pada perangkat diatur pada alamat DNS yang update','','Control Panel->Network & Internet setting<br>.<br>File terkait: screenshot/foto DNS perangkat','26.pdf',2,'Manual Konfigurasi IP Adress Dit. SITP','2023-12-11 17:00:00','2023-12-12 17:00:00'),(27,'PUTIK Terdapat pengamanan yang memadai pada jaringan nirkabel ','','Pastikan minimal wifi telah terenkripsi WPA2, pada command prompt masukan perintah \"netsh wlan show interface\"\"<br><br>File terkait: screenshot/foto Command Prompt\"','27.pdf',2,'PMK.17/PMK.09/2019','2023-12-11 17:00:00','2023-12-12 17:00:00'),(28,'PUTIK: Terdapat pemisahan jaringan nirkabel yang memadai untuk penggunaan stakeholder','','Pastikan wifi front office tidak terhubung ke jaringan kemenkeu, pada command prompt masukan perintah \"ping kemenkeu.go.id\"\"<br><br>File terkait: screenshot/foto Command Prompt\"','28.pdf',2,'PMK.17/PMK.09/2019','2023-12-11 17:00:00','2023-12-12 17:00:00'),(29,'PUTIK: terdapat matriks akses pengguna dan sesuai dengan kondisi riil','','File terkait: SK User SAKTI/SPAN terakhir','29.pdf',2,'PMK.17/PMK.09/2019','2023-12-11 17:00:00','2023-12-12 17:00:00'),(30,'Apakah anda pernah mengikuti pelatihan/bimtek dari SITP/Pusintek? ','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(31,'Berapa lama anda telah ditugaskan sebagai PIC TIK?','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(32,'Terkait penugasan sebagai PIC TIK, apakah anda ditunjuk atau merupakan usulan diri sendiri?','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(33,'Terkait jenis pekerjaan yang dihandle sebagai PIC TIK, apakah sesuai dengan minat bakat anda?','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(34,'Jika penugasan sebagai PIC TIK bukan merupakan usulan sendiri dan tidak sesuai minat, menurut anda unit mana di KPPN yang paling ideal untuk menangani TIK?','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(35,'Selama bertugas sebagai PIC TIK, apa saja permasalahan TIK utama yang pernah anda alami?  ','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(36,'Bagaimana cara anda menyelesaikan masalah tersebut?(apabila ada)','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(37,'Apakah anda pernah melakukan crimping/wiring Kabel secara mandiri? ','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(38,'Apabila belum, bagaimana cara anda untuk menambah jaringan baru yang membutuhkan kabel LAN? (ex:membeli kabel yang sudah jadi, dll)','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(39,'Bagaimana kebijakan akses dan control pada ruang server?','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(40,'Dalam hal terdapat acara melibatkan satker (di aula/dll), bagaimana pengaturan jaringannya, apakah menggunakan WIFI atau penarikan kabel LAN atau lainnya? ','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(41,'Dalam unit kerja anda, apakah masih terdapat pengadaan lisensi zoom meeting?','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(42,'Apakah pada unit anda pernah mengadakan sosialisasi/pemahaman terkait kemanan informasi secara internal?','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(43,'Seiring berkembangnya tusi DJPb, tidak jarang pegawai membutuhkan software pendukung pekerjaan (ex: desain, video editing, dll). Menurut anda software apa yang perlu disediakan kantor kepada pegawai?','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(44,'Menurut anda, apakah jaringan intranet (melalui kabel LAN) pada unit anda memiliki kecepatan yang baik dan stabil?','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(45,'Menurut anda, apakah jaringan internet (melalui WIFI) pada unit anda memiliki kecepatan yang baik dan stabil?','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(46,'Khusus terkait jaringan WIFI, apakah anda mengetahui ada berapa Access Point di unit kerja anda saat ini?','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(47,'Apakah terdapat area yang tidak tercover WIFI pada unit kerja anda? Jika ya berikan gambaran dimana area tersebut (khusus area kerja)','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(48,'Apakah saat ini telah terdapat penyimpanan bersama pada unit anda? (menggunakan ms teams/sharepoint/onedrive)','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(49,'Jika ya, sejak kapan unit anda mengimplementasikan penyimpanan bersama tersebut? (estimasi)','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(50,'Jika ya, berapa total besaran kapasitas file yang terkandung dalam penyimpanan tersebut saat ini? (Mb/Gb/Tb)','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00'),(51,'Ditujukan kepada Kanwil/Kanpus, apakah anda mempunyai usulan untuk optimalisasi pengelolaan TIK saat ini?sampaikan ','','','',3,'','2023-12-11 17:00:00','2023-12-12 17:00:00');
/*!40000 ALTER TABLE `checklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checklistjunction`
--

DROP TABLE IF EXISTS `checklistjunction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checklistjunction` (
  `csjunction_id` int NOT NULL AUTO_INCREMENT,
  `checklist_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `batch_id` int DEFAULT NULL,
  `kppn_response` int DEFAULT NULL,
  `kppn_note` text,
  `kanwil_note` text,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `file1` varchar(255) DEFAULT NULL,
  `file2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`csjunction_id`),
  KEY `checklistid_idx` (`checklist_id`),
  KEY `userid_checklistjunction_idx` (`user_id`),
  KEY `batchid_checklistjunction_idx` (`batch_id`),
  CONSTRAINT `batchid_checklistjunction` FOREIGN KEY (`batch_id`) REFERENCES `batch` (`batch_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `checklistid` FOREIGN KEY (`checklist_id`) REFERENCES `checklist` (`checklist_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `userid_checklistjunction` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklistjunction`
--

LOCK TABLES `checklistjunction` WRITE;
/*!40000 ALTER TABLE `checklistjunction` DISABLE KEYS */;
INSERT INTO `checklistjunction` VALUES (104,1,7,0,2,'Sesuai dengan kondisi yang ada dan dapat diteruskan','Sesuai dengan kondisi yang ada dan dapat diteruskan','2023-12-18 06:42:43','2023-12-22 21:56:08',NULL,NULL),(105,2,7,0,1,'sesuai dengan kondisi yang ada dan dapat diteruskan','sesuai dengan kondisi yang ada dan dapat diteruskan','2023-12-18 06:42:43','2023-12-22 21:56:46',NULL,NULL),(106,3,7,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-19 10:00:28',NULL,NULL),(107,4,7,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:01',NULL,NULL),(108,5,7,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:03',NULL,NULL),(109,6,7,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:04',NULL,NULL),(110,7,7,0,1,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:06',NULL,NULL),(111,8,7,0,0,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:07',NULL,NULL),(112,9,7,0,1,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:09',NULL,NULL),(113,10,7,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:10',NULL,NULL),(114,11,7,0,1,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:11',NULL,NULL),(115,12,7,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:13',NULL,NULL),(116,13,7,0,1,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:14',NULL,NULL),(117,14,7,0,0,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:16',NULL,NULL),(118,15,7,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:18',NULL,NULL),(119,16,7,0,1,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:19',NULL,NULL),(120,17,7,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:25',NULL,NULL),(121,18,7,0,0,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:27',NULL,NULL),(122,19,7,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:29',NULL,NULL),(123,20,7,0,1,NULL,NULL,'2023-12-18 06:42:43','2023-12-20 05:39:14',NULL,NULL),(124,21,7,0,1,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:32',NULL,NULL),(125,22,7,0,1,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:33',NULL,NULL),(126,23,7,0,0,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:35',NULL,NULL),(127,24,7,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:36',NULL,NULL),(128,25,7,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:38',NULL,NULL),(129,26,7,0,1,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:39',NULL,NULL),(130,27,7,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:40',NULL,NULL),(131,28,7,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:42',NULL,NULL),(132,29,7,0,1,NULL,NULL,'2023-12-18 06:42:43','2023-12-18 10:39:43',NULL,NULL),(133,30,7,0,1,'a',NULL,'2023-12-18 06:42:43','2023-12-18 10:39:49',NULL,NULL),(134,31,7,0,1,'s',NULL,'2023-12-18 06:42:43','2023-12-18 10:39:50',NULL,NULL),(135,32,7,0,1,'b',NULL,'2023-12-18 06:42:43','2023-12-18 10:39:51',NULL,NULL),(136,33,7,0,1,'c',NULL,'2023-12-18 06:42:43','2023-12-18 10:39:51',NULL,NULL),(137,34,7,0,1,'d',NULL,'2023-12-18 06:42:43','2023-12-18 10:39:52',NULL,NULL),(138,35,7,0,1,'a',NULL,'2023-12-18 06:42:43','2023-12-18 10:39:53',NULL,NULL),(139,36,7,0,1,'e',NULL,'2023-12-18 06:42:43','2023-12-18 10:39:54',NULL,NULL),(140,37,7,0,1,'f',NULL,'2023-12-18 06:42:43','2023-12-18 10:39:54',NULL,NULL),(141,38,7,0,1,'e',NULL,'2023-12-18 06:42:43','2023-12-18 10:39:55',NULL,NULL),(142,39,7,0,1,'f',NULL,'2023-12-18 06:42:43','2023-12-18 10:39:57',NULL,NULL),(143,40,7,0,1,'q',NULL,'2023-12-18 06:42:43','2023-12-18 10:39:57',NULL,NULL),(144,41,7,0,1,'a',NULL,'2023-12-18 06:42:43','2023-12-18 10:39:59',NULL,NULL),(145,42,7,0,1,'e',NULL,'2023-12-18 06:42:43','2023-12-18 10:40:00',NULL,NULL),(146,43,7,0,1,'q',NULL,'2023-12-18 06:42:43','2023-12-18 10:40:01',NULL,NULL),(147,44,7,0,1,'q',NULL,'2023-12-18 06:42:43','2023-12-18 10:40:02',NULL,NULL),(148,45,7,0,1,'a',NULL,'2023-12-18 06:42:43','2023-12-18 10:40:03',NULL,NULL),(149,46,7,0,1,'e',NULL,'2023-12-18 06:42:43','2023-12-18 10:40:04',NULL,NULL),(150,47,7,0,1,'e',NULL,'2023-12-18 06:42:43','2023-12-18 10:40:05',NULL,NULL),(151,48,7,0,1,'q',NULL,'2023-12-18 06:42:43','2023-12-18 10:40:06',NULL,NULL),(152,49,7,0,1,'e',NULL,'2023-12-18 06:42:43','2023-12-18 10:40:07',NULL,NULL),(153,50,7,0,1,'f',NULL,'2023-12-18 06:42:43','2023-12-18 10:40:08',NULL,NULL),(154,51,7,0,1,'f',NULL,'2023-12-18 06:42:43','2023-12-18 10:40:13',NULL,NULL),(155,1,9,0,2,'','','2023-12-18 06:42:43','2023-12-22 09:54:08',NULL,NULL),(156,2,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:54:09',NULL,NULL),(157,3,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:54:12',NULL,NULL),(158,4,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:54:16',NULL,NULL),(159,5,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:54:18',NULL,NULL),(160,6,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:54:25',NULL,NULL),(161,7,9,0,1,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:54:29',NULL,NULL),(162,8,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:54:31',NULL,NULL),(163,9,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:54:33',NULL,NULL),(164,10,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:54:41',NULL,NULL),(165,11,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:54:52',NULL,NULL),(166,12,9,0,0,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:55:01',NULL,NULL),(167,13,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:55:02',NULL,NULL),(168,14,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:55:04',NULL,NULL),(169,15,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:55:09',NULL,NULL),(170,16,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:55:10',NULL,NULL),(171,17,9,0,2,'Sudah sesuai','Sudah sesuai','2023-12-18 06:42:43','2023-12-22 09:56:10',NULL,NULL),(172,18,9,0,0,'Sudah sesuai','Sudah sesuai','2023-12-18 06:42:43','2023-12-22 09:56:02',NULL,NULL),(173,19,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:55:24',NULL,NULL),(174,20,9,0,0,'Sudah sesuai','Sudah sesuai','2023-12-18 06:42:43','2023-12-22 09:56:01',NULL,NULL),(175,21,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:55:37',NULL,NULL),(176,22,9,0,1,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:55:38',NULL,NULL),(177,23,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:55:40',NULL,NULL),(178,24,9,0,2,'Sudah sesuai','Sudah sesuai','2023-12-18 06:42:43','2023-12-22 09:56:00',NULL,NULL),(179,25,9,0,1,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:55:43',NULL,NULL),(180,26,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:55:44',NULL,NULL),(181,27,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:55:46',NULL,NULL),(182,28,9,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 09:55:47',NULL,NULL),(183,29,9,0,2,'Sudah sesuai','Sudah sesuai','2023-12-18 06:42:43','2023-12-22 09:55:58',NULL,NULL),(184,30,9,0,1,'Sudah diisi',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:25',NULL,NULL),(185,31,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:34',NULL,NULL),(186,32,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:36',NULL,NULL),(187,33,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:37',NULL,NULL),(188,34,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:38',NULL,NULL),(189,35,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:39',NULL,NULL),(190,36,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:40',NULL,NULL),(191,37,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:42',NULL,NULL),(192,38,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:43',NULL,NULL),(193,39,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:44',NULL,NULL),(194,40,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:45',NULL,NULL),(195,41,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:53',NULL,NULL),(196,42,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:54',NULL,NULL),(197,43,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:55',NULL,NULL),(198,44,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:56',NULL,NULL),(199,45,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:56',NULL,NULL),(200,46,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:56:57',NULL,NULL),(201,47,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:57:00',NULL,NULL),(202,48,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:57:00',NULL,NULL),(203,49,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:57:01',NULL,NULL),(204,50,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:57:02',NULL,NULL),(205,51,9,0,1,'Sudah betul',NULL,'2023-12-18 06:42:43','2023-12-22 09:57:08',NULL,NULL),(206,1,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(207,2,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(208,3,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(209,4,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(210,5,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(211,6,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(212,7,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(213,8,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(214,9,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(215,10,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(216,11,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(217,12,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(218,13,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(219,14,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(220,15,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(221,16,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(222,17,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(223,18,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(224,19,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(225,20,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(226,21,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(227,22,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(228,23,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(229,24,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(230,25,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(231,26,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(232,27,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(233,28,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(234,29,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(235,30,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(236,31,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(237,32,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(238,33,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(239,34,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(240,35,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(241,36,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(242,37,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(243,38,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(244,39,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(245,40,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(246,41,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(247,42,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(248,43,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(249,44,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(250,45,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(251,46,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(252,47,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(253,48,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(254,49,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(255,50,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(256,51,11,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(257,1,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(258,2,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(259,3,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(260,4,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(261,5,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(262,6,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(263,7,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(264,8,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(265,9,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(266,10,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(267,11,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(268,12,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(269,13,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(270,14,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(271,15,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(272,16,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(273,17,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(274,18,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(275,19,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(276,20,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(277,21,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(278,22,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(279,23,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(280,24,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(281,25,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(282,26,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(283,27,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(284,28,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(285,29,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(286,30,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(287,31,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(288,32,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(289,33,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(290,34,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(291,35,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(292,36,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(293,37,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(294,38,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(295,39,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(296,40,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(297,41,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(298,42,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(299,43,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(300,44,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(301,45,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(302,46,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(303,47,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(304,48,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(305,49,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(306,50,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(307,51,12,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(308,1,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(309,2,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(310,3,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(311,4,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(312,5,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(313,6,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(314,7,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(315,8,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(316,9,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(317,10,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(318,11,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(319,12,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(320,13,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(321,14,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(322,15,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(323,16,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(324,17,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(325,18,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(326,19,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(327,20,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(328,21,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(329,22,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(330,23,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(331,24,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(332,25,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(333,26,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(334,27,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(335,28,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(336,29,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(337,30,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(338,31,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(339,32,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(340,33,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(341,34,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(342,35,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(343,36,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(344,37,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(345,38,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(346,39,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(347,40,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(348,41,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(349,42,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(350,43,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(351,44,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(352,45,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(353,46,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(354,47,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(355,48,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(356,49,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(357,50,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(358,51,13,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(359,1,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(360,2,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(361,3,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(362,4,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(363,5,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(364,6,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(365,7,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(366,8,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(367,9,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(368,10,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(369,11,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(370,12,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(371,13,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(372,14,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(373,15,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(374,16,14,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(375,17,14,0,2,'Hasil IP Scan pada IP 10.21.77.1 - 10.21.77.254','Hasil IP Scan pada IP 10.21.77.1 - 10.21.77.254','2023-12-18 06:42:43','2023-12-22 06:50:04','17_2_K077_1_1703227492392.jpeg',NULL),(376,18,14,0,2,'Hasil IP Scan pada IP 10.21.77.1 - 10.21.77.254','Hasil IP Scan pada IP 10.21.77.1 - 10.21.77.254','2023-12-18 06:42:43','2023-12-22 06:50:21','18_2_K077_1_1703227514395.jpeg',NULL),(377,19,14,0,2,'Sample Pada Laptop dengan Hostname KBNL0305G123','Sample Pada Laptop dengan Hostname KBNL0305G123','2023-12-18 06:42:43','2023-12-22 06:51:32','19_2_K077_1_1703227691678.jpeg',NULL),(378,20,14,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 06:49:38','20_2_K077_1_1703227769179.jpeg',NULL),(379,21,14,0,2,'Sample Pada Laptop dengan Hostname KBNL0305G123','Sample Pada Laptop dengan Hostname KBNL0305G123','2023-12-18 06:42:43','2023-12-22 06:56:08','21_2_K077_1_1703227945381.jpeg',NULL),(380,22,14,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 06:56:34','22_2_K077_1_1703228191765.jpeg',NULL),(381,23,14,0,2,'Hasil IP Scan pada IP 10.21.77.1 - 10.21.77.254','Hasil IP Scan pada IP 10.21.77.1 - 10.21.77.254','2023-12-18 06:42:43','2023-12-22 06:57:27','23_2_K077_1_1703228222015.jpeg',NULL),(382,24,14,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 07:17:54',NULL,NULL),(383,25,14,0,2,'Menggunakan DHCP','Menggunakan DHCP','2023-12-18 06:42:43','2023-12-22 06:59:32','25_2_K077_1_1703228362681.jpeg',NULL),(384,26,14,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 07:01:03','26_2_K077_1_1703228432414.jpeg',NULL),(385,27,14,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 07:01:51','27_2_K077_1_1703228502563.jpeg',NULL),(386,28,14,0,2,'tamu tidak dapat akses ke IP local','tamu tidak dapat akses ke IP local','2023-12-18 06:42:43','2023-12-22 07:10:23','28_2_K077_1_1703229003424.jpeg',NULL),(387,29,14,0,2,NULL,NULL,'2023-12-18 06:42:43','2023-12-22 07:12:26','29_2_K077_1_1703229136946.jpeg',NULL),(388,30,14,0,1,'Pernah',NULL,'2023-12-18 06:42:43','2023-12-21 05:23:57',NULL,NULL),(389,31,14,0,1,'1 tahun',NULL,'2023-12-18 06:42:43','2023-12-21 05:24:07',NULL,NULL),(390,32,14,0,1,'ditunjuk',NULL,'2023-12-18 06:42:43','2023-12-21 05:24:12',NULL,NULL),(391,33,14,0,1,'sesuai',NULL,'2023-12-18 06:42:43','2023-12-21 05:24:17',NULL,NULL),(392,34,14,0,1,'Subbagian Umum',NULL,'2023-12-18 06:42:43','2023-12-21 05:24:48',NULL,NULL),(393,35,14,0,1,'1. Permasalahan Jaringan\n2. Permasalahan Perangkat End User.\n3. Kurangnya Pemahaman end user terkait TIK.',NULL,'2023-12-18 06:42:43','2023-12-21 05:26:18',NULL,NULL),(394,36,14,0,1,'Melakukan Investigasi terhadap permasalahan untuk dapat dicari solusi baik Solusi Temporer maupun Solusi Permanen atas permasalahan tersebut.',NULL,'2023-12-18 06:42:43','2023-12-21 05:27:20',NULL,NULL),(395,37,14,0,1,'pernah',NULL,'2023-12-18 06:42:43','2023-12-21 05:27:30',NULL,NULL),(396,38,14,0,1,'-',NULL,'2023-12-18 06:42:43','2023-12-21 05:28:27',NULL,NULL),(397,39,14,0,1,'Authorized Personel Only',NULL,'2023-12-18 06:42:43','2023-12-21 05:27:53',NULL,NULL),(398,40,14,0,1,'Menggunakan Wifi',NULL,'2023-12-18 06:42:43','2023-12-21 05:27:59',NULL,NULL),(399,41,14,0,1,'Ya',NULL,'2023-12-18 06:42:43','2023-12-21 05:28:25',NULL,NULL),(400,42,14,0,1,'Pernah',NULL,'2023-12-18 06:42:43','2023-12-21 05:28:38',NULL,NULL),(401,43,14,0,1,'Canva',NULL,'2023-12-18 06:42:43','2023-12-21 05:28:54',NULL,NULL),(402,44,14,0,1,'Ya',NULL,'2023-12-18 06:42:43','2023-12-21 05:28:59',NULL,NULL),(403,45,14,0,1,'Ya',NULL,'2023-12-18 06:42:43','2023-12-21 05:29:02',NULL,NULL),(404,46,14,0,1,'Ya',NULL,'2023-12-18 06:42:43','2023-12-21 05:29:08',NULL,NULL),(405,47,14,0,1,'Tidak',NULL,'2023-12-18 06:42:43','2023-12-21 05:29:18',NULL,NULL),(406,48,14,0,1,'Ya',NULL,'2023-12-18 06:42:43','2023-12-21 05:29:22',NULL,NULL),(407,49,14,0,1,'Sejak tahun 2020',NULL,'2023-12-18 06:42:43','2023-12-21 05:29:41',NULL,NULL),(408,50,14,0,1,'50 GB',NULL,'2023-12-18 06:42:43','2023-12-21 05:29:53',NULL,NULL),(409,51,14,0,1,'1. Ada Honor Pengelola TIK\n2. KPPN tipe A2 mendapatkan pemasangan Akses Point dari Kantor Pusat',NULL,'2023-12-18 06:42:43','2023-12-21 05:31:15',NULL,NULL),(410,1,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(411,2,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(412,3,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(413,4,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(414,5,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(415,6,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(416,7,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(417,8,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(418,9,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(419,10,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(420,11,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(421,12,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(422,13,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(423,14,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(424,15,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(425,16,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(426,17,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(427,18,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(428,19,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(429,20,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(430,21,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(431,22,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(432,23,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(433,24,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(434,25,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(435,26,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(436,27,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(437,28,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(438,29,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(439,30,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(440,31,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(441,32,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(442,33,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(443,34,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(444,35,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(445,36,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(446,37,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(447,38,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(448,39,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(449,40,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(450,41,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(451,42,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(452,43,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(453,44,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(454,45,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(455,46,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(456,47,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(457,48,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(458,49,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(459,50,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL),(460,51,15,0,NULL,NULL,NULL,'2023-12-18 06:42:43',NULL,NULL,NULL);
/*!40000 ALTER TABLE `checklistjunction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iasset`
--

DROP TABLE IF EXISTS `iasset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iasset` (
  `iasset_id` int NOT NULL AUTO_INCREMENT,
  `iasset_name` varchar(45) DEFAULT NULL,
  `iasset_desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`iasset_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iasset`
--

LOCK TABLES `iasset` WRITE;
/*!40000 ALTER TABLE `iasset` DISABLE KEYS */;
INSERT INTO `iasset` VALUES (0,'Laptop',NULL),(1,'Printer',NULL),(2,'Scanner',NULL),(3,'UPS',NULL),(4,'Genset',NULL),(5,'Router',NULL),(6,'Switch',NULL),(7,'Tablet',NULL),(8,'Komputer',NULL);
/*!40000 ALTER TABLE `iasset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iassetcondition`
--

DROP TABLE IF EXISTS `iassetcondition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iassetcondition` (
  `condition_id` int NOT NULL AUTO_INCREMENT,
  `condition_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`condition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iassetcondition`
--

LOCK TABLES `iassetcondition` WRITE;
/*!40000 ALTER TABLE `iassetcondition` DISABLE KEYS */;
INSERT INTO `iassetcondition` VALUES (0,'Baik'),(1,'Rusak Ringan'),(2,'Rusak Berat');
/*!40000 ALTER TABLE `iassetcondition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iassetcpu`
--

DROP TABLE IF EXISTS `iassetcpu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iassetcpu` (
  `cpu_id` int NOT NULL AUTO_INCREMENT,
  `cpu_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cpu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iassetcpu`
--

LOCK TABLES `iassetcpu` WRITE;
/*!40000 ALTER TABLE `iassetcpu` DISABLE KEYS */;
INSERT INTO `iassetcpu` VALUES (0,'Intel Core i3'),(1,'Intel Core i5'),(2,'Intel Core i7'),(3,'Lainnya');
/*!40000 ALTER TABLE `iassetcpu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iassetjunction`
--

DROP TABLE IF EXISTS `iassetjunction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iassetjunction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jenis_perangkat` int DEFAULT NULL,
  `hostname` varchar(255) DEFAULT NULL,
  `nama_pegawai` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `tahun` varchar(255) DEFAULT NULL,
  `kondisi` int DEFAULT NULL,
  `cpu` int DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `ram` varchar(255) DEFAULT NULL,
  `storage` varchar(255) DEFAULT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `catatan` varchar(255) DEFAULT NULL,
  `kppn` int DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `periode` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_jenisperangkat_idx` (`jenis_perangkat`),
  KEY `fk_kondisi_idx` (`kondisi`),
  KEY `fk_cpu_idx` (`cpu`),
  KEY `fk_kppn_idx` (`kppn`),
  KEY `fk_periode_idx` (`periode`),
  CONSTRAINT `fk_cpu` FOREIGN KEY (`cpu`) REFERENCES `iassetcpu` (`cpu_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_jenisperangkat` FOREIGN KEY (`jenis_perangkat`) REFERENCES `iasset` (`iasset_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_kondisi` FOREIGN KEY (`kondisi`) REFERENCES `iassetcondition` (`condition_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_kppn` FOREIGN KEY (`kppn`) REFERENCES `kppn` (`kppn_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_periode` FOREIGN KEY (`periode`) REFERENCES `periode` (`periode_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iassetjunction`
--

LOCK TABLES `iassetjunction` WRITE;
/*!40000 ALTER TABLE `iassetjunction` DISABLE KEYS */;
INSERT INTO `iassetjunction` VALUES (65,0,'KBN0300G001','Muhammad Haikal Putra H','HP Laserjet Pro M412','2023',0,3,'','','','','',0,'2023-12-19 07:42:06','2023-12-22 21:59:58',1),(66,7,'','','DELL N1458P','2019',0,3,'','','','','',0,'2023-12-20 01:35:58',NULL,1),(68,1,'KBNL0305G123','Radi Ariska Putra','Lenovo Ideapad 330','2018',0,3,'Dynamic IP','8','256','PF19V3JT','laptop untuk kerja',5,'2023-12-20 04:08:37','2023-12-20 04:09:25',1),(69,1,'KBNL0305G114','Rahmat Diky Septrata','Acer Travelmate TMP214','2022',0,3,'Dynamic IP','8','240','UNVU7SD00G244001FB0601','Digunakan untuk operasional pegawai',5,'2023-12-20 04:35:28','2023-12-20 05:13:44',1),(70,1,'KBNL0305G107','Nadhilah Bunga Foureska','Acer TravelMate14','2022',0,3,'Dynamic IP','8','240','UNVU7SD00G244009900601','Digunakan untuk operasional pegawai',5,'2023-12-20 04:37:18',NULL,1),(71,1,'KBNL0305G108','Pipit Setyo Nugroho','Acer Travelmate TMP214','2022',0,3,'Dynamic IP','8','240','UNVU7SD00G244006370601','Digunakan untuk Operasional Pegawai',5,'2023-12-20 05:13:19','2023-12-20 05:21:00',1),(72,1,'KBNL0305G109','Utari Dwi Nelvenia','Acer Travelmate TMP214','2022',0,3,'Dynamic IP','8','240','UNVU7SD00G244006310601','',5,'2023-12-20 05:16:02',NULL,1),(73,1,'KBNL0305G110','Arliza Yurita','Acer Travelmate TMP214','2022',0,3,'Dynamic IP','8','240','UNVU7SD00G244003790601','',5,'2023-12-20 05:17:08',NULL,1),(74,1,'KBNL0305G111','Dwidyavitri Sarfaldi','Acer Travelmate TMP214','2023',0,3,'Dynamic IP','8','240','UNVU7SD00G24401AD40601','',5,'2023-12-20 05:18:04',NULL,1),(75,1,'KBNL0305G112','-','Acer Travelmate TMP214','2022',0,3,'Dynamic IP','8','240','UNVU7SD00G244018C20601','',5,'2023-12-20 05:19:33','2023-12-20 05:30:36',1),(76,1,'KBNL0305G113','Aditya Pratama Sony','Acer Travelmate TMP214','2022',0,3,'Dynamic IP','8','240','UNVU7SD00G24400FF00601','',5,'2023-12-20 05:20:16',NULL,1),(77,1,'KBNL0305G115','Safna Kurniawati','Acer Travelmate TMP214','2022',0,3,'Dynamic IP','8','240','UNVU7SD00G2440044B0601','',5,'2023-12-20 05:22:06',NULL,1),(78,1,'KBNL0305G116','Deslina','Acer Travelmate TMP214','2022',0,3,'Dynamic IP','8','240','UNVU7SD00G24401A130601','',5,'2023-12-20 05:23:56',NULL,1),(79,1,'KBN0305G211','Abdul Hafid','Lenovo Thinkpad L13 (End User)','2021',0,3,'Dynamic IP','8','240','R910R8MZ','',5,'2023-12-20 05:28:28','2023-12-20 05:29:00',1),(80,1,'KBN0305G215','-','Lenovo Thinkpad L13 (End User)','2021',0,3,'Dynamic IP','8','240','R910R8K9','',5,'2023-12-20 05:29:44',NULL,1),(81,1,'KBNL0305G007','-','Lenovo Thinkpad L13 (End User)','2021',0,3,'Dynamic IP','8','240','R910R8JP','',5,'2023-12-20 05:30:24',NULL,1),(82,7,'','','Dell N1548P PoE+ 48 Port','2019',0,3,'','','','','Switch Non SPAN',5,'2023-12-22 02:35:07',NULL,1),(83,7,'','','Cisco Catalist 2960','2014',0,3,'','','','','Switch SPAN',5,'2023-12-22 02:35:33',NULL,1),(84,3,'','','FUJITSU 7140','2018',0,3,'','','','','',5,'2023-12-22 03:23:22',NULL,1),(85,3,'','','FUJITSU 7140','2018',0,3,'','','','','',5,'2023-12-22 03:23:37',NULL,1),(86,3,'','','Canon','2010',1,3,'','','','','',5,'2023-12-22 03:24:07',NULL,1),(87,3,'','','SCANNER MERK 9000F','2013',2,3,'','','','','Dalam Proses Penghapusan ',5,'2023-12-22 03:24:37','2023-12-22 03:24:51',1),(88,3,'','','Lide 120','2015',1,3,'','','','','',5,'2023-12-22 03:25:05',NULL,1),(89,0,'KBNS0305G077','-','Lenovo Think Station P330','2019',0,3,'10.21.77.1','16','1000','PC18TLMW','Server',5,'2023-12-22 03:30:50',NULL,1),(90,8,'','','SAMSUNG Galaxy Tab A 8.0','2019',0,3,'','','','','',5,'2023-12-22 07:34:12',NULL,1),(91,2,'','','HP LASERJET COLOR PRO MFP M181FW','2018',0,3,'','','','','',5,'2023-12-22 07:36:08',NULL,1),(92,2,'','','HP Laser Jet 1020','2006',2,3,'','','','','Sudah dilelang, dalam proses penghapusan',5,'2023-12-22 07:36:50',NULL,1),(93,2,'','','HP Laserjet P1006','2009',2,3,'','','','','Sudah dilelang, dalam proses penghapusan\n',5,'2023-12-22 07:37:10',NULL,1),(94,2,'','','HP Laserjet 1005','2010',2,3,'','','','','Sudah dilelang, dalam proses penghapusan\n',5,'2023-12-22 07:37:30',NULL,1),(95,2,'','','HP LJ P3015Dn','2010',0,3,'','','','','',5,'2023-12-22 07:37:49',NULL,1),(96,2,'','','Evolis Dalys 3','2010',2,3,'','','','','Sudah dilelang, dalam proses penghapusan\n',5,'2023-12-22 07:38:16',NULL,1),(97,2,'','','HP. Lasetjet P4015X','2010',0,3,'','','','','',5,'2023-12-22 07:38:32',NULL,1),(98,2,'','','HP LJ P3015dn','2011',1,3,'','','','','',5,'2023-12-22 07:38:53',NULL,1),(99,2,'','','canon','2012',2,3,'','','','','Sudah dilelang, dalam proses penghapusan\n',5,'2023-12-22 07:39:14','2023-12-22 07:39:56',1),(100,2,'','','HP LASERJET P3015DN','2012',1,3,'','','','','',5,'2023-12-22 07:40:12',NULL,1),(101,2,'','','HP LASERJET P1102','2014',0,3,'','','','','',5,'2023-12-22 07:40:25',NULL,1),(102,2,'','','Epson L350','2015',0,3,'','','','','',5,'2023-12-22 07:40:38',NULL,1),(103,2,'','','HP COLOR LASERJET M154a ','2018',0,3,'','','','','',5,'2023-12-22 07:40:51',NULL,1),(104,2,'','','LEXMARK / E360 ','2013',2,3,'','','','','Sudah dilelang, dalam proses penghapusan\n',5,'2023-12-22 07:41:07',NULL,1),(105,2,'','','EPSON / DLQ3500 ','2013',0,3,'','','','','',5,'2023-12-22 07:41:24',NULL,1),(106,2,'','','EPSON / DLQ3500 ','2013',0,3,'','','','','',5,'2023-12-22 07:41:31',NULL,1),(107,2,'','','EPSON / DLQ3500 ','2013',0,3,'','','','','',5,'2023-12-22 07:41:39',NULL,1),(108,2,'','','EPSON / DLQ3500 ','2013',0,3,'','','','','',5,'2023-12-22 07:41:50',NULL,1);
/*!40000 ALTER TABLE `iassetjunction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intangible`
--

DROP TABLE IF EXISTS `intangible`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intangible` (
  `intangibleid` int NOT NULL AUTO_INCREMENT,
  `kode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `engine` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `datadb` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `klasifikasi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`intangibleid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intangible`
--

LOCK TABLES `intangible` WRITE;
/*!40000 ALTER TABLE `intangible` DISABLE KEYS */;
INSERT INTO `intangible` VALUES (1,'SWA-014/WPB.03/2021','Salamaik','Dekstop Based','Excel VBA','Excel VBA','Terbatas',1),(2,'SWA-015/WPB.03/2021','Onde Mande','Dekstop Based','Excel VBA','Excel VBA','Umum',0),(3,'SWA-016/WPB.03/2023','MonevTI','10.20.20.72','PHP','MYSQL','Rahasia',1);
/*!40000 ALTER TABLE `intangible` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventik`
--

DROP TABLE IF EXISTS `inventik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventik` (
  `inventikID` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `os` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hostname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tahun` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `processor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cpu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `memory` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `storage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `antivirus` int DEFAULT NULL,
  `serialnumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nup` int DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`inventikID`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventik`
--

LOCK TABLES `inventik` WRITE;
/*!40000 ALTER TABLE `inventik` DISABLE KEYS */;
INSERT INTO `inventik` VALUES (1,'Haikal','win 11 pro','KBNL0300G001','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G244004630601','Acer Travelmate P214',36,'10.20.20.72'),(2,'Asep Darna','win 11 pro','KBNL0300G002','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G245006300601','Acer Travelmate P214',37,'10.20.20.220'),(3,'Pramadhi','win 11 pro','KBNL0300G003','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G244001AE0601','Acer Travelmate P214',47,'10.20.20.47'),(4,'Alvin','win 11 pro','KBNL0300G004','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G24400CBE0601','Acer Travelmate P214',39,NULL),(5,'Aqima','win 11 pro','KBNL0300G005','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G244008BB0601','Acer Travelmate P214',38,'10.20.20.158'),(6,'Khakim','win 11 pro','KBNL0300G006','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G2440102A0601','Acer Travelmate P214',35,NULL),(7,NULL,'win 11 pro','KBNL0300G007','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G242017DD0601','Acer Travelmate P214',31,NULL),(8,'Inka','win 11 pro','KBNL0300G008','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G244001E10601','Acer Travelmate P214',33,NULL),(9,'Rizma','win 11 pro','KBNL0300G009','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G24400E4C0601','Acer Travelmate P214',32,''),(10,'Putut Sad .H','win 11 pro','KBNL0300G010','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G244005F10601','Acer Travelmate P214',34,''),(11,'Wahyu','win 11 pro','KBNL0300G011','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G24404FA1O601','Acer Travelmate P214',46,'10.20.20.55'),(12,'Muthia M.','win 11 pro','KBNL0300G012','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G24400ED10601','Acer Travelmate P214',28,'10.20.20.64'),(13,'Lili','win 11 pro','KBNL0300G013','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G24401A410601','Acer Travelmate P214',29,'10.20.20.65'),(14,'Dika','win 11 pro','KBNL0300G014','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G244007FA0601','Acer Travelmate P214',30,''),(15,'Rofi','win 11 pro','KBNL0300G015','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G244003890601','Acer Travelmate P214',45,'10.20.20.40'),(16,'Widiastuti','win 11 pro','KBNL0300G016','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G244001C30601','Acer Travelmate P214',23,'10.20.20.82'),(17,'Nyoman','win 11 pro','KBNL0300G017','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G24400E2C0601','Acer Travelmate P214',27,'10.20.20.88'),(18,'Irwan','win 11 pro','KBNL0300G018','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G24400F420601','Acer Travelmate P214',26,''),(19,'Benny','win 11 pro','KBNL0300G019','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G244005D40601','Acer Travelmate P214',24,'10.20.20.79'),(20,'Nova','win 11 pro','KBNL0300G020','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G2440091B0601','Acer Travelmate P214',25,''),(21,'Dhilla','win 11 pro','KBNL0300G021','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G244005FC0601','Acer Travelmate P214',49,'10.20.20.43'),(22,'Johan','win 11 pro','KBNL0300G022','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G2440174E0601','Acer Travelmate P214',48,'10.20.20.68'),(23,'Meilisa','win 11 pro','KBNL0300G023','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G2440039D0601','Acer Travelmate P214',41,''),(24,'Agus','win 11 pro','KBNL0300G024','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G2440026E0601','Acer Travelmate P214',42,''),(25,'Vinny','win 11 pro','KBNL0300G025','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G244003DD0601','Acer Travelmate P214',40,''),(26,'Resty','win 11 pro','KBNL0300G026','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G244009430601','Acer Travelmate P214',44,'10.20.20.42'),(27,'Darno','win 11 pro','KBNL0300G027','2022','Intel Core i5','Intel Core i5','8gb','250gb',0,'UNVU7SD00G244009460601','Acer Travelmate P214',43,'10.20.20.48'),(28,'Zulfitri','win 11 pro','KBNL0300G028','2021','Intel Core i5','Intel Core i5','8gb','500gb',0,'5CG1361G3G','HP 240 68 NOTEBOOK',55,''),(29,'Endang','win 11 pro','KBNL0300G029','2021','Intel Core i5','Intel Core i5','8gb','500gb',0,'5CG1361G39','HP 240 68 NOTEBOOK',54,'10.20.20.113'),(30,'Zulfikar','win 10 pro','KBNL0300G030','2021','Intel Core i5','Intel Core i5','8gb','500 Gb',0,'5CG1361FSM','HP 240 68 NOTEBOOK',53,''),(31,'Muthia F.','win 10 pro','KBNL0300G031','2021','Intel Core i5','Intel Core i5','8gb','500 Gb',0,'5CG1361FFT','HP 240 68 NOTEBOOK',51,'10.20.20.189'),(32,'Tsaqib','win 10 pro','KBNL0300G032','2021','Intel Core i5','Intel Core i5','8gb','500 Gb',0,'5CG1361FFP','HP 240 68 NOTEBOOK',52,'10.20.20.145'),(33,'Jasmiwita','win 11 pro','KBNL0300G033','2021','Intel Core i5','Intel Core i5','8gb','500 Gb',0,'5CG1361DS7','HP 240 68 NOTEBOOK',50,''),(34,'Sherin','win 10 pro','KBNL0300G034','2021','Intel Core i5','Intel Core i5','8gb','500 Gb',0,'5CG136DBP','HP 240 68 NOTEBOOK',61,''),(35,'','win 11 pro','KBNL0300G035','2020','intel i7','intel i7','16GB','1TB',0,'1TL1GW2','Dell Latitude 3400',58,''),(36,'Elizabeth','win 11 pro','KBNL0300G038','2021','intel i7','intel i7','16GB','1TB',0,'6SL1GW2','Dell Latitude 3400',56,'Access Point'),(37,'Andi Permana','win 11 pro','KBNL0300G039','2021','intel i7','intel i7','16GB','1TB',0,'3SL1GW2','Dell Latitude 3400',60,'Access Point'),(38,'Irfan Huzairin','win 11 pro','KBNL0300G040','2022','intel i7','intel i7','16GB','1TB',0,'558T2J3','DELL PRECISION 5560',62,'Access Point'),(39,'','win 10 pro','KBNL0300G042','2016','intel i7','intel i7','8gb','900Gb',0,'H7N0CX01V507270','ASUS X456UQK',0,''),(40,'Rudi','win 11 pro','KBNL0300G044','2022','intel i7','intel i7','16GB','1TB',0,'BC7P2J3','DELL PRECISION 5560',63,'Access Point'),(41,'','win 11 home','Laptop HP PPA 1','2021','intel i7','intel i7','8gb','900Gb',0,'5CG8337G92','HP Laptop 14s-cf0xxx',14,''),(42,'Aldo','win 11 home','Laptop HP PPA 2','2021','intel i7','intel i7','8gb','1TB',0,'5CG83674J1','HP Laptop 14s-cf0xxx',15,'Access Point');
/*!40000 ALTER TABLE `inventik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iuserjunction`
--

DROP TABLE IF EXISTS `iuserjunction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iuserjunction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `pelatihan` tinyint(1) DEFAULT NULL,
  `catatan` varchar(255) DEFAULT NULL,
  `kppn` int DEFAULT NULL,
  `periode` int DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `iuser_kppn_idx` (`kppn`),
  KEY `iuser_app_idx` (`app`),
  KEY `iuserperiode_idx` (`periode`),
  CONSTRAINT `iuser_app` FOREIGN KEY (`app`) REFERENCES `app` (`app_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `iuser_kppn` FOREIGN KEY (`kppn`) REFERENCES `kppn` (`kppn_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `iuserperiode` FOREIGN KEY (`periode`) REFERENCES `periode` (`periode_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iuserjunction`
--

LOCK TABLES `iuserjunction` WRITE;
/*!40000 ALTER TABLE `iuserjunction` DISABLE KEYS */;
INSERT INTO `iuserjunction` VALUES (14,2,'Arliza Yurita','197010301998032002','Kasi Bank','',0,'SPRINT',5,1,'2023-12-22 02:24:35','2023-12-22 02:25:01'),(15,2,'Safna Kurnniawati ','199509222018012006','Admin KPPN ','',0,'SPRINT',5,1,'2023-12-22 02:26:22',NULL),(16,2,'Safna Kurnniawati','199509222018012006','Operator satker','',0,'SPRINT',5,1,'2023-12-22 02:27:24','2023-12-22 02:27:43'),(17,2,'Utari Dwi Nelvenia','199902052021012001','Staf Vera ','',0,'SPRINT',5,1,'2023-12-22 02:28:13','2023-12-22 02:28:21'),(18,2,'Aditya Pratama Sony ','199811102021011003','Staf Bank','',0,'SPRINT',5,1,'2023-12-22 02:28:50',NULL),(19,2,'Deslina','196812021996032001','KPPN','',0,'SIMASPATEN',5,1,'2023-12-22 02:29:19',NULL),(20,2,' Safna Kurnniawati','199509222018012006','Admin Satker','',0,'SIMASPATEN',5,1,'2023-12-22 02:29:49',NULL),(21,2,'Deslina','196812021996032001','KPPN','',0,'E-Jafung',5,1,'2023-12-22 02:30:20',NULL),(22,2,' Aditya Pratama Sony','opt1kppnsijunjung ','Operator SIKP UMi','',0,'SIKP UMi',5,1,'2023-12-22 02:30:54',NULL),(23,2,'Utari Dwi Nelvenia','199902052021012001 ',' Operator Risiko ','',0,'INCRIMA',5,1,'2023-12-22 02:31:31',NULL),(24,0,'Prima Elfira','196508091985032003_1','077.000000.KAKANTOR.','prima.elfira@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:07:25',NULL),(25,0,'Arliza Yurita','197010301998032002_1','077.000000.KASI BGP.','arliza.y@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:07:49','2023-12-22 03:08:32'),(26,0,'Aditya Pratama Sony','199811102021011003','077.000000.STAFF BGP.','aditya.sony@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:08:19',NULL),(27,0,'Deslina','196812021996032001_1','077.000000.KASI PD.','deslina@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:08:59',NULL),(28,0,'Nadhilah Bunga Foureska','200001052022012002_1','077.000000.FO PD.','nadhilah.bunga@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:09:29',NULL),(29,0,'Dwidyavitri Sarfaldi','200003102021012002_1','077.000000.STAFF PD.','dwidyavitri.sarfaldi@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:09:52',NULL),(30,0,'Elva Anita','197712031998032001_2','077.000000.KASI VERA.','elva.anita@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:10:15',NULL),(31,0,'Utari Dwi Nelvenia','199902052021012001_1','077.000000.STAFF VERA.','utari.dwinelvenia@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:10:58',NULL),(32,1,'Ikasari Heniyatun','1371094910770001','KPA','ika.heniyatun@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:11:33',NULL),(33,1,'Pipit Setyo Nugroho','3571022304840006','PPSPM','pipit.nugroho@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:11:57',NULL),(34,1,'Abdul Hafid','1171012610830001','PPK, ADMIN ','abdul.hafid@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:12:13',NULL),(35,1,'Safna Kurniawati','1303046209950002','ADMIN, Operator','safnakurniawati@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:12:39',NULL),(36,1,'Rahmat Diky Septrata','1306072709000002','Operator','rahmat.septrata@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:12:59',NULL),(37,1,'Radi Ariska Putra ','1302100110910001','FO Validator PD ','radi.ariska@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:13:25',NULL),(38,1,'Arliza Yurita','1371047010700003','PPK TKDD 3 satker ','arliza.y@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:13:49',NULL),(39,1,'Aditya Pratama Sony','1374021011980001','Admin dan Operator TKDD 3 satker ','aditya.sony@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:14:05',NULL),(40,1,'Deslina','1374021011980001','Apr dan Val PDMS ','deslina@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:14:20',NULL),(41,1,'Dwidyavitri Sarfaldi','1371085003000006','Operator PD, MS, dan Val BMN ','dwidyavitri.sarfaldi@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:14:40',NULL),(42,1,'Nadhilah Bunga Foureska','1306074501000004','Operator FO','nadhilah.bunga@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:14:57',NULL),(43,1,'Utari Dwi Nelvenia','1306074502990002','Operator VeraKi','utari.dwinelvenia@kemenkeu.go.id',0,'',5,1,'2023-12-22 03:15:43','2023-12-22 03:16:39'),(44,2,'Safna Kurnniawati','527802','Operator satker','safnakurnniawati@kemenkeu.go.id',0,'OMSPAN',5,1,'2023-12-22 03:19:08',NULL);
/*!40000 ALTER TABLE `iuserjunction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kanwil`
--

DROP TABLE IF EXISTS `kanwil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kanwil` (
  `kanwil_id` int NOT NULL AUTO_INCREMENT,
  `kanwil_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`kanwil_id`),
  UNIQUE KEY `kanwil_id_UNIQUE` (`kanwil_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kanwil`
--

LOCK TABLES `kanwil` WRITE;
/*!40000 ALTER TABLE `kanwil` DISABLE KEYS */;
INSERT INTO `kanwil` VALUES (1,'Kanwil DJPb Provinsi Sumbar');
/*!40000 ALTER TABLE `kanwil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kppn`
--

DROP TABLE IF EXISTS `kppn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kppn` (
  `kppn_id` int NOT NULL,
  `kppn_name` varchar(45) NOT NULL,
  PRIMARY KEY (`kppn_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kppn`
--

LOCK TABLES `kppn` WRITE;
/*!40000 ALTER TABLE `kppn` DISABLE KEYS */;
INSERT INTO `kppn` VALUES (0,'Kanwil'),(1,'KPPN Padang'),(2,'KPPN Bukittinggi'),(3,'KPPN Solok'),(4,'KPPN Lubuk Sikaping'),(5,'KPPN Sijunjung'),(6,'KPPN Painan');
/*!40000 ALTER TABLE `kppn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logbooktik`
--

DROP TABLE IF EXISTS `logbooktik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logbooktik` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hostname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `event` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `clearance` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logbooktik`
--

LOCK TABLES `logbooktik` WRITE;
/*!40000 ALTER TABLE `logbooktik` DISABLE KEYS */;
INSERT INTO `logbooktik` VALUES (1,'18-01-23','Eka','KBN0300G450','Data pada USB drive tidak sengaja terhapus secara permanen. Query apakah masih dapat di restore','Diselesaikan dengan melakukan restore melalui  Command Prompt (CMD). input command sebagai berikut:\n\"chkdsk X: /f \" -> X = drive usb\n\"ATTRIB -H -R -S /S /D X:*.*\" -> X = drive usb',1),(2,'26-01-23','Muthia M','KBNL0300G012','Akun google tidak dapat login dan sync pada google chrome. Terjadi sign in loop terus menerus saat membuka halaman chrome','Diselesaikan melalui re-sync akun google dan prevention melalui pengaktifan cookies pada chrome',1),(3,'14-03-23','Multiple User','Multiple User','Tidak dapat akses ke beberapa domain website tertentu (35.186.224.25) ','penyesuaian kebijakan firewall oleh Kantor Pusat (SITP) setelah pemasangan link 1 astinet',1),(4,'Tw 1 2023','Multiple User','Multiple User','Non-Unique/Recurring case:\n\n1. Tidak dapat login akun kemenkeu/nadine/edjpb/office365\n2. Trouble akses website utama (nadine/sakti/office/dll)\n3. Lupa akun kemenkeu/nadine/edjpb/office/dll\n4. IP conflict perangkat\n5. kendala perangkat TIK (printer, driver, dll)\n6. Reset authenticator','\r\n1. cek IP, DNS, reload browser, reset akun terkait\r\n2. clear cache, cookies, history, incognito window, restart komputer\r\n3. Reset akun terkait\r\n4. penyesuaian IP configuration\r\n5. Reinstall printer/printer driver/penyesuaian IP printer/ penggantian perangkat (TURT)\r\n6. Pengajuan ke servicedesk',1),(5,'01-11-21','Zainal Abidin','KBN0300G512','Terdapat konflik IP Adress pada Komputer dengan Hostname KBN0300G512. Diperlukan akses ke network setting, sedangkan User Admin PIC TIK tidak mendapatkan akses (Join Domain).','permasalahan pada kondisi Join Domain komputer yang bersangkutan. Perlu dilakukan pemindahan Organizational Unit (OU) di Active Directory Kemenkeu (akses di kantor pusat), untuk menyelesaikan masalah tersebut telah dimintakan User Admin sementara dari Hai DJPb yaitu user: .\\administrator, Pass:1S9B7a6M. User dan Password tersebut digunakan untuk mengakses komputer agar OU dapat dipindahkan oleh kantor pusat.',1),(6,'06-12-21','Arsal','KBN0300G158','Setelah komputer dilakukan Join Domain dan Login menggunakan Akun Kemenkeu, pada komputer tidak ditemukan file-file lama yang tersimpan di akun sebelumnya.','Setiap user yang login komputer windows akan mendapatkan personal folder yang ada di C:\\users\\<personal folder>. Personal folder itu hanya bisa diakses dengan menggunakan akun pemilik personal folder itu. Namun akun admin PIC TIK dapat digunakan untuk mengakses semua personal folder tersebut, sehingga dilakukan login ke user admin PIC TIK kemudian dilakukan Copy Paste atas file-file yang terdapat di folder tersebut.',1),(7,'14-03-22','Eka','KBN0300G452','Tidak dapat login email kemenkeu','Perlu dilakukan Reset Password email Kemenkeu, diselesaikan dengan pembuatan tiket melalui servicedesk ITSM 8.4',1),(8,'02-03-22','Muhammad Maulana Khakim','KBN0300G153','Saved password pada Google Chrome tidak dapat diakses, membutuhkan user dan password akun login windows','Permsalahan tsb dapat muncul ketika suatu komputer telah di Join Domain, namun pengguna masuk (login) menggunakan akun non-kemenkeu atau (./user). Langkah penyelesaian permasalahan yaitu logout user windows-> Login menggunakan akun email kemenkeu pegawai -> buka google chrome dan sign in menggunakan akun pada user sebelumnya -> buka setting dan saved password -> saved password dapat diaksesa',1),(9,'22-06-22','Mazia Gustini','KBN0300D004','MFA tidak dapat diakses untuk login OA Kemenkeu','Permasalahan muncul ketika pengguna melakukan uninstall aplikasi Google Authenticator/Microsoft Authenticator. Aplikasi OA Kemenkeu akan tetap merequest OTP sedangkan aplikasi di HP tidak akan menunjukan Kode tersebut, mengingat telah dilakukan uninstall. Diselesaikan dengan menghubungi servicedesk pusintek untuk dilakukan disable MFA, kemudian dilakukan setting ulang MFA. ',1),(10,'06-06-22','Herlambang','KBN0300G158','Suspect virus CSRSS, komputer sering mengalami freeze/crash saat membuka google chrome.','Telah dilakukan check dan scanning virus, program CSRSS.exe yang berjalan merupakan program windows asli (bukan malware).  Penyebab freeze/crash disebabkan RAM Laptop yang kecil (2GB), untuk mencegah terjadi freeze/crash agar meminimalisir penggunaan Tab Chrome',1),(11,'04-05-22','Fazrul Ichsan','KBN0300G577','Komputer lambat, sulit membuka tab chrome dan file.','Dilakukan pengecekan memory dan CPU Usage melalui task manager. Scheduled scan Anti Virus sedang berjalan memakan CPU usage yang cukup besar. Diselesaikan dengan melakukan force stop antivirus sementara, serta merubah power plan ke High performance di control panel. ',1),(12,'11-04-22','Syafrizal','KBN0300G264','Tidak dapat login e-djpb','Pengguna belum memiliki akun Digit. Penyelesaian dilakukan dengan membuat akun Digit baru.',1),(13,'20-05-22','Agus Pranoto','KBN0300G240','Tidak dapat login email kemenkeu','Disebabkan pengguna lupa password email kemenkeu. Diselesaikan melalui penyampaian tiket ke Servicedesk Pusintek ITSM 8.4',1),(14,'07-07-22','Resty','Win-User','Printer tidak terdetect - telah diinstal driver melalui Web Browser','Driver yang bersumber dari Web Browser tidak support. Diselesaikan dengan install driver melalui CD Driver',1),(15,'11-07-22','Benny','KBN0300G600','Komputer tidak dapat booting (Startup Repair Loop)','Disebabkan spesifikasi komputer yang rendah, diselesaikan dengan Reinstall Windows',1),(16,'18-07-22','Eka, Aldo, Syafrizal','KBN0300G459, KBN0300G264, KBN0300G241','aplikasi SAKTI/OA tidak dapat diakses (stuck loading)','Permasalahan sejenis dapat diselesaikan melalui beberapa cara antara lain: Clear cache browser, clear cookies, gunakan incognito, ganti browser, update browser, restart komputer',1),(17,'20-07-22','Simis','KBN0300G523','File PDF tidak dapat di read dan di Print','Dilakukan perubahan default software pembuka file PDF ke nitro reader',1),(18,'25-07-22','Yasmi, Eka','KBN0300D006, KBN0300G459','Zoom tidak dapat diinstall','Disebabkan versi zoom installer yang bermasalah, dilakukan instalasi menggunakan file installer versi lebih rendah.',1),(19,'22-08-22','Line Jaringan Komputer Es-4','','Line jaringan mati pada beberapa komputer, status kabel LAN ter connect','Dilakukan penyesuaian port di Switch. Port 47 di switch 1 terhubung ke port 47 di switch 2, dipindahkan menjadi port 47 di switch 1 ke port 48 di switch 2 (port Uplink)',1),(20,'19-09-22','Resty dan akun PPA 1','Win-User','Data User kemenkeu terindikasi bocor berdasarkan ND-1340/PB.8/2022','Disebabkan instalasi software tidak resmi, dan komputer tidak support join domain. Penyelesaian dilakukan dengan reset password melalui servicedesk, instalasi anti virus, dan re-join domain',1),(21,'30-09-22','Heru Priyantono','KBN0300G150','Komputer tidak dapat booting (Startup Repair Loop)','Disebabkan spesifikasi komputer yang rendah, diselesaikan dengan Reinstall Windows. Data di Harddisk dapat dipindahkan melalui adaptor. Disarankan agar saat booting computer tidak terdapat usb yang terconnect.',0),(22,'15-11-22','Syafrizal','KBN0300G264','Join Printer PPA 1 tidak terdetect, sehingga tidak dapat melakukan print file','IP Conflict Printer Brother (IP 124) dan Printer HP (IP 124). Masalah diselesaikan dengan penyesuaian IP Printer HP ke (126)',1),(23,'18-11-22','Muthia','KBN0300G409','Tidak dapat remote access computer','Sesuai dengan ND-352/PB.8/2020 Remote access computer non-SPAN memerlukan permintaan akses ke kantor pusat. Masalah diselesaikan melalui penyediaan form permintaan remote akses.',1),(24,'06-12-22','Asep','KBN0300G403','Konsep nadine satu kemenkeu tidak dapat sync dengan office word online (request otp tidak masuk ke sms di Hp)','Hp mengakomodir dua sim card, namun hanya satu yang dapat aktif, masalah diselesaikan dengan restart setting SIM card yang aktif dan clear history sms lama dari microsoft',1);
/*!40000 ALTER TABLE `logbooktik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `var` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (9,'2023-12-19 04:11:29',0),(10,'2023-12-19 07:38:12',0),(11,'2023-12-19 07:39:42',0),(12,'2023-12-19 07:43:12',0),(13,'2023-12-19 07:45:16',0),(14,'2023-12-19 07:50:03',0),(15,'2023-12-19 07:51:14',0),(16,'2023-12-19 07:55:24',0),(17,'2023-12-19 07:57:11',0),(18,'2023-12-19 07:59:14',0),(19,'2023-12-19 08:00:48',0),(20,'2023-12-19 08:05:09',0),(21,'2023-12-19 08:09:36',0),(22,'2023-12-19 09:06:10',0),(23,'2023-12-19 09:17:30',0),(24,'2023-12-19 09:19:37',0),(25,'2023-12-19 09:32:37',0),(26,'2023-12-19 09:51:41',0),(27,'2023-12-19 10:09:14',0),(28,'2023-12-20 01:20:57',0),(29,'2023-12-20 01:25:10',0),(30,'2023-12-20 01:26:52',0),(31,'2023-12-20 01:34:56',0),(32,'2023-12-20 01:37:18',0),(33,'2023-12-20 01:37:25',0),(34,'2023-12-20 01:49:31',0),(35,'2023-12-20 02:41:50',0),(36,'2023-12-20 03:18:39',0),(37,'2023-12-20 03:46:27',0),(38,'2023-12-20 05:25:20',0),(39,'2023-12-20 05:38:47',0),(40,'2023-12-21 02:04:28',0),(41,'2023-12-21 05:36:29',0),(42,'2023-12-21 08:59:38',0),(43,'2023-12-21 09:02:08',0),(44,'2023-12-22 02:09:20',0),(45,'2023-12-22 02:20:04',0),(46,'2023-12-22 09:52:34',0),(47,'2023-12-22 09:53:49',0),(48,'2023-12-22 21:55:46',0),(49,'2023-12-25 02:48:37',0);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notif_id` int NOT NULL AUTO_INCREMENT,
  `notif_title` varchar(45) DEFAULT NULL,
  `notif_msg` tinytext,
  `notif_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `notif_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`notif_id`),
  UNIQUE KEY `notif_id_UNIQUE` (`notif_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (47,'Monev TIK smt 2 2023','Yth. Bapak/Ibu PIC TIK, pastikan seluruh output telah diselesaikan sebelum 28 Desember 2023. Panduan dapat diakses pada menu panduan','2023-12-10 09:19:53','normal'),(48,'Monev TIK smt 2 2023','Pastikan seluruh output telah diselesaikan dan Nota Dinas dikirim sebelum 28 Desember 2023.','2023-12-10 09:22:20','normal');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifjunction`
--

DROP TABLE IF EXISTS `notifjunction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifjunction` (
  `notif_junction_id` int NOT NULL AUTO_INCREMENT,
  `notif_fk_id` int DEFAULT NULL,
  `creator_fk_id` int DEFAULT NULL,
  `receiver_fk_id` int DEFAULT NULL,
  `status` int DEFAULT '0',
  `assigned_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`notif_junction_id`),
  KEY `notif_id_idx` (`notif_fk_id`),
  KEY `creator_fk_id_idx` (`creator_fk_id`),
  KEY `receiver_fk_id_idx` (`receiver_fk_id`),
  CONSTRAINT `creator_fk_id` FOREIGN KEY (`creator_fk_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `notif_fk_id` FOREIGN KEY (`notif_fk_id`) REFERENCES `notifications` (`notif_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `receiver_fk_id` FOREIGN KEY (`receiver_fk_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifjunction`
--

LOCK TABLES `notifjunction` WRITE;
/*!40000 ALTER TABLE `notifjunction` DISABLE KEYS */;
INSERT INTO `notifjunction` VALUES (29,48,7,7,1,'2023-12-10 09:22:20',NULL),(30,48,7,9,1,'2023-12-10 09:22:20',NULL),(31,48,7,11,0,'2023-12-10 09:22:20',NULL),(32,48,7,12,0,'2023-12-10 09:22:20',NULL);
/*!40000 ALTER TABLE `notifjunction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periode`
--

DROP TABLE IF EXISTS `periode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periode` (
  `periode_id` int NOT NULL AUTO_INCREMENT,
  `periode_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`periode_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periode`
--

LOCK TABLES `periode` WRITE;
/*!40000 ALTER TABLE `periode` DISABLE KEYS */;
INSERT INTO `periode` VALUES (0,'Semester 1 2023'),(1,'Semester 2 2023'),(2,'Semester 1 2024'),(3,'Semester 2 2024');
/*!40000 ALTER TABLE `periode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` int DEFAULT '0',
  `name` varchar(255) NOT NULL,
  `preferred_theme` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `kppn` int DEFAULT NULL,
  `periode` int DEFAULT NULL,
  `nama_pic` varchar(45) DEFAULT NULL,
  `nip_pic` varchar(45) DEFAULT NULL,
  `email_pic` varchar(255) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `last_ip` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_kppn_idx` (`kppn`),
  KEY `fk_periode_idx` (`periode`),
  KEY `periode_user_idx` (`periode`),
  CONSTRAINT `kppn` FOREIGN KEY (`kppn`) REFERENCES `kppn` (`kppn_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `periode_user` FOREIGN KEY (`periode`) REFERENCES `periode` (`periode_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (7,'root','$2b$10$9UpDYRMqX6fjJS3eQ0P3b.lNaUrH9BXem8HKq.sX9z2P46pxUP4Eu',2,'Kanwil DJPb Sumbar',1,'root@kemenkeu.go.id','7_png.png',0,0,'Muhammad Haikal Putra','199904082021011001','haikal.hendrawan@kemenkeu.go.id',NULL,NULL),(9,'K010','$2a$10$ujm/5QtBDiQoihnhqBjZG.hsZHaLXcmOyvAnqoZMZhwDwz9SJJ/Je',1,'KPPN Padang',NULL,'kppnpadang@gmail.com',NULL,1,0,NULL,NULL,NULL,NULL,NULL),(11,'K011','$2a$10$7XmHzE3tWFqx.Nrc8p8xcuSd63BOHmtdIm57INh8CqO3uM8/gOn9u',1,'KPPN Bukittinggi',NULL,NULL,NULL,2,0,NULL,NULL,NULL,NULL,NULL),(12,'K090','$2a$10$ieES0sVH5g/q9k6F0om9X.DWDf7pb4ObwLhl0xxcozkJNCHRklqLq',1,'KPPN Solok',NULL,NULL,NULL,3,0,NULL,NULL,NULL,NULL,NULL),(13,'K091','$2a$10$TzsPDh2PDvpwj1A84eseX.aBICv4t4InNdBe8IL9016f68PXTvAT2',1,'KPPN Lubuk Sikaping',NULL,'kppnlusi@kemenkeu.go.id',NULL,4,0,NULL,NULL,NULL,NULL,NULL),(14,'K077','$2a$10$FrrSQ6rtzkZGteB./bOeqOBcDF7EAyBv0op.kR8nh521RfYfmq.3K',1,'KPPN Sijunjung',NULL,'kppnsijunjung@kemenkeu.go.id',NULL,5,0,'Radi Ariska Putra','199110012013101001','radi.ariska@kemenkeu.go.id',NULL,NULL),(15,'K142','$2a$10$BP94//gjvHrhezK7d5mKlOBL78/UrxEBttUcTZqagBhks4YYpNEU.',1,'KPPN Painan',NULL,'kppnpainan@kemenkeu.go.id',NULL,6,0,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-25 17:54:50
