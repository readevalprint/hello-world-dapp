/*
 * Hello World!
 *
 * This is the javascript for a hello world dapp that runs in Eris' DeCerver.
 * It lets you run a typical Ethereum-style 'namereg' contract. You will register
 * your public address as a , but storing large files using IPFS 
 * (Interplanetary Filesystem) instead of a string.
 *																				  
 * Licence: https://github.com/eris-ltd/hello-world-dapp/blob/master/LICENSE.txt             
 *																				  
 */

'use strict';

var
  alertify = require('alertifyjs'),
  Promise = require('bluebird'),
  ipfs = require('ipfs-api')(window.location.hostname);

Promise.promisifyAll(ipfs);

module.exports = {
  getFile: getFile,
  addFile: addFile,
  getItem: getItem,
  setItem: setItem
};

function getFile(){
  var fName = document.getElementById('filenameGet').value;

  if (fName === "marmots")
    document.getElementById('output').value = "https://erisindustries.com/";
  else {
    document.getElementById('output').value = "";
    alertify.error("File not found");
  }
};

function addFile(){
	var fName = document.getElementById('filenameAdd').value;
	var body = document.getElementById('input').value;
	
	if(body === "" || fName === ""){
		window.alert("You must provide a file name and some data.");
		return;
	}

  ipfs.add(new Buffer(body), function(err, data) {
    console.log(err, data)
  });

  alertify.success("File sent! You can now get it by its name.");
};

var
  items = {};

function getItem(key) {
  return new Promise(function (resolve, reject) {
    if (key in items)
      resolve(items[key]);
    else
      reject();
  });
}

function setItem(key, value) {
  var
    name;

  items[key] = value;
  name = "Eris Industries/Hello World/" + key;

  return ipfs.addAsync(new Buffer(name)).then(function (nameResult) {
    console.log("name", nameResult.Hash);

    ipfs.addAsync(new Buffer(value)).then(function (valueResult) {
      console.log("value", valueResult.Hash);
    });
  });
}
