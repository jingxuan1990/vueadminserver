CREATE TABLE `user` (
  `id` bigint(20) NOT NULL COMMENT '会员表',
  `name` varchar(45) NOT NULL,
  `nick_name` varchar(45) NOT NULL,
  `birth` datetime DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `user_card` varchar(100) NOT NULL COMMENT '会员卡号',
  `gmt_create` datetime DEFAULT NULL COMMENT '创建时间',
  `gmt_modified` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
