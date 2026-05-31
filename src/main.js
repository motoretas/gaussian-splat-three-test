import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';

// ─── Change this to load a different splat file ───────────────────────────────
// Place your .splat, .ksplat, or compatible .ply file in:
//   public/splats/sample.splat
// Then run: npm run dev
const SPLAT_PATH = `${import.meta.env.BASE_URL}splats/sample.splat`;
// ─────────────────────────────────────────────────────────────────────────────

const statusEl = document.getElementById('status');
const splatPathEl = document.getElementById('splat-path');

splatPathEl.textContent = SPLAT_PATH;

function setStatus(msg, type = '') {
  statusEl.textContent = msg;
  statusEl.className = type;
}

// Check if the file exists before trying to load the viewer
async function fileExists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

async function init() {
  setStatus('Checking for splat file...');

  const exists = await fileExists(SPLAT_PATH);
  if (!exists) {
    setStatus(
      `Missing ${SPLAT_PATH}\n\nPut a .splat, .ksplat, or compatible .ply file in public/splats/.`,
      'error'
    );
    return;
  }

  setStatus('Loading splat...');

  try {
    const viewer = new GaussianSplats3D.Viewer({
      // Mount into #app div
      rootElement: document.getElementById('app'),
      selfDrivenMode: true,
      useBuiltInControls: true,
      // Reduce initial memory footprint
      gpuAcceleratedSort: true,
    });

    await viewer.addSplatScene(SPLAT_PATH, {
      showLoadingUI: false,
      position: [0, 0, 0],
      rotation: [0, 0, 0, 1],
      scale: [1, 1, 1],
    });

    viewer.start();
    setStatus('Loaded — click and drag to orbit', 'loaded');
  } catch (err) {
    setStatus(`Error loading splat:\n${err.message}`, 'error');
    console.error(err);
  }
}

init();
