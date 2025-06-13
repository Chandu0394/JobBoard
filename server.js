require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const Job = require('./models/Job');

const app = express();

// MongoDB connection using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});

// Middleware
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session handling
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 5, // 5 minutes
    httpOnly: true
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// Prevent caching
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Expose auth state
app.use((req, res, next) => {
  res.locals.authenticated = req.session.authenticated;
  next();
});

// Auth middleware
function requireAuth(req, res, next) {
  if (req.session.authenticated) return next();
  res.redirect('/login');
}

// Routes
app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => {
  res.render('login', { title: 'Admin Login', error: null, publicView: false });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (
    email === process.env.ADMIN_USER &&
    await bcrypt.compare(password, process.env.ADMIN_PASS_SECRET || password)
  ) {
    req.session.authenticated = true;
    return res.redirect('/post-job');
  }
  res.render('login', { title: 'Admin Login', error: 'Invalid credentials', publicView: false });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Post job
app.get('/post-job', requireAuth, (req, res) => {
  res.render('post-job', { title: 'Post Job', job: null, url: null, publicView: false });
});

app.post('/post-job', requireAuth, async (req, res) => {
  const { title, company, location, type, description, applyLink } = req.body;
  const slug = slugify(`${title}-${Date.now()}`, { lower: true, strict: true });

  const job = await Job.create({ title, company, location, type, description, applyLink, slug });
  const url = `${req.protocol}://${req.get('host')}/jobs/${job.slug}`;

  res.render('post-job', { title: 'Post Job', job: null, url, publicView: false });
});

// View job (public)
app.get('/jobs/:slug', async (req, res) => {
  const job = await Job.findOne({ slug: req.params.slug });
  if (!job) return res.status(404).send('Job not found');
  res.render('job', { title: job.title, job, publicView: true });
});

// Manage jobs (admin)
app.get('/manage-jobs', requireAuth, async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.render('manage-jobs', { jobs, publicView: false });
});

// Edit job
app.get('/edit-job/:id', requireAuth, async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).send('Job not found');
  res.render('edit-job', { title: 'Edit Job', job, publicView: false });
});

app.post('/edit-job/:id', requireAuth, async (req, res) => {
  const { title, company, location, type, description, applyLink } = req.body;
  const slug = slugify(`${title}-${Date.now()}`, { lower: true, strict: true });

  await Job.findByIdAndUpdate(req.params.id, {
    title, company, location, type, description, applyLink, slug
  });

  res.redirect('/manage-jobs');
});

// Delete job
app.post('/delete-job/:id', requireAuth, async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.redirect('/manage-jobs');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
