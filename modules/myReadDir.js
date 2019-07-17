'use strict';

const fs = require('fs');
const path = require('path');

const myReadDir = function(dir, fileList){

  var files = fs.readdirSync(dir);
  fileList = fileList || [];
  files.forEach(function(file){
    var temp = path.join(dir, file);
    if(fs.statSync(temp).isDirectory()){
      temp = path.join(dir, file, '/');
      return myReadDir(temp, fileList);
    }

    if(path.basename(file) === 'index.js'){
      var obj = require(path.join(dir, file));
      fileList.push(obj);
    }

  });

  return fileList;

};

module.exports = myReadDir;
