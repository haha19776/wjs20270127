// API 연결 테스트 스크립트
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// .env.local 파일에서 API 키 읽기
function getApiKey() {
  try {
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=(.+)/);
    if (match) {
      return match[1].trim();
    }
  } catch (error) {
    console.error('환경 변수 파일 읽기 오류:', error.message);
  }
  return null;
}

async function testAPI() {
  console.log('========================================');
  console.log('Gemini API 연결 테스트');
  console.log('========================================\n');

  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY가 설정되지 않았습니다.');
    console.error('.env.local 파일을 확인하세요.');
    return;
  }

  console.log('✅ API 키 확인:', apiKey.substring(0, 10) + '...');
  console.log('');

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // 테스트할 모델 목록
  const modelsToTest = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
  ];

  for (const modelName of modelsToTest) {
    try {
      console.log(`시도 중: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const result = await model.generateContent('안녕하세요');
      const response = await result.response;
      const text = response.text();
      
      console.log(`✅ 성공: ${modelName}`);
      console.log(`   응답: ${text.substring(0, 50)}...\n`);
      return; // 첫 번째 성공한 모델 사용
    } catch (error) {
      console.log(`❌ 실패: ${modelName}`);
      if (error.message) {
        console.log(`   오류: ${error.message}\n`);
      } else {
        console.log(`   오류: ${JSON.stringify(error, null, 2)}\n`);
      }
    }
  }

  console.log('❌ 모든 모델 테스트 실패');
  console.log('\n가능한 원인:');
  console.log('1. API 키가 유효하지 않음');
  console.log('2. API 키에 권한이 없음');
  console.log('3. 할당량 초과');
  console.log('4. 네트워크 문제');
}

testAPI().catch(console.error);
