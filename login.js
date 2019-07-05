#!/usr/local/bin/node

const { open } = require('cli-ux');
const { v4: uuidv4 } = require('uuid');
const openBrowser =require('./openBrowser');
const rp = require('request-promise-native');

async function runLogin() {
  const clientUnique = uuidv4().replace(/\/-/g, '');
  console.log(`opening http://localhost:3000/login_check?client_id="${clientUnique}"`);
  openBrowser(`http://localhost:3000/login_check?client_id=${clientUnique}`);
  const options = {
    url: 'https://run.binaris.com/v2/run/7543620186/public_wait_for_creds',
    json: true,
    body: {
      clientUnique,
      isClient: true,
    },
  };
  const userCreds = await rp.post(options);
  console.log(`logged in user ${JSON.stringify(userCreds)}`);
}

Promise.resolve(runLogin()).then((res) => {
  console.log(res);
});
