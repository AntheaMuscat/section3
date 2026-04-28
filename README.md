# Nova Market

A responsive ecommerce storefront built with **Next.js 16** and **Tailwind CSS 4**, demonstrating optimised design practices for user engagement. Includes dynamic filtering, state-driven cart, and end-to-end testing with Playwright.

## Design Philosophy

### Usability & Visual Hierarchy
- **Sticky navigation** keeps primary actions (cart, nav links) accessible as users scroll
- **Clear button states** (active/hover) provide immediate feedback on interactions
- **Grouped controls** in the filter sidebar reduce cognitive load and keep decisions localized
- **Consistent card layouts** with gradient accents make the catalog scannable and memorable

### Responsiveness
- Mobile-first layout adapts seamlessly from small screens to desktop
- Filter controls stack on mobile, spread horizontally on tablets/desktop via Tailwind breakpoints
- Navigation toggles on mobile, expands to horizontal menu on `lg` screens
- Cart drawer uses fixed positioning and z-stacking for unobstructed access on any screen

### Performance & State Management
- All product filtering and cart state lives in a single client component (`"use client"`)
- `useMemo` optimizes filter re-computation to prevent unnecessary recalculations
- Products are embedded as static data; filtering is instant (no API calls)
- Layout shifts are minimal; Tailwind's constraint-based system keeps paint budgets low

## Project Structure

```
src/
  app/
    page.tsx          # Main storefront (all UI + state in one client component)
    layout.tsx        # Root layout with metadata
    globals.css       # Tailwind imports and custom base styles

playwright.config.ts  # E2E test configuration
tests/
  e2e/
    storefront.spec.ts  # Smoke test validating page load and product rendering

package.json          # Dependencies & scripts
```

## Scripts

```bash
npm run dev      # Start dev server (http://127.0.0.1:3000)
npm run build    # Compile for production
npm start        # Serve production build
npm run lint     # Run ESLint
npm run test:e2e # Run Playwright end-to-end tests
```

## Key Features

### Filtering & Search (No Page Reload)
- **Search** by product name, category, or description
- **Category buttons** narrow results instantly
- **Sort dropdown** (featured, price low-to-high, price high-to-low, rating)
- **Price slider** filters by max price
- **Stock filter** shows only in-stock items
- **Empty state** with reset button guides users back to full catalog

### Cart & Favorites
- **Add to cart** immediately opens the drawer (accessible on desktop header or mobile nav)
- **Quantity controls** (−/+) let users adjust quantities without re-adding
- **Favorites** (heart icon) persist in state during the session
- **Cart summary** shows subtotal; updates in real-time as items are added/removed
- **Escape key** closes the cart drawer (added for accessibility)

### Accessibility & Semantics
- Dialog drawer uses `role="dialog"` and `aria-labelledby` for screen readers
- All buttons have `type="button"` to prevent accidental form submission
- Focus management on cart drawer (Escape key support)
- Semantic HTML: `<aside>` for filter sidebar, `<article>` for product cards, `<section>` for page regions

## Agentic Coding Workflow

During development, I used an agent-style review to:
1. **Identify gaps** in the initial component design (e.g., missing Escape-key handler on cart)
2. **Validate the information architecture** (filter grouping, CTA placement)
3. **Assess trade-offs** (e.g., single-ended price filter vs. range slider complexity)

**What worked:**
- Actionable feedback on accessibility and state clarity
- Suggestions to keep the filtering model simple rather than over-engineer it

**What didn't work:**
- Generic feedback like "add more animations" or "make it more modern" (not specific to the context)

## Automated Testing with Playwright

### Why Playwright?
- **No external dependencies:** Runs in headless Chromium included in `@playwright/test`
- **Reliable locators:** Uses semantic `getByRole()` queries instead of brittle selectors
- **Parallel execution:** Can scale to multiple test files and browsers
- **CI-ready:** Configuration supports both local dev and CI environments with `reuseExistingServer` flag

### Test Coverage
- `storefront.spec.ts` → Smoke test validating page load, product rendering, and pricing display
- Asserts 6 products render, price and rating badges display correctly
- Runs against dev server automatically via `webServer` config

### Running Tests
```bash
npm run test:e2e       # Run in headless mode
npx playwright test --ui  # Run in interactive mode (opens browser)
```

### Future Test Ideas
- **State flow test:** Filter by category, add product, verify cart count and subtotal update together
- **Mobile responsive test:** Verify menu toggle hides/shows nav on breakpoints
- **Keyboard navigation test:** Navigate filters, add to cart, close drawer using keyboard only
- **Performance test:** Measure time to interactive (TTI) and render performance with Lighthouse

## Git Workflow

Two key commits capture the development iteration:

1. **`feat: build nova market storefront`**
   - Core ecommerce UI with filtering, cart, navigation
   - All state and styling in place
   - Build and lint pass; ready for testing

2. **`feat: add playwright e2e smoke test and test infrastructure`**
   - Playwright config and first E2E test
   - Test framework ready for expansion
   - CI/CD integration possible without additional setup

Each commit is small, focused, and independently deployable, demonstrating how Git supports iterative development and experimentation.

## Tailwind CSS Usage

### Key Utilities
- **Spacing:** `gap-`, `p-`, `px-`, `py-`, `mt-` for consistent rhythm
- **Colors:** Dark mode palette (`slate-`, `cyan-`, `white/10` for semi-transparent) with gradient accents
- **Responsive:** `sm:`, `md:`, `lg:`, `xl:` prefixes for breakpoint-driven layouts
- **Effects:** `shadow-`, `backdrop-blur-`, `border-` for depth and visual hierarchy
- **Animation:** `transition`, `hover:translate-y-`, `focus:` for feedback

### Design Tokens (via CSS Variables)
```css
--background: #020617;      /* Dark navy base */
--foreground: #e2e8f0;      /* Light slate for text */
```

Gradient accents on product cards use Tailwind's `bg-gradient-to-br` with color stops for visual interest without animation overhead.

## Next Steps (Out of Scope)

- **Persistence:** Use localStorage or a backend API to save cart and favorites across sessions
- **Checkout:** Integrate a payment provider (Stripe, PayPal) for real transactions
- **Analytics:** Track filter usage, add-to-cart events, and cart abandonment
- **Server-side Filtering:** Move product data to a database; cache filtered results server-side for scale
- **Visual Testing:** Add Percy or similar tool to catch unintended style regressions

---

**Built by:** Agentic coding workflow with iterative Git checkpoints  
**Date:** April 2026  
**Next.js Version:** 16.2.4 · **React:** 19.2.4 · **Tailwind:** 4
