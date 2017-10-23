/**
 * Generate useful debug info based on current environment
 */
'use strict';

const execSync = require('child_process').execSync;

function getDebugInfo() {
  const time = formatDate(new Date);
  const branch = execSync("git rev-parse --abbrev-ref HEAD", { encoding: 'utf8' });
  const userName = execSync('git config user.name', { encoding: 'utf8' }) || execSync('whoami', { encoding: 'utf8' });
  const headHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' });
  const finalUserName = (userName || 'unknown').replace(/[\s\t\n\r]/g, '');
  const finalBranch = (branch || 'unknown').replace(/[\s\t\n\r]/g, '');
  const finalHeadHash = (headHash || 'unknown hash').replace(/[\s\t\n\r]/g, '');

  return {
    time: time,
    branch: finalBranch,
    userName: finalUserName,
    headHash: finalHeadHash,
  };
}

function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1); // getMonth() is zero-based
  const dd  = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

module.exports = getDebugInfo;
