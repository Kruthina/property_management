-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: pms
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.21.10.1
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
--
-- Table structure for table `Properties`
--
DROP TABLE IF EXISTS `Properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Properties` (
  `P_id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `Name` varchar(255) DEFAULT NULL,
  `Area` varchar(255) DEFAULT NULL,
  `Price` decimal(10, 2) DEFAULT NULL,
  `Seller_id` int NOT NULL,
  `Buyer_id` int DEFAULT NULL,
  `Description` text,
  `Image` text,
  PRIMARY KEY (`P_id`),
  KEY `Seller_id` (`Seller_id`),
  KEY `Buyer_id` (`Buyer_id`),
  CONSTRAINT `Properties_ibfk_1` FOREIGN KEY (`Seller_id`) REFERENCES `Users` (`U_id`),
  CONSTRAINT `Properties_ibfk_2` FOREIGN KEY (`Buyer_id`) REFERENCES `Users` (`U_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb3 COMMENT = 'Properties';
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `Properties`
--
/*!40000 ALTER TABLE `Properties` DISABLE KEYS */;
INSERT INTO
  `Properties`
VALUES
  (
    2,
    'Sain Oasis',
    'Bangalore',
    10000000.00,
    3,
    4,
    'A beautiful property',
    'https://images.pexels.com/photos/3288102/pexels-photo-3288102.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  ),(
    4,
    'P2',
    'Ranchi',
    1000000.00,
    3,
    4,
    'ABC',
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg'
  ),(
    5,
    'Ashok Heritage',
    'Bangalore',
    10000000.00,
    3,
    NULL,
    '',
    'https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg?cs=srgb&dl=pexels-timur-saglambilek-87223.jpg&fm=jpg'
  );
  /*!40000 ALTER TABLE `Properties` ENABLE KEYS */;
--
  -- Table structure for table `Registrations`
  --
  DROP TABLE IF EXISTS `Registrations`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Registrations` (
    `R_id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `Date_of_Reg` datetime DEFAULT CURRENT_TIMESTAMP,
    `Date_of_Exp` datetime DEFAULT NULL,
    `P_id` int DEFAULT NULL,
    `Approval` varchar(50) DEFAULT NULL,
    `Candidate_id` int DEFAULT NULL,
    PRIMARY KEY (`R_id`),
    KEY `Candidate_id` (`Candidate_id`),
    KEY `P_id` (`P_id`),
    CONSTRAINT `Registrations_ibfk_1` FOREIGN KEY (`Candidate_id`) REFERENCES `Users` (`U_id`),
    CONSTRAINT `Registrations_ibfk_2` FOREIGN KEY (`P_id`) REFERENCES `Properties` (`P_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb3 COMMENT = 'Registrations';
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `Registrations`
  --
  /*!40000 ALTER TABLE `Registrations` DISABLE KEYS */;
INSERT INTO
  `Registrations`
VALUES
  (
    1,
    '2022-01-27 00:00:00',
    '2032-01-25 00:00:00',
    2,
    'Approved',
    4
  ),(
    2,
    '2022-01-28 00:00:00',
    '2032-01-26 00:00:00',
    4,
    'Approved',
    4
  );
  /*!40000 ALTER TABLE `Registrations` ENABLE KEYS */;
--
  -- Table structure for table `Users`
  --
  DROP TABLE IF EXISTS `Users`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
    `U_id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `Name` varchar(255) DEFAULT NULL COMMENT 'Name',
    `Password` text COMMENT 'Password',
    `DOB` date DEFAULT NULL COMMENT 'Date of birth',
    `Email` varchar(100) NOT NULL COMMENT 'Email',
    PRIMARY KEY (`U_id`),
    UNIQUE KEY `Email` (`Email`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb3 COMMENT = 'Users';
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `Users`
  --
  /*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO
  `Users`
VALUES
  (
    3,
    'Amaan Mohib',
    '$2a$10$Q.P4rN3YGktkNQAH3syaB./JXY.kStP1hL3uvyqw0/DkOOeb4KFca',
    '2022-01-18',
    'amaan.mohib@gmail.com'
  ),(
    4,
    'Amay',
    '$2a$10$hAcyc4Z8zSzcqVZoAU7K7eKYCA4PGuusEUEXy78AsvYhcB6ocN4vm',
    '2022-01-21',
    'amay@gmail.com'
  );
  /*!40000 ALTER TABLE `Users` ENABLE KEYS */;
--
  -- Table structure for table `Users_Add`
  --
  DROP TABLE IF EXISTS `Users_Add`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users_Add` (
    `U_id` int NOT NULL,
    `U_Add` varchar(255) NOT NULL,
    `Id` int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`U_id`, `U_Add`),
    UNIQUE KEY `Id` (`Id`),
    CONSTRAINT `Users_Add_ibfk_1` FOREIGN KEY (`U_id`) REFERENCES `Users` (`U_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb3 COMMENT = 'Users Address';
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `Users_Add`
  --
  /*!40000 ALTER TABLE `Users_Add` DISABLE KEYS */;
INSERT INTO
  `Users_Add`
VALUES
  (
    3,
    'NMIT\nYelahanka\nNitte Meenakshi Institute of Technology',
    1
  );
  /*!40000 ALTER TABLE `Users_Add` ENABLE KEYS */;
--
  -- Table structure for table `Users_Phone`
  --
  DROP TABLE IF EXISTS `Users_Phone`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users_Phone` (
    `U_id` int NOT NULL,
    `U_Mobile` varchar(20) NOT NULL,
    `Id` int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`U_id`, `U_Mobile`),
    UNIQUE KEY `Id` (`Id`),
    CONSTRAINT `Users_Phone_ibfk_1` FOREIGN KEY (`U_id`) REFERENCES `Users` (`U_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb3 COMMENT = 'Users Phone';
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `Users_Phone`
  --
  /*!40000 ALTER TABLE `Users_Phone` DISABLE KEYS */;
INSERT INTO
  `Users_Phone`
VALUES
  (3, '123456789', 2);
  /*!40000 ALTER TABLE `Users_Phone` ENABLE KEYS */;
  /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
  /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
  /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
  /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
  /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- Dump completed on 2022-01-29 12:21:46