const { User, RefreshToken } = require('../../../../models');
const { createResponse } = require('../../../../utils/response');
const { ALREADY_LOGGED_OUT, DUPLICATED_ID, DUPLICATED_PASSWORD, INVALID_ID, INVALID_FORMAT_PASSWORD, INVALID_PASSWORD } = require('../../../../errors');
const { SALT_ROUNDS, JWT_SECRET_KEY_FILE } = require('../../../../env');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { join } = require('path');

const register = async(req,res,next) => {
  const {body: {userId, userPassword}} = req;
  try {
    const duplicateTest = await User.findOne({where: {userId}});
    if(duplicateTest) //기존에 동일한 아이디를 가지는 회원이 있는지 검사
      return next(DUPLICATED_ID);
    if(userPassword.search(/^[A-Za-z0-9]{6,12}$/) == -1) //비밀번호가 대소문자 알파벳,숫자 6~12자로 이루어져 있는지 검사 
      return next(INVALID_FORMAT_PASSWORD);
    req.body.userPassword = bcrypt.hashSync(userPassword, parseInt(SALT_ROUNDS));
    const user = await User.create(req.body);
    return res.json(createResponse(res, user));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const login = async(req,res,next) => {
  // const JWT_SECRET_KEY = fs.readFileSync(join(__dirname, '../../../../keys/', JWT_SECRET_KEY_FILE));
  const { userId, userPassword } = req.body;
  try {
    const user = await User.findOne({where: {userId}});
    if(!user) return next(INVALID_ID);
    const same = bcrypt.compareSync(userPassword, user.userPassword);
    if(!same)
      return next(INVALID_PASSWORD);

    const refreshToken = await jwt.sign({}, JWT_SECRET_KEY_FILE, {algorithm: 'HS512', expiresIn: '14d'});  //refreshToken은 DB에 저장
    const check = await RefreshToken.findOne({where: {uid: user.id}});
    if(check) {
      await check.update({refreshToken});
    }
    else {
      const token = await RefreshToken.create({refreshToken});
      await token.setUser(user);  //저장 후 올바른 Trainer 인스턴스와 관계 맺어주기
    }

    const accessToken = await jwt.sign({uid: user.id}, JWT_SECRET_KEY_FILE, {algorithm: 'HS512', expiresIn: '1h'});  //accessToken 생성 
    res.cookie('refreshToken', refreshToken, {httpOnly: true}); //refreshToken은 secure, httpOnly 옵션을 가진 쿠키로 보내 CSRF 공격을 방어
    res.cookie('accessToken', accessToken, {httpOnly: true}); //accessToken은 secure, httpOnly 옵션을 가진 쿠키로 보내 CSRF 공격을 방어
    //원래는 accessToken은 authorization header에 보내주는 게 보안상 좋지만, MVP 모델에서는 간소화
    return res.json(createResponse(res, user)); 
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const logout = async(req,res,next) => {
  const {params: {userId}} = req;
  try {
    const user = await User.findOne({where: {userId}});
    if(!user) return next(INVALID_ID);
    const refreshToken = await RefreshToken.destroy({where: {uid: user.id}});  //db에서 trainer와 연결된 refreshToken 제거
    if(!refreshToken)
      return next(ALREADY_LOGGED_OUT);
    res.clearCookie('refreshToken');  //쿠키에 저장된 모든 토큰을 제거
    res.clearCookie('accessToken');
    return res.json(createResponse(res));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const resetPassword = async(req,res,next) => {
  const { userId, userPassword } = req.body;
  try {
    const user = await User.findOne({where: {userId}});
    if(!user) return next(INVALID_ID);
    const same = bcrypt.compareSync(userPassword, user.userPassword);
    if(same)  //기존의 비밀번호와 동일한 비밀번호는 아닌지 검사
      return next(DUPLICATED_PASSWORD);
    if(userPassword.search(/^[A-Za-z0-9]{6,12}$/) == -1) //비밀번호가 대소문자 알파벳,숫자 6~12자로 이루어져 있는지 검사 
      return next(INVALID_FORMAT_PASSWORD);
    const newUserPassword = bcrypt.hashSync(userPassword, parseInt(SALT_ROUNDS));
    await user.update({userPassword: newUserPassword});
    await RefreshToken.destroy({where: {uid: user.id}});  //db에서 trainer와 연결된 refreshToken 제거
    res.clearCookie('refreshToken');  //쿠키에 저장된 모든 토큰을 제거
    res.clearCookie('accessToken');
    return res.json(createResponse(res));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const test = async(req,res,next) => { //토큰 잘 사용되는지 확인해보고 싶을 때 테스트용으로 사용하세요!, 필요 없으면 나중 커밋 때 지워놓을게요.  
  try {
    console.log("성 공 적");
    console.log("이것은 Access");
    console.log(req.cookies.accessToken);
    console.log("이것은 Refresh");
    console.log(req.cookies.refreshToken);
    return res.json(createResponse(res, "성공했습니다."));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { register, login, logout, resetPassword, test };