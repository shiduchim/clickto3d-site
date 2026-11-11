# Tests & checks

## Automatic
- No build. Serve locally: `python3 -m http.server 8765` in the repo, open http://127.0.0.1:8765/
- Screenshots of every changed page: desktop (1440 wide) and phone (iPhone), light and dark.
- No horizontal scrolling on the narrowest phone (iPhone SE).
- ClickToSection privacy page text = `ClickToSection/PRIVACY-POLICY.txt`, line for line.

## Manual (must be checked by me on the live site)
- [ ] https://clickto3d.com and https://clickto3d.com/privacy-policy open
- [ ] https://clickto3d.com/clicktosection/privacy-policy opens
- [ ] Footer "Autodesk App Store" opens my publisher profile
- [ ] Sign-up form saves an email

## Regression (add one line per fixed bug or approved feature)
- ClickToSection privacy heading fits on phones (no cut-off).
- Email in footer sits next to the copyright, not by the privacy links.
