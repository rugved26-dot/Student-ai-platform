const fs = require('fs');
const FormData = require('form-data');

async function testPost() {
    try {
        const fetch = (await import('node-fetch')).default;
        
        fs.writeFileSync('test.txt', 'This is a test document about inertia.');
        
        const form = new FormData();
        form.append('document', fs.createReadStream('test.txt'));
        
        const res = await fetch('http://localhost:5000/api/summarize', { method: 'POST', body: form });
        const data = await res.json();
        console.log("RESPONSE:", res.status, data);
    } catch(e) {
        console.error("ERROR:");
        console.error(e);
    }
}
testPost();
