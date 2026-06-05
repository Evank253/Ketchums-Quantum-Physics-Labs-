import * as THREE from 'https://cloudflare.com';

let scene, camera, renderer, particleCloud;

export function init3DScene(containerId) {
    const container = document.getElementById(containerId);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 2.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
        colors[i] = 0.0; colors[i + 1] = 0.8; colors[i + 2] = 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 0.03, vertexColors: true, transparent: true, opacity: 0.85 });
    particleCloud = new THREE.Points(geometry, material);
    scene.add(particleCloud);

    function animate() {
        requestAnimationFrame(animate);
        particleCloud.rotation.x += 0.001;
        particleCloud.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();
}

export function triggerMalwareAbsorptionVisual(scatteringAmplitude) {
    if (!particleCloud) return;
    particleCloud.rotation.y += (scatteringAmplitude * 0.5);
    const colorAttribute = particleCloud.geometry.attributes.color;
    for (let i = 0; i < colorAttribute.count * 3; i += 3) {
        colorAttribute.array[i] = 0.2; colorAttribute.array[i + 1] = 1.0; colorAttribute.array[i + 2] = 0.3;
    }
    colorAttribute.needsUpdate = true;
    setTimeout(() => {
        for (let i = 0; i < colorAttribute.count * 3; i += 3) {
            colorAttribute.array[i] = 0.0; colorAttribute.array[i + 1] = 0.8; colorAttribute.array[i + 2] = 1.0;
        }
        colorAttribute.needsUpdate = true;
    }, 800);
}
