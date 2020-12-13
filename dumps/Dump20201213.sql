-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: localhost    Database: vacancies-project
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admins`
--

DROP TABLE IF EXISTS `Admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admins`
--

LOCK TABLES `Admins` WRITE;
/*!40000 ALTER TABLE `Admins` DISABLE KEYS */;
INSERT INTO `Admins` VALUES (1,'admin','$2a$10$5XJwtDh1v78lw26FKbAtpuiH.ITRvRgzH16vvxgaWkGCNoBllIjEq','admin','2020-11-16 21:33:51','2020-11-16 21:33:51');
/*!40000 ALTER TABLE `Admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Applicants`
--

DROP TABLE IF EXISTS `Applicants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Applicants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cv` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `createDate` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `VacancyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `VacancyId` (`VacancyId`),
  CONSTRAINT `applicants_ibfk_1` FOREIGN KEY (`VacancyId`) REFERENCES `Vacancies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Applicants`
--

LOCK TABLES `Applicants` WRITE;
/*!40000 ALTER TABLE `Applicants` DISABLE KEYS */;
/*!40000 ALTER TABLE `Applicants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Sessions` (
  `session_id` varchar(32) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
INSERT INTO `Sessions` VALUES ('FGoxYwkGy-zvNUapnkhczrEVcXUtcHK1','2020-11-25 18:55:44','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"expires\":\"2020-11-25T15:19:55.767Z\",\"admin\":{\"id\":1,\"login\":\"admin\",\"password\":\"$2a$10$5XJwtDh1v78lw26FKbAtpuiH.ITRvRgzH16vvxgaWkGCNoBllIjEq\",\"name\":\"admin\",\"createdAt\":\"2020-11-16T21:33:51.000Z\",\"updatedAt\":\"2020-11-16T21:33:51.000Z\"},\"isAdminAuthenticated\":true}','2020-11-24 15:19:53','2020-11-24 18:55:44'),('n2oNcqeeiXxYYnfjPbliW6xcPDq-vAUl','2020-11-25 15:25:25','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"expires\":\"2020-11-25T15:25:15.398Z\"}','2020-11-24 15:25:15','2020-11-24 15:25:25');
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Subscribers`
--

DROP TABLE IF EXISTS `Subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Subscribers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subscribers`
--

LOCK TABLES `Subscribers` WRITE;
/*!40000 ALTER TABLE `Subscribers` DISABLE KEYS */;
INSERT INTO `Subscribers` VALUES (1,'johnnyborjomi@gmail.com','2020-11-18 16:18:13','2020-11-18 16:18:13');
/*!40000 ALTER TABLE `Subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vacancies`
--

DROP TABLE IF EXISTS `Vacancies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Vacancies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `salary` int NOT NULL,
  `text` varchar(255) NOT NULL,
  `locations` text,
  `vacancyType` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vacancies`
--

LOCK TABLES `Vacancies` WRITE;
/*!40000 ALTER TABLE `Vacancies` DISABLE KEYS */;
INSERT INTO `Vacancies` VALUES (2,'FE dev p2h',110005,'[{\"type\":\"header\",\"data\":{\"text\":\"Fe dev\",\"level\":2}},{\"type\":\"list\",\"data\":{\"style\":\"ordered\",\"items\":[\"sdfsdfsdf\",\"sdf\",\"sdfsdfsdf\"]}}]','[\"Kiev, Ukraine\",\"Los Angeles, US\"]','Office - Full Time','2020-11-18 15:14:45','2020-11-18 16:00:50'),(3,'Frontend',1500,'[{\"type\":\"header\",\"data\":{\"text\":\"kharkoew\",\"level\":2}}]','\"Kharkov, Ukraine\"','Office - Part Time','2020-11-18 16:04:39','2020-11-18 16:04:39'),(4,'QA tanya',99999999,'[{\"type\":\"header\",\"data\":{\"text\":\"good\",\"level\":2}}]','[\"Kharkov, Ukraine\",\"London, UK\",\"Los Angeles, US\"]','Remote - Full Time','2020-11-18 16:06:39','2020-11-18 16:06:39');
/*!40000 ALTER TABLE `Vacancies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-13 12:30:08
