-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `frist_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `IMG` VARCHAR(191) NULL,
    `role` ENUM('STUDENT', 'TEACHER', 'ADMIN', 'GUEST') NOT NULL DEFAULT 'STUDENT',
    `classCl_id` INTEGER NOT NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject` (
    `sj_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sub_code` VARCHAR(191) NULL,
    `subject` VARCHAR(191) NULL,
    `credit` INTEGER NULL,

    PRIMARY KEY (`sj_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class` (
    `cl_id` INTEGER NOT NULL AUTO_INCREMENT,
    `classroom` VARCHAR(191) NULL,

    PRIMARY KEY (`cl_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trem` (
    `tr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `datetime` VARCHAR(191) NULL,
    `grade` INTEGER NULL,
    `subjectSj_id` INTEGER NOT NULL,
    `userUser_id` INTEGER NOT NULL,

    PRIMARY KEY (`tr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lsg` (
    `lsg_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lsg_name` VARCHAR(191) NULL,

    PRIMARY KEY (`lsg_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_classCl_id_fkey` FOREIGN KEY (`classCl_id`) REFERENCES `class`(`cl_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trem` ADD CONSTRAINT `trem_subjectSj_id_fkey` FOREIGN KEY (`subjectSj_id`) REFERENCES `subject`(`sj_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trem` ADD CONSTRAINT `trem_userUser_id_fkey` FOREIGN KEY (`userUser_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
