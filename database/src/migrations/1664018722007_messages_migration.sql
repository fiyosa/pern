CREATE TABLE IF NOT EXISTS "messages" (
  "id" SMALLSERIAL NOT NULL PRIMARY KEY,  
  "user_id" INT8,
  "description" VARCHAR(255) NOT NULL,
  "is_view" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  
  CONSTRAINT fk_messages_user_id FOREIGN KEY("user_id") REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);