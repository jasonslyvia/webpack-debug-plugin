/**
 * Generate useful debug info based on current environment
 */
const execSync = require('child_process').execSync;

function getDebugInfo() {
  const time = new Date().toISOString();
  const branch = execSync('git branch -v|grep \*|awk \'{print $2}\'');
  const userName = execSync('git config user.name');
  const headHash = execSync('git rev-parse --short HEAD');

  return `
  window.DEBUG = '${userName} 在 ${time} 基于 ${branch} 分支（${headHash}） 发布';
`;
}


module.exports = getDebugInfo;
