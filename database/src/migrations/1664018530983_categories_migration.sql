CREATE TABLE IF NOT EXISTS "categories" (
  "id" SMALLSERIAL NOT NULL PRIMARY KEY,  
  "user_id" INT8,
  "name" VARCHAR(100) NOT NULL,
  "description" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  
  CONSTRAINT fk_categories_user_id FOREIGN KEY("user_id") REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);