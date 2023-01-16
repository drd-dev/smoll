<script>
	import ThemeToggle from "../components/ThemeToggle.svelte";
import { onMount } from "svelte";
  import TextBox from "../components/TextBox.svelte";
  import Parallax from "../parallax.js";
  import Logo from "$lib/logo.svg";

  onMount(() => {
    const parallaxElement = document.querySelector("#parallax-element");
    if(parallaxElement){
      const parallax = new Parallax(parallaxElement);
      parallax.speed = 5;
    }
  })
</script>

<ThemeToggle></ThemeToggle>
<div class="smoll" >
  <div class="title" >
    <img class="logo" src="{Logo}" alt="logo">
    <h3>Shorten your links, nothing more.</h3>
  </div>
  <div class="input-container">
    <TextBox></TextBox>
  </div>
</div>


<style>
  .smoll {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
  
  .logo{
    margin-top: rem;
    margin-bottom: 0px;
    width: 100%;
  }
  
  h3 {
    margin-top: 0px;
  }

  .input-container{
    margin-top: 80px;
    width: 70vw;
  }
</style>
