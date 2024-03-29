<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	export const prerender = true;

	let container;
	const HEXAGON_SIZE = 9;

	onMount(() => {
		let scene, camera, renderer;
		let hexagons = [];
		let lineSegments = [];
		const hexagonOffsets = [
			{ x: 0, y: 0 },
			{ x: 0, y: HEXAGON_SIZE * 1.75 },
			{ x: 0, y: HEXAGON_SIZE * -1.75 },
			{ x: 0, y: HEXAGON_SIZE * 2 * -1.75 },
			{ x: 0, y: HEXAGON_SIZE * 2 * 1.75 },
			{ x: HEXAGON_SIZE * 1.5, y: HEXAGON_SIZE * 0.875 },
			{ x: HEXAGON_SIZE * 1.5 * 2, y: HEXAGON_SIZE * 2 * 0.875 },
			{ x: HEXAGON_SIZE * 1.5 * -2, y: HEXAGON_SIZE * 2 * 0.875 },
			{ x: HEXAGON_SIZE * -1.5, y: HEXAGON_SIZE * 0.875 },
			{ x: HEXAGON_SIZE * -1.5, y: HEXAGON_SIZE * -0.875 },
			{ x: HEXAGON_SIZE * 1.5 * 2, y: HEXAGON_SIZE * 2 * -0.875 },
			{ x: HEXAGON_SIZE * 1.5 * -2, y: HEXAGON_SIZE * 2 * -0.875 },
			{ x: HEXAGON_SIZE * 1.5, y: HEXAGON_SIZE * -0.875 }
		];
		const staggerDelay = 100; // ms

		function setupScene() {
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(
				75,
				container.clientWidth / container.clientHeight,
				0.1,
				1000
			);
			camera.position.z = 100;

			renderer = new THREE.WebGLRenderer();
			renderer.setSize(container.clientWidth, container.clientHeight);
			container.appendChild(renderer.domElement);
		}

		function createHexagon(offsetX, offsetY) {
			const points = [];
			const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
			for (let i = 0; i <= 6; i++) {
				const angle = (Math.PI / 3) * i;
				const x = Math.cos(angle) * HEXAGON_SIZE + offsetX;
				const y = Math.sin(angle) * HEXAGON_SIZE + offsetY;
				points.push(new THREE.Vector3(x, y, 0));
			}
			const geometry = new THREE.BufferGeometry().setFromPoints(points);
			const line = new THREE.LineLoop(geometry, material);
			scene.add(line);
			hexagons.push(line);
		}

		function drawConnectingLines() {
			const lineMaterial = new THREE.LineBasicMaterial({
				color: 0x0000ff,
				transparent: true,
				opacity: 0
			});
			let index = 0;
			hexagonOffsets.forEach((offset1) => {
				hexagonOffsets.forEach((offset2) => {
					if (offset1 !== offset2) {
						const geometry = new THREE.BufferGeometry().setFromPoints([
							new THREE.Vector3(offset1.x, offset1.y, 0),
							new THREE.Vector3(offset2.x, offset2.y, 0)
						]);
						const line = new THREE.Line(geometry, lineMaterial);
						line.userData = { drawProgress: 0, index: index++ };
						scene.add(line);
						lineSegments.push(line);
					}
				});
			});
		}
		function onWindowResize() {
			camera.aspect = container.clientWidth / container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.clientWidth, container.clientHeight);
		}

		function animate() {
			requestAnimationFrame(animate);

			lineSegments.forEach((line) => {
				if (line.material.opacity < 1) {
					line.material.opacity += 0.000002;
				}
			});

			renderer.render(scene, camera);
		}

		setupScene();
		hexagonOffsets.forEach((offset, index) => {
			setTimeout(() => {
				createHexagon(offset.x, offset.y);
				drawConnectingLines();
			}, index * staggerDelay);
		});

		animate();
		window.addEventListener('resize', onWindowResize, false);

		return () => {
			container.removeChild(renderer.domElement);
		};
	});
</script>

<main bind:this={container}>
	<div class="overlay">
		<!-- Logo -->
		<img src="/logo.jpg" alt="XO9 Logo" class="logo" />

		<!-- Company Blurb -->
		<p class="blurb">
			<span class="highlight">We bring your ideas to life</span> with cutting-edge solutions.
			<span class="available">Available for hire</span> for web and technology consulting.
		</p>

		<!-- Contact Email -->
		<a href="mailto:info@xo9.io" class="contact-info">info@xo9.io</a>
	</div>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		font-family: sans-serif;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		/* padding: 20px; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		max-width: 200px; /* Adjust as needed */
		margin-bottom: 20px;
		position: fixed;
		top: 0;
		left: 0;
	}

	.contact-info {
		margin: 10px 0;
		font-size: 2rem;
		color: #ffffff;
		position: fixed;
		bottom: 1rem;
		text-decoration: none;
	}

	.blurb {
		color: #ffffff;
		text-align: center;
		max-width: 400px; /* Adjust as needed */
		font-size: 18px;
		position: fixed;
		bottom: 4rem;
	}
	.highlight {
		font-weight: bold;
		color: #4caf50; /* Highlight color for the main phrase */
	}

	.available {
		font-style: italic;
		color: #00bcd4; /* Highlight color for availability */
	}
</style>
