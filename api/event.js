export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const allowed = new Set(['page_view','example_loaded','analyze_clicked','response_generated','tone_changed','response_copied','classification_feedback','reuse_intent']);
    if (!allowed.has(body.event)) return res.status(400).json({ ok: false });
    console.log(JSON.stringify({type:'scopeguard_event',event:body.event,meta:body.meta||{},ts:body.ts||new Date().toISOString()}));
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(400).json({ ok: false });
  }
}

