<template>
  <div>
    <h1>Welcome to the Special Rewards Program!</h1>

    <!-- Section to Submit Special Code -->
    <div>
      <h3>Submit Special Code</h3>
      <input v-model="specialCode" placeholder="Enter your special code" />
      <button @click="submitCode">Submit Code</button>
      <p v-if="codeMessage">{{ codeMessage }}</p>
    </div>

    <!-- Referral Section -->
    <div>
      <h3>Refer Your Friends</h3>
      <button @click="shareReferralLink">Share Referral Link</button>
      <p>You have referred: {{ referralCount }} friends</p>
    </div>

    <!-- Task Corner Section -->
    <div>
      <h3>Task Corner - Complete to Earn Points</h3>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <p>{{ task.description }}</p>
          <button @click="completeTask(task.id)">Join</button>
        </li>
      </ul>
    </div>

    <!-- Points Display -->
    <div>
      <h3>Your Points: {{ points }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWebApp, useWebAppNavigation, useWebAppShare } from 'vue-tg'

const { sendData } = useWebApp()
const { openLink } = useWebAppNavigation()
const { shareToStory } = useWebAppShare()

const specialCode = ref('')
const points = ref(0)
const codeMessage = ref('')
const referralCount = ref(0)

// Sample tasks for users to join
const tasks = ref([
  { id: 1, description: 'Join our Telegram Group' },
  { id: 2, description: 'Follow us on Twitter' },
  { id: 3, description: 'Subscribe to our YouTube Channel' },
])

// Function to handle special code submission
const submitCode = async () => {
  try {
    const response = await fetch('/api/validate-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: specialCode.value }),
    })

    const data = await response.json()

    if (data.success) {
      points.value += data.points
      codeMessage.value = 'Code is correct! You have earned points.'
    } else {
      codeMessage.value = 'Invalid code. Please try again.'
    }
  } catch (error) {
    codeMessage.value = 'An error occurred. Please try again later.'
  }
}

// Function to handle referral link sharing
const shareReferralLink = () => {
  const referralLink = `https://your-app.herokuapp.com/?ref=${Math.random().toString(36).substr(2, 9)}`
  shareToStory(referralLink)
    .then(() => {
      referralCount.value += 1
      points.value += 5
    })
    .catch(() => {
      console.error('Sharing failed')
    })
}

// Function to handle task completion
const completeTask = (taskId) => {
  let task = tasks.value.find(task => task.id === taskId)
  if (task) {
    openLink('https://socialplatform.com/link')
    points.value += 2
  }
}
</script>

<style scoped>
div {
  margin-bottom: 20px;
}
input {
  margin-right: 10px;
}
</style>

