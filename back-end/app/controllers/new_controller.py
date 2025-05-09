from flask import Blueprint, request, jsonify
from app.models.new import New
from app import db
from sqlalchemy.exc import SQLAlchemyError

bp = Blueprint('new', __name__)

@bp.route('/news', methods=['GET'])
def get_news():
    try:
        field_id = request.args.get('field_id', type=int)
        query = New.query
        
        if field_id:
            query = query.filter_by(field_id=field_id)
            
        news = query.order_by(New.created_at.desc()).all()
        return jsonify([new.to_dict() for new in news]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/news/<int:id>', methods=['GET'])
def get_new(id):
    try:
        new = New.query.get_or_404(id)
        return jsonify(new.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/news', methods=['POST'])
def create_new():
    try:
        data = request.get_json()
        
        required_fields = ['title', 'content', 'field_id']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        new = New(
            title=data['title'],
            description=data.get('description'),
            content=data['content'],
            image_url=data.get('image_url'),
            field_id=data['field_id']
        )
        
        db.session.add(new)
        db.session.commit()
        
        return jsonify(new.to_dict()), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/news/<int:id>', methods=['PUT'])
def update_new(id):
    try:
        new = New.query.get_or_404(id)
        data = request.get_json()
        
        if 'title' in data:
            new.title = data['title']
        if 'description' in data:
            new.description = data['description']
        if 'content' in data:
            new.content = data['content']
        if 'image_url' in data:
            new.image_url = data['image_url']
        if 'field_id' in data:
            new.field_id = data['field_id']
            
        db.session.commit()
        return jsonify(new.to_dict()), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/news/<int:id>', methods=['DELETE'])
def delete_new(id):
    try:
        new = New.query.get_or_404(id)
        db.session.delete(new)
        db.session.commit()
        return '', 204
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500 
