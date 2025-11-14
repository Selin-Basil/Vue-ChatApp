<script setup lang="ts">
import { ref, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email as emailRule, minLength } from '@vuelidate/validators'
import { login } from '@/services/authentication/authenticationServices'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

// Define validation rules
const rules = computed(() => ({
  email: { required, email: emailRule },
  password: { required, minLength: minLength(6) },
}))

// Initialize Vuelidate
const v$ = useVuelidate(rules, { email, password })

const handleLogin = async () => {
  // 1️⃣ Trigger validation
  const isValid = await v$.value.$validate()
  if (!isValid) {
    console.warn('Validation failed')
    return
  }

  // 2️⃣ Proceed if valid
  try {
    const response = await login({ email: email.value, password: password.value })
    if (response) {
      console.log('Login successful:', response)
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <div class="login-view">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <!-- Email -->
      <div>
        <label for="email">Email:</label>
        <input
          type="email"
          v-model="email"
          id="email"
          :class="{ 'input-error': v$.email.$error }"
        />
        <div v-if="v$.email.$error" class="error-message">
          <span v-if="v$.email.required">Email is required.</span>
          <span v-else-if="v$.email.email">Enter a valid email address.</span>
        </div>
      </div>

      <!-- Password -->
      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          v-model="password"
          id="password"
          :class="{ 'input-error': v$.password.$error }"
        />
        <div v-if="v$.password.$error" class="error-message">
          <span v-if="!v$.password.required">Password is required.</span>
          <span v-else-if="!v$.password.minLength">
            Password must be at least 6 characters.
          </span>
        </div>
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
.input-error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.9em;
}
</style>
