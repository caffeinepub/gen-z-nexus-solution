# Specification

## Summary
**Goal:** Update the Chess.com Diamond Membership product to a 1-year BDT-priced offering with a reliable logo fallback, refresh official logos for Netflix/Spotify/YouTube Premium, and ensure consistent product-card interactions without changing the premium dark style.

**Planned changes:**
- Update Chess.com product in `frontend/src/components/ProductGrid.tsx` to use the provided remote logo URL, offer a single duration labeled exactly "1 Year", and set regular price to 1200 BDT with offer price 970 BDT (used for totals).
- Ensure Chess.com cart/checkout/WhatsApp messaging uses Duration: "1 Year" and totals in "BDT" based on the offer price.
- Add robust Chess.com logo fallback in `frontend/src/components/ProductCard.tsx` so a local `/assets/generated/...` image is shown if the remote logo fails to load.
- Refresh Netflix, Spotify, and YouTube Premium product logos to official high-resolution static assets served from `frontend/public/assets/generated/`, and reference them via stable `/assets/generated/...` paths in `frontend/src/components/ProductGrid.tsx`.
- Ensure consistent product-card behavior across all products: reliable "+" / "-" quantity controls (min 1) and "Buy It Now" opens WhatsApp `https://wa.me/8801326060586` with an English pre-filled message for priced products (while keeping the existing unpriced inquiry flow).

**User-visible outcome:** Users see an updated Chess.com card with a 1-year option and BDT pricing (BDT 1200 crossed out, BDT 970 used for totals), logos that display reliably (including offline-ready official logos for Netflix/Spotify/YouTube Premium), and consistent quantity + WhatsApp purchase/inquiry behavior across product cards.
