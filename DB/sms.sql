CREATE TABLE `recruit` (
  `id` varchar (256) NOT NULL DEFAULT '' COMMENT '唯一id',
  `period` varchar (256) NOT NULL DEFAULT '' COMMENT '招生时期',
  `plan` varchar (256) CHARACTER SET `utf8mb4` COLLATE `utf8mb4_general_ci` NOT NULL DEFAULT '' COMMENT '培养方案',
  PRIMARY KEY (`id`)
) COMMENT = "招生计划表" ENGINE = innodb DEFAULT CHARACTER SET = "utf8mb4" COLLATE = "utf8mb4_general_ci"

CREATE TABLE `user` ( `status` varchar (64) NULL DEFAULT '' COMMENT '学习状态' ,`name` varchar (64) NOT NULL DEFAULT '' COMMENT '姓名' ,`card_no` varchar (256) NOT NULL DEFAULT '' COMMENT '证件号码' ,`card_type` varchar (128) NULL DEFAULT '' COMMENT '证件类型' ,`sex` varchar (32) NULL DEFAULT '' COMMENT '性别' ,`nation` varchar (32) NULL DEFAULT '' COMMENT '民族' ,`politics` varchar (32) NULL DEFAULT '' COMMENT '政治面貌' ,`base` varchar (256) NULL DEFAULT '' COMMENT '学习中心' ,`base_phone` varchar (32) NULL DEFAULT '' COMMENT '中心电话' ,`born` varchar (32) NULL DEFAULT '' COMMENT '出生日期' ,`phone` varchar (32) NULL DEFAULT '' COMMENT '移动电话' ,`address` varchar (256) NULL DEFAULT '' COMMENT '通讯地址' ,`postcode` varchar (32) NULL DEFAULT '' COMMENT '邮政编码' ,`email` varchar (64) NULL DEFAULT '' COMMENT 'Email' ,`avatar` varchar (6000) NULL DEFAULT '' COMMENT '头像' ,`recruit_id` varchar (256) CHARACTER SET `utf8mb4` COLLATE `utf8mb4_general_ci` NOT NULL DEFAULT '' COMMENT '所属招生计划' , PRIMARY KEY (`card_no`) ) COMMENT = "学生表" ENGINE = innodb DEFAULT CHARACTER SET = "utf8mb4" COLLATE = "utf8mb4_general_ci" 

CREATE TABLE `exam` ( `recruit_id` varchar (256) NOT NULL DEFAULT '' COMMENT '所属招生计划' ,`period` varchar (256) NOT NULL DEFAULT '' COMMENT '学期名' ,`card_no` varchar (256) NOT NULL DEFAULT '' COMMENT '学生证件号' ,`subject` varchar (256) NULL DEFAULT '' COMMENT '考试科目' ,`score` varchar (256) CHARACTER SET `utf8mb4` COLLATE `utf8mb4_general_ci` NULL DEFAULT '' COMMENT '考试成绩' ) COMMENT = "考试成绩表" ENGINE = innodb DEFAULT CHARACTER SET = "utf8mb4" COLLATE = "utf8mb4_general_ci" 



INSERT INTO `recruit` (`id`, `period`, `plan`) VALUES ('123123123', '2023年春季', '军地联合培养方案（2）');

INSERT INTO `user` (`status`, `name`, `card_no`, `card_type`, `sex`, `nation`, `politics`, `base`, `base_phone`, `born`, `phone`, `address`, `postcode`, `email`, `avatar`, `recruit_id`) VALUES ('在籍', '陈明怀', '421125199308200010', '身份证', '男', '汉', '团员', '湖北武汉中心', '18872697111', '1993年8月20日', '18872697123', '湖北省武汉市', '123456', '111111@mail.com', '', '123123123');

INSERT INTO `exam` (`recruit_id`, `period`, `card_no`, `subject`, `score`) VALUES ('123123123', '第一学期', '421125199308200010', '英语', '100');
INSERT INTO `exam` (`recruit_id`, `period`, `card_no`, `subject`, `score`) VALUES ('123123123', '第一学期', '421125199308200010', '数学', '100');
INSERT INTO `exam` (`recruit_id`, `period`, `card_no`, `subject`, `score`) VALUES ('123123123', '第二学期', '421125199308200010', '英语', '100');
INSERT INTO `exam` (`recruit_id`, `period`, `card_no`, `subject`, `score`) VALUES ('123123123', '第二学期', '421125199308200010', '物理', '100');