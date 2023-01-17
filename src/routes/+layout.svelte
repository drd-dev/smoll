<script>
	import Logo from "$lib/drd.svg";
	/**
	 * @type {{ count: any; value: number; }}
	 */
	 export let data;
</script>

<svelte:head>
  <title>SMOLL</title>
	<link rel="stylesheet" href="/style.css">
</svelte:head>
<slot />

<div class="footer">
	<span><span>{data.count} </span>Links Shortened</span>
	<span>Made with ♥ by <a href="https://drd.software"><img src="{Logo}" alt=""></a> </span>
</div>

<style>
	@font-face {
		font-family: 'Poppins';
		src: url('/Poppins-Black.ttf');
	}

	:global(*){
		-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
	}

	:global(html) {
		background-color: var(--white);
	}

	:global(body) {
		font-family: 'Poppins';
		text-align: center;
		color: var(--grey);
	}
	.footer{
    position: absolute;
    bottom: 0px;
    left: 0px;
		right: 0px;
		height: 20px;
		margin-left: 10px;
		margin-right: 10px;
    font-size: 12px;
    letter-spacing: 1px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	span{
		display: flex;
		gap: 5px;
	}

	img {
		width: 35px;
	}

</style>
