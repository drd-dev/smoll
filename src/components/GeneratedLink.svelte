<script>
  import { fly } from "svelte/transition";

  export let destination = "";
  export let code = "";

  let prefix = "https://smoll.xyz/"
  let copied = false;

	/**
	 * Copies the short url to the clipboard
	 */
   function copyURL() {
		copied = true;
		navigator.clipboard.writeText(prefix + code).then(() => {});
	}

  $: {
		if (copied == true) {
			setTimeout(() => {
				copied = false;
			}, 1000);
		}
	}

</script>


<div class="generated-link" transition:fly>
  <span>{destination}</span>
  <div class="right">
    <a href="{prefix + code}" target="_blank" rel="noreferrer">{prefix + code}</a>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <svg on:click="{copyURL}" xmlns="http://www.w3.org/2000/svg" class="btn-copy" viewBox="0 0 512 512"><title>Copy</title><path d="M408 480H184a72 72 0 01-72-72V184a72 72 0 0172-72h224a72 72 0 0172 72v224a72 72 0 01-72 72z"/><path d="M160 80h235.88A72.12 72.12 0 00328 32H104a72 72 0 00-72 72v224a72.12 72.12 0 0048 67.88V160a80 80 0 0180-80z"/></svg>
  </div>
</div>

<!-- <div class="copied-message" style="margin-top: 20px;" transition:fade>
  <span>Link copied</span>
</div> -->


<style>
  .generated-link {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .right{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .btn-copy {
    cursor: pointer;
    width: 25px;
    border-radius: 10px;
    background-color: var(--black);
    padding: 5px;
    fill: var(--green)
  }
</style>