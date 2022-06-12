DROP DATABASE IF EXISTS `atmos`;
CREATE DATABASE `atmos`;

USE `atmos`;
CREATE TABLE `users` (
    `uuid` VARCHAR(36) NOT NULL,
    `username` VARCHAR(16) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `pass_hash` VARCHAR(60) NOT NULL,
    `role` VARCHAR(10) NOT NULL,
    PRIMARY KEY(`uuid`)
);
INSERT INTO `users` VALUES ("6706aae5-7ca0-4915-b688-098c8644407c", "admin", "Atmos", "admin", "admin@atmos.me", "$2b$10$KiqYHZJlmzl7G0fvA1XY2uYuR3QeHAA71Dn05AzfwsPcsIEeItxZS", "admin");
