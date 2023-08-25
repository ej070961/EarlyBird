import {firestore} from '../firebase'

import{
    LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER
} from './types'

export function registerUser(dataToSubmit){
    const users = firestore.collection("users");
    const result = users.doc()
        .set(dataToSubmit)
        .then( res =>{
            return "success"
            }
        )
        .catch(error => {
            console.log(error);
        });

    return{
        type: REGISTER_USER,
        payload: result
    }
}

export function loginUser(dataToSubmit){

    const users = firestore.collection("users");

        // Query the collection for the user's id
    const result = users.where("Uid", "==", dataToSubmit)
    .get()
    .then(snapshot => {
        if (snapshot.size > 0) {
            //uid가 users 컬렉션에 있으면, 메인페이지로 이동 
            console.log(snapshot);
            return "success";
        } else {
            console.log("Token not found in Firestore.");
        }
    })
    .catch(error => {
        console.log(error);
    });

    return{
        type: LOGIN_USER,
        payload: result
    }
}

export function authUser(uid){
  
    const users = firestore.collection("users");

    // Query the collection for the user's id
    const result = users.where("Uid", "==", uid)
    .get()
    .then(snapshot => {
        if (snapshot.size > 0) {    
           const userDoc = snapshot.docs[0].data() //사용자 정보 가져오기
           return userDoc;
        }else{
            console.log("User not found.");
        }
    })
    .catch(error => {
    console.log(error);
    });
   

    return{
        type: AUTH_USER,
        payload: result
    }
}