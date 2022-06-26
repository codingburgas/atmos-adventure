DROP DATABASE IF EXISTS `atmos`;
CREATE DATABASE `atmos`;

USE `atmos`;
CREATE TABLE `users` (
    `uuid` VARCHAR(36) NOT NULL,
    `username` VARCHAR(32) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `pass_hash` VARCHAR(60) NOT NULL,
    `role` VARCHAR(10) DEFAULT "user",
    `date_created` DATETIME NOT NULL,
    `verified` BOOLEAN DEFAULT FALSE,
    `token` VARCHAR(60) DEFAULT NULL,
    PRIMARY KEY(`uuid`)
);
INSERT INTO `users` VALUES ("6706aae5-7ca0-4915-b688-098c8644407c", "admin", "admin@atmos.systems", "$2b$10$KiqYHZJlmzl7G0fvA1XY2uYuR3QeHAA71Dn05AzfwsPcsIEeItxZS", "admin", "2022-06-10 17:00:00", FALSE, NULL);

CREATE TABLE `statistics` (
    `visitors` INT DEFAULT 0,
    `downloads` INT DEFAULT 0
);

INSERT INTO `statistics` VALUES (0, 0);
