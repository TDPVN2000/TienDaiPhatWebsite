"""add timestamps and cascade delete

Revision ID: 22bba0ec73b6
Revises: None
Create Date: 2024-03-19 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import text


# revision identifiers, used by Alembic.
revision = '22bba0ec73b6'
down_revision = None
branch_labels = None
depends_on = None


def table_exists(conn, table_name):
    try:
        conn.execute(text(f'SELECT 1 FROM information_schema.tables WHERE table_name = :table'), {'table': table_name})
        return True
    except:
        return False


def column_exists(conn, table_name, column_name):
    try:
        conn.execute(text(f'SELECT 1 FROM information_schema.columns WHERE table_name = :table AND column_name = :column'), {'table': table_name, 'column': column_name})
        return True
    except:
        return False


def upgrade():
    conn = op.get_bind()

    # Create field table if it doesn't exist
    if not table_exists(conn, 'field'):
        op.create_table(
            'field',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('name', sa.String(length=100), nullable=False),
            sa.Column('description', sa.Text(), nullable=True),
            sa.Column('image_url', sa.String(length=255), nullable=True),
            sa.PrimaryKeyConstraint('id')
        )

    # Create a default field if it doesn't exist
    conn.execute(text("""
        INSERT INTO field (name, description)
        SELECT 'Default Field', 'Default field for existing records'
        WHERE NOT EXISTS (
            SELECT 1 FROM field WHERE name = 'Default Field'
        )
    """))
    conn.commit()
    
    # Get the ID of the default field
    result = conn.execute(text("SELECT id FROM field WHERE name = 'Default Field'"))
    default_field_id = result.scalar()

    # Create tables if they don't exist
    tables = {
        'capability': sa.Column('field_id', sa.Integer(), nullable=True),
        'certification': sa.Column('field_id', sa.Integer(), nullable=True),
        'introduction': sa.Column('field_id', sa.Integer(), nullable=True),
        'investment': sa.Column('field_id', sa.Integer(), nullable=True),
        'product': sa.Column('field_id', sa.Integer(), nullable=True),
        'project': sa.Column('field_id', sa.Integer(), nullable=True),
        'table_data': sa.Column('field_id', sa.Integer(), nullable=True)
    }

    for table_name, field_column in tables.items():
        if not table_exists(conn, table_name):
            # Create table with basic columns
            op.create_table(
                table_name,
                sa.Column('id', sa.Integer(), nullable=False),
                sa.Column('name', sa.String(length=100), nullable=False),
                sa.Column('description', sa.Text(), nullable=True),
                field_column,
                sa.PrimaryKeyConstraint('id')
            )

    # Add timestamp columns to all tables
    for table in ['capability', 'certification', 'introduction', 'investment', 'product', 'project', 'table_data']:
        if not column_exists(conn, table, 'created_at'):
            op.add_column(table, sa.Column('created_at', sa.DateTime(), nullable=True))
            op.add_column(table, sa.Column('updated_at', sa.DateTime(), nullable=True))
            
            # Set default values for existing rows
            conn.execute(text(f'UPDATE {table} SET created_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP'))
            
            # Update NULL field_id values to point to the default field
            conn.execute(text(f"""
                UPDATE {table} 
                SET field_id = :field_id 
                WHERE field_id IS NULL
            """), {'field_id': default_field_id})
            
            # Make columns not nullable after setting defaults
            op.alter_column(table, 'created_at', nullable=False)
            op.alter_column(table, 'updated_at', nullable=False)
            op.alter_column(table, 'field_id', nullable=False)

    # Drop existing foreign keys if they exist
    for table in ['capability', 'certification', 'introduction', 'investment', 'product', 'project', 'table_data']:
        try:
            op.drop_constraint(f'{table}_field_id_fkey', table, type_='foreignkey')
        except:
            pass

    # Create new foreign keys with cascade delete
    op.create_foreign_key('certification_field_id_fkey', 'certification', 'field', ['field_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('introduction_field_id_fkey', 'introduction', 'field', ['field_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('investment_field_id_fkey', 'investment', 'field', ['field_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('product_field_id_fkey', 'product', 'field', ['field_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('project_field_id_fkey', 'project', 'field', ['field_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('table_data_field_id_fkey', 'table_data', 'field', ['field_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('capability_field_id_fkey', 'capability', 'field', ['field_id'], ['id'], ondelete='CASCADE')


def downgrade():
    # Drop cascade foreign keys
    for table in ['capability', 'certification', 'introduction', 'investment', 'product', 'project', 'table_data']:
        try:
            op.drop_constraint(f'{table}_field_id_fkey', table, type_='foreignkey')
        except:
            pass

    # Recreate original foreign keys without cascade
    op.create_foreign_key('certification_field_id_fkey', 'certification', 'field', ['field_id'], ['id'])
    op.create_foreign_key('introduction_field_id_fkey', 'introduction', 'field', ['field_id'], ['id'])
    op.create_foreign_key('investment_field_id_fkey', 'investment', 'field', ['field_id'], ['id'])
    op.create_foreign_key('product_field_id_fkey', 'product', 'field', ['field_id'], ['id'])
    op.create_foreign_key('project_field_id_fkey', 'project', 'field', ['field_id'], ['id'])
    op.create_foreign_key('table_data_field_id_fkey', 'table_data', 'field', ['field_id'], ['id'])
    op.create_foreign_key('capability_field_id_fkey', 'capability', 'field', ['field_id'], ['id'])

    # Drop timestamp columns from all tables
    for table in ['capability', 'certification', 'introduction', 'investment', 'product', 'project', 'table_data']:
        try:
            op.drop_column(table, 'updated_at')
            op.drop_column(table, 'created_at')
        except:
            pass 
