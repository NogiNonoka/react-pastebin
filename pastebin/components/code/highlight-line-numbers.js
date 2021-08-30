import hljs from "highlight.js";

export default function highlightLineNumber(code, options) {
  let preCode = code;
  if (hljs.getLanguage(options.language)) {
    preCode = hljs.highlight(code, options).value;
  }
  if (preCode[preCode.length - 1] !== '\n')
    preCode += "\n";
  const lines = preCode.split(/[\n]/).slice(0, -1);
  let html = lines
    .map((item, index) => {
      return (
        '<li><span class="line-num" data-line="' +
        (index + 1) +
        '"></span>' +
        item +
        "</li>"
      );
    })
    .join("");
  html = "<ol>" + html + "</ol>";
  return '<pre class="hljs"><code>' + html + "</code></pre>";
}
