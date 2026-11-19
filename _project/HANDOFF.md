# ClickTo3D website — full handoff

Everything needed to keep working on clickto3d.com without the original chat.
The short rules for Claude live in `/CLAUDE.md` at the repo root; this file is the long version.

> **Note:** this folder starts with `_`, so GitHub Pages does **not** publish it to clickto3d.com.
> But the repository is **public**, so anyone browsing GitHub can see it. Never put passwords,
> the Google Sheet link/ID, or private contact lists in this repo.

---

## 1. Current state (Nov 19, 2026)

| Item | Status |
|---|---|
| Site live at https://clickto3d.com | ✅ GitHub Pages, branch `main`, root |
| HTTPS | ✅ Certificate active, **Enforce HTTPS** ticked |
| `www.clickto3d.com` | ✅ CNAME → `shiduchim.github.io` (GitHub redirects to bare domain) |
| Privacy policy | ✅ https://clickto3d.com/privacy-policy (matches Autodesk listing) |
| Email sign-up | ✅ Works end to end, no duplicates, works with multiple Google accounts |
| Google Search Console | ✅ Domain verified (auto, via existing TXT), sitemap submitted, indexing requested |
| Old Google Sites page | To unpublish (nothing points to it anymore) |
| Test rows in sign-up sheet | To delete (`asdf@aol.com`) |

Also in this repo (added later in a separate session): `clicktosection/` — privacy policy and favicon for the
**ClickToSection** add-in, plus `images/clicktosection-og.jpg`. Not covered in detail here.

---

## 2. Accounts and where things live

| What | Where |
|---|---|
| Code / hosting | GitHub user **shiduchim**, repo **shiduchim/clickto3d-site** |
| Domain + DNS | **Jetserver** client area (jetserver.co.il) → Domains → My Domains → clickto3d.com → DNS |
| Sign-up data | Private Google Sheet "ClickTo3D sign-ups" in **clickto3d@gmail.com**, tab `Signups` |
| Sign-up backend | Apps Script bound to that sheet (code copy in `_project/backend/`) |
| Search | Google Search Console, domain property `clickto3d.com` (clickto3d@gmail.com) |
| Product listing | https://marketplace.autodesk.com/apps/c0fd3725-27a5-4e44-8148-366f50634eae?priceId=07099ece-b33a-4eb6-adb0-7833f87040a1 |
| Support email | clickto3d@gmail.com |

Tip for the sheet: bookmark it with `?authuser=clickto3d@gmail.com` added to the URL so it always opens in the
right Google account.

---

## 3. DNS (Jetserver) — final records

| Name | Type | Value | Note |
|---|---|---|---|
| clickto3d.com. | A | 185.199.108.153 | GitHub Pages |
| clickto3d.com. | A | 185.199.109.153 | GitHub Pages |
| clickto3d.com. | A | 185.199.110.153 | GitHub Pages |
| clickto3d.com. | A | 185.199.111.153 | GitHub Pages |
| www.clickto3d.com. | CNAME | shiduchim.github.io | GitHub Pages |
| clickto3d.com. | TXT | google-site-verification=… | **Keep** — Search Console depends on it |
| NS / SOA / MX / mail / ftp | — | Jetserver defaults | Leave alone |

Removed: A `185.56.72.74` (Jetserver parking/redirect server that sent bare domain → www for Google Sites)
and CNAME `www → ghs.googlehosted.com` (Google Sites). Jetserver's DNS page has one row per record;
the pencil icons are grey — you type straight into the boxes and save. New records: **Add Record**, Zone
`clickto3d.com.` (with trailing dot), TTL 14400.

TTL is 4 hours, so DNS changes can take up to ~4 hours to be seen everywhere; GitHub's own checker can lag longer.
If GitHub's DNS check is stuck: Settings → Pages → Remove domain → re-add `clickto3d.com` → Save.

---

## 4. Files in the live site

| File | Purpose |
|---|---|
| `index.html` | Whole home page. Inline CSS with CSS variables for light/dark mode. Sign-up script at the bottom. |
| `privacy-policy/index.html` | Official ClickTo3D Privacy Policy. **URL is in the Autodesk listing — never move it.** |
| `privacy.html` | Meta-refresh redirect to `/privacy-policy` (kept for old links). |
| `images/clickto3d-2d-to-3d.jpg` | Hero graphic, 1400px wide, ~95 KB. Title area cropped off; equal top/bottom margins. |
| `favicon.svg` | Logo (light colors). |
| `sitemap.xml`, `robots.txt` | For search engines. Update `lastmod` in sitemap when pages change. |
| `CNAME` | `clickto3d.com` — don't delete or the custom domain breaks. |
| `CLAUDE.md` | Rules for Claude (not published). |
| `_project/` | This handoff, history, assets, backend code, design mockups (not published). |

Updating: edit + commit to `main` → live in 1–2 minutes (watch the yellow dot → green check next to the commit).
If the browser shows the old version: Ctrl + F5 or incognito.

---

## 5. Page content (approved)

**Header:** logo + "ClickTo3D" (left, aligned with content), small grey "ב״ה" (right).

**Hero (left):**
- H1: "Plan to 3D." / "One click." (second line grey)
- "Click any spot in a Revit plan and a focused 3D view opens right there."
- Button: "Get it free on Autodesk App Store" → listing (filled slate #4F6596)
- Badge: "✓ Approved by Autodesk · Autodesk App Store" → listing
- "Free · Revit 2024 · 2025 · 2026 · 2027"

**Hero (right):** cropped 2D→3D graphic in a thin bordered box; under it a boxed bar: left cell = the ribbon button
drawn at real proportions (icon, "ClickTo3D", small centered ▼, ribbon-grey background), right cell =
"Launch from the Add-Ins ribbon, a hotkey, or a programmed mouse button. / In Settings you can change the default
box size and 3D view name."

**Get notified about new apps:** "One email when something new is released." + email box + "Notify me" (outlined
slate, like the add-in's Save button), grouped on the left.

**Footer:** "© 2026 ClickTo3D" · Autodesk App Store · clickto3d@gmail.com · Privacy policy.

---

## 6. Design system

Based on the add-in's Settings window (full guide: `_project/reference/EK_Revit_Addin_UI_Style_Guide.md`).

| Token | Light | Dark |
|---|---|---|
| `--bg` page | #F0F0F0 | #2B2B2B |
| `--bar` header/footer | #F9F9F9 | #323232 |
| `--tx` text | #1B1B1B | #E6E6E6 |
| `--t2` secondary | #5F6368 | #A8A8A8 |
| `--ln` lines | #E1E1E1 | #3C3C3C |
| `--bd` borders | #C3C8CF | #575757 |
| `--card` | #FFFFFF | #323232 |
| `--ac` accent | #5D75A5 | #8EA3CF |
| `--so` soft outline | #9DB0D8 | #7E93C2 |
| logo outline / spokes / fill / strokes | #1447D0 / #7FA0E6 / #7389BB / #0D2E84 | #8FB0FF / #6F87C2 / #7D95CC / #DCE6FF |
| main button | #4F6596, white text | same |

Font: Segoe UI (system-ui fallback). Corners 4px. No gradients. Max content width 1280px for every section so edges
line up. Dark mode follows the visitor's system setting (`prefers-color-scheme`).

---

## 7. Email sign-up system

**Flow:** browser → `POST` to Apps Script web app → validates → appends to sheet → returns `{ok:true}`.

- Web app URL is the `SIGNUP_URL` constant in `index.html`.
- Deployment: **Web app, Execute as: Me, Who has access: Anyone** (public on purpose — it can only *add* an email
  and answer yes/no for one submission ID; it never returns data).
- Sheet columns: Date, Email, Source, Status (`subscribed`), Submission ID.
- Duplicates: same email is never added twice; same submission ID is never added twice.
- Hidden honeypot field `website` drops spam bots.
- To change the script: edit in Apps Script → **Deploy → Manage deployments → Edit → Version: New version → Deploy**
  (keeps the same URL; a brand-new deployment would change it and break the site).

**Frontend reliability rules (from the earlier ZugPad survey project — keep them):**
1. Never host user-facing pages on Apps Script (multi-Google-account "Sorry, unable to open the file at this time").
2. `POST` with `Content-Type: text/plain` and `credentials: 'omit'` — no cookies, no CORS preflight.
3. Unique ID per submission, reused on retry.
4. Show success only after the server confirms. If the response can't be read, check `?check=<id>` up to 3 times.
5. Separate "unknown" ("We couldn't confirm… Click Notify me again. It won't add you twice.") from "failed".
6. Opening the `/exec` URL directly in a multi-account browser can show the Google error — expected, doesn't affect visitors.

**Sending update emails:** personal Gmail via Apps Script ≈ 100 recipients/day. Include "Reply 'unsubscribe' to
stop these emails" and set Status to `unsubscribed` when asked.

---

## 8. Privacy policy

Section 1–4 = the owner's official ClickTo3D policy (add-in collects nothing; settings stored locally:
square size, height above/below level, units, view name). Section 5 "This Website and Email Updates" says **only**:
> If you choose to sign up for updates on this website, we collect the email address you enter.
> You can unsubscribe at any time by writing to clickto3d@gmail.com.

The owner deliberately does **not** want to mention Google Sheets, who has access, or promises like "never shared".

---

## 9. Open to-dos

- [ ] Unpublish old Google Sites page (sites.google.com/view/clickto3d-com).
- [ ] Delete test rows from the sign-up sheet.
- [ ] Optional: verify domain in GitHub account (profile → Settings → Pages → Add a domain; one TXT record in Jetserver).
- [ ] Optional: domain email (e.g. updates@clickto3d.com) before larger email campaigns.
- [ ] Optional: short demo GIF/video; Hebrew version for Israeli campaign.
- [ ] Future: multi-app company site ("Mikdsh") using the developer-sidebar layout (see `HISTORY.md` §2 and `design-mockups/`).

---

## 10. Folder map of `_project/`

```
_project/
  HANDOFF.md            this file
  HISTORY.md            how we got here: every design round and decision
  assets/
    logo/               ClickTo3D logo SVG (light, dark), original PNG, Mikdsh gate sketch
    screenshots/        original + cropped 2D→3D graphic, 3-ways graphic, Revit ribbon screenshots
    settings-window/    Settings window PNGs (light/dark, shadow + soft-shadow 2x)
  backend/
    signup-apps-script.gs   exact code deployed in the sign-up Google Sheet
  design-mockups/       all canvas design boards (*.dc.html) — reference only, need the canvas runtime to render
  reference/
    EK_Revit_Addin_UI_Style_Guide.md
    Apps-Script-lessons-and-CRM-requirements.md
```
