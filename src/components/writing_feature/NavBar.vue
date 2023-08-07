<template>
  <div class="navbar_styling">
      <b-navbar toggleable="md" type="light" class="navbar_style">
        <b-navbar-brand @click="home" class="logo">
          <img class="logo_img mb-1" src="@/assets/EngramLogo.png" />
          <span class="logo_btn ms-3">Engram</span>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" type="light"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="navbar_tab_section">
            <b-row>
                <b-nav-form class="text-center me-sm-0 me-md-3 me-lg-5">
                    <b-input-group class="search-bar border mx-auto">
                        <b-form-input placeholder="What do you need to study?" class="border-0 search-input shadow-none"></b-form-input>
                        <b-button type="submit" class="search-button border-0" :pressed="false">
                            <b-icon-search></b-icon-search>
                        </b-button>
                    </b-input-group>
                </b-nav-form>
            </b-row>
            <b-nav-form class="text-center">
                <b-button id="purples" class="border-0 navbar-purple">Login</b-button>
                <b-button id="purples" class="border-0 navbar-purple ms-3">Sign up</b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
export default {
    components: {
    },
    setup() {
    }
}
</script>

<style scoped lang="sass" src="@/assets/css/essayWriting.sass"></style>
<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap'); */
.navbar-purple {
  border-radius: 8px;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  }
  #purples  {
    background: var(--brand-purple, #8C30F5);
    padding: 10px 28px;
}

#purples:hover {
    background: #F1E4FF;
    color: var(--brand-purple, #8C30F5);
}

.search-bar {
    height: 40px;
    width:292px;
    border-radius: 8px;
    border: 1px solid #DFDFDF;
    background: #FFF;
}
.search-input {
    padding-right:0;
}
.search-button {
    background: white;
    color:black;
}
.search-button:hover,.search-button:focus,.search-button:active, 
.search-button:focus:not(:disabled):not(.disabled),
.search-button:focus, .search-button:active, .search-button:hover{
    box-shadow: none!important;
    outline: 0;
    background: white;
    color:black;
}
</style>
