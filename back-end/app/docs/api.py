from flask_restx import Api

# Create API instance
api = Api(
    title='TienDaiPhat API',
    version='1.0',
    description='API documentation for TienDaiPhat website',
    doc='/api/docs',
    prefix='/api',
    security='Bearer Auth',
    authorizations={
        'Bearer Auth': {
            'type': 'apiKey',
            'in': 'header',
            'name': 'Authorization',
            'description': 'Type in the *\'Value\'* input box below: **\'Bearer &lt;JWT&gt;\'**, where JWT is the token'
        }
    }
) 
