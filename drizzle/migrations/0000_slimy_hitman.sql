CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `brides` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`instagram` text,
	`photo` text,
	`parentsName` text,
	`isShowParentsName` integer DEFAULT false,
	`eventId` text NOT NULL,
	`createdAt` text,
	`updatedAt` text,
	FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text,
	`updatedAt` text,
	`name` text NOT NULL,
	`description` text,
	`url` text NOT NULL,
	`date` text NOT NULL,
	`isPublished` integer DEFAULT false,
	`isShowGroomNameFirst` integer DEFAULT true,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `grooms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`instagram` text,
	`photo` text,
	`parentsName` text,
	`isShowParentsName` integer DEFAULT false,
	`eventId` text NOT NULL,
	`createdAt` text,
	`updatedAt` text,
	FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `subEvents` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text,
	`updatedAt` text,
	`name` text NOT NULL,
	`description` text,
	`date` text NOT NULL,
	`startTime` text NOT NULL,
	`endTime` text NOT NULL,
	`location` text,
	`address` text,
	`eventId` text NOT NULL,
	FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`emailVerified` integer,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE INDEX `brideIdIdx` ON `brides` (`id`);--> statement-breakpoint
CREATE INDEX `brideEventIdIdx` ON `brides` (`eventId`);--> statement-breakpoint
CREATE UNIQUE INDEX `events_url_unique` ON `events` (`url`);--> statement-breakpoint
CREATE INDEX `eventIdIdx` ON `events` (`id`);--> statement-breakpoint
CREATE INDEX `eventUserIdIdx` ON `events` (`userId`);--> statement-breakpoint
CREATE INDEX `eventUrlIdx` ON `events` (`url`);--> statement-breakpoint
CREATE INDEX `eventDateIdx` ON `events` (`date`);--> statement-breakpoint
CREATE INDEX `groomIdIdx` ON `grooms` (`id`);--> statement-breakpoint
CREATE INDEX `groomEventIdIdx` ON `grooms` (`eventId`);--> statement-breakpoint
CREATE INDEX `subEventIdIdx` ON `subEvents` (`id`);--> statement-breakpoint
CREATE INDEX `subEventEventIdIdx` ON `subEvents` (`eventId`);--> statement-breakpoint
CREATE INDEX `subEventDateIdx` ON `subEvents` (`date`);--> statement-breakpoint
CREATE INDEX `userIdIdx` ON `user` (`id`);