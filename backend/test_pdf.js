const fs = require('fs');
const pdfParse = require('pdf-parse');

async function testPdf() {
    try {
        console.log("Checking if pdf-parse works...");
        const buf = fs.readFileSync('test.pdf');
        const data = await pdfParse(buf);
        console.log("PDF Text length:", data.text.length);
    } catch (e) {
        console.error("PDF PARSE FAILED:", e);
    }
}
// We will grab a dummy PDF
testPdf();
