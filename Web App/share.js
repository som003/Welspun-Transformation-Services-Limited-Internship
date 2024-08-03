const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/share', auth, async (req, res) => {
    const { chartId } = req.body;
    const token = jwt.sign({ chartId }, 'SHARE_SECRET', { expiresIn: '1d' });
    res.send({ link: http://localhost:3000/shared/${token} });
});

router.get('/shared/:token', async (req, res) => {
    try {
        const { chartId } = jwt.verify(req.params.token, 'SHARE_SECRET');
        // Fetch and return chart data based on chartId
        res.send({ chartId });
    } catch (e) {
        res.status(401).send({ message: 'Unauthorized' });
    }
});

module.exports = router;