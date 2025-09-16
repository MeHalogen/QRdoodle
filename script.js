const qrInput = document.getElementById('qrInput');
const generateBtn = document.getElementById('generateBtn');
const qrResult = document.getElementById('qrResult');
const stylePreset = document.getElementById('stylePreset');
const primaryColor = document.getElementById('primaryColor');
const secondaryColor = document.getElementById('secondaryColor');
const qrSize = document.getElementById('qrSize');
const downloadPng = document.getElementById('downloadPng');

function clearQR() {
    qrResult.innerHTML = '';
}

function getFrameStyle() {
    switch (stylePreset.value) {
        case 'cloud':
            return 'box-shadow: 0 8px 0 rgba(0,0,0,0.06); border-radius: 36px; background: #fff;';
        case 'speech':
            return 'border-radius: 20px; background: #fff; position: relative;';
        case 'rounded':
            return 'border-radius: 12px; background: #fff;';
        case 'smile':
            return 'border-radius: 36px; background: #fff; position: relative;';
        default:
            return 'border-radius: 20px; background: #fff;';
    }
}

function generateQR() {
    clearQR();
    const value = qrInput.value.trim();
    if (!value) {
        alert('Please enter your URL, text, or phone number.');
        return;
    }
    const size = parseInt(qrSize.value, 10);
    const qrDiv = document.createElement('div');
    qrDiv.style = `display: flex; justify-content: center; align-items: center; width: ${size}px; height: ${size}px; box-sizing: content-box; position: relative; overflow: visible; background: none; border: none;`;
    if (stylePreset.value === 'smile') {
        const smiley = document.createElement('div');
        smiley.textContent = '😊';
        smiley.style = 'position: absolute; top: -28px; right: 18px; font-size: 2rem; z-index: 2;';
        qrDiv.appendChild(smiley);
    }
    const qr = new QRCode(qrDiv, {
        text: value,
        width: size,
        height: size,
        colorDark: primaryColor.value,
        colorLight: secondaryColor.value,
        correctLevel: QRCode.CorrectLevel.H
    });
    qrResult.appendChild(qrDiv);
}


generateBtn.addEventListener('click', generateQR);

// Update QR code when size slider changes
qrSize.addEventListener('input', () => {
    generateQR();
});

// Download PNG
function downloadQRAsPNG() {
    const qrCanvas = qrResult.querySelector('canvas');
    if (!qrCanvas) return alert('Generate a QR code first!');
    const link = document.createElement('a');
    link.href = qrCanvas.toDataURL('image/png');
    link.download = 'cartoon-qr.png';
    link.click();
}
downloadPng.addEventListener('click', downloadQRAsPNG);
