const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./api/routes');
const { PORT, IS_DEV } = require('./env');
const { sequelize } = require('./models');
const { stream } = require('./errors/winston');
const { notFound, errorHandler } = require('./errors/handler');
const cookieParser = require('cookie-parser');

const app = express();

app.set('port', PORT || 3001);

//db connect
sequelize.sync({ force: false })   //force가 true이면 DB에 있는 모든 정보를 지우고 다시 만든다.
    .then(() => {
        console.log('DB connected!');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(cors({
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan(IS_DEV ? 'dev' : 'combined', {stream})); //개발 상태일 땐 'dev' 옵션, 배포 상태일 땐 'combined' 옵션 사용
app.use(cookieParser());
app.use('/', router);
app.use(notFound);
app.use(errorHandler);

//Server start
app.listen(app.get('port'), () => { 
    console.log(`Listening http://localhost:${app.get('port')} in ${app.get('env')} mode !!!`);
});