# Changelog

## 2026-08-16 — App launch update

Client (Phya) confirmed PSIRA approval and the mobile apps went live on both
stores. Site updated to match, reviewed by the client, and deployed to
production.

### Reference details

| Item | Value |
|---|---|
| PSIRA registration no. | `5165524` |
| PSIRA application no. | `APP-7774302` |
| Registration approval date | 2026-08-02 |
| App Store | https://apps.apple.com/za/app/phya-on-demand-protection/id6756569502 |
| Google Play | https://play.google.com/store/apps/details?id=app.phya.security |
| Android package | `app.phya.security` |

### Changed

**App store listings are live** (`8b05b24`)
- Replaced the faded "Coming Soon" badge overlays with real links to the App
  Store and Google Play listings.
- Section heading "Coming Soon to iOS & Android" → "Now Available on iOS &
  Android", with copy rewritten to prompt a download.
- Reworded the adjacent notification card: the app has shipped, but service
  coverage is still the Gauteng pilot, so it now reads "Not in our service area
  yet? Get notified when we go live near you".

**PSIRA registration number published** (`8b05b24`)
- Footer: shield badge showing `PSIRA Registered: 5165524`.
- Privacy policy and terms of service: `PSIRA Registration No` line added to the
  contact block on both pages.
- Copyright year corrected 2025 → 2026.

**CTAs reworked around the launch** (`6912ea9`)
- Hero: single "Join Waitlist" button replaced with "Download the App"
  (primary, links to the store section) plus "Join Phya" (secondary, links to
  the contact form). PSIRA number added as a trust line beneath them, putting it
  above the fold.
- Navbar: white "Download" button pinned to the right edge, on desktop and in
  the mobile menu. "Screenshots" nav link dropped — the section itself remains
  and is still reachable by scrolling.

### Removed

**"Get Notified When Phya Launches" section** (`6912ea9`)
- Its copy claimed the platform had not launched yet, which stopped being true.
- More importantly it was broken: `notifyForm` had **no submit handler** in
  `src/main.js` (only `clientForm` and `providerForm` are wired), so submitting
  it triggered a native form post and the email was silently discarded. Any
  address entered there was never captured.
- The `#contact` section already covers this properly, collecting name, email,
  phone, city, pilot interest and privacy consent, and does post to the API.

### Deployment

Built with `npm run build`, synced to S3, CloudFront cache invalidated
(`I63U0BFYFRZYU6F5TSYPT42GEY`, completed). Deployed page verified byte-identical
to the local build; store links, PSIRA number and both legal pages checked live.

### Open items

- The `#contact` submit button still reads **"Join Waitlist"**. Inaccurate now
  that the app has shipped, and the form serves provider applications too.
- Client-side: PSIRA portal flags the **2026/27 FY self-assessment** as not yet
  submitted.
- `CLIENT_NOTES.md` still contains the original client copy, including the
  removed "Get Notified" block and pre-launch app-timeline FAQ answers. Left
  as-is — it is the source brief, not live copy — but the FAQ section on the
  site may want a pass now that the app is downloadable.
