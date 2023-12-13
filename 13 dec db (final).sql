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
INSERT INTO `batch` VALUES (0,'Monitoring TIK Semester 1 2023',0,'2023-12-16 17:00:00','2023-12-28 16:59:59','2023-12-11',NULL,0);
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
  PRIMARY KEY (`junction_id`),
  KEY `batchId_idx` (`batch_id`),
  KEY `userid_batchjunction_idx` (`user_id`),
  CONSTRAINT `batchId` FOREIGN KEY (`batch_id`) REFERENCES `batch` (`batch_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `userid_batchjunction` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_junction`
--

LOCK TABLES `batch_junction` WRITE;
/*!40000 ALTER TABLE `batch_junction` DISABLE KEYS */;
INSERT INTO `batch_junction` VALUES (13,0,7,'2023-12-13 08:38:55','2023-12-13 16:11:53',NULL,0,0),(14,0,9,'2023-12-13 08:38:55',NULL,NULL,0,0),(15,0,11,'2023-12-13 08:38:55',NULL,NULL,0,0),(16,0,12,'2023-12-13 08:38:55',NULL,NULL,0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklist`
--

LOCK TABLES `checklist` WRITE;
/*!40000 ALTER TABLE `checklist` DISABLE KEYS */;
INSERT INTO `checklist` VALUES (1,'Checklist2','checklist 2 desc','Lakukan updating','contoh2.pdf',3,'3','2023-12-12 02:57:35','2023-12-13 13:45:13'),(2,'Checklist2','checklist 2 desc','Lakukan updating 2','contoh.pdf',1,'3','2023-12-12 02:57:55','2023-12-13 13:45:13'),(3,'Checklist3','asdwqe','weqwqe','wewqewe',2,'ewqwe','2023-12-12 14:17:20',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklistjunction`
--

LOCK TABLES `checklistjunction` WRITE;
/*!40000 ALTER TABLE `checklistjunction` DISABLE KEYS */;
INSERT INTO `checklistjunction` VALUES (89,1,7,0,1,NULL,NULL,'2023-12-13 08:38:55','2023-12-13 13:20:29',NULL,NULL),(90,2,7,0,0,NULL,NULL,'2023-12-13 08:38:55','2023-12-13 14:01:14',NULL,NULL),(91,3,7,0,NULL,NULL,NULL,'2023-12-13 08:38:55',NULL,NULL,NULL),(92,1,9,0,NULL,NULL,NULL,'2023-12-13 08:38:55',NULL,NULL,NULL),(93,2,9,0,NULL,NULL,NULL,'2023-12-13 08:38:55',NULL,NULL,NULL),(94,3,9,0,NULL,NULL,NULL,'2023-12-13 08:38:55',NULL,NULL,NULL),(95,1,11,0,NULL,NULL,NULL,'2023-12-13 08:38:55',NULL,NULL,NULL),(96,2,11,0,NULL,NULL,NULL,'2023-12-13 08:38:55',NULL,NULL,NULL),(97,3,11,0,NULL,NULL,NULL,'2023-12-13 08:38:55',NULL,NULL,NULL),(98,1,12,0,NULL,NULL,NULL,'2023-12-13 08:38:55',NULL,NULL,NULL),(99,2,12,0,NULL,NULL,NULL,'2023-12-13 08:38:55',NULL,NULL,NULL),(100,3,12,0,NULL,NULL,NULL,'2023-12-13 08:38:55',NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iassetjunction`
--

LOCK TABLES `iassetjunction` WRITE;
/*!40000 ALTER TABLE `iassetjunction` DISABLE KEYS */;
INSERT INTO `iassetjunction` VALUES (6,4,'erqwewe','213wqewq','wqw','1323',1,1,'553','16','229','wqeqwewet43','ewrr43',0,'2023-11-12 07:31:23','2023-11-15 07:01:39',0),(7,1,'KBN0300G007','Didi','jmtyj','5468',2,2,'44','8','360','UNV0399245BNS','nrynrj',4,'2023-11-12 07:31:23','2023-11-15 07:03:16',1),(35,2,'','','brother','2011',1,3,'','','','','',0,'2023-11-19 11:31:00',NULL,0),(36,3,'','','fujitsu','2011',2,3,'','','','','ojeneqwnlejqwn',0,'2023-11-19 11:34:04',NULL,0),(40,4,'','','UPS2','2019',0,3,'','','','','asa',0,'2023-11-20 15:26:29','2023-11-21 02:25:59',0),(41,1,'LKBN0202','','2019','2017',0,0,'','','','','',0,'2023-11-21 02:28:19',NULL,0),(43,0,'KBNL030076','sasad','HP','2017',0,3,'ewqwe','','qewqwe','saddas','ln wqem wqem ew wqkemwqkomwekm wqelkwqmlkwqem wqelkmwqelkew',0,'2023-11-21 03:38:58','2023-11-27 14:38:17',0),(50,0,'abc','qwewqe','wqewqeewq','1213',0,3,'','','','','',0,'2023-11-28 15:06:56',NULL,0),(52,0,'wqeqeqwe','','wqeewqwe','2023',0,3,'','','','','',0,'2023-12-02 09:08:57',NULL,0),(53,0,'sasda','','asddsads','2023',0,3,'','','','','',0,'2023-12-02 09:10:27',NULL,0),(57,0,'sadsadsa','','sadsasads','2023',0,3,'','','','','',0,'2023-12-02 09:12:00',NULL,0),(58,0,'sadsadsa','','sadsasads','2023',0,3,'','','','','',0,'2023-12-02 09:12:01',NULL,0),(59,0,'ewqewqew','','ewqwqweq','2023',0,3,'','','','','',0,'2023-12-02 09:23:53',NULL,0),(60,0,'12','','eweqweq','2023',0,3,'','','','','',0,'2023-12-02 09:24:07',NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iuserjunction`
--

LOCK TABLES `iuserjunction` WRITE;
/*!40000 ALTER TABLE `iuserjunction` DISABLE KEYS */;
INSERT INTO `iuserjunction` VALUES (1,0,'Haikal Hendrawan','3174050804990001','Operator Monsakti','abc@gmail.com',0,'tidak ada sadsadsa wqewqeqwewqe sadsadasd eqwewqewqe asdasdasd wqewqew',0,0,'2023-11-26 01:21:05','2023-11-27 14:33:51'),(9,1,'Andi Permana','qwepkwoqkwq','q','',0,'',0,0,'2023-11-26 04:48:13','2023-11-26 05:02:33'),(10,2,'qw','hmghghmhmgm , ','rertetre','',0,'',0,0,'2023-11-26 05:04:32','2023-11-26 05:04:44');
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
INSERT INTO `notifjunction` VALUES (29,48,7,7,1,'2023-12-10 09:22:20',NULL),(30,48,7,9,0,'2023-12-10 09:22:20',NULL),(31,48,7,11,0,'2023-12-10 09:22:20',NULL),(32,48,7,12,0,'2023-12-10 09:22:20',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (7,'root','$2b$10$9UpDYRMqX6fjJS3eQ0P3b.lNaUrH9BXem8HKq.sX9z2P46pxUP4Eu',2,'Admin',1,'root@kemenkeu.go.id','7_jpeg.jpeg',0,0,'Muhammad Haikal Putra','199904082021011001','haikal.hendrawan@kemenkeu.go.id',NULL,NULL),(9,'K010','$2a$10$ujm/5QtBDiQoihnhqBjZG.hsZHaLXcmOyvAnqoZMZhwDwz9SJJ/Je',1,'KPPN Padang',NULL,'kppnpadang@gmail.com',NULL,1,0,NULL,NULL,NULL,NULL,NULL),(11,'K011','$2a$10$7XmHzE3tWFqx.Nrc8p8xcuSd63BOHmtdIm57INh8CqO3uM8/gOn9u',1,'KPPN Bukittinggi',NULL,NULL,NULL,2,0,NULL,NULL,NULL,NULL,NULL),(12,'K090','$2a$10$ieES0sVH5g/q9k6F0om9X.DWDf7pb4ObwLhl0xxcozkJNCHRklqLq',1,'KPPN Solok',NULL,NULL,NULL,3,0,NULL,NULL,NULL,NULL,NULL);
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

-- Dump completed on 2023-12-13 23:42:50
