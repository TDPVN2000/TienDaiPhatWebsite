from ..extensions import db

class Capability(db.Model):
    __tablename__ = 'capability'
    id = db.Column(db.Integer, primary_key=True)
    field_id = db.Column(db.Integer, db.ForeignKey('field.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    icon_url = db.Column(db.String(500))
    description = db.Column(db.Text)

    field = db.relationship('Field', backref=db.backref('capabilities', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'field_id': self.field_id,
            'name': self.name,
            'icon_url': self.icon_url,
            'description': self.description
        } 
