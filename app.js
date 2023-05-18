$(document).ready(function() {
    var replaceMap = {};
  
    $('#text-input').on('input', function() {
      var text = $(this).val();
      $('#output').html(text.replace(/\n/g, '<br>').replace(/\t/g, '&emsp;'));
    });
  
    $('#output').on('mouseup', function() {
      var selectedText = getSelectedText();
      if (selectedText) {
        addReplaceItem(selectedText);
      }
    });
  
    $('#replace-btn').click(function() {
      replaceTexts();
    });
  
    $('#inverse-btn').click(function() {
      inverseReplaceTexts();
    });
  
    $('#copy-output-btn').click(function() {
        copyToClipboard($('#output').html());
        alert('Text copied to clipboard!');
    });
      
    $('#copy-inverse-output-btn').click(function() {
        copyToClipboard($('#inverse-output').val());
        alert('Text copied to clipboard!');
    });
      
  
    function getSelectedText() {
      var textInput = $('#output')[0];
      var selectedText = '';
  
      if (window.getSelection) {
        selectedText = window.getSelection().toString();
      } else if (document.selection && document.selection.type !== 'Control') {
        selectedText = document.selection.createRange().text;
      }
  
      return selectedText.trim();
    }
  
    function addReplaceItem(substring) {
      if (replaceMap[substring]) {
        return; // Substring already added
      }
  
      var randomString = generateRandomString(substring.length);
      replaceMap[substring] = randomString;
  
      var replaceItem = $('<div class="replace-item"></div>');
      replaceItem.html('<strong>' + substring + '</strong>: ' + randomString + ' <button class="copy-btn">Copy</button>');
      replaceItem.data('substring', substring);
      $('#replace-list').append(replaceItem);
    }
  
    function replaceTexts() {
      var text = $('#text-input').val();
      var outputText = text;
  
      for (var substring in replaceMap) {
        var randomString = replaceMap[substring];
        var regex = new RegExp(escapeRegExp(substring), 'g');
        outputText = outputText.replace(regex, randomString);
      }
  
      outputText = outputText.replace(/\n/g, '<br>').replace(/\t/g, '&emsp;');
      $('#output').html(outputText);
      updateMappingTable();
    }
  
    function inverseReplaceTexts() {
      var inverseText = $('#inverse-input').val();
      var inverseOutputText = inverseText;
  
      for (var substring in replaceMap) {
        var randomString = replaceMap[substring];
        var regex = new RegExp(escapeRegExp(randomString), 'g');
        inverseOutputText = inverseOutputText.replace(regex, substring);
      }
  
      inverseOutputText = inverseOutputText.replace(/<br>/g, '\n').replace(/&emsp;/g, ' ');
      $('#inverse-output').html(inverseOutputText);
    }
  
    function updateMappingTable() {
      var tableBody = $('#mapping-table tbody');
      tableBody.empty();
  
      for (var substring in replaceMap) {
        var randomString = replaceMap[substring];
        var tableRow = $('<tr></tr>');
        tableRow.append('<td class="substring">' + substring + '</td>');
        tableRow.append('<td class="random-string">' + randomString + '</td>');
        tableRow.append('<td><button class="copy-btn">Copy</button></td>');
        tableBody.append(tableRow);
      }
    }
  
    function generateRandomString(length) {
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var randomString = '';
  
      randomString += characters.charAt(Math.floor(Math.random() * 52));
  
      for (var i = 1; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
      }
  
      return randomString;
    }
  
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
  
    function copyToClipboard(text) {
      var dummyElement = $('<textarea>').val(text).appendTo('body').select();
      document.execCommand('copy');
      dummyElement.remove();
    }
  });
  