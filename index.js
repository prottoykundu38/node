const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const links = {};

function generateCode() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

app.post('/links', (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'url দিতে হবে' });
    }

    const code = generateCode();
    links[code] = url;

    res.status(201).json({ code, url });
});

app.listen(3000, () => {
    console.log('Server চালু: http://localhost:3000');
});