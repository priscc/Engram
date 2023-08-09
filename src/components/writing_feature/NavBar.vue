<template>
  <div class="navbar_styling fontist">
      <b-navbar toggleable="xl" type="light" class="navbar_style">
        <b-navbar-brand @click="home" class="logo">
          <img class="logo_img mb-1" src="@/assets/EngramLogo.png" />
          <span class="logo_btn ms-3">Engram</span>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" type="light"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="navbar_tab_section">
            <b-nav-item @click="router.push({name: 'Home'})"> <span class="nav-dropdown">
                AP World History Unit
            </span></b-nav-item>
            <b-nav-item href="#"><span class="nav-dropdown">
                Quiz Questions
            </span></b-nav-item>
            <b-nav-item-dropdown right class="nav-dropdown me-3" no-caret>
                <template #button-content>
                    <span class="dd-link">Essay Writing <img :src="require('../../assets/writing_feature/chevron-down.svg')" alt="Icon"></span>
                </template>
                <b-dropdown-item @click="router.push({name: '001'})" class="drop-item">How It Works</b-dropdown-item>
                <b-dropdown-item @click="router.push({name: '001'})" class="drop-item">Learning Module</b-dropdown-item>
                <b-dropdown-item @click="router.push({name: '001'})" class="drop-item">Practice Module</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-row class="mb-3 mb-xl-0 mt-2 mt-xl-0">
                <b-nav-form class="me-sm-0 me-md-3 me-lg-4">
                    <b-input-group class="search-bar border">
                        <b-form-input placeholder="What do you need to study?" class="border-0 search-input shadow-none"></b-form-input>
                        <b-button type="submit" class="search-button border-0" :pressed="false">
                            <b-icon-search></b-icon-search>
                        </b-button>
                    </b-input-group>
                </b-nav-form>
            </b-row>
            <b-nav-form class="">
                <b-button id="purples" class="border-0 navbar-purple">Login</b-button>
                <b-button id="purples" class="border-0 navbar-purple ms-3">Sign up</b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    components: {
    },
    setup() {
        const router = useRouter()
        return { router }
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

.nav-dropdown:hover,.nav-dropdown:focus,.nav-dropdown:active {
    box-shadow: none!important;
    outline: none !important;
    text-decoration: none !important;
    border : none !important;
    opacity: 1;
}
.nav-dropdown {
    color: var(--text-gray-900, #18191F);
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Manrope;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 125% */
    outline: 0;
    box-shadow: none!important;
    outline: none !important;
    text-decoration: none !important;
    border : none !important;
    opacity: 1;
    border-radius: 0px;
    margin-top: 2px;
}

.nav-dropdown :deep(.dropdown-menu) { 
    background: #EEE;
    border : none !important;
    border-radius: 0 !important;
    padding: 0;
    margin-top:13px
}
.nav-dropdown :deep(.dropdown-menu .dropdown-item) { 
    border : none !important;
    border-radius: 0 !important;
    height: 65px;
    /* width: 180px; */
    padding-top: 22px
}
.nav-dropdown :deep(.dropdown-menu .dropdown-item:hover) { 
    background: #8C30F5;
    color: white;
}
.nav-dropdown :deep(button) {
    border: 1px solid red;
}
.dd-link {
    /* background: yellow; */
    color: black;
    opacity: 1;
    /* border: 1px solid red; */
}
.navbar_tab_section{
    white-space: nowrap;
}
.shift-margins {
    margin: -8px;
    padding: 8px
}
</style>
