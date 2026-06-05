import { init3DScene, triggerMalwareAbsorptionVisual } from './render_3d.js';

let activeUserAddress = null;
let currentMockTokenBalance = 0;

function setupDashboardControls() {
    const tokenDisplay = document.getElementById('token-display');
    if (!tokenDisplay) return;

    tokenDisplay.style.cursor = 'pointer';
    tokenDisplay.style.color = '#ffcc00';

    tokenDisplay.addEventListener('click', () => {
        if (!activeUserAddress) {
            activeUserAddress = "0xNode" + Math.floor(Math.random() * 100000);
            tokenDisplay.innerHTML = `Node Connected: Active | Balance: ${currentMockTokenBalance} $Dat`;
            tokenDisplay.style.color = '#00ffcc';
            startSimulatedDataInflow();
        }
    });
}

function startSimulatedDataInflow() {
    setInterval(() => {
        const simulatedAmplitude = parseFloat((Math.random() * 0.15 + 0.01).toFixed(4));
        triggerMalwareAbsorptionVisual(simulatedAmplitude);
        const derivedReward = Math.floor(simulatedAmplitude * 1000);
        currentMockTokenBalance += derivedReward;
        
        const tokenDisplay = document.getElementById('token-display');
        if (tokenDisplay) {
            tokenDisplay.innerHTML = `Node Active | Total Balance: ${currentMockTokenBalance} $Dat (+${derivedReward})`;
        }
    }, 4000);
}

window.addEventListener('DOMContentLoaded', () => {
    init3DScene('canvas-container');
    setupDashboardControls();
});
