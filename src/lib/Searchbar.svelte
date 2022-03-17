<script>
  import { push } from 'svelte-spa-router';
import { null_to_empty } from 'svelte/internal';
  import { searchMedias } from '../api';


  let query = '';

  function onSearch(e) {
    e.preventDefault();
    push(`/search?query=${query}`);
  }

  function onClick(e) {
    e.preventDefault();
    push(`/search?query=${query}`);
  }

  function onKeyUp(e){
    let autocomWrapper = document.querySelector("#autocom-box");
    if (`${query}` != ''){
        searchMedias(`${query}`)
        .then((result) => function(result){
                autocomWrapper.innerHTML = '';
                if (result.length != 0){
                    autocomWrapper.style.display = "block";
                    result.forEach(element => {
                        var newLi = document.createElement("li");
                        newLi.onclick = function(event) {
                            push(`/search?query=`+element.title);
                        }
                        newLi.id = "autocom-li";
                        var newContent = document.createTextNode(element.title);
                        newLi.appendChild(newContent);
                        autocomWrapper.appendChild(newLi);
                    });
                }else{
                    autocomWrapper.style.display = "none";
                }
            }(result))
        .catch(error => console.log(error))
    }else{
        autocomWrapper.style.display = "none";
    }
  }
</script>

<div class="searchContainer">
    <form on:submit={onSearch}>
        <input type="text" id="search-input" bind:value={query} on:keyup={onKeyUp} name="query" placeholder="Search...">
        <div id="autocom-box">
            <!-- here list are inserted from javascript -->
        </div>
    </form>
</div>


<style>
    .searchContainer {
        display: block;
        float: left;
        padding-left: 33%;
    }

    #search-input {
        background-image: url("https://img.icons8.com/ios-glyphs/30/000000/search--v1.png");
        background-repeat: no-repeat;
        text-decoration: none;
        padding-left: 30px;
        width: 500px;
        font-size: 17px;
        color: black;
        text-align: left;
    }

    #autocom-box{
        position: absolute;
        width: 500px;
        opacity: 1;
        max-height: 280px;
        overflow-y: auto;
        background: white;
    }

    :global(#autocom-li){
        color: black;
        font-size: 17px;
        padding-left: 30px;
        width: 100%;
    }

    :global(#autocom-li:hover){
        background: #efefef;   
    }
</style>