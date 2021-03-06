--
-- Current Database: `chompy_business`
--

CREATE DATABASE IF NOT EXISTS `chompy_business` DEFAULT CHARACTER SET utf8;

USE `chompy_business`;

--
-- Table structure for table `business`
--

DROP TABLE IF EXISTS `business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `business` (
  `id` varchar(22) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `neighborhood` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `stars` float DEFAULT NULL,
  `review_count` int(11) DEFAULT NULL,
  `is_open` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo`
(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo_id` varchar(22) NOT NULL,
  `business_id` varchar(22) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
CREATE INDEX photo_id_idx ON photo(photo_id);
CREATE INDEX business_id_idx ON photo(business_id);

--
-- Table structure for table `tip`
--

DROP TABLE IF EXISTS `tip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tip`
(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tip_id` varchar(22) NOT NULL,
  `business_id` varchar(22) NOT NULL,
  `text` mediumtext,
  `date` datetime DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1098326 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
CREATE INDEX tip_id_idx ON tip(tip_id);
CREATE INDEX business_id_idx ON tip(business_id);


DROP TABLE IF EXISTS `business_reviews200`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `business_reviews200`
(
  `id` varchar(22) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `neighborhood` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `stars` float DEFAULT NULL,
  `review_count` int(11) DEFAULT NULL,
  `is_open` tinyint(1) DEFAULT NULL,
  `photo_id` varchar(22) NOT NULL,
  `encoded_photo` varchar(20000) NOT NULL,
  `tip_id` varchar(22) NOT NULL,
  `tip_text` mediumtext
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `thumbnails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thumbnails`
(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo_id` varchar(22) NOT NULL,
  `encoded_photo` varchar(20000) NOT NULL
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
CREATE INDEX photo_id_idx ON thumbnails(photo_id);

GRANT ALL PRIVILEGES ON chompy_business.* TO 'chompy'@'localhost' IDENTIFIED BY 'Chompy4&!database';
GRANT ALL PRIVILEGES ON chompy_business.* TO 'chompy'@'%' IDENTIFIED BY 'Chompy4&!database';

CREATE INDEX `postal_code_idx` ON business(`postal_code`);
CREATE INDEX `review_count_idx` ON business(`review_count`);

INSERT INTO chompy_business.business_reviews200 (id, name, neighborhood, address, city, state, postal_code, latitude, longitude, stars, review_count, is_open)
SELECT id, name, neighborhood, address, city, state, postal_code, latitude, longitude, stars, review_count, is_open
FROM chompy_business.business
where review_count > 200;

CREATE INDEX `postal_code_idx` ON business_reviews200(`postal_code`);

UPDATE chompy_business.business_reviews200 br, chompy_business.thumbnails t
SET br.photo_id = t.photo_id, br.encoded_photo = t.encoded_photo
WHERE t.photo_id = (SELECT photo_id
FROM chompy_business.photo
WHERE business_id = br.id
LIMIT 1);

UPDATE chompy_business.business_reviews200 br, chompy_business.tip t
SET br.tip_id = t.tip_id, br.tip_text = t.text
WHERE t.tip_id = (SELECT tip_id
FROM chompy_business.tip
WHERE business_id = br.id
LIMIT 1);