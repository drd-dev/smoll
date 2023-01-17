<script>
	import {generatedLinks} from "../store";
	import { fade } from 'svelte/transition';

	const State = {
		IDLE: 'idle',
		WORKING: 'working',
		ERROR: 'error'
	};

	let state = State.IDLE;
	let errorMsg = '';
	let urlBind = '';
	let checkedURL = '';
	let activeClass = 'idle';

	// controls the active class based off of the state
	$: {
		if (state == State.IDLE) {
			activeClass = State.IDLE;
		} else if (state == State.WORKING) {
			activeClass = State.WORKING;
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



	//called when the button is clicked, starting the shortening process.
	function submit() {
		if (state == State.IDLE || state == State.ERROR) {
			validateLink();
			if (state != State.ERROR) {
				state = State.WORKING;
				errorMsg = '';
				submitLink();
			}
		} else if (state == State.IDLE) {
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
			checkedURL = 'https://' + checkedURL;
		}

		//remove any spaces
		checkedURL = checkedURL.replaceAll(" ", "");

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
			urlBind = ''; //build the URL

			/** @type {[{}]}*/
			const links = $generatedLinks;
			links.unshift({
				destination: data.data[0].original_url,
				code: data.data[0].short_code
			})
			generatedLinks.set(links);
			state = State.IDLE;
		}, 1000);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<form class="text-box {activeClass}" method="POST" on:submit|preventDefault={submit}>
	<input
		type="text"
		name="url"
		bind:value={urlBind}
		placeholder="enter your link"
		disabled={state != State.IDLE && state != State.ERROR ? true : false}
	/>
	<button type="submit">
		{#if state == State.IDLE || state == State.ERROR}
			<svg xmlns="http://www.w3.org/2000/svg" class="ionicon submit-icon" viewBox="0 0 512 512"
				><path
					d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208 208-93.13 208-208zm-212.65 91.36a16 16 0 01-.09-22.63L303.58 272H170a16 16 0 010-32h133.58l-52.32-52.73A16 16 0 11274 164.73l79.39 80a16 16 0 010 22.54l-79.39 80a16 16 0 01-22.65.09z"
				/></svg
			>
		{:else if state == State.WORKING}
			<svg
				in:fade
				xmlns="http://www.w3.org/2000/svg"
				class="ionicon happy-icon"
				viewBox="0 0 512 512"
				><title>Happy</title><path
					d="M414.39 97.61A224 224 0 1097.61 414.39 224 224 0 10414.39 97.61zM184 208a24 24 0 11-24 24 23.94 23.94 0 0124-24zm167.67 106.17c-12 40.3-50.2 69.83-95.62 69.83s-83.62-29.53-95.72-69.83a8 8 0 017.83-10.17h175.69a8 8 0 017.82 10.17zM328 256a24 24 0 1124-24 23.94 23.94 0 01-24 24z"
				/></svg
			>
		{/if}
	</button>
</form>
{#if errorMsg != ''}
	<h4 style="color: #ff6b6b;" transition:fade>
		ERROR: <span style="color: #6A6A6A;">{errorMsg}</span>
	</h4>
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

	input {
		transition: width calc(var(--transform-speed) * 5) ease-in-out, opacity 0.5s,
			margin-left calc(var(--transform-speed) * 5);
		margin-left: 30px;
		background-color: transparent;
		color: #6a6a6a;
		border: none;
		font-size: 25px;
		font-weight: bold;
		opacity: 1;
		width: 100%;
		height: 100%;
		padding: 0px;
	}

	input:focus {
		outline: none;
	}

	button {
		transition: width calc(var(--transform-speed) * 5) ease-in-out, opacity 0.5s;
		min-width: 50px;
		min-height: 50px;
		width: 50px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
		padding: 0px;
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

	.working > input {
		opacity: 0;
		width: 0;
		margin-left: 0px;
	}

	.happy-icon {
		animation: rotate 1s forwards linear;
		animation-iteration-count: infinite;
	}

	.working > button {
		left: 0px;
		right: 0px;
		width: 100%;
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

		.input-container {
			margin-left: 15px;
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
