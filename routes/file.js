const express = require('express');
const fileControllers = require('../controllers/file')
const router = express.Router();

router.post('/api/files/', fileControllers.uploadFile)

router.get('/files/:uuid', fileControllers.generateSharableLink)

router.get('/files/download/:uuid', fileControllers.downloadFile)

router.post('/api/files/send', fileControllers.sendFile)


module.exports = router;