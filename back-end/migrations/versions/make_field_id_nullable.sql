-- Make field_id nullable in capability table
ALTER TABLE capability
ALTER COLUMN field_id DROP NOT NULL;

-- Make field_id nullable in introduction table
ALTER TABLE introduction
ALTER COLUMN field_id DROP NOT NULL;

-- Make field_id nullable in investment table
ALTER TABLE investment
ALTER COLUMN field_id DROP NOT NULL;

-- Make field_id nullable in product table
ALTER TABLE product
ALTER COLUMN field_id DROP NOT NULL;

-- Make field_id nullable in project table
ALTER TABLE project
ALTER COLUMN field_id DROP NOT NULL;

-- Make field_id nullable in certification table
ALTER TABLE certification
ALTER COLUMN field_id DROP NOT NULL;

-- Make field_id nullable in table_data table
ALTER TABLE table_data
ALTER COLUMN field_id DROP NOT NULL; 
