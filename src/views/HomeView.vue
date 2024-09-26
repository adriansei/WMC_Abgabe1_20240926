<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-4">
    <div class=" rounded-lg shadow-lg p-8 max-w-xl w-full">
      <h1 class="text-3xl font-bold text-center text-indigo-700 mb-6">Quiz App</h1>

      <!-- Category Dropdown -->
      <div v-if="categories.length" class="mb-6 text-center">
        <label for="category" class="block text-gray-700 font-medium mb-2">Kategorie wählen:</label>
        <select
          v-model="selectedCategory"
          @change="loadQuestion"
          class="mt-2 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="" disabled>Wähle eine Kategorie</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Question and Answers -->
      <div v-if="question" class="text-center">
        <h2 class="text-xl font-semibold text-gray-800 mb-6" v-html="question.question"></h2>
        <ul class="space-y-4">
          <li v-for="(answer, index) in shuffledAnswers" :key="index" class="w-full">
            <button
              @click="checkAnswer(answer)"
              class="bg-green-500 hover:bg-green-600  font-semibold text-lg py-3 w-full rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              {{ answer }}
            </button>
          </li>
        </ul>
      </div>

      <!-- Result message -->
      <p v-if="result !== null" class="mt-6 text-xl font-medium text-center"
        :class="result === 'Richtig!' ? 'text-green-600' : 'text-red-600'">
        {{ result }}
      </p>

      <!-- New Question Button -->
      <div class="mt-8 text-center">
        <button
          @click="loadQuestion"
          class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700  font-bold text-lg py-3 w-full rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          Neue Frage
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: null,
      shuffledAnswers: [],
      result: null,
      categories: [],
      selectedCategory: '',
    };
  },
  methods: {
    async loadCategories() {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      this.categories = data.trivia_categories;
    },
    async loadQuestion() {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=1&difficulty=easy&category=${this.selectedCategory}`
      );
      const data = await response.json();
      const questionData = data.results[0];
      this.question = questionData;
      this.shuffledAnswers = this.shuffleAnswers([questionData.correct_answer, ...questionData.incorrect_answers]);
      this.result = null;
    },
    shuffleAnswers(answers) {
      return answers.sort(() => Math.random() - 0.5);
    },
    checkAnswer(selectedAnswer) {
      if (selectedAnswer === this.question.correct_answer) {
        this.result = 'Richtig!';
      } else {
        this.result = 'Falsch!';
      }
    },
  },
  async created() {
    await this.loadCategories();
    this.loadQuestion();
  },
};
</script>

<style>
ul {
  list-style-type: none; /* Removes bullet points */
  padding-left: 0; /* Removes left padding */
}

button {
  color: black; /* White text */
  padding: 15px 20px; /* Some padding */
  border: none; /* Remove borders */
  border-radius: 25px; /* Rounded corners (higher value for more roundness) */
  cursor: pointer; /* Pointer/hand icon on hover */
  text-align: center; /* Center the text inside */
  font-size: 18px; /* Larger text */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
  transition: transform 0.2s; /* Animation for hover effect */
  width: 100%; /* Makes the button take full width */
}

button:hover {
  background-color: #45a049; /* Darker green on hover */
  transform: scale(1.05); /* Slightly increase size on hover */
}
</style>
