const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/sitemap.xml', async (req, res) => {
  try {
    const jobs = await Job.find();
    const baseUrl = 'https://jobboard-d488.onrender.com';

    const urls = jobs.map(job => `
      <url>
        <loc>${baseUrl}/jobs/${job.slug}</loc>
        <lastmod>${new Date(job.createdAt).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}/jobs</loc>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        ${urls}
      </urlset>
    `;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap.trim());
  } catch (err) {
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;
