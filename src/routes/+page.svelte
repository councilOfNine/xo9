<script>
    import Nav from '../components/Nav.svelte'
</script>

<main>
    <Nav />
</main>

<style>
	main {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-image: url('/logo.jpg'); /* Key: Using the '/' prefix  */
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		color: #1f1e1e;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	nav {
		padding: 1rem;
		font-size: 3rem;
		font-family: sans-serif;
		/*background-color: rgba(255, 255, 255, 0.8); Semi-transparent */
		display: flex;
		gap: 1rem;
	}

	nav a {
		color: #ccc;
		text-decoration: none;
		transition: color 0.2s ease-in-out;
	}

	nav a:hover {
		color: #007bff; /* Example hover color */
	}
</style>
