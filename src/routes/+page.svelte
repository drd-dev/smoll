<script>
  import TextBox from "../components/TextBox.svelte"
  import {theme} from '../store';

  let light_bgColor = "#E4FCFA";
  let dark_bgColor = "#1d2222";

  function toggleTheme(){
    if($theme == 'light'){
      $theme = 'dark';
    }else {
      $theme = 'light'; 
    }
  }

</script>

<div class="background" style="background-color:{$theme == 'light' ? light_bgColor : dark_bgColor}"></div>
<div class="theme-toggle">
  {#if $theme != 'dark'}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <svg style="cursor: pointer;" on:click="{toggleTheme}" xmlns="http://www.w3.org/2000/svg" class="ionicon sun" viewBox="0 0 512 512"><title>Sunny</title><path d="M256 118a22 22 0 01-22-22V48a22 22 0 0144 0v48a22 22 0 01-22 22zM256 486a22 22 0 01-22-22v-48a22 22 0 0144 0v48a22 22 0 01-22 22zM369.14 164.86a22 22 0 01-15.56-37.55l33.94-33.94a22 22 0 0131.11 31.11l-33.94 33.94a21.93 21.93 0 01-15.55 6.44zM108.92 425.08a22 22 0 01-15.55-37.56l33.94-33.94a22 22 0 1131.11 31.11l-33.94 33.94a21.94 21.94 0 01-15.56 6.45zM464 278h-48a22 22 0 010-44h48a22 22 0 010 44zM96 278H48a22 22 0 010-44h48a22 22 0 010 44zM403.08 425.08a21.94 21.94 0 01-15.56-6.45l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.55 37.56zM142.86 164.86a21.89 21.89 0 01-15.55-6.44l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.56 37.55zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z"/></svg>
  {:else}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <svg style="cursor: pointer;" on:click="{toggleTheme}" xmlns="http://www.w3.org/2000/svg" class="ionicon moon" viewBox="0 0 512 512"><title>Moon</title><path d="M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z"/></svg>
  {/if}
</div>
<div class="smoll" >
  <div class="title">
    <h1>SMOLL</h1>
    <h3>Shorten your links, nothing more.</h3>
  </div>
  <div class="input-container">
    <TextBox></TextBox>
  </div>
</div>


<style>

  .background {
    transition: background-color 0.5s;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: -1;
  }

  .theme-toggle {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
  }

  .moon{
    fill:#6bffd2;
  }
  
  .sun {
    fill: #1d2222;
  }

  .smoll {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #6bffd2;

  }
  
  h1{
    font-size: 12rem;
    font-weight: bold;
    margin-bottom: 0px;
    vertical-align: bottom;
    line-height: 180px;

    background: linear-gradient(45deg, #6ff68e, #6bffd2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  h3 {
    margin-top: 0px;
  }

  .input-container{
    margin-top: 80px;
    width: 70vw;
  }
</style>
