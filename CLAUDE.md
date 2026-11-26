# clickto3d.com — project notes for Claude

## What this is
Website for two free Revit add-ins (Revit 2024–2027), both published on the Autodesk App Store and shown as **equal main products** on the home page: **ClickTo3D** (plan → 3D) and **ClickToSection** (plan → section, live since Nov 26, 2026). Site/brand name stays ClickTo3D.
Owner: Eliyahu (BIM designer, builds Revit tools). Support email: clickto3d@gmail.com.

## Hosting
- GitHub Pages, repo `shiduchim/clickto3d-site`, branch `main`, folder `/ (root)`, "Deploy from a branch".
- Custom domain `clickto3d.com` (file `CNAME`). DNS check successful, HTTPS enforced.
- DNS is at Jetserver (jetserver.co.il), managed by the owner:
  - A `@` → 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153
  - CNAME `www` → shiduchim.github.io
  - Keep the TXT `google-site-verification=...` record (Google Search Console uses it).
- Google Search Console: domain property verified, `sitemap.xml` submitted, indexing requested.
- Old Google Sites page is retired (don't link to it).

## Files
- `index.html` — the whole home page (inline CSS, light + dark mode via `prefers-color-scheme`).
- `privacy-policy/index.html` — official ClickTo3D privacy policy, served at `/privacy-policy`. This URL is in the Autodesk App Store listing — never change it.
- `privacy.html` — privacy list page at `/privacy` (the single footer "Privacy" link). Links to each app policy: `/privacy-policy` (ClickTo3D), `/clicktosection/privacy-policy`, `/clickprint/privacy-policy`. These policy URLs are in Autodesk listings — never change them.
- `images/clickto3d-2d-to-3d.jpg` — main 2D→3D graphic (title cropped off, equal margins top/bottom).
- `images/clicktosection-2d-to-section.jpg` — ClickToSection plan→section graphic, cropped from `clicktosection-og.jpg` the same way.
- `clicktosection/privacy-policy/index.html`, `clickprint/privacy-policy/index.html` — other add-ins' policies (same shell; URLs in their Autodesk listings).
- `favicon.svg`, `sitemap.xml`, `robots.txt`, `CNAME`.
- `_config.yml` — Jekyll `exclude: [CLAUDE.md]` so this file is not published (clickto3d.com/CLAUDE.html = 404). Never add `.nojekyll` (it would publish `_project/`).
- ClickToSection Autodesk listing: https://marketplace.autodesk.com/apps/6b952ef1-09b6-43fa-8c2a-86a231e1e734?priceId=ba0c6133-6d43-480c-9b76-529bf7c9b9df
- ClickTo3D Autodesk listing: https://marketplace.autodesk.com/apps/c0fd3725-27a5-4e44-8148-366f50634eae?priceId=07099ece-b33a-4eb6-adb0-7833f87040a1

## Design rules (approved — don't change without asking)
- Follows the owner's ClickTo3D settings-window style: Revit neutral greys, Segoe UI, thin borders (#C3C8CF), 4px corners, slate-blue accent, no gradients.
  - Light: bg #F0F0F0, bar #F9F9F9, text #1B1B1B, secondary #5F6368, lines #E1E1E1, card #FFFFFF, accent #5D75A5.
  - Dark: bg #2B2B2B, bar #323232, text #E6E6E6, secondary #A8A8A8, lines #3C3C3C, card #323232, accent #8EA3CF.
  - Main button: filled slate #4F6596, white text.
- Logo: inline SVG hexagon star. Light = original colors; dark mode = "brighter blue" set (#8FB0FF outline, #6F87C2 spokes, #7D95CC fill, #DCE6FF strokes).
- Header: logo + "ClickTo3D" on the left, small grey "ב״ה" on the right. All sections share max-width 1280px so edges line up.
- Keep text minimal: no marketing fluff, no FAQ, no settings section, no ↗ arrows on buttons.
- Hero: "Plan to 3D. / One click.", one sentence ("ClickTo3D is a free Revit add-in. Click any spot in a plan and a focused 3D view opens right there."), "Get it free on Autodesk App Store" button, "Approved by Autodesk · Autodesk App Store" badge, "Free · Revit 2024 · 2025 · 2026 · 2027".
- ClickToSection section (below ClickTo3D, separated by a thin line, same layout and same filled button): "Plan to section." / "Click and pull." (68px so it stays on one line; 44px on phones), "ClickToSection is a free Revit add-in. Click a point in a plan, pull the mouse the way you want to look, and a section opens right there.", "Get it free on Autodesk App Store", Approved badge, "Free · Revit 2024 · 2025 · 2026 · 2027"; ribbon bar: "Launch from the Add-Ins ribbon. Esc or right-click cancels. / In Settings you can change the section size, units and the direction marker."
- Under the graphic: boxed bar with the real-proportion ribbon button (icon, "ClickTo3D", small centered ▼) + text: "Launch from the Add-Ins ribbon, a hotkey, or a programmed mouse button. In Settings you can change the default box size and 3D view name."
- "Get notified about new apps": heading, email box and button grouped together on the left.
- Footer: © 2026 ClickTo3D · clickto3d@gmail.com · Autodesk App Store (publisher profile) · one "Privacy" link → `/privacy`.
- SEO: home has JSON-LD (Organization, WebSite, one SoftwareApplication per add-in) + og:site_name; each page has its own description, self-canonical with trailing slash for folder pages (`/privacy-policy/`), sitemap uses the same. Update sitemap `lastmod` when a page changes.
- Privacy section 5 says only: we collect the email you enter; unsubscribe by writing to clickto3d@gmail.com. Never mention Google Sheets or who can access data.

## Email sign-up ("Notify me")
- Frontend posts to a Google Apps Script web app (URL in `index.html`, `SIGNUP_URL`).
- Backend: Apps Script bound to a private Google Sheet in clickto3d@gmail.com, tab "Signups" (Date, Email, Source, Status, Submission ID). Web app, Execute as Me, Access: Anyone. Endpoint can only add a sign-up and confirm one ID — never returns data.
- After editing the script: Deploy → Manage deployments → Edit → New version (keeps the same URL).
- Lessons from the owner's earlier survey project (keep):
  - Never host user-facing pages on Apps Script (multi-Google-account "Sorry, unable to open the file" error).
  - POST with `text/plain` body and `credentials: 'omit'`; read the real response.
  - Unique ID per submission, reused on retry → no duplicates.
  - Show success only after the server confirms; bounded `?check=ID` fallback; separate "unknown" from "failed".
  - Opening the /exec URL directly in a multi-account browser can fail — expected, doesn't affect the site.

## Working agreement
- Show a preview/screenshot and get the owner's OK before committing anything that goes live.
- Once the owner approves a preview, commit and push straight to `main` so it goes live (no PR, no separate branch).
- The owner prefers step-by-step instructions, one step at a time.

## Full handoff
- `_project/HANDOFF.md` — full handoff (accounts, DNS table, files, design tokens, sign-up system, to-dos).
- `_project/HISTORY.md` — every design round and decision, and why.
- `_project/` also has logos, screenshots, settings-window images, the Apps Script backend code, the UI style guide, and all design mockups. Folders starting with `_` are not published by GitHub Pages, but the repo is public: never commit passwords, the Google Sheet link/ID, or contact lists.

## Related
The ClickCRM project (GitHub Pages + Apps Script/Sheets, Google Sign-In token check) has its own handoff doc in the ClickTo3D Project.
