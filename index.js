const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3407;

app.use(cors());
// 設定 Multer 儲存配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 上傳圖片的路由
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ fileUrl: `http://${req.headers.host}/images/${req.file.filename}` });
});

// 伺服器靜態文件路徑
app.use('/images', express.static('uploads'));

// 讀取圖片的路由
app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.resolve(`./uploads/${filename}`));
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`伺服器運行在 http://localhost:${port}`);
});