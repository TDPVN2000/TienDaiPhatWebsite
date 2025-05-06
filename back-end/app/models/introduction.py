from ..extensions import db

class Introduction(db.Model):
    __tablename__ = 'introduction'
    id = db.Column(db.Integer, primary_key=True)
    field_id = db.Column(db.Integer, db.ForeignKey('field.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text)

    field = db.relationship('Field', backref=db.backref('introductions', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'field_id': self.field_id,
            'title': self.title,
            'content': self.content
        } 
