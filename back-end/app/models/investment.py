from ..extensions import db

class Investment(db.Model):
    __tablename__ = 'investment'
    id = db.Column(db.Integer, primary_key=True)
    field_id = db.Column(db.Integer, db.ForeignKey('field.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    value = db.Column(db.String(255))
    unit = db.Column(db.String(50))
    description = db.Column(db.Text)

    field = db.relationship('Field', backref=db.backref('investments', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'field_id': self.field_id,
            'title': self.title,
            'value': self.value,
            'unit': self.unit,
            'description': self.description
        } 
