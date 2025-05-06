from ..extensions import db

class Project(db.Model):
    __tablename__ = 'project'
    id = db.Column(db.Integer, primary_key=True)
    field_id = db.Column(db.Integer, db.ForeignKey('field.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(500))
    year_completed = db.Column(db.Integer)

    field = db.relationship('Field', backref=db.backref('projects', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'field_id': self.field_id,
            'name': self.name,
            'description': self.description,
            'image_url': self.image_url,
            'year_completed': self.year_completed
        } 
