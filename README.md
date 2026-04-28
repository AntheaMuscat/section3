# Sugar & Swirl Bakery

A cute three-page bakery website built with **Next.js 16** and **Tailwind CSS 4**. The site uses pastel styling, local SVG illustrations, and simple navigation to make browsing baked treats feel warm and playful.

## Pages

- **Home** – Hero section, featured treats, and a friendly introduction to the bakery
- **Menu** – Search, category filters, sorting, and a basket drawer for treats
- **Visit** – Opening hours, location, and pre-order details

## Visual Style

- Soft pink, cream, and rose tones
- Rounded cards and pill buttons
- Bakery-themed SVG images stored in `public/images`
- Clear spacing and readable product information

## Interactive Features

- Dynamic filtering by category, search term, stock, and price
- Sort options for featured items, price, and rating
- Basket drawer with quantity controls on the menu page
- Responsive navigation with strong visual feedback

## Automated Testing

- Playwright smoke test covers the three-page flow
- Verifies the home page loads, the menu renders six treats, and the visit page opens
- Test command: `npm run test:e2e`

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run test:e2e
```

## Git Workflow

The project is developed in small commits so each stage stays reviewable:

1. Bakery branding and three-page structure
2. Menu interactions, images, and page styling
3. Test updates and documentation

This makes it easier to present design iteration, testing, and version control clearly.
