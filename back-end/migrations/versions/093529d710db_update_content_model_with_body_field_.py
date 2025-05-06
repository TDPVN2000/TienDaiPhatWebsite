"""Update content model with body field and fix relationships

Revision ID: 093529d710db
Revises: 
Create Date: 2025-05-03 01:55:49.596971

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.exc import ProgrammingError
from werkzeug.security import generate_password_hash
from datetime import datetime, UTC


# revision identifiers, used by Alembic.
revision = '093529d710db'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Drop tables in specific order, starting with the most dependent ones
    op.execute('DROP TABLE IF EXISTS content_tag CASCADE')
    op.execute('DROP TABLE IF EXISTS content_translation CASCADE')
    op.execute('DROP TABLE IF EXISTS tag_translation CASCADE')
    op.execute('DROP TABLE IF EXISTS category_translation CASCADE')
    op.execute('DROP TABLE IF EXISTS content CASCADE')
    op.execute('DROP TABLE IF EXISTS tag CASCADE')
    op.execute('DROP TABLE IF EXISTS category CASCADE')
    op.execute('DROP TABLE IF EXISTS "user" CASCADE')
    op.execute('DROP TABLE IF EXISTS alembic_version CASCADE')

    # Create alembic_version table first
    op.create_table('alembic_version',
        sa.Column('version_num', sa.String(length=32), nullable=False),
        sa.PrimaryKeyConstraint('version_num')
    )

    # Create tables if they don't exist
    try:
        op.create_table('"user"',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('username', sa.String(length=80), nullable=False),
            sa.Column('email', sa.String(length=120), nullable=False),
            sa.Column('password_hash', sa.String(length=128), nullable=False),
            sa.Column('is_active', sa.Boolean(), nullable=False, default=True),
            sa.Column('is_admin', sa.Boolean(), nullable=False, default=False),
            sa.Column('first_name', sa.String(length=80), nullable=True),
            sa.Column('last_name', sa.String(length=80), nullable=True),
            sa.Column('avatar', sa.String(length=200), nullable=True),
            sa.PrimaryKeyConstraint('id'),
            sa.UniqueConstraint('email'),
            sa.UniqueConstraint('username')
        )
    except ProgrammingError:
        pass

    try:
        op.create_table('category',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('name', sa.String(length=80), nullable=False),
            sa.Column('created_at', sa.DateTime(), nullable=False),
            sa.Column('updated_at', sa.DateTime(), nullable=False),
            sa.PrimaryKeyConstraint('id')
        )
    except ProgrammingError:
        pass

    try:
        op.create_table('tag',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('name', sa.String(length=80), nullable=False),
            sa.Column('created_at', sa.DateTime(), nullable=False),
            sa.Column('updated_at', sa.DateTime(), nullable=False),
            sa.PrimaryKeyConstraint('id')
        )
    except ProgrammingError:
        pass

    try:
        op.create_table('content',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('title', sa.String(length=200), nullable=False),
            sa.Column('body', sa.Text(), nullable=False),
            sa.Column('author_id', sa.Integer(), nullable=False),
            sa.Column('category_id', sa.Integer(), nullable=True),
            sa.Column('created_at', sa.DateTime(), nullable=False),
            sa.Column('updated_at', sa.DateTime(), nullable=False),
            sa.ForeignKeyConstraint(['author_id'], ['"user".id'], ),
            sa.ForeignKeyConstraint(['category_id'], ['category.id'], ),
            sa.PrimaryKeyConstraint('id')
        )
    except ProgrammingError:
        pass

    try:
        op.create_table('content_tag',
            sa.Column('content_id', sa.Integer(), nullable=False),
            sa.Column('tag_id', sa.Integer(), nullable=False),
            sa.ForeignKeyConstraint(['content_id'], ['content.id'], ),
            sa.ForeignKeyConstraint(['tag_id'], ['tag.id'], ),
            sa.PrimaryKeyConstraint('content_id', 'tag_id')
        )
    except ProgrammingError:
        pass

    try:
        op.create_table('category_translation',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('category_id', sa.Integer(), nullable=False),
            sa.Column('language', sa.String(length=2), nullable=False),
            sa.Column('name', sa.String(length=80), nullable=False),
            sa.Column('description', sa.Text(), nullable=True),
            sa.ForeignKeyConstraint(['category_id'], ['category.id'], ),
            sa.PrimaryKeyConstraint('id')
        )
    except ProgrammingError:
        pass

    try:
        op.create_table('tag_translation',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('tag_id', sa.Integer(), nullable=False),
            sa.Column('language', sa.String(length=2), nullable=False),
            sa.Column('name', sa.String(length=80), nullable=False),
            sa.ForeignKeyConstraint(['tag_id'], ['tag.id'], ),
            sa.PrimaryKeyConstraint('id')
        )
    except ProgrammingError:
        pass

    try:
        op.create_table('content_translation',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('content_id', sa.Integer(), nullable=False),
            sa.Column('language', sa.String(length=2), nullable=False),
            sa.Column('title', sa.String(length=200), nullable=False),
            sa.Column('body', sa.Text(), nullable=False),
            sa.ForeignKeyConstraint(['content_id'], ['content.id'], ),
            sa.PrimaryKeyConstraint('id')
        )
    except ProgrammingError:
        pass

    # Create seed admin user
    # Create a connection to execute raw SQL
    connection = op.get_bind()
    
    # Insert admin user
    connection.execute(
        sa.text("""
            INSERT INTO "user" (
                username, email, password_hash, is_active, is_admin,
                first_name, last_name, created_at, updated_at
            ) VALUES (
                :username, :email, :password_hash, :is_active, :is_admin,
                :first_name, :last_name, :created_at, :updated_at
            )
        """),
        {
            'username': 'admin',
            'email': 'admin@tiendaiphat.com',
            'password_hash': generate_password_hash('admin123'),
            'is_active': True,
            'is_admin': True,
            'first_name': 'Admin',
            'last_name': 'User',
            'created_at': datetime.now(UTC),
            'updated_at': datetime.now(UTC)
        }
    )


def downgrade():
    # Drop tables in specific order, starting with the most dependent ones
    op.execute('DROP TABLE IF EXISTS content_tag CASCADE')
    op.execute('DROP TABLE IF EXISTS content_translation CASCADE')
    op.execute('DROP TABLE IF EXISTS tag_translation CASCADE')
    op.execute('DROP TABLE IF EXISTS category_translation CASCADE')
    op.execute('DROP TABLE IF EXISTS content CASCADE')
    op.execute('DROP TABLE IF EXISTS tag CASCADE')
    op.execute('DROP TABLE IF EXISTS category CASCADE')
    op.execute('DROP TABLE IF EXISTS "user" CASCADE')
    op.execute('DROP TABLE IF EXISTS alembic_version CASCADE')

    # Create alembic_version table
    op.create_table('alembic_version',
        sa.Column('version_num', sa.String(length=32), nullable=False),
        sa.PrimaryKeyConstraint('version_num')
    ) 
