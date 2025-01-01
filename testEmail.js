const sendEmail = require('./emailService');

sendEmail('recipient-email@example.com', 'Test Subject', 'This is a test email!')
  .then(() => console.log('Email sent successfully!'))
  .catch((err) => console.error('Failed to send email:', err));
