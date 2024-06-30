const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    // Here you would typically integrate with an AI service
    // For this example, we're just echoing the message back
    const reply = `You said: ${message}`;
    res.json({ reply });
  } catch (error) {
    console.error('Error in AI communication:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

app.post('/save-interface', async (req, res) => {
  try {
    const timestamp = Date.now();
    const interfaceName = `chat_interface_${timestamp}`;
    const zipFileName = `${interfaceName}.zip`;

    res.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${zipFileName}`
    });

    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    // Pipe archive data to the response
    archive.pipe(res);

    // Add the frontend files to the archive
    const frontendDir = path.join(__dirname, '..', 'src');
    archive.directory(frontendDir, 'src');

    // Add package.json and other necessary files
    archive.file(path.join(__dirname, '..', 'package.json'), { name: 'package.json' });
    archive.file(path.join(__dirname, '..', 'public', 'index.html'), { name: 'public/index.html' });

    // Finalize the archive
    await archive.finalize();

  } catch (error) {
    console.error('Error saving interface:', error);
    res.status(500).json({ success: false, error: 'Failed to save interface' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});