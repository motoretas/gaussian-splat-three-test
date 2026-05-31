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
    // Bonsai scene camera — cameraUp [0,-1,0] is standard for most 3DGS exports
    const viewer = new GaussianSplats3D.Viewer({
      selfDrivenMode: true,
      useBuiltInControls: true,
      cameraUp: [0, -1, 0],
      initialCameraPosition: [-1, -4, 6],
      initialCameraLookAt: [0, 4, 0],
      rootElement: document.getElementById('app'),
      gpuAcceleratedSort: true,
      sharedMemoryForWorkers: false,
    });

    viewer.addSplatScene(SPLAT_PATH, {
      showLoadingUI: false,
      splatAlphaRemovalThreshold: 5,
    }).then(() => {
      viewer.start();
      setStatus('Loaded — drag to orbit', 'loaded');
    }).catch(err => {
      setStatus(`Error loading scene: ${err.message}`, 'error');
      console.error(err);
    });

  } catch (err) {
    setStatus(`Error: ${err.message}`, 'error');
    console.error(err);
  }
}

init();
