from django.utils.deprecation import MiddlewareMixin

class MyAppMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        #response['X-XSS-Protection'] = "1; mode=block"
        #response['Server'] = "1; mode=block"
        response['Server'] = ''
        return response


class RemoveHeaders(MiddlewareMixin):  
    def process_response(self, request, response):
        response['Server'] = ''
        return response
