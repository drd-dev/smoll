<script>
	import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import {generatedLinks} from "../store";
	import GeneratedLink from './GeneratedLink.svelte';

  let ready = false;

  function clearLinks(){
    generatedLinks.set([]);
  }

  onMount(() => {
    setTimeout(() => {
      ready = true;
    }, 100);
  })
</script>

{#if $generatedLinks.length > 0 && ready}
<div class="header" transition:fade>
  <h1>Links</h1>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <h3 on:click="{clearLinks}">Clear</h3>
</div>
<div class="links">
	{#each $generatedLinks as link}
		<GeneratedLink destination={link.destination} code={link.code} />
	{/each}
</div>
{/if}

<style>
  .links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
.header{
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (hover:hover){
  h3:hover {
    cursor: pointer;
    color: var(--green);
  }
}
</style>