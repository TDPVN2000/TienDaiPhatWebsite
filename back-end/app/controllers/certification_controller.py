from flask import Blueprint, request
from flask_restx import Resource
from ..utils.certification_service import CertificationService
from ..models import Certification
from ..extensions import db
from . import BaseController

bp = Blueprint('certification', __name__)

class CertificationController(BaseController):
    def get(self, cert_id=None):
        if cert_id:
            cert = CertificationService.get_by_id(cert_id)
            if not cert:
                return self.not_found_response('Certification not found')
            return self.success_response(cert.to_dict())
        certs = CertificationService.get_all()
        return self.success_response([c.to_dict() for c in certs])

    def post(self):
        data = request.get_json()
        cert = CertificationService.create(data)
        return self.success_response(cert.to_dict(), 'Certification created', 201)

    def put(self, cert_id):
        data = request.get_json()
        cert = CertificationService.update(cert_id, data)
        if not cert:
            return self.not_found_response('Certification not found')
        return self.success_response(cert.to_dict(), 'Certification updated')

    def delete(self, cert_id):
        success = CertificationService.delete(cert_id)
        if not success:
            return self.not_found_response('Certification not found')
        return self.success_response(None, 'Certification deleted') 
