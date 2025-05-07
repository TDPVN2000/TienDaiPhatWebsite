from flask import Blueprint, request
from flask_restx import Resource
from ..utils.certification_service import CertificationService
from ..models import Certification
from ..extensions import db
from ..docs.api import certification_ns, certification_model
from . import BaseController

bp = Blueprint('certification', __name__, url_prefix='/api/certifications')

@certification_ns.route('/')
class CertificationList(BaseController):
    @certification_ns.doc('list_certifications')
    @certification_ns.marshal_list_with(certification_model)
    def get(self):
        """List all certifications"""
        certs = CertificationService.get_all()
        return [c.to_dict() for c in certs]

    @certification_ns.doc('create_certification')
    @certification_ns.expect(certification_model)
    @certification_ns.marshal_with(certification_model, code=201)
    def post(self):
        """Create a new certification"""
        data = request.get_json()
        cert = CertificationService.create(data)
        return cert.to_dict(), 201

@certification_ns.route('/<int:cert_id>')
@certification_ns.param('cert_id', 'The certification identifier')
class CertificationResource(BaseController):
    @certification_ns.doc('get_certification')
    @certification_ns.marshal_with(certification_model)
    def get(self, cert_id):
        """Get a certification by ID"""
        cert = CertificationService.get_by_id(cert_id)
        if not cert:
            certification_ns.abort(404, 'Certification not found')
        return cert.to_dict()

    @certification_ns.doc('update_certification')
    @certification_ns.expect(certification_model)
    @certification_ns.marshal_with(certification_model)
    def put(self, cert_id):
        """Update a certification"""
        data = request.get_json()
        cert = CertificationService.update(cert_id, data)
        if not cert:
            certification_ns.abort(404, 'Certification not found')
        return cert.to_dict()

    @certification_ns.doc('delete_certification')
    @certification_ns.response(204, 'Certification deleted')
    def delete(self, cert_id):
        """Delete a certification"""
        success = CertificationService.delete(cert_id)
        if not success:
            certification_ns.abort(404, 'Certification not found')
        return '', 204 
