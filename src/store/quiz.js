// import { db } from "@/main";
import { createStore } from "vuex";

export const storeTopic = createStore({
  state: {
    correctAnswers: 0,
    sections: [
      {
        title: "Period 1 (1200-1450)",
        cards: [
          {
            title: "Unit 1",
            description: "The Global Tapestry",
            image:
              "https://images.squarespace-cdn.com/content/v1/53b17013e4b0f83f2d8a8a4a/1561478186516-VR45QP0LDMZP4JR722J2/1+GLOBAL+TAPESTRY+BACKGROUND+FOR+WEBSITE+2019.JPG?format=1500w",
          },
          {
            title: "Unit 2",
            description: "Networks of Exchange",
            image:
              "https://th.bing.com/th/id/R.d2d03b0945bd2c11355af84f76219a71?rik=%2bfhOIKM9Pn4u8A&pid=ImgRaw&r=0",
          },
        ],
      },
      {
        title: "Period 2 (1450-1750)",
        cards: [
          {
            title: "Unit 3",
            description: "Land-Based Empires",
            image:
              "https://cdn.historycollection.co/wp-content/uploads/2017/10/Untitled-1-12.jpg",
          },
          {
            title: "Unit 4",
            description: "Transoceanic Interconnections",
            image:
              "https://th.bing.com/th/id/R.10e53076dcfbb5363be6d6166d7f4fab?rik=VLiMBqfdLgesLA&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2017%2f03%2f28%2f398957-nature-sea-old_ship-vehicle-sailing_ship.jpg&ehk=rf9920cGRN1mjgzuufJQ%2fiDOhroTeM2ZxspO%2feiyAb0%3d&risl=&pid=ImgRaw&r=0",
          },
        ],
      },
      {
        title: "Period 3 (1750-1900)",
        cards: [
          {
            title: "Unit 5",
            description: "Revolutions",
            image:
              "https://th.bing.com/th/id/R.84592e50830aa02298b3b11f4b699f1e?rik=1LtQcd%2flZreMIQ&riu=http%3a%2f%2fwww.defenddemocracy.press%2fwp-content%2fuploads%2f2016%2f07%2frevolution.jpg&ehk=Q%2bV2AzPl3qk19iD5O5r5tL%2bhQEjO%2fQACbvspsnp3dsM%3d&risl=&pid=ImgRaw&r=0",
          },
          {
            title: "Unit 6",
            description: "Consequences of Indutrialization",
            image:
              "https://smtcenter.net/wp-content/uploads/2020/12/industrial-revolution-factory-3.jpg",
          },
        ],
      },
      {
        title: "Period 4 (1900-Present)",
        cards: [
          {
            title: "Unit 7",
            description: "Global Conflict",
            image:
              "https://th.bing.com/th/id/R.a4ac97256f9431a951ee4f4efabd860b?rik=S6Okpj%2bOjrXDvA&riu=http%3a%2f%2fwww.awesomestories.com%2fimages%2fuser%2ff27f5d4c030a14d4029dfaf93050064e.jpg&ehk=89LrVYi10v56yshSx08z5pF4GMmwj%2f43BpITsIpCHvE%3d&risl=&pid=ImgRaw&r=0",
          },
          {
            title: "Unit 8",
            description: "Cold War & Decolonization",
            image:
              "https://th.bing.com/th/id/R.863c2d15edacc54ab4799786427cf2af?rik=uGXXijjJV1vvJw&pid=ImgRaw&r=0",
          },
          {
            title: "Unit 9",
            description: "Globalization",
            image:
              "https://th.bing.com/th/id/R.9b2a5aaf6a5b7ed4ec9e987a7c5a6ba9?rik=%2ftJsmd%2bYu4oBGw&pid=ImgRaw&r=0",
          },
        ],
      },
    ],
    questions: [
      {
        question:
          " “History is filled with the sound of silken slippers going downstairs and wooden shoes coming up.” - Quote attributed to Voltaire, French Enlightenment writer, historian, and philosopher, circa 1740.  A proponent of the idea presented in the excerpt—that history is full of cycles in which the elite are overthrown by an underclass that subsequently become the new elite—would most likely use which of the following as an example? ",
        answers: [
          { answerletter: "A", answer: "The sack of Constantinople in 1204" },
          { answerletter: "B", answer: "The rise of the Ghanaian Empire" },
          { answerletter: "C", answer: "The Chinese Red Turban Rebellion" },
          {
            answerletter: "D",
            answer: "The split of the Romans and Byzantines",
          },
        ],
        correctanswer: "C",
        description:
          "The Red Turban Rebellion, an uprising of Chinese peas- ants upset over Mongol domination and high taxation, best reflects Voltaire’s idea of a historical cycle where the elite are overthrown by an underclass that subsequently become the new elite. The Mongols had once been steppe nomads poor enough that they were forced to make clothes from the pelts of field mice. Later, even with the fragmentation of their empire, they ruled China under the banner of the Yuan Dynasty. Zhu Yuanzhang, a peasant turned Red Turban, would overthrow them and become the first Ming emperor. Therefore, (C) is correct. The sack of Constantinople weakened the Byzantine Empire, but the Crusaders only looted the city; they did not take power, so (A) is incorrect. The Ghanaian Empire arose organically from villages along a trade network; thus, (C) is incorrect. The Byzantine Empire was created as the Roman Empire shrank, and the Byzantines thought of themselves as Roman; this is an example of reorganization, not rebellion. Thus, (D) is incorrect.",
      },
      {
        img:
          "https://wpapp.kaptest.com/study/wp-content/uploads/West_African_Trade_Routes___APWHM.png",
        question:
          "Musa I (also known as Mansa Musa) made a notable pilgrimage to Mecca and worked to spread Islam throughout his reign. This is an example of which of the following?",
        answers: [
          {
            answerletter: "A",
            answer: "Forced conversion of conquered populations",
          },
          {
            answerletter: "B",
            answer: "The spread of Islam facilitating trade relationships",
          },
          {
            answerletter: "C",
            answer: "Religious conflict between native African religions",
          },
          {
            answerletter: "D",
            answer: "A sectarian split between Sunni and Shi’a in Africa",
          },
        ],
        correctanswer: "B",
        description:
          "B: Situated at the western end of the Trans-Saharan trade route, the Malian conversion to and spread of Islam contributed to trade and diplomatic relationships with neighboring states and exposure to the broader Islamic world (Dar al-Islam); (B) is correct. The Ottomans practiced forced conversion, but the Malians did not; (A) is incorrect. Islam spread in Africa from the Arabian peninsula and supplanted native African religions, especially in states in Northern Africa, but we cannot know if it caused conflict among the native religions. The wide acceptance of a foreign religion like Islam indicates an atmosphere of religious tolerance, though more evidence would be needed to prove that. (C) is incorrect. Both Shi’a and Sunni make a pilgrimage to Mecca (hajj), so we cannot make a judgment about sectarian splits in Africa from this example alone; (D) is incorrect.",
      },
      {
        img:
          "https://wpapp.kaptest.com/study/wp-content/uploads/World_Silver_Trade___APWHM.png",
        question:
          "Which of the following was the most direct consequence of the silver trade depicted on this map?",
        answers: [
          {
            answerletter: "A",
            answer:
              "The Spanish empire used its great wealth to modernize its feudal economy.",
          },
          {
            answerletter: "B",
            answer:
              "A global trade system developed, the first between all major centers of civilization.",
          },
          {
            answerletter: "C",
            answer:
              "A global trade system developed, the first between all major centers of civilization.",
          },
          {
            answerletter: "D",
            answer:
              "Gold declined in value, increasing the volume of the Atlantic slave trade.",
          },
        ],
        correctanswer: "B",
        description:
          "B: The silver trade was a primary component in the first truly global trade system, so called because of the growing unification of the Eastern and Western hemispheres’ economies after European expansion. (B) is correct. This is best illustrated by the small but significant trade route across the Pacific Ocean between Mexico, Peru, the Philippines, and China—the first to connect the New World with the eastern and western halves of the Old World. Spain did not modernize internally despite its huge reserves of precious metals from America. Rather, it continued subsidizing its elite landholding classes and paying cash for talented foreigners to conduct its trade, imperial administration, and imperial wars. Thus, (A) is incorrect. (C) mixes up its history: the Opium Wars were in the 1800s and sought to balance the silver trade between England and China, not end it. It is true that, as silver became available in large quantities, gold declined somewhat in relative value, as in (D); however, that had little to do with the expansion of the slave trade in this period, which was based on demand for plantation commodities paid for with manufactured goods.",
      },
      {
        question:
          "“The Tsar had sent out orders to the governments of the different provinces of the empire requiring each of them to send his quota of artificers and laborers to assist in building the city. This they could easily do, for in those days all the laboring classes of the people were little better than slaves, and were almost entirely at the disposal of the nobles, their masters. In the same manner, he sent out agents to all the chief cities in western Europe, with orders to advertise there for carpenters, masons, engineers, ship-builders, and persons of all other trades likely to be useful in the work of building the city. These men were to be promised good wages and kind treatment, and were to be at liberty at any time to return to their prospective homes.” –Jacob Abbot, Peter the Great, 1859. The attitude toward foreign workers described in the passage differs most strongly from that of which of the following states during the period 1450–1750?",
        answers: [
          {
            answerletter: "A",
            answer: "The Songhai Empire in West Africa",
          },
          {
            answerletter: "B",
            answer: " The Tokugawa shogunate in Japan",
          },
          {
            answerletter: "C",
            answer: "The Qing Dynasty in China",
          },
          {
            answerletter: "D",
            answer: "The Safavid Dynasty in Persia",
          },
        ],
        correctanswer: "B",
        description:
          "The passage describes Peter the Great offering to provide “good wages and kind treatment” to foreign workers, especially highly skilled workers, who assisted in the construction of St. Petersburg. Peter’s attitude toward foreign workers is generally positive and consistent with his eagerness to accept foreign influence, especially Euro- pean influence, in order to modernize Russia. This attitude differs strongly from that of the Tokugawa shogunate, which adopted an isolationist stance; it expelled most foreigners from Japan, closed Japan to most foreign trade, and forbade Japanese citizens from traveling abroad. Thus, (B) is correct. The remaining choices are incorrect because they do not indicate states with a negative view toward foreign workers or their influence. The Songhai Empire, (A), and the Safavid Dynasty, (D), relied heavily on foreign trade to support their economies, indicating a willingness to cooperate with foreigners. Similarly, the Qing Dynasty, (C), also engaged in foreign trade.",
      },
      {
        question:
          "“Steam-engines furnish the means not only of their support but of their multiplication. They create a vast demand for fuel; and, while they lend their powerful arms to drain the pits and to raise the coals, they call into employment multitudes of miners, engineers, shipbuilders, and sailors, and cause the construction of canals and railways. Thus therefore, in enabling these rich fields of industry to be cultivated to the utmost, they leave thousands of fine arable fields free for the production of food to man, which must have been otherwise allotted to the food of horses. Steam-engines moreover, by the cheapness and steadiness of their action, fabricate cheap goods, and procure in their exchange a liberal supply of the necessaries and comforts of life produced in foreign lands.” –Andrew Ure, London publication, Philosophy of Manufactures, 1835. The passage is best seen as evidence for which of the following?",
        answers: [
          {
            answerletter: "A",
            answer:
              "The implementation of the factory system led to increased demand for skilled laborers.",
          },
          {
            answerletter: "B",
            answer:
              " The limited supply of fossil fuels led to innovations in transportation.",
          },
          {
            answerletter: "C",
            answer:
              "The rise of industrial technology improved living conditions for all members of society.",
          },
          {
            answerletter: "D",
            answer:
              " The development of machines led to increased agricultural production and population growth.",
          },
        ],
        correctanswer: "D",
        description:
          "The passage claims that advances in transportation and mechanical production allowed for more intensive agricultural cultivation; (D) is correct. The workers listed in the passage (with the exception of engineers) are unskilled laborers like miners and construction workers; (A) is incorrect. The supply of fossil fuels was seemingly unlimited, and it was the steady demand for those fuels that spurred developments in transportation; (B) is incorrect. The argument of (C) is not directly addressed by the passage, but inequality between laborers and owners increased during the Industrial Revolution period. There were waves of emigration from Europe to the United States, suggesting that things were not perfect for the whole society. (C) is incorrect.",
      },
    ],
  },
  mutations: {
    // Mutation to update the correctAnswers field
    updateCorrectAnswers(state, newCorrectAnswers) {
      state.correctAnswers = newCorrectAnswers;
    },
  },
  actions: {
    // Action to call the mutation and update correctAnswers
    setCorrectAnswers({ commit }, newCorrectAnswers) {
      commit("updateCorrectAnswers", newCorrectAnswers);
    },
  },
});

export default storeTopic;
