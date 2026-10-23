import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { portfolioData } from './data/portfolio.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory messages storage (also persists to messages.json)
const messagesFilePath = path.join(__dirname, 'messages.json');
let messages = [];

try {
  if (fs.existsSync(messagesFilePath)) {
    const data = fs.readFileSync(messagesFilePath, 'utf8');
    messages = JSON.parse(data);
  }
} catch (err) {
  console.error('Error reading messages file:', err);
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    developer: portfolioData.profile.name
  });
});

app.get('/api/portfolio', (req, res) => {
  res.json(portfolioData);
});

app.get('/api/projects', (req, res) => {
  const { category, featured } = req.query;
  let result = [...portfolioData.projects];

  if (category && category !== 'All') {
    result = result.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (featured === 'true') {
    result = result.filter(p => p.featured);
  }

  res.json(result);
});

app.get('/api/projects/:id', (req, res) => {
  const project = portfolioData.projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

app.get('/api/skills', (req, res) => {
  res.json(portfolioData.skills);
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in name, email, and message.' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const newMessage = {
    id: `msg_${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    subject: (subject || 'General Inquiry').trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString()
  };

  messages.push(newMessage);

  try {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error('Failed to persist message:', err);
  }

  console.log(`[Contact Form Received] From: ${newMessage.name} <${newMessage.email}> | Subject: ${newMessage.subject}`);

  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out! Your message has been received.',
    data: { id: newMessage.id, receivedAt: newMessage.receivedAt }
  });
});

// Serve frontend build in production
const clientBuildPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Portfolio Backend running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints:`);
  console.log(`   - GET  http://localhost:${PORT}/api/portfolio`);
  console.log(`   - GET  http://localhost:${PORT}/api/projects`);
  console.log(`   - GET  http://localhost:${PORT}/api/skills`);
  console.log(`   - POST http://localhost:${PORT}/api/contact`);
  console.log(`===============================================`);
});
