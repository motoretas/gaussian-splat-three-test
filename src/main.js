import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';

// ─── Change this to load a different splat file ───────────────────────────────
const SPLAT_PATH = `${import.meta.env.BASE_URL}splats/sample.splat`;
// ─────────────────────────────────────────────────────────────────────────────

const statusEl = document.getElementById('status');
const splatPathEl = document.getElementById('splat-path');

splatPathEl.textContent = SPLAT_PATH;

function setStatus(msg, type = '') {
  statusEl.textContent = msg;
  statusEl.className = type;
}

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
      selfDrivenMode: true,
      useBuiltInControls: true,
      // Camera defaults — works for most splats
      cameraUp: [0, 1, 0],
      initialCameraPosition: [0, 0.5, 3],
      initialCameraLookAt: [0, 0, 0],
      // Render into the #app div
      rootElement: document.getElementById('app'),
    });

    await viewer.addSplatScene(SPLAT_PATH, {
      showLoadingUI: false,
      splatAlphaRemovalThreshold: 5,
    });

    viewer.start();
    setStatus('Cargado — arrastra para orbitar', 'loaded');
  } catch (err) {
    setStatus(`Error: ${err.message}`, 'error');
    console.error(err);
  }
}

init();
