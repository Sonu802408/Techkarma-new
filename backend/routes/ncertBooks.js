import express from 'express';

const router = express.Router();

// NCERT Books API endpoint
// GET /api/ncert-books?class=10&medium=English&subject=Math
router.get('/', (req, res) => {
    try {
        const { class: classNum, medium, subject, stream } = req.query;

        res.json({
            success: true,
            filter: { classNum, medium, subject, stream },
            message: "Official NCERT books API active"
        });
    } catch (err) {
        console.error('Error fetching NCERT books:', err);
        res.status(500).json({ success: false, message: 'Server error fetching NCERT books' });
    }
});

// Official NCERT PDF Stream Endpoint
// GET /api/ncert-books/pdf/:bookCode/:chapter
router.get('/pdf/:bookCode/:chapter', async (req, res) => {
    try {
        const { bookCode, chapter } = req.params;
        const chNum = parseInt(chapter, 10);
        const chFormatted = String(chNum).padStart(2, '0');
        const ncertPdfUrl = `https://ncert.nic.in/textbook/pdf/${bookCode}${chFormatted}.pdf`;
        const portalUrl = `https://ncert.nic.in/textbook.php?${bookCode}=${chNum}-15`;

        // Try 2-digit format first (e.g. jemh101.pdf)
        let response = await fetch(ncertPdfUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Referer': portalUrl,
                'Accept': 'application/pdf,*/*'
            }
        });

        // If 404, try 1-digit format (e.g. jemh11.pdf)
        if (!response.ok && chFormatted !== String(chNum)) {
            const alternateUrl = `https://ncert.nic.in/textbook/pdf/${bookCode}${chNum}.pdf`;
            const altResponse = await fetch(alternateUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                    'Referer': portalUrl,
                    'Accept': 'application/pdf,*/*'
                }
            });
            if (altResponse.ok) {
                response = altResponse;
            }
        }

        if (!response.ok) {
            return res.redirect(ncertPdfUrl);
        }

        const isDownload = req.query.download === '1' || req.query.download === 'true';
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `${isDownload ? 'attachment' : 'inline'}; filename="${bookCode}_ch${chFormatted}.pdf"`);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.setHeader('Access-Control-Allow-Origin', '*');

        const arrayBuffer = await response.arrayBuffer();
        return res.send(Buffer.from(arrayBuffer));
    } catch (err) {
        console.error('NCERT PDF streaming error:', err);
        const { bookCode, chapter } = req.params;
        const chFormatted = String(parseInt(chapter, 10)).padStart(2, '0');
        return res.redirect(`https://ncert.nic.in/textbook/pdf/${bookCode}${chFormatted}.pdf`);
    }
});

export default router;
