const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const links = {};

function isValidUrl(value) {
    if (typeof value !== 'string') return false;
    try {
        const parsed = new URL(value);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }

}

function generateCode() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

app.post('/links', (req, res) => {
    const url = req.body?.url;

    if (!isValidUrl(url)) {
        return res.status(400).json({ error: 'সঠিক http বা https URL দিতে হবে' });
    }

    const code = generateCode();
    links[code] = url;

    res.status(201).json({ code, url });
});

app.get('/:code', (req, res) => {
    const url = links[req.params.code];

    if (!url) {
        return res.status(400).json({ error: 'code pawa jay nai' });
    }

    res.redirect(302, url);
});

app.listen(3000, () => {
    console.log('Server চালু: http://localhost:3000');
});