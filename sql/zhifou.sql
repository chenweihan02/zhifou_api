/*
Navicat MySQL Data Transfer

Source Server         : zhifou
Source Server Version : 80024
Source Host           : 47.104.13.50:3306
Source Database       : zhifou

Target Server Type    : MYSQL
Target Server Version : 80024
File Encoding         : 65001

Date: 2022-11-18 18:46:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for table_column
-- ----------------------------
DROP TABLE IF EXISTS `table_column`;
CREATE TABLE `table_column` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of table_column
-- ----------------------------
INSERT INTO `table_column` VALUES ('1', '1号的专栏', '1号的简介', null);
INSERT INTO `table_column` VALUES ('2', '2号的专栏', '2号的简介', null);
INSERT INTO `table_column` VALUES ('3', '3号的专栏', '3号的简介', null);
INSERT INTO `table_column` VALUES ('4', '4号的专栏', '4号的简介', null);
INSERT INTO `table_column` VALUES ('5', '5号的专栏', '5号的简介', null);
INSERT INTO `table_column` VALUES ('6', '6号的专栏', '6号的简介', null);
INSERT INTO `table_column` VALUES ('7', '7号的专栏', '7号的简介', null);

-- ----------------------------
-- Table structure for table_img
-- ----------------------------
DROP TABLE IF EXISTS `table_img`;
CREATE TABLE `table_img` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of table_img
-- ----------------------------

-- ----------------------------
-- Table structure for table_post
-- ----------------------------
DROP TABLE IF EXISTS `table_post`;
CREATE TABLE `table_post` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL,
  `column_id` int unsigned NOT NULL,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `excerpt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of table_post
-- ----------------------------
INSERT INTO `table_post` VALUES ('1', '1', '1', '文章1', '摘要', '内容', null, '2022-10-11');
INSERT INTO `table_post` VALUES ('2', '1', '1', '文章1', '摘要2', '内容2', 'http://127.0.0.1:5173/src/assets/callout.svg', '2022-10-12');
INSERT INTO `table_post` VALUES ('3', '2', '2', '文章2', '摘要3', '内容3', null, '2022-10-13');
INSERT INTO `table_post` VALUES ('4', '1', '1', '文章1', '摘要', '内容', null, '2022-10-14');
INSERT INTO `table_post` VALUES ('5', '1', '1', '文章1', '摘要', '内容', null, '2022-10-15');
INSERT INTO `table_post` VALUES ('6', '2', '2', '文章2', '摘要', '内容', null, '2022-10-16');
INSERT INTO `table_post` VALUES ('7', '2', '2', '文章2', '摘要', '内容', null, '2022-10-17');
INSERT INTO `table_post` VALUES ('8', '2', '2', '文章2', '摘要', '内容', null, '2022-10-18');

-- ----------------------------
-- Table structure for table_user
-- ----------------------------
DROP TABLE IF EXISTS `table_user`;
CREATE TABLE `table_user` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img_url` int DEFAULT NULL,
  `column_id` int DEFAULT NULL,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of table_user
-- ----------------------------
INSERT INTO `table_user` VALUES ('1', '江流儿', '111@test.com', '111111', '描述1', null, '1');
INSERT INTO `table_user` VALUES ('2', '陈顶天', '222@test.com', '111111', '描述6', null, '2');
INSERT INTO `table_user` VALUES ('30', '陈伟汉', '1@1.com', '1', null, null, '27');
