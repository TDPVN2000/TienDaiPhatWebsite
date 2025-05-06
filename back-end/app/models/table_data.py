from ..extensions import db

class TableData(db.Model):
    __tablename__ = 'table_data'
    id = db.Column(db.Integer, primary_key=True)
    field_id = db.Column(db.Integer, db.ForeignKey('field.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    data = db.Column(db.Text)  # Có thể lưu JSON, HTML, Markdown

    field = db.relationship('Field', backref=db.backref('table_data', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'field_id': self.field_id,
            'title': self.title,
            'data': self.data
        } 
