const httpErrors = require('http-errors');

const createError = err => {
    const e = httpErrors(err[0], err[1]);
    e.code = err[2];
    return e;  
};

const errors = {  
    // 400 Errors
    INVALID_ID: [400, '유효하지 않은 아이디입니다.'],
    INVALID_PASSWORD: [400, '유효하지 않은 비밀번호입니다.'],
    INVALID_FORMAT_PASSWORD: [400, '올바르지 않은 형식의 비밀번호입니다.'],
    TOKEN_EXPIRED : [400, '만료된 Token입니다.'],
    ALREADY_LOGGED_OUT : [400, '이미 로그아웃된 사용자입니다.'],
  
    // 401 Errors
    LOGIN_REQUIRED: [401, '로그인이 필요합니다.'],
  
    // 403 Errors
    JSON_WEB_TOKEN_ERROR : [403, '권한이 없는 요청입니다.'],
  
    // 404 Errors
    USER_NOT_FOUND: [404, '찾을 수 없는 트레이너입니다.'],
    DUPLICATED_ID: [404, '중복된 아이디입니다.'],
    DUPLICATED_PASSWORD: [404, '기존과 동일한 패스워드입니다.'],
    NOT_FOUND: [404, '찾을 수 없는 요청입니다.'],
    
    // 500 Errors
    SERVER_ERROR: [500, '서버 에러.'],
};

Object.keys(errors).forEach(key => {
    errors[key] = createError([...errors[key], key]);
});

module.exports = errors;
