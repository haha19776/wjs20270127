// 사용 가능한 모델 목록 확인 스크립트
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

async function listModels() {
  console.log('========================================');
  console.log('사용 가능한 모델 목록 확인');
  console.log('========================================\n');

  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY가 설정되지 않았습니다.');
    return;
  }

  console.log('✅ API 키 확인:', apiKey.substring(0, 10) + '...\n');

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // ListModels API 호출 시도
    console.log('사용 가능한 모델 목록을 가져오는 중...\n');
    
    // 직접 API 호출로 모델 목록 확인
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API 호출 실패:', response.status, response.statusText);
      console.error('오류 내용:', errorText);
      return;
    }

    const data = await response.json();
    
    if (data.models && data.models.length > 0) {
      console.log('✅ 사용 가능한 모델 목록:\n');
      data.models.forEach((model, index) => {
        console.log(`${index + 1}. ${model.name}`);
        if (model.supportedGenerationMethods) {
          console.log(`   지원 메서드: ${model.supportedGenerationMethods.join(', ')}`);
        }
        console.log('');
      });
      
      // generateContent를 지원하는 모델 찾기
      const supportedModels = data.models.filter(m => 
        m.supportedGenerationMethods && 
        m.supportedGenerationMethods.includes('generateContent')
      );
      
      if (supportedModels.length > 0) {
        console.log('========================================');
        console.log('generateContent를 지원하는 모델:');
        console.log('========================================\n');
        supportedModels.forEach((model, index) => {
          const modelId = model.name.replace('models/', '');
          console.log(`${index + 1}. ${modelId}`);
        });
        console.log('\n위 모델 중 하나를 사용하세요.');
      }
    } else {
      console.log('❌ 사용 가능한 모델이 없습니다.');
    }
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    console.error('\n전체 오류:', error);
  }
}

listModels().catch(console.error);
