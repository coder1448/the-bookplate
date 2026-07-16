// This runs on the server (Vercel), never in the user's browser.
// Your API key stays here and is never exposed to anyone using the app.
// Both the book-scanning feature and the recommendations feature share this one endpoint.

export default async function handler(req, res) {
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' });
}

const { system, messages, max_tokens } = req.body || {};

if (!messages || !Array.isArray(messages)) {
return res.status(400).json({ error: 'Missing messages' });
}

try {
const response = await fetch('https://api.anthropic.com/v1/messages', {
                              method: 'POST',
                              headers: {
                              'Content-Type': 'application/json',
                              'x-api-key': process.env.ANTHROPIC_API_KEY,
                              'anthropic-version': '2023-06-01'
                              },
                              body: JSON.stringify({
                                                   model: 'claude-sonnet-4-6',
                                                   max_tokens: max_tokens || 1500,
                                                   system: system || undefined,
                                                   messages
                                                   })
                              });

if (!response.ok) {
const errText = await response.text();
console.error('Anthropic API error:', errText);
return res.status(502).json({ error: `AI service error (${response.status})` });
}

const data = await response.json();
return res.status(200).json(data);
} catch (err) {
console.error('Server error:', err);
return res.status(500).json({ error: `Server error: ${err.message}` });
}
}
