const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT, IS_DEV } = require('./env');

const app = express();

app.set('port', PORT || 3001);
app.use(cors({
  withCredentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(morgan(IS_DEV ? 'dev' : 'production'));

app.listen(app.get('port'), () => {
    console.log(
        `Listening http://localhost:${app.get('port')} in ${app.get('env')} mode!!!`);
});