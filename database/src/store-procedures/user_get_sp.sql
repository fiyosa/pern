CREATE OR REPLACE PROCEDURE "user_get_sp" (
  _email VARCHAR,
  _first_name VARCHAR, 
  _last_name VARCHAR, 
  _created_at TIMESTAMP, 
  _updated_at TIMESTAMP 
) 
LANGUAGE 'plpgsql'
AS $$
BEGIN
  INSERT INTO users(email, first_name, last_name, created_at, updated_at) 
    VALUES (_email, _first_name, _last_name, _created_at, _updated_at);
  COMMIT;
  EXCEPTION WHEN unique_violation THEN NULL;
END $$;