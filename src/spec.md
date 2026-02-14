# Specification

## Summary
**Goal:** Add official product logos as local static assets and update product cards to use only those local image paths.

**Planned changes:**
- Add an official logo/image file for each product shown in `frontend/src/components/ProductGrid.tsx` under `frontend/public/assets/generated/`.
- Update each product’s `image` field in `frontend/src/components/ProductGrid.tsx` to reference only local paths starting with `/assets/generated/` (no remote/external URLs at runtime).
- Ensure product cards render the new logos without broken images, while preserving the existing letter-placeholder fallback if an image fails to load.

**User-visible outcome:** All product cards display official logos loaded from local assets (no external image fetching), and the storefront behavior remains unchanged.
