const httpErrors = require('http-errors');

const createError = err => {
    const e = httpErrors(err[0], err[1]);
    e.code = err[2];
    return e;  
};

const errors = {  
    // 400 Errors
    INVALID_TRAINER_PHONE: [400, '유효하지 않은 트레이너 휴대폰 번호입니다.'],
    INVALID_TRAINEE_PHONE: [400, '유효하지 않은 트레이니 휴대폰 번호입니다.'],
    INVALID_TRAINER_PASSWORD: [400, '유효하지 않은 트레이너 비밀번호입니다.'],
    INVALID_TRAINEE_PASSWORD: [400, '유효하지 않은 트레이니 비밀번호입니다.'],
    INVALID_FORMAT_PHONE: [400, '올바르지 않은 형식의 휴대폰 번호입니다.'],
    INVALID_PHONE_LENGTH: [400, '휴대폰 번호의 길이가 올바르지 않습니다.'],
    INVALID_FORMAT_PASSWORD: [400, '올바르지 않은 형식의 비밀번호입니다.'],
    TOKEN_EXPIRED : [400, '만료된 Token입니다.'],
    ALREADY_LOGGED_OUT : [400, '이미 로그아웃된 사용자입니다.'],
  
    // 401 Errors
    LOGIN_REQUIRED: [401, '로그인이 필요합니다.'],
  
    // 403 Errors
    JSON_WEB_TOKEN_ERROR : [403, '권한이 없는 요청입니다.'],
  
    // 404 Errors
    TRAINER_NOT_FOUND: [404, '찾을 수 없는 트레이너입니다.'],
    TRAINEE_NOT_FOUND: [404, '찾을 수 없는 트레이니입니다.'],
    REQUEST_NOT_FOUND: [404, '관련된 친구 요청이 없습니다.'],
    MEMBER_NOT_FOUND: [404, '연결된 회원이 없습니다.'],
    DUPLICATED_PHONE: [404, '중복된 휴대폰 번호입니다.'],
    DUPLICATED_PASSWORD: [404, '기존과 동일한 패스워드입니다.'],
    DUPLICATED_REQUEST: [404, '중복된 친구 요청입니다.'],
    NOT_FOUND: [404, '찾을 수 없는 요청입니다.'],
    EXCEEDED_SMS_ATTEMPTS : [404, '하루 전송 건 수를 초과했습니다.'],
    EXCEEDED_AUTH_ATTEMPTS : [404, '하루 인증 시도 횟수를 초과했습니다.'],
    INVALID_AUTH_NUMBER : [404, '유효하지 않은 인증 번호입니다.'],
    AUTH_NUMBER_EXPIRED : [404, '유효 시간이 지났습니다.'],
    CERTIFICATION_NOT_EXISTED : [404, '해당 정보가 존재하지 않습니다.'],
    
    // 500 Errors
    SERVER_ERROR: [500, '서버 에러.'],
};

Object.keys(errors).forEach(key => {
    errors[key] = createError([...errors[key], key]);
});

module.exports = errors;
