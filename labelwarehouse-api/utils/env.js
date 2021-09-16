const {cleanEnv, str, num} = require('envalid');

const env = cleanEnv(process.env, {
  DB_HOST: str({default: 'mongodb'}),
  DB_PORT: num({default: 27017}),
  DB_DATABASE: str({default: 'labelwarehouse'}),
  DB_USER: str({default: 'labelwarehouse'}),
  DB_PASSWORD: str({default: 'labelwarehouse'}),
});

module.exports = env;
