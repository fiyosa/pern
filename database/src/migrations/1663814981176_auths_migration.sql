CREATE TABLE IF NOT EXISTS "auths" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "user_id" BIGINT NOT NULL,
  "revoke" SMALLINT NOT NULL,  
  "refresh_token" VARCHAR(255),
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  "expired_at" TIMESTAMP,

  CONSTRAINT fk_auths_user_id FOREIGN KEY("user_id") REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);