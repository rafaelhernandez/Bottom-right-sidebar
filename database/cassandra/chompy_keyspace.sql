
CREATE KEYSPACE chompy
    WITH REPLICATION = {
        'class': 'SimpleStrategy', 
        'replication_factor': 1
    };


--
-- Table structure for table business
--

DROP TABLE IF EXISTS business;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE business
(
  id int,
  business_id int,
  business_id_orig text,
  name text,
  neighborhood text,
  address text,
  city text,
  state text,
  postal_code text,
  latitude float,
  longitude float,
  stars float,
  review_count int,
  is_open int,
  PRIMARY KEY(id)
);

copy chompy.business (id, business_id, business_id_orig, name, neighborhood, address, city, state, postal_code, latitude, longitude, stars, review_count, is_open) 
from '/Users/rafa/hack_reactor/class/Bottom-right-sidebar/database/business.csv' 
with null = 'NULL';

CREATE TABLE business_reviews200
(
  postal_code text,
  id int,
  name text,
  neighborhood text,
  address text,
  city text,
  state text,
  latitude float,
  longitude float,
  stars float,
  review_count int,
  is_open int,
  photo_id int,
  encoded_photo text,
  tip_id int,
  tip_text text,
  PRIMARY KEY(postal_code, id)
);

copy chompy.business_reviews200 (postal_code, id, name, neighborhood, address, city, state, latitude, longitude, stars, review_count, is_open, photo_id, encoded_photo, tip_id, tip_text) 
from '/Users/rafa/hack_reactor/class/Bottom-right-sidebar/database/business_reviews200_cassandra.csv' 
with null = 'NULL';