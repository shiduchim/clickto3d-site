# ClickTo3D website — full handoff

Everything needed to keep working on clickto3d.com without the original chat.
The short rules for Claude live in `/CLAUDE.md` at the repo root; this file is the long version.

> **Note:** this folder starts with `_`, so GitHub Pages does **not** publish it to clickto3d.com.
> But the repository is **public**, so anyone browsing GitHub can see it. Never put passwords,
> the Google Sheet link/ID, or private contact lists in this repo.

---

## 1. Current state (Nov 27, 2026)

| Item | Status |
|---|---|
| Site live at https://clickto3d.com | ✅ GitHub Pages, branch `main`, root |
| HTTPS | ✅ Certificate active, **Enforce HTTPS** ticked |
| `www.clickto3d.com` | ✅ CNAME → `shiduchim.github.io` (GitHub redirects to bare domain) |
| Privacy policy | ✅ https://clickto3d.com/privacy-policy (matches Autodesk listing) |
| ClickToSection on home page | ✅ Nov 26 — equal main product section under ClickTo3D, links to its listing: https://marketplace.autodesk.com/apps/6b952ef1-09b6-43fa-8c2a-86a231e1e734?priceId=ba0c6133-6d43-480c-9b76-529bf7c9b9df |
| Speed (Nov 27) | ✅ PageSpeed Insights mobile: 100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO. LCP 1.2 s, CLS 0, page ≈ 186 KB. Nothing to change. |
| Country blocking | ❌ Not set up — owner asked (Iran, hostile Arab countries, Russia). Needs Cloudflare; see to-dos. |
| Privacy list page | ✅ https://clickto3d.com/privacy — single footer link, lists ClickTo3D / ClickToSection / ClickPrint |
| ClickPrint policy | ✅ https://clickto3d.com/clickprint/privacy-policy (for the ClickPrint listing; help planned at `/clickprint/help`) |
| SEO (Nov 25) | ✅ JSON-LD, own descriptions, trailing-slash canonicals, sitemap resubmitted (5 pages), indexing requested for /, /privacy, /privacy-policy/, /clickprint/privacy-policy/ |
| Email sign-up | ✅ Works end to end, no duplicates, works with multiple Google accounts |
| Google Search Console | ✅ Domain verified (auto, via existing TXT), sitemap submitted, indexing requested |
| Old Google Sites page | To unpublish (nothing points to it anymore) |
| Test rows in sign-up sheet | To delete (`asdf@aol.com`) |

`clicktosection/` holds the ClickToSection privacy policy and favicon; `images/clicktosection-og.jpg` is its original
graphic (with title) and `images/clicktosection-2d-to-section.jpg` the cropped version used on the home page.

---

## 2. Accounts and where things live

| What | Where |
|---|---|
| Code / hosting | GitHub user **shiduchim**, repo **shiduchim/clickto3d-site** |
| Domain + DNS | **Jetserver** client area (jetserver.co.il) → Domains → My Domains → clickto3d.com → DNS |
| Sign-up data | Private Google Sheet "ClickTo3D sign-ups" in **clickto3d@gmail.com**, tab `Signups` |
| Sign-up backend | Apps Script bound to that sheet (code copy in `_project/backend/`) |
| Search | Google Search Console, domain property `clickto3d.com` (clickto3d@gmail.com) |
| ClickToSection listing | https://marketplace.autodesk.com/apps/6b952ef1-09b6-43fa-8c2a-86a231e1e734?priceId=ba0c6133-6d43-480c-9b76-529bf7c9b9df |
| ClickTo3D listing | https://marketplace.autodesk.com/apps/c0fd3725-27a5-4e44-8148-366f50634eae?priceId=07099ece-b33a-4eb6-adb0-7833f87040a1 |
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
| `privacy.html` | Privacy list page at `/privacy` (single footer link) → ClickTo3D, ClickToSection, ClickPrint policies. |
| `clickprint/privacy-policy/index.html` | ClickPrint privacy policy (URL used in its Autodesk listing — never move it). |
| `images/clickto3d-2d-to-3d.jpg` | Hero graphic, 1400px wide, ~95 KB. Title area cropped off; equal top/bottom margins. |
| `images/clicktosection-2d-to-section.jpg` | ClickToSection graphic, 1400×580, ~74 KB, cropped from `clicktosection-og.jpg` the same way (lazy-loaded). |
| `clicktosection/privacy-policy/index.html` | ClickToSection privacy policy (URL used in its Autodesk listing — never move it). |
| `favicon.svg` | Logo (light colors). |
| `sitemap.xml`, `robots.txt` | For search engines. Update `lastmod` in sitemap when pages change. |
| `CNAME` | `clickto3d.com` — don't delete or the custom domain breaks. |
| `CLAUDE.md` | Rules for Claude. Kept off the site by `_config.yml` (`exclude: [CLAUDE.md]`). |
| `_config.yml` | Jekyll exclude list. Don't add `.nojekyll` — it would publish `_project/`. |
| `_project/` | This handoff, history, assets, backend code, design mockups (not published). |

Updating: edit + commit to `main` → live in 1–2 minutes (watch the yellow dot → green check next to the commit).
If the browser shows the old version: Ctrl + F5 or incognito.

---

## 5. Page content (approved)

**Header:** logo + "ClickTo3D" (left, aligned with content), small grey "ב״ה" (right).

**Hero (left):**
- H1: "Plan to 3D." / "One click." (second line grey)
- "ClickTo3D is a free Revit add-in. Click any spot in a plan and a focused 3D view opens right there." (brand + "Revit add-in" in visible text, for search)
- Button: "Get it free on Autodesk App Store" → listing (filled slate #4F6596)
- Badge: "✓ Approved by Autodesk · Autodesk App Store" → listing
- "Free · Revit 2024 · 2025 · 2026 · 2027"

**Hero (right):** cropped 2D→3D graphic in a thin bordered box; under it a boxed bar: left cell = the ribbon button
drawn at real proportions (icon, "ClickTo3D", small centered ▼, ribbon-grey background), right cell =
"Launch from the Add-Ins ribbon, a hotkey, or a programmed mouse button. / In Settings you can change the default
box size and 3D view name."

**ClickToSection section** (below ClickTo3D, after a thin line; same layout — it is an equal main product, not a
secondary box):
- H2 styled like the H1: "Plan to section." / "Click and pull." (68px so it stays on one line; 44px on phones)
- "ClickToSection is a free Revit add-in. Click a point in a plan, pull the mouse the way you want to look, and a section opens right there."
- Same filled button "Get it free on Autodesk App Store" → ClickToSection listing, Approved badge, "Free · Revit 2024 · 2025 · 2026 · 2027"
- Right: cropped plan→section graphic; ribbon bar with the bracket-and-triangle icon, "ClickToSection", ▼ +
  "Launch from the Add-Ins ribbon. Esc or right-click cancels. / In Settings you can change the section size, units and the direction marker."

Page title: "ClickTo3D — Plan to 3D and plan to section for Revit"; description names both free add-ins.

**Get notified about new apps:** "One email when something new is released." + email box + "Notify me" (outlined
slate, like the add-in's Save button), grouped on the left.

**Footer (all pages):** "© 2026 ClickTo3D" · clickto3d@gmail.com · Autodesk App Store (publisher profile) · Privacy (→ `/privacy`).

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

- [ ] Search Console: URL Inspection → `https://clickto3d.com/` → Request indexing (home page changed Nov 26 to show ClickToSection).
- [ ] Country blocking (owner asked Nov 27: Iran, hostile Arab countries, Russia). GitHub Pages can't do it; Jetserver DNS
      can't either (visitors never pass through it). Plan: free Cloudflare account (clickto3d@gmail.com) → add
      clickto3d.com → check imported DNS records (4 GitHub A records, `www` CNAME, Google TXT) → switch nameservers at
      Jetserver → Security → WAF custom rule "Country is in {list} → Block". SSL mode Full. Owner must send the exact
      country list. Owner was going to ask Jetserver support first whether they offer a country-blocking proxy.
      Note: VPNs bypass it; doesn't affect Autodesk listings or Google crawling.
- [ ] Add `https://clickto3d.com` as Website on the Autodesk publisher profile (strongest fix for Google auto-correcting "clickto3d" → "click 3d"). Also GitHub repo Website field, LinkedIn etc.
- [ ] ClickPrint help page at `/clickprint/help` (when owner sends content).
- [ ] Optional (need owner OK): custom 404 page; dark-mode favicon; 1200×630 og image; phone-readable hero graphic captions.
- [ ] Watch Search Console for "clickto3d" impressions.

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
