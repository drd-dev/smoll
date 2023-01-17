<script>
	import { fly, fade } from 'svelte/transition';

	export let destination = '';
	export let code = '';

	let prefix = 'https://smoll.xyz/';
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
	<span class="destination">{destination}</span>
	<div class="right">
		<a href={prefix + code} target="_blank" rel="noreferrer">{prefix + code}</a>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="button" on:click={copyURL}>
			<svg
				class="ionicon {!copied ? 'show' : 'hide'}"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				><title>Copy</title><path
					d="M408 480H184a72 72 0 01-72-72V184a72 72 0 0172-72h224a72 72 0 0172 72v224a72 72 0 01-72 72z"
				/><path
					d="M160 80h235.88A72.12 72.12 0 00328 32H104a72 72 0 00-72 72v224a72.12 72.12 0 0048 67.88V160a80 80 0 0180-80z"
				/></svg
			>
			<svg
				class="ionicon {copied ? 'show' : 'hide'}"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				><title>Checkbox</title><path
					d="M400 48H112a64.07 64.07 0 00-64 64v288a64.07 64.07 0 0064 64h288a64.07 64.07 0 0064-64V112a64.07 64.07 0 00-64-64zm-35.75 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"
				/></svg
			>
		</div>
	</div>
</div>
<hr />

<style>
	.generated-link {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}

	.right {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	.ionicon {
		transition: opacity 0.25s;
		position: absolute;
		left: 5px;
		right: 5px;
		top: 5px;
		bottom: 5px;
		opacity: 0;
	}

	.button {
		transition: fill 0.25s, background-color 0.25s;
		cursor: pointer;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
		height: 30px;
		width: 30px;

		border-radius: 10px;
		background-color: var(--green);
		padding: 5px;
		fill: var(--grey);
    
	}

	@media (hover: hover) {
		.button:hover {
			fill: var(--green);
      background-color: var(--black);
			background: linear-gradient(45deg, rgba(29,34,34,1) 0%, rgba(52,66,54,1) 100%);
		}
	}

	.hide {
		opacity: 0;
	}

	.show {
		opacity: 1;
	}

	hr {
		width: 100%;
		border: 1px solid var(--grey);
	}

	.right{
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.destination{
		overflow: hidden;
		max-width: 35ch;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	@media only screen and (max-width: 750px){
    .generated-link {
      font-size: 15px;
			flex-direction: column;
			align-items: flex-start;
    }
    .right{
			width: 100%;
      justify-content: space-between;
			margin-top: 10px;
    }
    .button{
      border-radius: 8px;
      width: 20px;
      height: 20px;
    }
  }
</style>
