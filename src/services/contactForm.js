import { developer } from '../data/portfolio';

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(developer.email)}`;

export async function sendContactMessage({ name, email, message }) {
  const response = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `Portfolio message from ${name}`,
      _template: 'table',
      _captcha: 'false',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  const data = await response.json();
  if (data.success !== 'true' && data.success !== true) {
    throw new Error(data.message || 'Failed to send message');
  }

  return data;
}
