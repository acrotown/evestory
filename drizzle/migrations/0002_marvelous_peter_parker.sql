CREATE TABLE `guests` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`eventId` text NOT NULL,
	`createdAt` text,
	`updatedAt` text,
	FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE events ADD `coverImageUrl` text;--> statement-breakpoint
CREATE INDEX `guestIdIdx` ON `guests` (`id`);--> statement-breakpoint
CREATE INDEX `guestEventIdIdx` ON `guests` (`eventId`);