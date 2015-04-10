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
ipfs.dht.getAsync = Promise.promisify(ipfs.dht.get);
ipfs.dht.putAsync = Promise.promisify(ipfs.dht.put);

module.exports = {
  getFile: getFile,
  addFile: addFile,
  getItem: getItem,
  setItem: setItem,
  ipfs: ipfs
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

function getItem(key, index, previousName) {
  var
    name;

  index = index || 1;
  name = "Eris Industries/Hello World/" + key + "/" + index;

  return ipfs.addAsync(new Buffer(name)).then(function (nameResult) {
    return ipfs.dht.getAsync(nameResult.Hash).then(
      function () {
        console.log("Found an entry for " + key + " at index " + index
          + ".");

        return getItem(key, index + 1, nameResult.Hash);
      },
      function () {
        if (previousName)
          return ipfs.dht.getAsync(previousName).then(function (result) {
            return ipfs.catAsync(result.Extra);
          });
        else
          throw new ReferenceError(key + " not found.");
      });
  });
}

function setItem(key, value, index) {
  var
    name;

  index = index || 1;
  name = "Eris Industries/Hello World/" + key + "/" + index;

  return ipfs.addAsync(new Buffer(name)).then(function (nameResult) {
    return ipfs.dht.getAsync(nameResult.Hash).then(
      function () {
        console.log("Found an entry for " + key + " at index " + index
          + ".");

        return setItem(key, value, index + 1);
      },
      function () {
        return ipfs.addAsync(new Buffer(value)).then(function (valueResult) {
          console.log("Storing " + [key, value] + " at index " + index + ".");
          return ipfs.dht.putAsync(nameResult.Hash, valueResult.Hash);
        });
      });
  });
}
