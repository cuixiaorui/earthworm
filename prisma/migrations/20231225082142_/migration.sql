-- CreateTable
CREATE TABLE `ErrorBook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statementId` INTEGER NOT NULL,
    `time` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ErrorBook_statementId_key`(`statementId`),
    INDEX `ErrorBook_statementId_fkey`(`statementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ErrorBook` ADD CONSTRAINT `ErrorBook_statementId_fkey` FOREIGN KEY (`statementId`) REFERENCES `statements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
