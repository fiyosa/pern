CREATE TABLE IF NOT EXISTS "users" (
  "id" BIGSERIAL NOT NULL PRIMARY KEY,
  "email" VARCHAR(100) NOT NULL UNIQUE,
  "first_name" VARCHAR(100) NOT NULL,
  "last_name" VARCHAR(100) NOT NULL,
  "refresh_token" VARCHAR(255),
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);