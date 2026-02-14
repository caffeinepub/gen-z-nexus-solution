# Specification

## Summary
**Goal:** Update the storefront catalog and pricing presentation by removing the 3-month duration, adding a Messenger group proof link, expanding the product grid with new services (with logos), and hiding numeric prices for all products except Netflix and Chess.com.

**Planned changes:**
- Remove the “3 Month” duration option across product cards, cart items, and WhatsApp checkout/message generation; enforce a single “1 Month” duration everywhere.
- Add a visible link labeled “Investigation / Proof (Messenger Group)” that opens https://m.me/j/AbZu2osHvaTmS0WN/ in a new tab.
- Expand the product grid catalog to add: ChatGPT, Gemini, Facebook, Toffee, Chorki, Deepto Pay, Bioscope, iScreen, Hoichoi, PUBG, Free Fire, Adobe Creative, Canva, Truecaller, CamScanner; each card uses an official logo image from `/assets/generated/` and falls back to placeholder initials if the image fails to load.
- Restrict visible numeric pricing to only Netflix Premium and Chess.com Diamond Membership; for all other products show exactly “(prize)” that opens WhatsApp https://wa.me/8801326060586 in a new tab with a pre-filled price inquiry message for that product (and ensure non-priced products don’t require numeric totals for cart/checkout flows).
- Replace/update the Chess.com product image to use an official Chess.com logo asset under `/assets/generated/` and ensure the product data references the exact generated filename.

**User-visible outcome:** Shoppers see a simplified 1-month-only purchase experience, can open the Messenger proof group link, can browse additional services with logos, and can click “(prize)” to inquire on WhatsApp for all non-Netflix/Chess products while still seeing numeric prices for Netflix and Chess.com.
