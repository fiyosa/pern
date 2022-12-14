CREATE TABLE IF NOT EXISTS "users" (
  "id" BIGSERIAL NOT NULL PRIMARY KEY,
  "email" VARCHAR(100) NOT NULL UNIQUE,
  "first_name" VARCHAR(100) NOT NULL,
  "last_name" VARCHAR(100) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);