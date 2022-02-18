CREATE TABLE "accounts" (
  "account_id" INT NOT NULL,
  "username" character(40) NOT NULL,
  "password" character(80) NOT NULL,
  "is_manager" boolean NOT NULL,
  PRIMARY KEY ("account_id")
);

ALTER TABLE "accounts"
ADD CONSTRAINT "accounts_username" UNIQUE ("username");