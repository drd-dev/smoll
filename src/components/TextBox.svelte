<script>
	import { fade } from 'svelte/transition';

	const State = {
		IDLE: 'idle',
		WORKING: 'working',
		DONE: 'done',
		ERROR: 'error'
	};

	let state = State.IDLE;
	let originalURL = '';
	let shortURL = 'https://smoll.xyz/123oaisd';
  let errorMsg = '';
	let urlBind = '';
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

	//called when the button is clicked
	function buttonClick() {
		if (state == State.IDLE || state == State.ERROR) {
			validateLink();
			if (state != State.ERROR) {
				state = State.WORKING;
        errorMsg = '';
				shortenLink();
			}
		} else if (state == State.DONE) {
			reset();
		}
		console.log(state);
	}

	// resets the component, getting it ready to accept another link.
	function reset() {
		state = State.IDLE;
		urlBind = '';
	}

	function validateLink() {
		if (urlBind == '') {
			state = State.ERROR;
      errorMsg = "Please enter a proper URL"
		} else {
			state = State.IDLE;
		}
	}

	// shortens to user provided URL
	function shortenLink() {
		originalURL = urlBind;
		setTimeout(() => {
			state = State.DONE;
			urlBind = shortURL;
		}, 4000);
	}
</script>
<div class="text-box {activeClass}">
	<input
		type="text"
		bind:value={urlBind}
		placeholder="enter your link"
		disabled={state != State.IDLE && state != State.ERROR ? true : false}
	/>
	<button on:click={buttonClick}>
		{#if state == State.IDLE || state == State.ERROR}
			<svg xmlns="http://www.w3.org/2000/svg" class="ionicon submit-icon" viewBox="0 0 512 512"
				><path
					d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208 208-93.13 208-208zm-212.65 91.36a16 16 0 01-.09-22.63L303.58 272H170a16 16 0 010-32h133.58l-52.32-52.73A16 16 0 11274 164.73l79.39 80a16 16 0 010 22.54l-79.39 80a16 16 0 01-22.65.09z"
				/></svg
			>
		{:else if state == State.WORKING}
			<svg in:fade="{{ delay: 1000 }}" xmlns="http://www.w3.org/2000/svg" class="ionicon happy-icon" viewBox="0 0 512 512"
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
</div>
{#if errorMsg != ''}
	<h4 style="color: #ff6b6b;">
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
		padding-left: 30px;
		transition: all var(--transform-speed);
		margin: 0 auto;
		overflow: hidden;
		width: 100%;
	}

	input {
		background-color: transparent;
		color: #6a6a6a;
		padding-right: 30px;
		border: none;
		font-size: 25px;
		font-weight: bold;
		opacity: 1;
		transition: opacity 1s;
    width: 95%;
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

    background: rgb(111,246,142);
    background: linear-gradient(45deg, #6ff68e, #6bffd2);
	}

	svg {
		width: 38px;
		height: 38px;
		fill: white;
	}

	.working {
		animation: shrink 0.5s forwards ease-in-out;
		animation-delay: 1.0s;
	}

	.working > input {
		opacity: 0;
	}

  .happy-icon {
    animation: rotate 1s forwards linear;
    animation-iteration-count: infinite;
  }

  .reload-icon{
    animation: rotate 1s forwards linear;
    animation-delay: .25s;
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

  @media (hover:hover){
    .done > button:hover {
      animation: rotate 0.5s forwards linear;
      animation-iteration-count: 1;
    }

  }

	.done > input {
		text-align: center;
		padding: 0px;
	}

	.error {
		border: 4px solid #ff6b6b;
		animation: shake 0.1s forwards;
		animation-fill-mode: both;
		animation-iteration-count: 2;
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
      transform:  rotate(360deg);
    }
  }
</style>
