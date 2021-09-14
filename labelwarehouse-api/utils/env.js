const {cleanEnv, str, num} = require('envalid');

const env = cleanEnv(process.env, {
  DBHOST: str({default: 'mongodb'}),
  DBPORT: num({default: 27017}),
  DBNAME: str({default: 'labelwarehouse'}),
  DBUSER: str({default: 'labelwarehouse'}),
  DBPASS: str(),
});

module.exports = env;
