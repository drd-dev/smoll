<script>
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	const State = {
		IDLE: 'idle',
		WORKING: 'working',
		DONE: 'done',
		ERROR: 'error'
	};

	let state = State.IDLE;
	let errorMsg = '';
	let urlBind = '';
	let checkedURL = '';
	let copied = false;
	let activeClass = 'idle';

	// controls the active class based off of the state
	$: {
		if (state == State.IDLE) {
			activeClass = State.IDLE;
		} else if (state == State.WORKING) {
			activeClass = State.WORKING;
		} else if (state == State.DONE) {
			activeClass = State.DONE;
		} else if (state == State.ERROR) {
			//set the active class to error, then reset it back to idle after 500ms
			activeClass = State.ERROR;
			setTimeout(() => {
				if (state == State.ERROR) {
					state = State.IDLE;
					activeClass = State.IDLE;
				}
			}, 1000);
		}
	}

	$: {
		if (copied == true) {
			setTimeout(() => {
				copied = false;
			}, 1000);
		}
	}

	/**
	 * Copies the short url to the clipboard
	 */
	function copyURL() {
		if (state == State.DONE) {
			copied = true;
			navigator.clipboard.writeText(urlBind).then(() => {});
		}
	}

	//called when the button is clicked, starting the shortening process.
	function submit() {
		if (state == State.IDLE || state == State.ERROR) {
			validateLink();
			if (state != State.ERROR) {
				state = State.WORKING;
				errorMsg = '';
				submitLink();
			}
		} else if (state == State.DONE) {
			reset();
		}
	}

	// resets the component, getting it ready to accept another link.
	function reset() {
		state = State.IDLE;
		urlBind = '';
	}

	/**
	 * Validates the user supplied URL
	 */
	function validateLink() {
		checkedURL = urlBind;
		//check for .
		if (!urlBind.includes('.')) {
			errorMsg = 'Invalid link';
			state = State.ERROR;
			return;
		}
		//add http if not included
		if (!(checkedURL.includes('https://') || checkedURL.includes('http://'))) {
			checkedURL = 'http://' + checkedURL;
		}

		try {
			new URL(checkedURL);
		} catch (_) {
			errorMsg = 'Invalid link, make sure to include http:// or https://';
			state = State.ERROR;
			return;
		}
		state = State.IDLE;
	}

	// submits the URL to the server
	async function submitLink() {
		const response = await fetch('/', {
			method: 'POST',
			body: JSON.stringify(checkedURL),
			headers: {
				'content-type': 'application/json'
			}
		});
		const data = await response.json();

		//wait a moment for the animation to play out, looks more important than speed? no. But I like the animation.
		setTimeout(() => {
			urlBind = `https://smoll.xyz/${data.data[0].short_code}`; //build the URL
			state = State.DONE;
		}, 1600);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<form class="text-box {activeClass}" method="POST" on:submit|preventDefault={submit}>
	<div on:click={copyURL} class="input-container">
		<input
			type="text"
			name="url"
			bind:value={urlBind}
			placeholder="enter your link"
			disabled={state != State.IDLE && state != State.ERROR ? true : false}
		/>
	</div>
	<button type="submit">
		{#if state == State.IDLE || state == State.ERROR}
			<svg xmlns="http://www.w3.org/2000/svg" class="ionicon submit-icon" viewBox="0 0 512 512"
				><path
					d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208 208-93.13 208-208zm-212.65 91.36a16 16 0 01-.09-22.63L303.58 272H170a16 16 0 010-32h133.58l-52.32-52.73A16 16 0 11274 164.73l79.39 80a16 16 0 010 22.54l-79.39 80a16 16 0 01-22.65.09z"
				/></svg
			>
		{:else if state == State.WORKING}
			<svg
				in:fade={{ delay: 1000 }}
				xmlns="http://www.w3.org/2000/svg"
				class="ionicon happy-icon"
				viewBox="0 0 512 512"
				><title>Happy</title><path
					d="M414.39 97.61A224 224 0 1097.61 414.39 224 224 0 10414.39 97.61zM184 208a24 24 0 11-24 24 23.94 23.94 0 0124-24zm167.67 106.17c-12 40.3-50.2 69.83-95.62 69.83s-83.62-29.53-95.72-69.83a8 8 0 017.83-10.17h175.69a8 8 0 017.82 10.17zM328 256a24 24 0 1124-24 23.94 23.94 0 01-24 24z"
				/></svg
			>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" class="ionicon reload-icon" viewBox="0 0 512 512"
				><title>Reload</title><path
					d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm120 182.15a8.62 8.62 0 01-8.62 8.62h-59.54a8.61 8.61 0 01-6.09-14.71l22.17-22.17-5.6-6.51a87.38 87.38 0 10-62.94 148 87.55 87.55 0 0082.42-58.25A16 16 0 11368 295.8a119.4 119.4 0 11-112.62-159.18 118.34 118.34 0 0186.36 36.95l.56.62 4.31 5 14.68-14.68a8.44 8.44 0 016-2.54 8.61 8.61 0 018.68 8.63z"
				/></svg
			>
		{/if}
	</button>
</form>

{#if errorMsg != ''}
	<h4 style="color: #ff6b6b;" transition:fade>
		ERROR: <span style="color: #6A6A6A;">{errorMsg}</span>
	</h4>
{:else if copied}
	<div class="copied-message" style="margin-top: 20px;" transition:fade>
		<span>Link copied</span>
	</div>
{/if}

<style>
	:root {
		--height: 50px;
		--transform-speed: 0.2s;
	}

	.text-box {
		position: relative;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
			rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
		border: 4px solid white;
		border-radius: 100px;
		background-color: #ffffff;
		height: var(--height);
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: all var(--transform-speed);
		overflow: hidden;
		width: 100%;
		margin: 0px auto;
		min-width: 50px;
	}

	.input-container {
		width: 100%;
		height: 100%;
		margin-left: 30px;
	}

	input {
		background-color: transparent;
		color: #6a6a6a;
		border: none;
		font-size: 25px;
		font-weight: bold;
		opacity: 1;
		transition: opacity 1s;
		width: 100%;
		height: 100%;
	}

	input:focus {
		outline: none;
	}

	button {
		transition: left calc(var(--transform-speed) * 5) ease-in-out, opacity 0.5s;
		width: var(--height);
		height: var(--height);
		cursor: pointer;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
		position: absolute;
		right: 0px;
		left: calc(100% - var(--height));
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100px;

		background: rgb(111, 246, 142);
		background: linear-gradient(45deg, #6ff68e, #6bffd2);
	}

	svg {
		width: 38px;
		height: 38px;
		fill: white;
	}

	.working {
		animation: shrink 0.25s forwards ease-in-out;
		animation-delay: 1s;
	}

	.working > .input-container > input {
		opacity: 0;
	}

	.happy-icon {
		animation: rotate 1s forwards linear;
		animation-iteration-count: infinite;
	}

	.reload-icon {
		animation: rotate 1s forwards linear;
		animation-delay: 0.25s;
		animation-iteration-count: 1;
	}

	.working > button {
		left: 0px;
		right: 0px;
		width: 100%;
	}

	.done {
		animation: grow 0.5s forwards ease-in-out;
	}

	.done > button {
		left: calc(100% - var(--height));
		right: 0px;
		width: var(--height);
	}

	@media (hover: hover) {
		.done > button:hover {
			animation: rotate 0.5s forwards linear;
			animation-iteration-count: 1;
		}
	}

	.done > .input-container > input {
		text-align: center;
		padding: 0px;
		cursor: pointer;
		width: 100%;
	}

	@media (hover: hover) {
		.done > .input-container > input:hover {
			color: #6bffd2;
		}
	}

	.error {
		border: 4px solid #ff6b6b;
		animation: shake 0.1s forwards;
		animation-fill-mode: both;
		animation-iteration-count: 2;
	}

	@media only screen and (max-width: 800px) {
		input {
			font-size: 15px;
		}

		.input-container{
			margin-left: 15px;
		}

		.done > .input-container > input {
		text-align: left;
		}
	}

	@keyframes shrink {
		from {
			width: 100%;
		}
		to {
			width: calc(var(--height) - 30px);
		}
	}

	@keyframes grow {
		from {
			width: calc(var(--height) - 30px);
		}
		to {
			width: 100%;
		}
	}
	@keyframes shake {
		0% {
			transform: translateX(0px);
		}
		25% {
			transform: translateX(-5px);
		}
		50% {
			transform: translateX(0px);
		}
		75% {
			transform: translateX(5px);
		}
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
