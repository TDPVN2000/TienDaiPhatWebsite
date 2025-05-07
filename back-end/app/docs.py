from flask_restx import Api, fields, Namespace

# Create the API documentation
api = Api(
    title='Tien Dai Phat API',
    version='1.0',
    description='API documentation for Tien Dai Phat website',
    doc='/api/docs',
    prefix='/api'
)
