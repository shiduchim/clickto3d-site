# ClickTo3D website — project history

How clickto3d.com went from a Google Sites page to the current site, in order, with every decision and why.
Written from the original design chat (Oct 29 – Nov 19, 2026). Mockups referred to here are in `design-mockups/`.

---

## 1. Starting point (Oct 29, 2026)

- ClickTo3D was approved and published (free) on the Autodesk App Store on Oct 29, 2026.
- clickto3d.com was a Google Sites page. Jetserver had set up a parking/redirect so `clickto3d.com` → `www`.
- Idea at the time: a company site called **"Mikdsh"** for all of the owner's apps, ClickTo3D as the main product,
  looking like a company that can compete with big firms and win corporate contracts.

## 2. Company-site ("Mikdsh") exploration

Many full-page directions were mocked up on a design canvas:

| Mockup | Idea | Outcome |
|---|---|---|
| A — Minimal (`Main`) | Claude-inspired, warm ivory, serif | "Looks like cheap apps made in a day" |
| B — Corporate (`Corporate`) | Navy, IBM Plex, sales/quote form | Too corporate / implies a sales team |
| C — Bold product (`Studio*`) | Dark, huge type, lime accent; cyan/orange/violet variants | Liked the boldness, but "not so dark" |
| C light (`StudioLight*`) | Same in light, lime/sky/peach | — |
| D — Sidebar, E — Plain page (`Sidebar`, `Letter`) | Ultra-basic, SSI.inc-inspired | "Way too basic" |
| F — Developer sidebar (`DevSidebar`, `AllTools`) | Docs-style left sidebar, Ctrl K search | **Favourite.** Iterated a lot (see below) |
| G — Revit ribbon (`Ribbon`) | Site header looks like Revit ribbon | Liked |
| H–L (`Sheet`, `Palette`, `Bento`, `Split`, `Plan`) | Drawing sheet, command palette, bento grid, split screen, floor plan | Palette liked as a search feature |
| F2 (`RibbonSidebar`) | Sidebar + ribbon combined | "Not clear where the eye should go" → sidebar alone wins |

Lessons from the F iterations:
- Sidebar groups need clear separation; download button must be close (added a Download card in the sidebar).
- Tried warm Claude colors → then exact Claude palette → "looks like a blog" (serif) → back to **white/grey**,
  which reads most "high tech".
- Removed "built by a working BIM modeler" from the company page (reads as one person) — belongs on an About page.
- Owner does **not** want to imply a sales team: "Talk to sales" → **"Team licensing"**.
- Some apps are Windows tools, not Revit (Snip, PDF Reader, Recorder) → two groups: **Revit add-ins** / **Windows apps**.
- The owner's gate sketch became a small line logo for Mikdsh (`assets/logo/Mikdsh_gate_sketch.png`).

**Decision for later:** when there are ~5 apps, the company site uses **F (developer sidebar)**, with each app page
using the ClickTo3D page layout. For now: a single-product site for ClickTo3D only.

## 3. ClickTo3D single-product site

- First versions (`ClickTo3D`, `ClickTo3DBlue`, `ClickTo3DSoft`) used the owner's real screenshots and logo.
- Owner shared his **add-in UI style guide** (`reference/EK_Revit_Addin_UI_Style_Guide.md`) → four versions in that
  "settings-window style": C bold, K split, J bento, F sidebar (`ClickTo3D_C/K/J/F`).
- **C (bold) chosen** — strongest first screen; sidebar is overkill for one product. K2/F2 rebuilt with C's content
  for comparison; C still won.

Refinements to C, in order:
1. "Get it free" appeared 3 times → kept 2, then 1 (top only). Header shows only logo.
2. "Approved by Autodesk" badge moved next to the button (reassures at the moment of decision).
3. Settings/FAQ removed from header. "Stop hunting for it in 3D" removed ("don't use the word hunting").
4. Empty right side → 2D→3D graphic placed beside the headline.
5. A bug (extra closing `</div>`) cut the page off after the headline — fixed.
6. Fake window title bar ("ClickTo3D — Level 1 … Close") over the graphic removed. Mikdsh removed from footer.
   Privacy link added to footer. Settings section made smaller. FAQ removed.
7. **Dark/light mode** added, using exact dark colors from the style guide. New transparent settings-window PNGs
   (later re-exported with a softer shadow: ~1/3 size, half darkness).
8. Logo for dark mode: 8 options tried (`LogoDark`); **"Brighter blue"** chosen.
9. Settings explained with a ribbon graphic → many iterations (Add-Ins tab, Settings drop-down, blue highlight,
   arrows, mouse pointer, overlap with settings window). All rejected as too busy/marketing.
   **Final:** whole settings section removed; the ribbon button (real proportions, taller, ▼ lower, like Revit) sits
   in a bordered bar under the graphic with one line of text.
10. "Settings are under the arrow" → people would click the arrow on the website → changed to
    "In Settings you can change the default box size and 3D view name."
11. Top title of the 2D→3D image cropped (duplicated the headline); top/bottom margins equalised.
12. Added small grey **ב״ה** at top right. Removed ↗ arrows from button and badge. Header/sections aligned to one
    1280px width. "Get notified" box moved next to its heading.

## 4. Email sign-up

- Considered Formspree (50/month free), Sender/EmailOctopus (2,500 free), MailerLite (cut to 250 in June 2026).
- Gmail can't be the "From" address for bulk-email services → would need a domain email.
- **Owner chose Google Sheets for full control** (fits the CRM plan).
- First version used `no-cors` and showed success blindly — exactly the bug from the owner's earlier survey.
  Owner shared the lessons doc (`reference/Apps-Script-lessons-and-CRM-requirements.md`); rewritten with
  text/plain + credentials omit, unique ID, confirm fallback, unknown vs failed.
- Setup walked through: incognito with only clickto3d@gmail.com, sheet "ClickTo3D sign-ups", Apps Script, deploy
  as web app (Me / Anyone), deployment URL put in `index.html`.
- Test: first attempt failed because the tested `index.html` still had the placeholder URL. After fixing:
  success message, row in sheet, duplicate test passed. Direct `/exec` link shows Google's multi-account error —
  expected, the site doesn't use it.

## 5. Going live

1. GitHub repo `shiduchim/clickto3d-site`, uploaded files, Pages: Deploy from a branch → main → / (root).
   (Kept "Deploy from a branch" — GitHub Actions not needed for plain files.)
2. Jetserver DNS: changed A `185.56.72.74` → `185.199.108.153`, added `.109/.110/.111`, changed www CNAME
   `ghs.googlehosted.com` → `shiduchim.github.io`. Kept TXT, MX, NS, mail, ftp.
3. Verified with dns.google (A, CNAME, no AAAA). GitHub check lagged several hours, then
   **DNS check successful** → certificate → **Enforce HTTPS** ticked.
4. Privacy: the Autodesk listing points to `/privacy-policy`, so the policy moved to `privacy-policy/index.html`;
   `privacy.html` redirects there.
5. Privacy text: owner's official policy + section 5 for the website. Owner trimmed section 5 to two sentences —
   no mention of Google Sheets, access, or sharing promises (keeps options open, e.g. selling the company).
6. Google Search Console: Domain property auto-verified via the existing TXT record. Old crawl (Oct 26) showed 404
   from the parking server — Test Live URL + Request indexing. `sitemap.xml` + `robots.txt` added and submitted.

## 6. Move to Claude Code (Nov 19, 2026)

- `CLAUDE.md` written and uploaded so future sessions in the Code tab know all rules.
- This `_project/` folder added with the full handoff, history, assets, backend code, and design mockups.
- A later session also added `clicktosection/` (privacy policy + favicon for the ClickToSection add-in).

## 6b. Privacy hub, ClickPrint, audit (Nov 21–25, 2026)

- Footer had two privacy links; a third app (ClickPrint) was coming. Decided (checked with a second model): keep each
  policy at its own URL (Autodesk listings must go straight to the product policy), and turn `privacy.html` into a
  list page at `/privacy`. Footer now has one "Privacy" link. `/privacy-policy` unchanged.
- Third app was first called ClickToPrint, renamed **ClickPrint** → `/clickprint/privacy-policy`. Owner supplied the
  text; second version removed the error-log mention ("saves only its settings"). Date format "22 November 2026".
- Google auto-corrected "clickto3d" to "click 3d"; `site:` search showed the site was indexed — a new-brand problem.
- Full audit (UI, SEO, accessibility). Fixed: CLAUDE.md was published as /CLAUDE.html (now excluded via
  `_config.yml`); ClickTo3D privacy page had the home page's description/og tags; JSON-LD added; canonicals/sitemap
  with trailing slash; hero image width/height; phone H1 size on privacy pages (34px, like the sibling pages);
  iPhone zoom on email box (16px on phones); placeholder contrast; footer tap targets; favicon metadata stripped
  (8.7KB → 0.9KB); all policies now "Last updated: D Month YYYY". Hero sentence now names "ClickTo3D … Revit add-in".
- Search Console: sitemap shows 5 pages; indexing requested for the main pages.

## 7. Related projects (not in this repo)

- **ClickCRM** — private sales CRM (GitHub Pages frontend + Apps Script/Sheets backend in clickto3d@gmail.com,
  Google Sign-In token check, only the owner can read/write). Handoff lives in the claude.ai "ClickTo3D" Project.
- **Outreach campaign** to Israeli and worldwide Revit firms — contact lists and handoffs in the same Project
  (kept out of this public repo on purpose).
