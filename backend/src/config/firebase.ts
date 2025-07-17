import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import 'dotenv/config';

const firebaseConfig = {
  type: process.env['FIREBASE_TYPE'],
  project_id: process.env['FIREBASE_PROJECT_ID'],
  private_key_id: process.env['FIREBASE_PRIVATE_KEY_ID'],
  private_key: process.env['FIREBASE_PRIVATE_KEY']?.replace(/\\n/g, '\n'),
  client_email: process.env['FIREBASE_CLIENT_EMAIL'],
  client_id: process.env['FIREBASE_CLIENT_ID'],
  auth_uri: process.env['FIREBASE_AUTH_URI'],
  token_uri: process.env['FIREBASE_TOKEN_URI'],
  auth_provider_x509_cert_url: process.env['FIREBASE_AUTH_PROVIDER_X509_CERT_URL'],
  client_x509_cert_url: process.env['FIREBASE_CLIENT_X509_CERT_URL'],
  universe_domain: process.env['FIREBASE_UNIVERSE_DOMAIN'],
};

let db: any;

try {
  if (!getApps().length) {
    // 필수 환경변수 체크
    const requiredEnvs = ['FIREBASE_PROJECT_ID', 'FIREBASE_PRIVATE_KEY', 'FIREBASE_CLIENT_EMAIL'];
    const missingEnvs = requiredEnvs.filter(env => !process.env[env]);
    
    if (missingEnvs.length > 0) {
      console.warn('⚠️ Firebase 환경변수 누락:', missingEnvs.join(', '));
      console.warn('🔄 Mock Firestore를 사용합니다.');
      
      // Mock Firestore 객체 생성
      db = {
        collection: () => ({
          get: () => Promise.resolve({ docs: [] }),
          add: () => Promise.resolve({ id: 'mock-id' }),
          doc: () => ({
            get: () => Promise.resolve({ exists: false }),
            set: () => Promise.resolve(),
            update: () => Promise.resolve(),
            delete: () => Promise.resolve(),
          })
        })
      };
    } else {
      initializeApp({
        credential: cert(firebaseConfig as any),
      });
      db = getFirestore();
      console.log('✅ Firebase 초기화 성공');
    }
  } else {
    db = getFirestore();
  }
} catch (error) {
  console.error('❌ Firebase 초기화 실패:', error);
  console.warn('🔄 Mock Firestore를 사용합니다.');
  
  // Mock Firestore 객체 생성
  db = {
    collection: () => ({
      get: () => Promise.resolve({ docs: [] }),
      add: () => Promise.resolve({ id: 'mock-id' }),
      doc: () => ({
        get: () => Promise.resolve({ exists: false }),
        set: () => Promise.resolve(),
        update: () => Promise.resolve(),
        delete: () => Promise.resolve(),
      })
    })
  };
}

export { db };

// Firebase Auth 인스턴스 가져오기
export const getFirebaseAuth = () => {
  return getAuth();
};

// 컬렉션 참조 헬퍼 함수들
export const getCollection = (collectionName: string) => {
  return db.collection(collectionName);
};

export const getDocument = (collectionName: string, docId: string) => {
  return db.collection(collectionName).doc(docId);
};

export const getBatch = () => {
  return db.batch();
};

export const getTransaction = () => {
  return db.runTransaction.bind(db);
}; 