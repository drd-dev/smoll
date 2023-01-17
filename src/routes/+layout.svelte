<script>
	import ThemeToggle from "../components/ThemeToggle.svelte";
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

<div class="page">
	<div class="content">
		<span style="font-size: 10px; margin-top: 12px;">{data.count} Links Shortened</span>
		<ThemeToggle></ThemeToggle>
		<slot />
	</div>
	<div class="footer-container">
	<span class="footer">Made with ♥ by <a href="https://drd.software"><img src="{Logo}" alt=""></a> </span>
	</div>
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

	.page{
		position: relative;
		min-height: 97vh;
	}

	.content{
		padding-bottom: 5.5rem;
	}

	.footer-container{
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 5.5rem;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
	}
	.footer{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 10px;
    font-size: 12px;
		color: var(--grey);
	}

	span{
		display: flex;
		gap: 5px;
	}

	img {
		width: 35px;
		filter: invert(77%) sepia(67%) saturate(456%) hue-rotate(98deg) brightness(96%) contrast(84%);	
	}

</style>
