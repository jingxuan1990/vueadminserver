CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '会员表',
  `name` varchar(45) NOT NULL,
  `nick_name` varchar(45) NOT NULL,
  `birth` date DEFAULT NULL COMMENT '生日',
  `address` varchar(45) DEFAULT NULL,
  `sex` varchar(45) NOT NULL COMMENT '性别',
  `user_card` varchar(100) NOT NULL COMMENT '会员卡号',
  `gmt_create` datetime DEFAULT NULL COMMENT '创建时间',
  `gmt_modified` datetime DEFAULT NULL COMMENT '修改时间',
  `phone` varchar(50) NOT NULL COMMENT '手机号',
  `level` varchar(45) NOT NULL COMMENT '会员级别',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
