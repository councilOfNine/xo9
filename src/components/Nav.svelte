<script>
	import { onMount, onDestroy, afterUpdate } from 'svelte';
	let showNav = true;
	let openDrawer = false; // TODO later after placeholder bug is fixed
</script>

<button on:click={() => ((openDrawer = true), (showNav = false))}>☰</button>

{#if showNav}
	<nav>
		<a href="/">Home</a>
		<a href="/booths">Booths</a>
		<a href="/tech">Tech</a>
		<a href="/about">About</a>
		<a href="/contact">Contact</a>
	</nav>
{/if}
{#if openDrawer}
	<drawer>
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/booths">Booths</a>
			</li>
			<li>
				<a href="/tech">Tech</a>
			</li>
			<li>
				<a href="/about">About</a>
			</li>
			<li>
				<a href="/contact">Contact</a>
			</li>
		</ul>
	</drawer>
{/if}

<style>
	nav {
		height: 4.2rem; /* TODO: dynamically update */
		padding: 1.5rem;
		font-size: 3rem;
		font-family: sans-serif;
		display: flex;
		gap: 1.25rem;
		font-weight: 200;
	}

	nav a {
		color: #ccc;
		text-decoration: none;
		transition: color 0.2s ease-in-out;
	}

	nav a:hover {
		color: #007bff; /* Example hover color */
	}

	button {
		display: none; /* Hide button by default */
		/* ... styles for your hamburger button... */
	}
	drawer {
		position: absolute;
		z-index: 888;
		background: darkslategrey;
		height: 100vh;
		width: 100vw;
	}

	@media (max-width: 768px) {
		/* iPad breakpoint */
		button {
			display: block;
			position: absolute;
			top: 0;
			right: 0;
			padding: 1rem;
			font-size: 2rem;
			background-color: dimgrey;
			color: whitesmoke;
		}

		nav a {
			display: none;
		}
	}
</style>
