from ..extensions import db

class Field(db.Model):
    __tablename__ = 'field'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(500))

    # Relationships with unique backref names
    investments = db.relationship('Investment', backref='field_investment', lazy=True)
    certifications = db.relationship('Certification', backref='field_certification', lazy=True)
    projects = db.relationship('Project', backref='field_project', lazy=True)
    table_data = db.relationship('TableData', backref='field_table', lazy=True)
    introductions = db.relationship('Introduction', backref='field_introduction', lazy=True)
    capabilities = db.relationship('Capability', backref='field_capability', lazy=True)
    products = db.relationship('Product', backref='field_product', lazy=True)

    def to_dict(self, include_children=False):
        data = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image_url': self.image_url
        }
        
        if include_children:
            data.update({
                'investments': [i.to_dict() for i in self.investments],
                'certifications': [c.to_dict() for c in self.certifications],
                'projects': [p.to_dict() for p in self.projects],
                'table_data': [t.to_dict() for t in self.table_data],
                'introductions': [i.to_dict() for i in self.introductions],
                'capabilities': [c.to_dict() for c in self.capabilities],
                'products': [p.to_dict() for p in self.products]
            })
        
        return data 
