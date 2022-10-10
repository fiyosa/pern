CREATE TABLE IF NOT EXISTS "blogs" (
  "id" SMALLSERIAL NOT NULL PRIMARY KEY,  
  "user_id" INT8 NOT NULL,
  "category_id" INT2 NOT NULL,
  "title" VARCHAR(100) NOT NULL,
  "excerpt" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "image" VARCHAR(255) NOT NULL,
  "view" INT4 NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  
  CONSTRAINT fk_categories_user_id FOREIGN KEY("user_id") REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_categories_category_id FOREIGN KEY("category_id") REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);