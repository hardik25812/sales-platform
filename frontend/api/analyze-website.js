const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function scrapeWebsite(url) {
  try {
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000,
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('title').text() || 'No title';
    const description = $('meta[name="description"]').attr('content') || 'No description';
    const hasLiveChat = $('script').text().toLowerCase().includes('chat') || 
                        $('iframe').attr('src')?.includes('chat') || false;
    const hasBookingSystem = $('script').text().toLowerCase().includes('booking') ||
                             $('script').text().toLowerCase().includes('appointment') || false;

    return {
      title,
      description,
      hasLiveChat,
      hasBookingSystem,
      hasContactForm: $('form').length > 0,
      hasSocialMedia: $('a[href*="facebook"]').length > 0 || $('a[href*="instagram"]').length > 0,
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return null;
  }
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ success: false, error: 'URL is required' });
    }

    const websiteData = await scrapeWebsite(url);

    if (!websiteData) {
      return res.status(500).json({ success: false, error: 'Failed to analyze website' });
    }

    res.status(200).json({
      success: true,
      website: websiteData,
    });
  } catch (error) {
    console.error('analyze-website error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
};
