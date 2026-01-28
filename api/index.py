"""
Vercel Serverless Function for Flask App
"""
import sys
import os

# 프로젝트 루트를 Python 경로에 추가
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

# Flask 앱 import
from app import app

def handler(request):
    """
    Vercel serverless function handler
    Vercel Python runtime 형식
    """
    from io import BytesIO
    
    try:
        # Request 정보 추출
        method = getattr(request, 'method', 'GET')
        path = getattr(request, 'path', '/')
        
        # Headers 처리
        request_headers = {}
        if hasattr(request, 'headers'):
            if isinstance(request.headers, dict):
                request_headers = request.headers
            elif hasattr(request.headers, 'get'):
                request_headers = request.headers
            else:
                try:
                    request_headers = dict(request.headers)
                except:
                    pass
        
        # Body 처리
        body_bytes = b''
        if hasattr(request, 'body'):
            if isinstance(request.body, bytes):
                body_bytes = request.body
            elif request.body:
                try:
                    body_bytes = str(request.body).encode('utf-8')
                except:
                    body_bytes = b''
        
        # Query string 처리
        query_str = ''
        if hasattr(request, 'query_string'):
            qs = request.query_string
            if isinstance(qs, bytes):
                query_str = qs.decode('utf-8', errors='ignore')
            else:
                query_str = str(qs)
        
        # Content-Type 추출
        content_type = ''
        if 'content-type' in request_headers:
            content_type = request_headers['content-type']
        elif 'Content-Type' in request_headers:
            content_type = request_headers['Content-Type']
        
        # WSGI 환경 변수 구성
        environ = {
            'REQUEST_METHOD': method,
            'SCRIPT_NAME': '',
            'PATH_INFO': path,
            'QUERY_STRING': query_str,
            'CONTENT_TYPE': content_type,
            'CONTENT_LENGTH': str(len(body_bytes)),
            'SERVER_NAME': 'localhost',
            'SERVER_PORT': '80',
            'SERVER_PROTOCOL': 'HTTP/1.1',
            'wsgi.version': (1, 0),
            'wsgi.url_scheme': 'https',
            'wsgi.input': BytesIO(body_bytes),
            'wsgi.errors': sys.stderr,
            'wsgi.multithread': False,
            'wsgi.multiprocess': True,
            'wsgi.run_once': False,
        }
        
        # HTTP 헤더 추가
        for key, value in request_headers.items():
            key_upper = key.upper().replace('-', '_')
            if key_upper not in ('CONTENT_TYPE', 'CONTENT_LENGTH', 'HOST'):
                environ[f'HTTP_{key_upper}'] = str(value)
        
        # 응답 수집
        response_status = [None]
        response_headers = []
        response_body = []
        
        def start_response(status, headers):
            response_status[0] = status
            response_headers.extend(headers)
        
        # Flask 앱 실행
        result = app(environ, start_response)
        
        # 응답 본문 수집
        for chunk in result:
            if chunk:
                if isinstance(chunk, bytes):
                    response_body.append(chunk)
                else:
                    response_body.append(chunk.encode('utf-8'))
        
        # BytesIO 정리
        if 'wsgi.input' in environ:
            try:
                environ['wsgi.input'].close()
            except:
                pass
        
        # 상태 코드 추출
        status_code = 200
        if response_status[0]:
            try:
                status_code = int(response_status[0].split()[0])
            except:
                status_code = 200
        
        # 헤더 딕셔너리로 변환
        headers_dict = {}
        for header in response_headers:
            if len(header) >= 2:
                headers_dict[header[0]] = header[1]
        
        # 본문 결합
        try:
            body_text = b''.join(response_body).decode('utf-8', errors='ignore')
        except Exception as e:
            body_text = f"Error decoding response: {str(e)}"
        
        return {
            'statusCode': status_code,
            'headers': headers_dict,
            'body': body_text
        }
        
    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        error_msg = f"Handler error: {str(e)}\n\n{error_trace}"
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'text/plain; charset=utf-8'},
            'body': error_msg
        }
