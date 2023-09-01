//user에 관한 state을 변경하는 함수 
import{
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from '../_actions/types.js';

export default function (state = {}, action){
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        case REGISTER_USER:
            return {...state, register: action.payload} //state를 똑같이 가져오고, user_actions의 payload를 넣어줌 
        case AUTH_USER:
            if (action.payload) {
                console.log("Yes payload")
                return { ...state, userData: action.payload };
            }
            console.log("no payload")
            return state; 
            // return { ...state, userData: action.payload };
        default:
            return {...state};
    }
}