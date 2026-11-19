// ClickTo3D sign-ups -> Google Sheet
// Paste into: Google Sheet > Extensions > Apps Script (signed in only as clickto3d@gmail.com)
// Deploy > Web app > Execute as: Me > Who has access: Anyone
// This endpoint is public on purpose: it can ONLY add a sign-up and confirm one ID.
// It never returns emails or any other sheet data.

const SHEET_NAME = 'Signups';
const HEADERS = ['Date', 'Email', 'Source', 'Status', 'Submission ID'];

function doPost(e) {
  let p = {};
  try { p = JSON.parse(e.postData.contents); } catch (err) { return reply({ ok: false, error: 'bad request' }); }

  if (p.website) return reply({ ok: true });                       // hidden spam-bot field
  const email = String(p.email || '').trim().toLowerCase();
  const id = String(p.id || '').slice(0, 80);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return reply({ ok: false, error: 'invalid email' });
  if (!id) return reply({ ok: false, error: 'missing id' });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = sheet_();
    const rows = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, HEADERS.length).getValues() : [];
    const sameId = rows.some(r => r[4] === id);
    const sameEmail = rows.some(r => String(r[1]).toLowerCase() === email);
    if (!sameId && !sameEmail) {
      sh.appendRow([new Date(), email, String(p.source || 'clickto3d.com').slice(0, 60), 'subscribed', id]);
    } else if (!sameId && sameEmail) {
      // already subscribed: remember this ID too so the confirmation check succeeds
      PropertiesService.getScriptProperties().setProperty('id_' + id, '1');
    }
    SpreadsheetApp.flush();
    return reply({ ok: true, id: id });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const id = String((e && e.parameter && e.parameter.check) || '').slice(0, 80);
  if (!id) return reply({ ok: true });
  const sh = sheet_();
  const ids = sh.getLastRow() > 1 ? sh.getRange(2, 5, sh.getLastRow() - 1, 1).getValues().flat() : [];
  const saved = ids.indexOf(id) !== -1 || PropertiesService.getScriptProperties().getProperty('id_' + id) === '1';
  return reply({ saved: saved });
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
