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
INSERT INTO `iassetcpu` VALUES (0,'Intel Core i3'),(1,'Intel Core i5'),(2,'Intel Core i7'),(3,'lainnya');
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
  CONSTRAINT `fk_cpu` FOREIGN KEY (`cpu`) REFERENCES `iassetcpu` (`cpu_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_jenisperangkat` FOREIGN KEY (`jenis_perangkat`) REFERENCES `iasset` (`iasset_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_kondisi` FOREIGN KEY (`kondisi`) REFERENCES `iassetcondition` (`condition_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_kppn` FOREIGN KEY (`kppn`) REFERENCES `kppn` (`kppn_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_periode` FOREIGN KEY (`periode`) REFERENCES `periode` (`periode_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iassetjunction`
--

LOCK TABLES `iassetjunction` WRITE;
/*!40000 ALTER TABLE `iassetjunction` DISABLE KEYS */;
INSERT INTO `iassetjunction` VALUES (6,4,'erqwewe','213wqewq','wqw','1323',1,2,'553','224','2323','wqeqwewet43','ewrr43',0,'2023-11-12 07:31:23','2023-11-12 13:27:38',1),(7,1,'wktjky','tytrtrjky','jmtyj','5468',2,3,'44','56','876','rtgkyukyu','nrynrj',4,'2023-11-12 07:31:23',NULL,2),(8,1,'wktjky','tytrtrjky','jmtyj','5468',2,3,'44','56','876','rtgkyukyu','nrynrj',0,'2023-11-12 07:31:23','2023-11-12 13:27:38',2),(9,1,'wktjky','tytrtrjky','jmtyj','5468',2,3,'44','56','876','rtgkyukyu','nrynrj',0,'2023-11-12 07:31:23','2023-11-12 13:27:38',2);
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
  `notif_title` varchar(45) NOT NULL,
  `notif_msg` tinytext NOT NULL,
  `notif_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notif_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`notif_id`),
  UNIQUE KEY `notif_id_UNIQUE` (`notif_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'','Periode monev TIK telah dibuka mulai 01 Oktober 2023-30 November 2023','2023-10-10 11:17:20',NULL),(2,'root','index2','2023-09-15 10:02:49',NULL),(3,'title','message','2023-09-15 10:04:24',NULL),(4,'title2','message2','2023-09-15 10:19:53',NULL),(5,'title2','message2','2023-09-15 10:20:55',NULL),(21,'title','message','2023-09-15 14:23:50',NULL),(22,'qweq','wqewqweqewqe','2023-09-15 14:24:26',NULL),(23,'title','message','2023-09-15 14:26:37',NULL),(25,'title5','message5','2023-09-15 14:28:21',NULL),(27,'title5','message5','2023-09-15 14:33:08',NULL),(29,'title8','message8','2023-09-15 14:37:01',NULL),(30,'title8','message8','2023-09-15 14:44:04',NULL),(31,'title9','message9','2023-09-15 14:44:33',NULL),(32,'title9','message9','2023-09-15 14:45:00',NULL),(36,'title9','message9','2023-09-15 14:51:05',NULL),(37,'title9','message9','2023-09-15 14:51:54',NULL),(42,'title10','message10','2023-09-15 15:05:52',NULL),(46,'MonevTI v.0.2','Go to this link below to learn how the web app work ..... , or you could just play around to find out!','2023-09-16 14:00:01','admin');
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
  `notif_fk_id` int NOT NULL,
  `creator_fk_id` int NOT NULL,
  `receiver_fk_id` int DEFAULT NULL,
  `status` int DEFAULT '0',
  `assigned_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`notif_junction_id`),
  KEY `notif_id_idx` (`notif_fk_id`),
  KEY `creator_fk_id_idx` (`creator_fk_id`),
  KEY `receiver_fk_id_idx` (`receiver_fk_id`),
  CONSTRAINT `creator_fk_id` FOREIGN KEY (`creator_fk_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notif_fk_id` FOREIGN KEY (`notif_fk_id`) REFERENCES `notifications` (`notif_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `receiver_fk_id` FOREIGN KEY (`receiver_fk_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifjunction`
--

LOCK TABLES `notifjunction` WRITE;
/*!40000 ALTER TABLE `notifjunction` DISABLE KEYS */;
INSERT INTO `notifjunction` VALUES (21,46,7,7,0,'2023-09-16 14:00:01',NULL),(22,46,7,9,0,'2023-09-16 14:00:01',NULL),(23,46,7,11,0,'2023-09-16 14:00:01',NULL),(24,46,7,12,0,'2023-09-16 14:00:01',NULL);
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
INSERT INTO `periode` VALUES (1,'Semester 1 2023'),(2,'Semester 2 2023'),(3,'Semester 1 2024'),(4,'Semester 2 2024');
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
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_kppn_idx` (`kppn`),
  CONSTRAINT `kppn` FOREIGN KEY (`kppn`) REFERENCES `kppn` (`kppn_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (7,'root','$2b$10$ZTDQTuuOPA6wu338p7n6YOpjrmt/gf36TLsoAVLEUiCFzmRm.3K0S',2,'Admin',1,'root@kemenkeu.go.id','/assets/images/avatars/avatar_12.jpg',0),(9,'root2','$2b$10$RHXc6P3Tb5j2ioF9NMU0OuEoquNwFHaCj5CqUr1NKLcSb9plz6CZ2',1,'Admin2',NULL,NULL,NULL,2),(11,'root3','$2b$10$BjkU81OreSbHJ9WOcHIgkOdloNsW2Zux.cq2Ad8lP3i/zGKLH7sqq',1,'Admin3',NULL,NULL,NULL,2),(12,'root4','$2b$10$.pnm5ade59YJ6Cb2bhDZP.McBEBpTBOsWRdtTMxLpZPg8EHFOLG7m',1,'Admin4',NULL,NULL,NULL,2);
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

-- Dump completed on 2023-11-12 22:31:12