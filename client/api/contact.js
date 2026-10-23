export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in name, email, and message.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  console.log(`[Online Contact Form] From: ${name} <${email}> | Subject: ${subject || 'Inquiry'}`);

  return res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been received by Phan Tấn Phú.',
    data: {
      name,
      email,
      subject: subject || 'General Inquiry',
      receivedAt: new Date().toISOString()
    }
  });
}
