const qrInput = document.getElementById('qrInput');
const generateBtn = document.getElementById('generateBtn');
const qrResult = document.getElementById('qrResult');
const stylePreset = document.getElementById('stylePreset');
const primaryColor = document.getElementById('primaryColor');
const secondaryColor = document.getElementById('secondaryColor');
const qrSize = document.getElementById('qrSize');
const downloadPng = document.getElementById('downloadPng');

let qrCode; // Keep reference so we can regenerate

function clearQR() {
  qrResult.innerHTML = '';
  qrCode = null;
}

function getDotsOptions(style, primary) {
  switch (style) {
    case 'pixelpop':
      return { type: 'rounded', color: primary }; // chunky bubbles
    case 'sketchcode':
      return { type: 'dots', color: primary }; // rough/doodle look
    case 'stripes':
      return { type: 'classy-rounded', color: primary }; // stripe-like with rounded edges
    case 'orbit':
      return { type: 'extra-rounded', color: primary }; // planets/circles
    case 'glowmatrix':
      return { type: 'square', color: primary }; // base squares + CSS glow
    default:
      return { type: 'square', color: primary };
  }
}

function generateQR() {
  clearQR();
  const value = qrInput.value.trim();
  if (!value) {
    qrResult.style.display = 'none';
    return;
  }
  qrResult.style.display = 'flex';

  const size = parseInt(qrSize.value, 10);
  const style = stylePreset.value;
  const primary = primaryColor.value;
  const secondary = secondaryColor.value;

  qrCode = new QRCodeStyling({
    width: size,
    height: size,
    data: value,
    dotsOptions: getDotsOptions(style, primary),
    backgroundOptions: {
      color: secondary
    },
    cornersSquareOptions: {
      type: style === 'orbit' ? 'extra-rounded' : 'square',
      color: primary
    },
    cornersDotOptions: {
      color: primary
    }
  });

  // Extra effects for GlowMatrix
  if (style === 'glowmatrix') {
    qrResult.classList.add('glow-effect');
    qrResult.style.setProperty('--primary-color', primary); // 🌈 glow color = primary
  } else {
    qrResult.classList.remove('glow-effect');
    qrResult.style.removeProperty('--primary-color');
  }

  qrCode.append(qrResult);
}

generateBtn.addEventListener('click', generateQR);

// Update QR live on size change
qrSize.addEventListener('input', () => generateQR());

// Update QR when style changes
stylePreset.addEventListener('change', () => generateQR());

// Update QR when colors change
primaryColor.addEventListener('input', () => generateQR());
secondaryColor.addEventListener('input', () => generateQR());

// Download PNG
function downloadQRAsPNG() {
  if (!qrCode) return alert('Generate a QR code first!');

  const style = stylePreset.value;

  if (style === "glowmatrix") {
    // Wait a tick so the glow CSS is applied
    setTimeout(() => {
      html2canvas(qrResult, {
        backgroundColor: null, // keep transparent bg
        scale: 3               // higher resolution
      }).then(canvas => {
        const link = document.createElement("a");
        link.download = `QR-${style}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }, 200);
  } else {
    qrCode.download({ name: `QR-${style}`, extension: "png" });
  }
}

downloadPng.addEventListener('click', downloadQRAsPNG);