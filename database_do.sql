-- MySQL dump 10.16  Distrib 10.1.48-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: fdb1034.awardspace.net    Database: 4395704_do
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Hajok`
--

DROP TABLE IF EXISTS `Hajok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hajok` (
  `id` int NOT NULL,
  `nev` varchar(50) NOT NULL,
  `sebesseg` int NOT NULL,
  `eletero` bigint NOT NULL,
  `pajzs` int NOT NULL,
  `x1 DMG` int NOT NULL,
  `x2 DMG` int NOT NULL,
  `x3 DMG` int NOT NULL,
  `x4 DMG` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hajok`
--

LOCK TABLES `Hajok` WRITE;
/*!40000 ALTER TABLE `Hajok` DISABLE KEYS */;
INSERT INTO `Hajok` VALUES (1,'Phoenix',320,4000,2000,100,200,300,400),(2,'Yamato',340,8000,4000,200,400,600,800),(3,'Leonov',380,160000,6000,300,600,900,1200),(4,'Defcom',280,12000,8000,400,800,1200,1600),(5,'Liberator',300,16000,10000,500,1000,1500,2000),(6,'Piranha',320,32000,12000,600,1200,1800,2400),(7,'Nostromo',340,64000,14000,700,1400,2100,2800),(8,'Vengeance',360,180000,16000,800,1600,2400,3200),(9,'Bigboy',260,128000,18000,900,1800,2700,3500),(10,'Goliath K2',300,256000,32000,1600,3200,4800,6400),(11,'Orange Goliath',300,256000,32000,1600,3200,4800,6400),(12,'Red Goliath',300,256000,32000,99999,99999,99999,99999);
/*!40000 ALTER TABLE `Hajok` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maps`
--

DROP TABLE IF EXISTS `maps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maps` (
  `id` smallint NOT NULL,
  `nev` varchar(20) NOT NULL DEFAULT '',
  `portals` text NOT NULL,
  `NPCS` text NOT NULL,
  `isStarterMap` enum('0','1') NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maps`
--

LOCK TABLES `maps` WRITE;
/*!40000 ALTER TABLE `maps` DISABLE KEYS */;
/*!40000 ALTER TABLE `maps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `npcs`
--

DROP TABLE IF EXISTS `npcs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `npcs` (
  `id` int NOT NULL,
  `nev` varchar(255) NOT NULL,
  `gfx` int NOT NULL DEFAULT '1',
  `eletero` int NOT NULL DEFAULT '800',
  `pajzs` int NOT NULL DEFAULT '0',
  `tapasztalat` int NOT NULL DEFAULT '0',
  `becsulet` int NOT NULL DEFAULT '0',
  `kredit` int NOT NULL DEFAULT '0',
  `uridium` int NOT NULL DEFAULT '0',
  `dmg` varchar(255) NOT NULL DEFAULT 'D10,20',
  `sebesseg` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `npcs`
--

LOCK TABLES `npcs` WRITE;
/*!40000 ALTER TABLE `npcs` DISABLE KEYS */;
INSERT INTO `npcs` VALUES (1,'-=[ Streuner ]=-',2,800,400,400,2,400,1,'20',280),(2,'-=[ Lordakia ]=-',71,2000,2000,800,4,800,2,'80',320),(3,'-=[ Saimon ]=-',75,6000,3000,1600,8,1600,4,'200',320),(4,'-=[ Mordon ]=-',73,20000,10000,3200,16,6400,8,'300',125),(5,'-=[ Devolarium ]=-',72,100000,100000,6400,32,51200,16,'1000',200),(6,'-=[ Sibelon ]=-',74,200000,200000,12800,64,102400,32,'2400',100),(7,'-=[ Sibelonit ]=-',76,40000,40000,3200,16,12800,12,'1000',320),(8,'-=[ Lordakium ]=-',77,300000,200000,25600,128,204800,64,'3150',230),(9,'-=[ Kristallin ]=-',78,50000,40000,6400,32,12800,16,'1500',320),(10,'-=[ Kristallon ]=-',79,400000,300000,51200,256,409600,128,'4050',250),(11,'-=[ StreuneR ]=-',4,20000,10000,3200,16,6400,8,'400',280),(12,'-=[ Protegit ]=-',81,50000,40000,6400,32,12800,16,'1300',420),(13,'-=[ Cubikon ]=-',80,1600000,1200000,512000,4096,1638400,1024,'0',30);
/*!40000 ALTER TABLE `npcs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `players` (
  `id` int NOT NULL,
  `user` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `ceg` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'VRU,EIC,MMO',
  `hajo` int NOT NULL DEFAULT '1',
  `gfx` int NOT NULL DEFAULT '1',
  `rang` int NOT NULL DEFAULT '1' COMMENT '1: urpilota',
  `letrehozasi_datum` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `pozicio` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '1000|1000',
  `map` int NOT NULL DEFAULT '1' COMMENT 'mapID',
  `hp` bigint NOT NULL DEFAULT '4000',
  `hpMax` bigint NOT NULL DEFAULT '4000',
  `shield` bigint NOT NULL DEFAULT '0',
  `shieldMax` bigint NOT NULL DEFAULT '0',
  `szint` int NOT NULL DEFAULT '1',
  `sebesseg` int NOT NULL DEFAULT '320',
  `exp` bigint NOT NULL DEFAULT '0',
  `honor` bigint NOT NULL DEFAULT '0',
  `kredit` bigint NOT NULL DEFAULT '20000',
  `uridium` bigint NOT NULL DEFAULT '2000',
  `LCB10` bigint NOT NULL,
  `MCB25` int NOT NULL,
  `MCB50` int NOT NULL,
  `UCB50` int NOT NULL,
  `isAdmin` tinyint DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rangok`
--

DROP TABLE IF EXISTS `rangok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rangok` (
  `id` int unsigned NOT NULL,
  `nev` varchar(50) NOT NULL,
  `szazalek` double(11,2) NOT NULL DEFAULT '0.00'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rangok`
--

LOCK TABLES `rangok` WRITE;
/*!40000 ALTER TABLE `rangok` DISABLE KEYS */;
INSERT INTO `rangok` VALUES (1,'Űrpilóta',20.00),(2,'Őrvezető',12.39),(3,'Tizedes',10.00),(4,'Szakaszvezető',9.00),(5,'Őrmester',8.00),(6,'Törzsőrmester',7.00),(7,'Főtörzsörmester',6.00),(8,'Zászlós',5.00),(9,'Törzszászlós',4.50),(10,'Főtörzszászlós',4.00),(11,'Hadnagy',3.50),(12,'Főhadnagy',3.00),(13,'Százados',2.50),(14,'Őrnagy',2.00),(15,'Alezredes',1.50),(16,'Ezredes',1.00),(17,'Dandártábornok',0.50),(18,'Vezérőrnagy',0.10),(19,'Altábornagy',0.01),(20,'Vezérezredes',0.00),(21,'Admin',0.00);
/*!40000 ALTER TABLE `rangok` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `szintek`
--

DROP TABLE IF EXISTS `szintek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `szintek` (
  `szint` int NOT NULL,
  `szukseges exp` bigint NOT NULL DEFAULT '-1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `szintek`
--

LOCK TABLES `szintek` WRITE;
/*!40000 ALTER TABLE `szintek` DISABLE KEYS */;
INSERT INTO `szintek` VALUES (1,0),(2,10000),(3,20000),(4,40000),(5,80000),(6,160000),(7,320000),(8,640000),(9,1280000),(10,2560000),(11,5120000),(12,10240000),(13,20480000),(14,40960000),(15,81920000),(16,163840000),(17,327680000),(18,655360000),(19,1310720000),(20,2147483647),(21,5242880000),(22,10485760000),(23,20971520000),(24,41943040000),(25,83886080000),(26,167772160000),(27,335544320000),(28,671088640000),(29,1342177280000),(30,2684354560000),(31,5368709120000),(32,10737418240000);
/*!40000 ALTER TABLE `szintek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database '4395704_do'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-22 17:16:16
