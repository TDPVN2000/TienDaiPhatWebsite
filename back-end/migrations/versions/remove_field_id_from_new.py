"""remove field_id from new table

Revision ID: remove_field_id_from_new
Revises: 
Create Date: 2024-03-19

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'remove_field_id_from_new'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Drop the foreign key constraint first
    op.drop_constraint('new_field_id_fkey', 'new', type_='foreignkey')
    # Then drop the column
    op.drop_column('new', 'field_id')


def downgrade():
    # Add the column back
    op.add_column('new', sa.Column('field_id', sa.Integer(), nullable=True))
    # Add the foreign key constraint back
    op.create_foreign_key('new_field_id_fkey', 'new', 'field', ['field_id'], ['id']) 
