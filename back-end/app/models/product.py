from ..extensions import db

class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    field_id = db.Column(db.Integer, db.ForeignKey('field.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(500))
    features = db.Column(db.Text)  # Có thể lưu JSON hoặc text

    field = db.relationship('Field', backref=db.backref('products', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'field_id': self.field_id,
            'name': self.name,
            'description': self.description,
            'image_url': self.image_url,
            'features': self.features
        } 
