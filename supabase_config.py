"""
Supabase 데이터베이스 연결 설정
"""
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# Supabase 설정
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

# Supabase 클라이언트 초기화
supabase: Client = None

def init_supabase():
    """Supabase 클라이언트 초기화"""
    global supabase
    
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("[WARNING] Supabase 설정이 없습니다. 환경 변수를 확인하세요.")
        print("[INFO] .env 파일에 SUPABASE_URL과 SUPABASE_KEY를 추가하세요.")
        return None
    
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print(f"[OK] Supabase 연결 성공: {SUPABASE_URL[:30]}...")
        return supabase
    except Exception as e:
        print(f"[ERROR] Supabase 연결 실패: {e}")
        return None

def get_supabase():
    """Supabase 클라이언트 반환"""
    global supabase
    if supabase is None:
        supabase = init_supabase()
    return supabase
