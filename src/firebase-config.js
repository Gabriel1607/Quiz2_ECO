const firebaseConfig = {
  apiKey: "AIzaSyBpiBCDMbNAyYOE-kFClXCDUOkHpmiblWs",
  authDomain: "quiz2eco-5e9ac.firebaseapp.com",
  projectId: "quiz2eco-5e9ac",
  storageBucket: "quiz2eco-5e9ac.appspot.com",
  messagingSenderId: "468044644286",
  appId: "1:468044644286:web:b8d88e43ff70eecbe3c3ef"
  };

export function getFirebaseConfig(){
    if(!firebaseConfig || !firebaseConfig.apiKey){
        throw new Error("Firebase configuration error");
    }else{
        return firebaseConfig;
    }
  }