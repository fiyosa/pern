CREATE TABLE IF NOT EXISTS "user_has_roles" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "user_id" INT8,
  "role_id" INT2,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,

  CONSTRAINT fk_user_has_roles_user_id FOREIGN KEY("user_id") REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_user_has_roles_role_id FOREIGN KEY("role_id") REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE
);