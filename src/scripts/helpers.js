$(function() {
  var codes = $("pre code");
  console.log("codes count: " + codes.length);

  $(codes).each(function(index, code) {
    console.log("code: " + code);
    var text = $(code).text();
    console.log("Text: " + text);
    var lines = text.split('\n')
        , line
        , nonEmptyFound = false
        , minWhitespaceCount = 1000
        , curLineWhitespaceLen;

    // count min whitespaces on lines, remove empty lines from beginning
    for (var i = 0; i < lines.length; ++i) {
      line = lines[i];
      if (!nonEmptyFound) {
        if ($.trim(line) === "") {
          lines.splice(i, 1);
          --i;
          continue;
        } else {
          nonEmptyFound = true;
        }
      }
      if ($.trim(line) !== '')  {
        curLineWhitespaceLen = line.length - (line.replace(/^\s+/g, '')).length;
        console.log("x: " + curLineWhitespaceLen + " - [" + line + "]");
        if (curLineWhitespaceLen < minWhitespaceCount) {
           minWhitespaceCount = curLineWhitespaceLen;
        }
      }
    }
    if (minWhitespaceCount === 1000) { minWhitespaceCount = 0; }

    console.log("min Whitespace count: " + minWhitespaceCount);

    // remove whitespaces from each line:
    for (var i = 0; i < lines.length; ++i) {
      lines[i] = lines[i].substring(minWhitespaceCount);
      console.log("proc: [" + lines[i] + "]");
    }
    var processedText = lines.join('\n');
    console.log(processedText);
    $(code).text(processedText);
  });


});