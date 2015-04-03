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

  alertify.success("File sent! You can now get it by its name.");
};
