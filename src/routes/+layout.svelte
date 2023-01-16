<script>
  import { theme } from "../store";
</script>

<slot></slot>

<style>
  @font-face{
    font-family: "Poppins";
    src: url("/Poppins-Black.ttf")
  }

  :global(html){
    background-color: #E4FCFA;
  }

  :global(body){
    font-family: "Poppins"; 
    text-align: center;
    color: #6A6A6A;
  }
</style>