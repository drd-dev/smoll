<script>
  import TextBox from "../components/TextBox.svelte"

  let color = "#6BFFD2";
  let bgColor = "#E4FCFA";
  // color: #1d2222


</script>

<div class="background" style="background-color:{bgColor}"></div>
<div class="smoll" >
  <div class="title">
    <h1>SMOLL</h1>
    <h3>Shorten your link, nothing more.</h3>
  </div>
  <div class="input-container">
    <TextBox></TextBox>
  </div>
</div>


<style>

  .background {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: -1;
  }

  .smoll{
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
