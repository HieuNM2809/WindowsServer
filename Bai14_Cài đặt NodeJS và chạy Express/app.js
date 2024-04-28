const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to render the file upload form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

