import { init3DScene, triggerMalwareAbsorptionVisual } from './render_3d.js';
import { connectWallet, claimDatMintReward } from './web3_bridge.js';

// Setup variables to log session data
let activeUserAddress = null;
let currentMockTokenBalance = 0;

/**
 * Initializes the interface dashboard overlay logic.
 */
function setupDashboardControls() {
    const tokenDisplay = document.getElementById('token-display');
    if (!tokenDisplay) return;

    // Change status text to let users click and hook up their Web3 provider
    tokenDisplay.style.cursor = 'pointer';
    tokenDisplay.innerHTML = 'Click to Connect Wallet to Quantara Node Network';
    tokenDisplay.style.color = '#ffcc00';

    tokenDisplay.addEventListener('click', async () => {
        if (!activeUserAddress) {
            tokenDisplay.innerHTML = 'Securing Handshake connection...';
            // Trigger the Ethers.js wallet loop
            activeUserAddress = await connectWallet();
            
            if (activeUserAddress) {
                // Shorten address footprint for clean UI viewing (e.g. 0x1234...abcd)
                const shortAddress = `${activeUserAddress.substring(0, 6)}...${activeUserAddress.substring(activeUserAddress.length - 4)}`;
                tokenDisplay.innerHTML = `Node: ${shortAddress} | Balance: ${currentMockTokenBalance} $Dat`;
                tokenDisplay.style.color = '#00ffcc';
                
                // Start a mock pipeline loop to show data processing
                startSimulatedDataInflow();
            } else {
                tokenDisplay.innerHTML = 'Connection Fault. Retry Handshake.';
                tokenDisplay.style.color = '#ff3333';
            }
        }
    });
}

/**
 * Simulates active crawler nodes relaying metrics up to the UI layout.
 */
function startSimulatedDataInflow() {
    setInterval(() => {
        // Generate a random mock scattering amplitude to simulate an incoming attack matrix
        const simulatedAmplitude = parseFloat((Math.random() * 0.15 + 0.01).toFixed(4));
        console.log(`[UI Data Packet Ingest] Processing vector amplitude: ${simulatedAmplitude}`);
        
        // 1. Kick off the Three.js neon particle matrix flash
        triggerMalwareAbsorptionVisual(simulatedAmplitude);
        
        // 2. Add tokens to the display dashboard tracker array
        const derivedReward = Math.floor(simulatedAmplitude * 1000);
        currentMockTokenBalance += derivedReward;
        
        const tokenDisplay = document.getElementById('token-display');
        if (tokenDisplay && activeUserAddress) {
            const shortAddress = `${activeUserAddress.substring(0, 6)}...${activeUserAddress.substring(activeUserAddress.length - 4)}`;
            tokenDisplay.innerHTML = `Node: ${shortAddress} | Balance: ${currentMockTokenBalance} $Dat (+${derivedReward})`;
        }
    }, 4000); // Triggers every 4 seconds to show live ecosystem updates
}

// Bind UI setup straight to window load
window.addEventListener('DOMContentLoaded', () => {
    init3DScene('canvas-container');
    setupDashboardControls();
    console.log("[Quantara Orchestrator App] Front-end loop compiled successfully.");
});
