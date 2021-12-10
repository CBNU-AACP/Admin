const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY_FILE } = require('../env');
const { LOGIN_REQUIRED, TOKEN_EXPIRED, JSON_WEB_TOKEN_ERROR } = require('../errors');
const fs = require('fs');
const { join } = require('path');
const { verifyToken } = require('../utils/jwt');
const { RefreshToken, User } = require('../models');

const checkTokens = async(req,res,next) => {
  // const JWT_SECRET_KEY = fs.readFileSync(join(__dirname, '../keys/', JWT_SECRET_KEY_FILE));
  try {
    if(req.cookies.accessToken == undefined) return next(LOGIN_REQUIRED);
    const accessToken = verifyToken(req.cookies.accessToken); 
    const refreshToken = verifyToken(req.cookies.refreshToken);

    if(accessToken == null) { 
      if(refreshToken == null)  //accessToken, refreshToken 모두 만료된 경우, 다시 로그인 하도록 요구
        return next(LOGIN_REQUIRED);
      else {  //accessToken은 만료되었지만 refreshToken은 유효한 경우
        const refresh = await RefreshToken.findOne({where: {refreshToken: req.cookies.refreshToken}});
        const user = await refresh.getUser();
        const newAccessToken = await jwt.sign({uid: user.id}, JWT_SECRET_KEY_FILE, {algorithm: 'HS512', expiresIn: '1h'});
        res.cookie('accessToken', newAccessToken, {httpOnly: true});
        req.cookies.accessToken = newAccessToken; //당장 다음 미들웨어에서 써야되기 때문에 처리해주는 듯 싶다.
        next();
      }
    } 
    else {
      if(refreshToken == null) {  //accessToken은 유효하지만, refreshToken은 만료된 경우
        const newRefreshToken = await jwt.sign({}, JWT_SECRET_KEY_FILE, {algorithm: 'HS512', expiresIn: '14d'});  //refreshToken은 DB에 저장
        const user = await User.findByPk(accessToken.uid);
        const refresh = await user.getRefreshToken();
        refresh.update({refreshToken: newRefreshToken});
        res.cookie('refreshToken', newRefreshToken, {httpOnly: true});
        req.cookies.refreshToken = newRefreshToken; //당장 다음 미들웨어에서 써야되기 때문에 처리해주는 듯 싶다.
        next();
      }
      else //accessToken, refreshToken 모두 유효한 경우
        next();
    }
    
  } catch (error) {
    console.error(error);
    next(error);
  }
};


module.exports = { checkTokens };