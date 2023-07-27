<template>
  <div class="progress-container">
    <div class="progress- m-auto">
        <span class="circle" :class="{'special-circle' : section === 'Thesis'}"></span>
        <span class="line"></span>
        <span class="thesis transition" :id="section === 'Thesis' ? 'special-words' : 'progress-label'">Thesis</span> 

        <span class="circle" :class="{'special-circle' : section === 'Contextualization'}"></span>
        <span class="line"></span>
        <span class="contextualization transition" :id="section === 'Contextualization' ? 'special-words' : 'progress-label'">Contextualization</span> 

        <span class="circle" :class="{'special-circle' : section === 'Evidence'}"></span>
        <span class="line"></span>
        <span class="evidence transition" :id="section === 'Evidence' ? 'special-words' : 'progress-label'">Evidence</span> 

        <span class="circle" :class="{'special-circle' : section === 'Conclusion'}"></span>
        <span class="conclusion transition" :id="section === 'Conclusion' ? 'special-words' : 'progress-label'">Conclusion</span> 
    </div>
  </div>
</template>

<script>
export default {
    props: ["section"]
}
</script>

<style>
.progress-container {
    background: white;
    height: 86px;
    width: fit-content;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding:20px 0;
    position: relative;

}

.circle {
    height: 15px;
    width: 15px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    transition: 0.2s ease-in-out;
}
.special-circle {
    height: 21px;
    width: 21px;
    background-color: #8C30F5;
    border-radius: 50%;
    display: inline-block;
    margin: -3px;
    position:relative;
}

#special-words {
    color: var(--primary, #8C30F5);
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 0px; /* 0% */
}
.line {
    min-width: 60px;
    height: 2px;
    background: var(--gray-4, #BDBDBD);
    display: inline-block;
    margin-bottom: 7px;
}
.progress- {
    padding:13px 15px 8px 10px;
    position: relative;
    width: fit-content;
}
#progress-label {
    color: var(--text-subtle, #969BAB);
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 0px; /* 0% */
}

.thesis {
    position: absolute;
    top: 0;
    left: 2px;
}

.contextualization {
    position: absolute;
    bottom: 0;
    left: 45px;
}
.evidence {
    position: absolute;
    top: 0;
    left: 145px;
}

.conclusion {
    position: absolute;
    bottom: 0;
    left: 215px;
}

.transition {
    transition: 0.2s ease-in-out;
}

@media screen and (max-width: 320px) {
    .line {
        min-width: 40px;
    }
    .thesis {
        left: -5px;
    }

    .contextualization {
        left: 20px;
    }
    .evidence {
        left: 95px;
    }

    .conclusion {
        /* position: absolute;
        bottom: 0; */
        left: 140px;
    }
    .progress- {
        padding:13px 15px 8px 5px;
        position: relative;
        width: fit-content;
    }
}
</style>