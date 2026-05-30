# gaussian-splat-three-test

Minimal browser-based Gaussian Splat viewer using Vite + Three.js + [@mkkellogg/gaussian-splats-3d](https://github.com/mkkellogg/GaussianSplats3D).

## Quick Start

```bash
npm install
npm run dev
```

Then open the local Vite URL (usually http://localhost:5173).

## Loading a Splat File

1. Place your Gaussian Splat file at:

   ```
   public/splats/sample.splat
   ```

   Supported formats: `.splat`, `.ksplat`, or a compatible `.ply` file.

2. The viewer will automatically detect and load it.

3. If the file is missing, the overlay shows:
   > "Missing /splats/sample.splat. Put a .splat, .ksplat, or compatible .ply file in public/splats/."

## Changing the Splat Path

Edit the constant at the top of `src/main.js`:

```js
const SPLAT_PATH = '/splats/sample.splat';
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build
```

## Controls

- Left-click + drag — orbit
- Right-click + drag — pan
- Scroll — zoom

## Notes

- Splat files are excluded from git via `.gitignore` (they can be very large).
- The `public/splats/` directory is tracked via `.gitkeep`.
