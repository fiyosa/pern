CREATE TABLE IF NOT EXISTS "role_has_permissions" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "role_id" INT2 NOT NULL,
  "permission_id" INT2 NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,

  CONSTRAINT fk_role_has_permissions_role_id FOREIGN KEY("role_id") REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_role_has_permissions_permission_id FOREIGN KEY("permission_id") REFERENCES permissions(id) ON UPDATE CASCADE ON DELETE CASCADE
);