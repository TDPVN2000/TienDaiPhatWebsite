from ..extensions import db

class Certification(db.Model):
    __tablename__ = 'certification'
    id = db.Column(db.Integer, primary_key=True)
    field_id = db.Column(db.Integer, db.ForeignKey('field.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(500))
    description = db.Column(db.Text)

    field = db.relationship('Field', backref=db.backref('certifications', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'field_id': self.field_id,
            'name': self.name,
            'image_url': self.image_url,
            'description': self.description
        } 
