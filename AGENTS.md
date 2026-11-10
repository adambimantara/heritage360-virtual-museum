# Heritage360 Virtual Museum

React 19 + Vite 8 + Tailwind CSS v4 virtual museum application celebrating Yogyakarta's cultural heritage.

## Development & Build

- Development: `pnpm dev`
- Production Build: `pnpm build`
- Preview: `pnpm preview`
- Formatting: `pnpm format`

## Project Structure

- `src/main.tsx` - Application entry point; mounts `App.tsx` into `#root`
- `src/App.tsx` - Application router & layout orchestration
- `src/index.css` - Global styling, custom design tokens, and Tailwind CSS v4 setup
- `src/components/` - Modular UI, layout, media, and 3D visualization components
- `src/pages/` - Page views (Home, Explore, Detail, Stories, Documentary, Explorer3D, Admin, etc.)
- `src/lib/` - App state (`store.tsx`), routing (`router.tsx`), and 3D geometry helpers (`keris.ts`)
- `src/types/` - TypeScript interface & type definitions
- `src/data/` - Museum collections, stories, and documentary metadata
- `index.html` - HTML document shell
- `package.json` - Dependencies and NPM scripts
- `vite.config.ts` - Vite configuration with React, Tailwind v4, and `@` alias

## Dependencies

- **Runtime**: React 19, React DOM 19, Three.js, @react-three/fiber, @react-three/drei, Motion, Lucide React
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`
- **Tooling**: Vite 8, TypeScript 5.7+, oxfmt
