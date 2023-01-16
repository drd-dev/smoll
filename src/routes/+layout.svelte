<script>
	import countapi from 'countapi-js';
	import { onMount } from 'svelte';

  let visits = 0;


	onMount(async () => {
		let data = await countapi.visits('global');
    visits = data.value;
	});
</script>

<svelte:head>
  <title>SMOLL</title>
</svelte:head>
<slot />
<div class="visits">
  {#if visits != 0}
    <span><span style="color:#6bffd2;">{visits} </span>site visits</span>
  {/if}
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
		background-color: #e4fcfa;
	}

	:global(body) {
		font-family: 'Poppins';
		text-align: center;
		color: #6a6a6a;
	}

  .visits {
    position: absolute;
    bottom: 5px;
    left: 5px;
    font-size: 12px;
    letter-spacing: 1px;
  }

</style>
