$(document).ready(function() {
  var shell = require('shell');
  var romanize = require('romanize-names');
  var ipc = require('ipc');
  var valToSystem = {
    'wg (default)': 'WG',
    'mps-ii': 'MPS-II',
    'hanyu': 'HANYU'
  };
  var system = 'WG';
  var $inputEle = $('#input');
  var $outputEle = $('#output');
  var $infoEle = $('#info-btn');
  var $githubEle = $('#github-btn');
  var $onlineEle = $('#online-btn');
  var $exitEle = $('#exit-btn');


  $('.button')  .popup({
    position : 'bottom left',
  })

  $inputEle.bind('input propertychange', function(e) {
    e.preventDefault();
    var word = this.value;
    var systemToclass = {'WG': '.wg-output', 'MPS-II': '.mps-output', 'HANYU': '.hanyu-output'};

    if (!word || word.length === 1) {
      for (var system in systemToclass) {
        $(systemToclass[system]).html('無結果');
      }
    }

    for (var sys in systemToclass) {
      $(systemToclass[sys]).html(romanize(this.value, sys));
    }
  });

  $infoEle.click(function() {
    shell.openExternal('https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%9A%84%E4%B8%AD%E6%96%87%E7%BE%85%E9%A6%AC%E6%8B%BC%E9%9F%B3');
  });

  $onlineEle.click(function() {
    shell.openExternal('http://electronize.github.io/romanize/');
  });

  $githubEle.click(function() {
    shell.openExternal('https://github.com/electronize/romanize-names-desktop');
  });

  $exitEle.click(function() {
    ipc.send('exit-window');
  });

});
