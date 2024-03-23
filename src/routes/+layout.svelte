<script>
	import Nav from '../components/Nav.svelte'
</script>

<main>
	<Nav />
	<slot />
</main>

<style>
	main {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: #000;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		color: #1f1e1e;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

</style>
