/**
 * 智享有限公司官網 — Cloudflare Worker
 * - 一般網頁檔案（index.html、css、js、images）由 Cloudflare 直接提供
 * - /api/contact：接收預約表單，寄一封通知信到公司信箱
 */

const NOTIFY_TO = 'everintelligent.tw@gmail.com';
const NOTIFY_FROM = { email: 'form@ever-intelligent.com', name: '智享官網表單' };
const MIN_FILL_MS = 3000; // 少於 3 秒就送出，通常是機器人

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const clean = (v, max) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/\n+/g, ' ');
const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

async function handleContact(request, env) {
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);
  if (!(request.headers.get('Content-Type') || '').includes('application/json')) {
    return json({ ok: false, error: 'bad_request' }, 400);
  }
  const raw = await request.text();
  if (raw.length > 20000) return json({ ok: false, error: 'too_large' }, 413);

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  // 防機器人：隱藏欄位被填寫，或填寫時間太短 → 假裝成功但不寄信
  if (clean(data.website, 200) !== '' || Number(data.elapsed) < MIN_FILL_MS) {
    return json({ ok: true });
  }

  const form = {
    name: oneLine(data.name, 60),
    email: oneLine(data.email, 120),
    company: oneLine(data.company, 80),
    role: oneLine(data.role, 40),
    topic: oneLine(data.topic, 40),
    message: clean(data.message, 2000),
  };
  if (!form.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return json({ ok: false, error: 'invalid_fields' }, 400);
  }

  const rows = [
    ['姓名', form.name],
    ['Email', form.email],
    ['公司名稱', form.company || '—'],
    ['身分', form.role || '—'],
    ['想改善的事', form.topic || '—'],
    ['想多說的話', form.message || '—'],
  ];
  const text = rows.map(([k, v]) => `${k}：${v}`).join('\n') + '\n\n直接回覆這封信，就會寄給對方。';
  const html =
    '<h2 style="margin:0 0 12px">官網收到一筆新的預約諮詢</h2>' +
    '<table cellpadding="6" style="border-collapse:collapse;font-size:14px">' +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="color:#55607A;white-space:nowrap;vertical-align:top">${k}</td>` +
          `<td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
      )
      .join('') +
    '</table><p style="color:#55607A;font-size:13px">直接回覆這封信，就會寄給對方。</p>';

  try {
    await env.EMAIL.send({
      to: NOTIFY_TO,
      from: NOTIFY_FROM,
      replyTo: form.email,
      subject: `【官網預約】${form.name}${form.company ? '｜' + form.company : ''}`,
      text,
      html,
    });
    return json({ ok: true });
  } catch (err) {
    console.error('contact form send failed', err && err.code, err && err.message);
    return json({ ok: false, error: 'send_failed' }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
};
