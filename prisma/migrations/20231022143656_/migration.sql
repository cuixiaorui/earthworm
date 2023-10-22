-- CreateTable
CREATE TABLE `courses` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order` INTEGER NOT NULL,
    `chinese` VARCHAR(191) NOT NULL,
    `english` VARCHAR(191) NOT NULL,
    `soundmark` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NULL,

    UNIQUE INDEX `statements_order_key`(`order`),
    INDEX `Statement_courseId_fkey`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `statements` ADD CONSTRAINT `statements_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
