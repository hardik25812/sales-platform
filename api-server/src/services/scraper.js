const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function analyzeWebsite(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000,
    });
    const html = await response.text();
    const $ = cheerio.load(html);

    // Check for contact form
    const hasContactForm = $('form').length > 0 ||
      $('iframe[src*="forms"]').length > 0 ||
      $('[id*="contact"]').length > 0;

    // Check for live chat widgets
    const chatScripts = ['intercom', 'drift', 'livechat', 'tawk', 'zendesk', 'hubspot', 'crisp'];
    const pageSource = html.toLowerCase();
    const hasLiveChat = chatScripts.some(chat => pageSource.includes(chat));

    // Check for auto-responder hints
    const hasAutoResponder = pageSource.includes('thank you') &&
      (pageSource.includes('form') || pageSource.includes('submission'));

    // Check mobile optimization
    const mobileOptimized = $('meta[name="viewport"]').length > 0;

    // Extract phone numbers
    const phoneRegex = /(\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g;
    const phoneMatches = html.match(phoneRegex) || [];
    const phoneNumber = phoneMatches.length > 0 ? phoneMatches[0].trim() : null;

    // Check for online booking
    const bookingKeywords = ['book online', 'schedule online', 'book now', 'schedule now', 'book appointment', 'calendly', 'acuity'];
    const hasOnlineBooking = bookingKeywords.some(kw => pageSource.includes(kw));

    // Check SSL
    const sslSecure = url.startsWith('https');

    // Extract services (look for service-related headings and lists)
    const services = [];
    $('h2, h3, h4, li').each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 5 && text.length < 80 &&
        !text.includes('©') && !text.includes('Privacy') &&
        !text.includes('Cookie')) {
        // Very basic service detection
        const serviceKeywords = ['service', 'treatment', 'repair', 'install', 'consult', 'cleaning', 'maintenance'];
        if (serviceKeywords.some(kw => text.toLowerCase().includes(kw)) || $(el).closest('[class*="service"]').length > 0) {
          services.push(text);
        }
      }
    });

    return {
      success: true,
      website: {
        hasContactForm,
        hasLiveChat,
        hasAutoResponder,
        mobileOptimized,
        services: [...new Set(services)].slice(0, 8),
        phoneNumber,
        hasOnlineBooking,
        loadTime: 'N/A', // Would need timing measurement
        sslSecure,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      website: null,
    };
  }
}

module.exports = { analyzeWebsite };
