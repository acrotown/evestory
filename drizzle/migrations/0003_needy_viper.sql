ALTER TABLE events ADD `paymentStatus` text DEFAULT 'unpaid';--> statement-breakpoint
ALTER TABLE guests ADD `guestType` text DEFAULT 'friend';