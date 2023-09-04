<template>

<div id="Quiz">

  <div class="site_header">
    <h1>Quiz Feature</h1>
    <h5>Test Your Knowledge on APWH Exam Content</h5>
  </div>

  <b-container fluid>
    <b-row v-for="(section, index) in sections" :key="index">
      <h2>{{ section.title }}</h2>
      <b-row>
        <b-col cols="3" v-for="(card, index) in section.cards" :key="index">
          <div class="card" @click="goto()">
            <a :href="card.link">
              <img :src="card.image" alt="Card Image" />
              <div class="overlay">
                <h2>{{ card.title }}</h2>
                <p>{{ card.description }}</p>
              </div>
            </a>
          </div>
        </b-col>
      </b-row> 
    </b-row>
  </b-container>
</div>




</template>

<script>
export default {
  name: "CardContainer",
  data() {
    return {
      sections: [
        {
          title: 'Period 1 (1200-1450)',
          cards: [
            {
              title: "Unit 1",
              description: "The Global Tapestry",
              image: "https://images.squarespace-cdn.com/content/v1/53b17013e4b0f83f2d8a8a4a/1561478186516-VR45QP0LDMZP4JR722J2/1+GLOBAL+TAPESTRY+BACKGROUND+FOR+WEBSITE+2019.JPG?format=1500w",
              
            },
            {
              title: "Unit 2",
              description: "Networks of Exchange",
              image: "https://th.bing.com/th/id/R.d2d03b0945bd2c11355af84f76219a71?rik=%2bfhOIKM9Pn4u8A&pid=ImgRaw&r=0",
      
            }
          ]
        },
        {
          title: 'Period 2 (1450-1750)',
          cards: [
            {
              title: "Unit 3",
              description: "Land-Based Empires",
              image: "https://cdn.historycollection.co/wp-content/uploads/2017/10/Untitled-1-12.jpg",
             
            },
            {
              title: "Unit 4",
              description: "Transoceanic Interconnections",
              image: "https://th.bing.com/th/id/R.10e53076dcfbb5363be6d6166d7f4fab?rik=VLiMBqfdLgesLA&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2017%2f03%2f28%2f398957-nature-sea-old_ship-vehicle-sailing_ship.jpg&ehk=rf9920cGRN1mjgzuufJQ%2fiDOhroTeM2ZxspO%2feiyAb0%3d&risl=&pid=ImgRaw&r=0",
              
            }
          ]
        },
        {
          title: 'Period 3 (1750-1900)',
          cards: [
          {
              title: "Unit 5",
              description: "Revolutions",
              image: "https://th.bing.com/th/id/R.84592e50830aa02298b3b11f4b699f1e?rik=1LtQcd%2flZreMIQ&riu=http%3a%2f%2fwww.defenddemocracy.press%2fwp-content%2fuploads%2f2016%2f07%2frevolution.jpg&ehk=Q%2bV2AzPl3qk19iD5O5r5tL%2bhQEjO%2fQACbvspsnp3dsM%3d&risl=&pid=ImgRaw&r=0",
             
            },
            {
              title: "Unit 6",
              description: "Consequences of Indutrialization",
              image: "https://smtcenter.net/wp-content/uploads/2020/12/industrial-revolution-factory-3.jpg",
              
            }

          ]
        },
        {
          title: 'Period 4 (1900-Present)',
          cards: [
          {
              title: "Unit 7",
              description: "Global Conflict",
              image: "https://th.bing.com/th/id/R.a4ac97256f9431a951ee4f4efabd860b?rik=S6Okpj%2bOjrXDvA&riu=http%3a%2f%2fwww.awesomestories.com%2fimages%2fuser%2ff27f5d4c030a14d4029dfaf93050064e.jpg&ehk=89LrVYi10v56yshSx08z5pF4GMmwj%2f43BpITsIpCHvE%3d&risl=&pid=ImgRaw&r=0",
              
              
            },
            {
              title: "Unit 8",
              description: "Cold War & Decolonization",
              image: "https://th.bing.com/th/id/R.863c2d15edacc54ab4799786427cf2af?rik=uGXXijjJV1vvJw&pid=ImgRaw&r=0",
            
            },
            {
              title: "Unit 9",
              description: "Globalization",
              image: "https://th.bing.com/th/id/R.9b2a5aaf6a5b7ed4ec9e987a7c5a6ba9?rik=%2ftJsmd%2bYu4oBGw&pid=ImgRaw&r=0",
           
            }
          ]
        }
      ]
    }
  },
  methods: {
    goto() {
      this.$router.push({name: "QuizFeature"});
    }
  }
}
</script>
 

<style scoped lang="scss">

.site_header{
  background-image: url('https://th.bing.com/th/id/R.be783c574e7c6a49e83b9eafd49e4b22?rik=hleDtASc6GRrqw&pid=ImgRaw&r=0');
  font-weight: 750;
  color: #fff;
  padding: 30px 25px;
  text-align: center;
}

.card-container {
  display: flex;
  display: grid;
  grid-template-columns: repeat(1, 3fr);
  grid-auto-rows: 3fr;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  max-width: 500px;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 50px;
}

.section-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  
}.row::after {
  content: "";
  clear: both;
  display: table;
}

.col-md-4 {
  flex-grow: 1;
  float: left;
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}

.card {
  position: relative;
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
}

.card:hover {
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.col:hover{
  background-color: black;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-content: center;
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 2px;
    line-height: normal;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-family: "Montserrat", sans-serif;
    color: #fff;
    text-shadow: none !important;
    text-transform: uppercase !important;
    font-weight: bold !important;

    &:after {
      content: "";
      display: block;
      width: 50px;
      height: 3px;
      background-color: #fff;
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  p {
    font-size: 16px;
    text-align: center;
    margin-top: 0.5rem !important;
    margin-bottom: 1rem !important;

    a {
      color: #fff !important;

      &:hover {
        color: #fff !important;
        text-decoration: underline !important;
      }
    }
  }
}
</style>