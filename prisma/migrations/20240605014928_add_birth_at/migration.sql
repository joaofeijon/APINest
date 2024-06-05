-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL DEFAULT '',
    `email` VARCHAR(127) NOT NULL DEFAULT '0',
    `password` VARCHAR(127) NOT NULL DEFAULT '0',
    `birthAt` DATE NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT (now()),
    `updateditAt` TIMESTAMP(0) NOT NULL DEFAULT (now()),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
