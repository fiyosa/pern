CREATE TABLE IF NOT EXISTS "menus" (
  "id" SMALLSERIAL NOT NULL PRIMARY KEY,  
  "parent_id" INT2,
  "permission_id" INT2,
  "name" VARCHAR(100) NOT NULL,
  "route_name" VARCHAR(100),
  "order" INT2,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  
  CONSTRAINT fk_menus_permission_id FOREIGN KEY("permission_id") REFERENCES permissions(id) ON UPDATE CASCADE ON DELETE CASCADE
);