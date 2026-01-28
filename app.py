from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
import os
from datetime import datetime
import traceback
from dotenv import load_dotenv
from dateutil import parser as date_parser

# Supabase는 선택적 (설정이 없어도 앱이 실행되도록)
try:
    from supabase_config import get_supabase
    supabase_available = True
except Exception as e:
    print(f"[WARNING] Supabase 모듈 로드 실패: {e}")
    supabase_available = False
    def get_supabase():
        return None

# .env 파일 로드 (로컬 개발 시)
load_dotenv()

app = Flask(__name__, 
            template_folder='templates',
            static_folder='static')
CORS(app)  # CORS 활성화

# 제미나이 API 설정
# 환경 변수에서 API 키 가져오기 (GitHub에 노출 방지)
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

# API 키 검증 및 설정 (Vercel에서도 작동하도록 지연 초기화)
def init_gemini():
    """제미나이 API 초기화"""
    global GEMINI_API_KEY
    if not GEMINI_API_KEY:
        return False
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        # Vercel에서는 print가 로그로 저장됨
        return True
    except Exception as e:
        # Vercel에서는 print가 로그로 저장됨
        return False

# 앱 시작 시 초기화 시도 (실패해도 앱은 실행)
# Vercel에서는 print가 로그에 저장되므로 try-except로 감쌈
try:
    if GEMINI_API_KEY:
        init_gemini()
except:
    pass

# 전역 변수로 뉴스 데이터 저장
news_data = []

# 전역 변수로 모델 저장 (한 번만 초기화)
gemini_model = None

# Supabase 초기화 (선택적)
supabase = get_supabase() if supabase_available else None

def search_google_news(keyword, num_results=5):
    """구글 뉴스에서 키워드로 뉴스 검색"""
    try:
        # Google News RSS 피드 사용
        url = f"https://news.google.com/rss/search?q={keyword}&hl=ko&gl=KR&ceid=KR:ko"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'xml')
        items = soup.find_all('item')[:num_results]
        
        news_list = []
        for item in items:
            title = item.find('title').text if item.find('title') else "제목 없음"
            link = item.find('link').text if item.find('link') else ""
            pub_date = item.find('pubDate').text if item.find('pubDate') else ""
            description = item.find('description').text if item.find('description') else ""
            
            # HTML 태그 제거
            description = BeautifulSoup(description, 'html.parser').get_text()
            
            news_list.append({
                'title': title,
                'link': link,
                'pubDate': pub_date,
                'description': description
            })
        
        return news_list
    except Exception as e:
        print(f"뉴스 검색 오류: {e}")
        return []

def get_gemini_model():
    """사용 가능한 제미나이 모델 반환 (캐싱)"""
    global gemini_model
    
    # API 키 확인
    if not GEMINI_API_KEY:
        raise Exception("GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.")
    
    # API 초기화 시도
    if not init_gemini():
        raise Exception("제미나이 API 초기화에 실패했습니다.")
    
    # 이미 초기화된 모델이 있으면 재사용
    if gemini_model is not None:
        return gemini_model
    
    print("[INFO] 사용 가능한 모델 목록 조회 중...")
    
    try:
        # 사용 가능한 모든 모델 조회
        available_models = []
        for model in genai.list_models():
            # generateContent를 지원하는 모델만 필터링
            if 'generateContent' in model.supported_generation_methods:
                available_models.append(model.name)
                print(f"[INFO] 사용 가능한 모델 발견: {model.name}")
        
        if not available_models:
            raise Exception("generateContent를 지원하는 모델이 없습니다.")
        
        # 첫 번째 사용 가능한 모델 사용
        model_name = available_models[0]
        print(f"[OK] 모델 선택: {model_name}")
        
        gemini_model = genai.GenerativeModel(model_name)
        print(f"[OK] 모델 '{model_name}' 초기화 완료")
        
        return gemini_model
        
    except Exception as e:
        print(f"[ERROR] 모델 초기화 실패: {e}")
        print(traceback.format_exc())
        raise Exception(f"제미나이 API 모델을 사용할 수 없습니다: {e}")

def summarize_news(news_list):
    """제미나이 API를 사용하여 뉴스 요약"""
    try:
        model = get_gemini_model()
        
        # 뉴스 내용을 하나의 텍스트로 합치기
        news_text = "\n\n".join([
            f"제목: {news['title']}\n설명: {news['description']}"
            for news in news_list
        ])
        
        prompt = f"""다음 뉴스들을 읽고 각 뉴스를 간단히 요약해주세요. 
각 뉴스마다 2-3줄로 핵심 내용을 요약해주세요.

{news_text}

요약 형식:
1. [뉴스 제목]
   - 요약 내용

2. [뉴스 제목]
   - 요약 내용
"""
        
        # 생성 설정 추가 (간단하게)
        try:
            generation_config = genai.types.GenerationConfig(
                temperature=0.7,
                top_p=0.8,
                top_k=40,
                max_output_tokens=2048,
            )
            response = model.generate_content(
                prompt,
                generation_config=generation_config
            )
        except:
            # generation_config가 지원되지 않으면 기본 방식 사용
            response = model.generate_content(prompt)
        
        # 응답 처리 개선
        if hasattr(response, 'text') and response.text:
            return response.text
        elif hasattr(response, 'parts') and len(response.parts) > 0:
            text_parts = []
            for part in response.parts:
                if hasattr(part, 'text'):
                    text_parts.append(part.text)
            if text_parts:
                return ''.join(text_parts)
        elif hasattr(response, 'candidates') and len(response.candidates) > 0:
            candidate = response.candidates[0]
            if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
                text_parts = [part.text for part in candidate.content.parts if hasattr(part, 'text')]
                if text_parts:
                    return ''.join(text_parts)
        
        return str(response)
    except Exception as e:
        error_msg = str(e)
        print(f"[ERROR] 요약 오류: {error_msg}")
        print(traceback.format_exc())
        return f"요약 생성 중 오류가 발생했습니다: {error_msg}"

def chat_with_news(user_message, news_list):
    """제미나이 API를 사용하여 뉴스 기반 대화"""
    try:
        model = get_gemini_model()
        
        # 뉴스 내용을 컨텍스트로 제공
        news_context = "\n\n".join([
            f"제목: {news['title']}\n설명: {news['description']}"
            for news in news_list
        ])
        
        prompt = f"""당신은 뉴스 기반 챗봇입니다. 다음 뉴스들을 읽고 사용자의 질문에 답변해주세요.
뉴스 내용을 기반으로 정확하고 도움이 되는 답변을 제공하세요.

뉴스 내용:
{news_context}

사용자 질문: {user_message}

답변:"""
        
        # 생성 설정 추가 (간단하게)
        try:
            generation_config = genai.types.GenerationConfig(
                temperature=0.7,
                top_p=0.8,
                top_k=40,
                max_output_tokens=2048,
            )
            response = model.generate_content(
                prompt,
                generation_config=generation_config
            )
        except:
            # generation_config가 지원되지 않으면 기본 방식 사용
            response = model.generate_content(prompt)
        
        # 응답 처리 개선
        if hasattr(response, 'text') and response.text:
            return response.text
        elif hasattr(response, 'parts') and len(response.parts) > 0:
            text_parts = []
            for part in response.parts:
                if hasattr(part, 'text'):
                    text_parts.append(part.text)
            if text_parts:
                return ''.join(text_parts)
        elif hasattr(response, 'candidates') and len(response.candidates) > 0:
            candidate = response.candidates[0]
            if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
                text_parts = [part.text for part in candidate.content.parts if hasattr(part, 'text')]
                if text_parts:
                    return ''.join(text_parts)
        
        return str(response)
    except Exception as e:
        error_msg = str(e)
        print(f"[ERROR] 챗봇 오류: {error_msg}")
        print(traceback.format_exc())
        return f"답변 생성 중 오류가 발생했습니다: {error_msg}"

@app.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        print(f"템플릿 렌더링 오류: {e}")
        return f"템플릿 로드 오류: {str(e)}", 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': '요청한 리소스를 찾을 수 없습니다.', 'path': request.path}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': '서버 내부 오류가 발생했습니다.'}), 500

def save_news_to_db(keyword, news_list, summary):
    """뉴스 데이터를 Supabase에 저장"""
    global supabase
    
    if not supabase:
        print("[WARNING] Supabase가 연결되지 않아 DB에 저장하지 않습니다.")
        return None
    
    try:
        # 1. 검색 기록 저장
        search_record = {
            'keyword': keyword,
            'news_count': len(news_list)
        }
        
        search_result = supabase.table('news_searches').insert(search_record).execute()
        
        if not search_result.data or len(search_result.data) == 0:
            print("[ERROR] 검색 기록 저장 실패")
            return None
        
        search_id = search_result.data[0]['id']
        print(f"[OK] 검색 기록 저장 완료 (ID: {search_id})")
        
        # 2. 뉴스 기사 저장
        articles_to_insert = []
        for news in news_list:
            # pubDate 파싱
            pub_date = None
            if news.get('pubDate'):
                try:
                    pub_date = date_parser.parse(news['pubDate']).isoformat()
                except:
                    pass
            
            article = {
                'search_id': search_id,
                'title': news.get('title', ''),
                'link': news.get('link', ''),
                'description': news.get('description', ''),
                'pub_date': pub_date
            }
            articles_to_insert.append(article)
        
        # 배치로 삽입
        if articles_to_insert:
            articles_result = supabase.table('news_articles').insert(articles_to_insert).execute()
            print(f"[OK] {len(articles_to_insert)}개 뉴스 기사 저장 완료")
        
        # 3. 요약 저장 (첫 번째 기사에 요약 추가)
        if summary and articles_to_insert:
            try:
                supabase.table('news_articles').update({
                    'summary': summary
                }).eq('search_id', search_id).eq('id', articles_result.data[0]['id']).execute()
                print("[OK] 뉴스 요약 저장 완료")
            except Exception as e:
                print(f"[WARNING] 요약 저장 실패: {e}")
        
        return search_id
        
    except Exception as e:
        print(f"[ERROR] DB 저장 오류: {e}")
        print(traceback.format_exc())
        return None

@app.route('/api/search', methods=['POST'])
def search():
    global news_data
    data = request.json
    keyword = data.get('keyword', '')
    
    if not keyword:
        return jsonify({'error': '키워드를 입력해주세요.'}), 400
    
    # 뉴스 검색
    news_list = search_google_news(keyword, 5)
    
    if not news_list:
        return jsonify({'error': '뉴스를 찾을 수 없습니다.'}), 404
    
    news_data = news_list
    
    # 뉴스 요약
    summary = summarize_news(news_list)
    
    # Supabase에 저장
    search_id = save_news_to_db(keyword, news_list, summary)
    
    return jsonify({
        'news': news_list,
        'summary': summary,
        'search_id': search_id,
        'saved_to_db': search_id is not None
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    global news_data
    
    if not news_data:
        return jsonify({'error': '먼저 뉴스를 검색해주세요.'}), 400
    
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({'error': '메시지를 입력해주세요.'}), 400
    
    # 챗봇 응답 생성
    response = chat_with_news(user_message, news_data)
    
    return jsonify({
        'response': response
    })

@app.route('/api/reset-model', methods=['POST'])
def reset_model():
    """모델 캐시 초기화"""
    global gemini_model
    old_model = gemini_model
    gemini_model = None
    return jsonify({
        'status': 'success', 
        'message': '모델 캐시가 초기화되었습니다.',
        'previous_model': str(type(old_model)) if old_model else None
    })

@app.route('/api/searches', methods=['GET'])
def get_searches():
    """저장된 검색 기록 조회"""
    global supabase
    
    if not supabase:
        return jsonify({'error': 'Supabase가 연결되지 않았습니다.'}), 500
    
    try:
        limit = request.args.get('limit', 10, type=int)
        
        result = supabase.table('news_searches')\
            .select('*')\
            .order('search_date', desc=True)\
            .limit(limit)\
            .execute()
        
        return jsonify({
            'status': 'success',
            'searches': result.data if result.data else []
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'검색 기록 조회 실패: {str(e)}'
        }), 500

@app.route('/api/news/<int:search_id>', methods=['GET'])
def get_news_by_search(search_id):
    """특정 검색 ID의 뉴스 기사 조회"""
    global supabase
    
    if not supabase:
        return jsonify({'error': 'Supabase가 연결되지 않았습니다.'}), 500
    
    try:
        result = supabase.table('news_articles')\
            .select('*')\
            .eq('search_id', search_id)\
            .order('created_at', desc=True)\
            .execute()
        
        return jsonify({
            'status': 'success',
            'search_id': search_id,
            'articles': result.data if result.data else []
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'뉴스 조회 실패: {str(e)}'
        }), 500

@app.route('/api/news/keyword/<keyword>', methods=['GET'])
def get_news_by_keyword(keyword):
    """키워드로 검색된 뉴스 조회"""
    global supabase
    
    if not supabase:
        return jsonify({'error': 'Supabase가 연결되지 않았습니다.'}), 500
    
    try:
        # 먼저 검색 기록 찾기
        search_result = supabase.table('news_searches')\
            .select('id')\
            .eq('keyword', keyword)\
            .order('search_date', desc=True)\
            .limit(1)\
            .execute()
        
        if not search_result.data or len(search_result.data) == 0:
            return jsonify({
                'status': 'success',
                'keyword': keyword,
                'articles': []
            })
        
        search_id = search_result.data[0]['id']
        
        # 해당 검색의 뉴스 기사 조회
        articles_result = supabase.table('news_articles')\
            .select('*')\
            .eq('search_id', search_id)\
            .order('created_at', desc=True)\
            .execute()
        
        return jsonify({
            'status': 'success',
            'keyword': keyword,
            'search_id': search_id,
            'articles': articles_result.data if articles_result.data else []
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'뉴스 조회 실패: {str(e)}'
        }), 500

@app.route('/api/test', methods=['GET'])
def test_api():
    """제미나이 API 연결 테스트"""
    try:
        # 모델 가져오기 (캐시된 모델 사용)
        model = get_gemini_model()
        
        # 간단한 테스트
        try:
            test_response = model.generate_content("안녕하세요", 
                generation_config=genai.types.GenerationConfig(max_output_tokens=10))
        except:
            test_response = model.generate_content("안녕하세요")
        
        result_text = ""
        if hasattr(test_response, 'text'):
            result_text = test_response.text
        elif hasattr(test_response, 'parts') and len(test_response.parts) > 0:
            result_text = test_response.parts[0].text if hasattr(test_response.parts[0], 'text') else str(test_response.parts[0])
        
        # 사용 중인 모델 이름 추출
        model_name = 'unknown'
        try:
            if hasattr(model, '_model_name'):
                model_name = model._model_name
            elif hasattr(model, 'model_name'):
                model_name = model.model_name
        except:
            pass
        
        return jsonify({
            'status': 'success',
            'message': '제미나이 API 연결 성공',
            'test_response': result_text,
            'model': model_name,
            'api_key': f"{GEMINI_API_KEY[:10]}..." if GEMINI_API_KEY else "없음"
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'제미나이 API 연결 실패: {str(e)}',
            'api_key': f"{GEMINI_API_KEY[:10]}..." if GEMINI_API_KEY else "없음"
        }), 500

# Vercel용 애플리케이션 객체 노출
# Vercel에서는 app 객체를 직접 사용합니다
if __name__ != '__main__':
    # Vercel 환경에서 실행될 때
    pass
else:
    # 로컬 환경에서 실행될 때
    import socket
    
    def is_port_in_use(port):
        """포트가 사용 중인지 확인"""
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            return s.connect_ex(('127.0.0.1', port)) == 0
    
    # API 연결 테스트 (로컬 환경에서만)
    try:
        print("=" * 50)
        print("제미나이 API 연결 테스트 중...")
        test_model = get_gemini_model()
        print("[OK] 제미나이 API 연결 성공!")
    except Exception as e:
        print(f"[WARNING] 제미나이 API 연결 실패: {e}")
        print("[INFO] API 키를 확인하세요. (Vercel에서는 환경 변수로 설정)")
    
    # Supabase 연결 테스트 (로컬 환경에서만)
    try:
        if supabase:
            print("[INFO] Supabase 연결됨")
        else:
            print("[INFO] Supabase 미설정 (선택사항)")
    except:
        pass
    
    port = 5000
    if is_port_in_use(port):
        print(f"[WARNING] 포트 {port}가 이미 사용 중입니다.")
        print("[INFO] 다른 터미널에서 실행 중인 서버를 종료하거나")
        print("[INFO] 다른 포트를 사용하세요.")
        port = 5001
        print(f"[INFO] 포트 {port}로 시도합니다...")
    
    print("=" * 50)
    print("뉴스 기반 챗봇 서버를 시작합니다...")
    print(f"브라우저에서 http://127.0.0.1:{port} 으로 접속하세요")
    print(f"API 테스트: http://127.0.0.1:{port}/api/test")
    print("=" * 50)
    try:
        app.run(debug=True, host='127.0.0.1', port=port, use_reloader=False)
    except Exception as e:
        print(f"서버 시작 오류: {e}")
        print(traceback.format_exc())
