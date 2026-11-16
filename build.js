// Builds index.html by inlining the PDF libraries into src/template.html,
// so the finished app is one file that works with no internet connection.
const fs = require("fs");
const path = require("path");
const nm = path.join(__dirname, "node_modules");
const read = (p) => fs.readFileSync(path.join(nm, p), "utf8");
let html = fs.readFileSync(path.join(__dirname, "src", "template.html"), "utf8");
html = html.split("/*__PDFJS_WORKER__*/").join(read("pdfjs-dist/build/pdf.worker.min.js"));
html = html.split("/*__PDFJS__*/").join(read("pdfjs-dist/build/pdf.min.js"));
html = html.split("/*__PDFLIB__*/").join(read("pdf-lib/dist/pdf-lib.min.js"));
html = html.split("�").join("\\ufffd");
fs.writeFileSync(path.join(__dirname, "index.html"), html);
console.log("Built index.html (" + Math.round(html.length / 1024) + " KB)");
