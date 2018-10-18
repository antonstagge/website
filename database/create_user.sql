CREATE DATABASE IF NOT EXISTS website;
use website;
CREATE USER IF NOT EXISTS 'website'@'localhost';
GRANT ALL PRIVILEGES ON website.* To 'website'@'localhost' IDENTIFIED BY 'website';
