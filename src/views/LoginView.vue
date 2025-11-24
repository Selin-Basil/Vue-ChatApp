<script setup lang="ts">
import { ref, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email as emailRule, minLength } from '@vuelidate/validators'
import { login } from '@/services/authentication/authenticationServices'
import { useRouter } from 'vue-router'
import { BForm, BFormFloatingLabel, BFormInput } from 'bootstrap-vue-next'

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
  //  Trigger validation
  const isValid = await v$.value.$validate()
  if (!isValid) {
    console.warn('Validation failed')
    return
  }

  // Proceed if valid
  try {
    const response = await login({ email: email.value, password: password.value })
    console.log('Login successful:', response)
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <div class="login-view">
      <BForm @submit.prevent="handleLogin">
        <BFormText class="login-text">Login </BFormText>
        <BFormFloatingLabel label="Email address" label-for="floatingEmail" class="my-4">
          <BFormInput id="floatingEmail" type="email" placeholder="Email address" v-model="email"/>
        </BFormFloatingLabel>
        <BFormValidFeedback v-if="v$.email.$error" class="error-message">
          <div v-if="!v$.email.required">Email is required.</div>
          <div v-else-if="!v$.email.email">Email must be valid.</div>
        </BFormValidFeedback>
        <BFormFloatingLabel label="Password" label-for="floatingPassword" class="my-4">
          <BFormInput id="floatingPassword" type="password" placeholder="Password" v-model="password" />
        </BFormFloatingLabel>
        <BButton type="submit" variant="primary" class="w-100 mt-4">Login</BButton>
      </BForm>
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
.login-view {
  max-width: 500px;
  margin: 0 auto;
  padding: 2em;
}
.login-text{
  font-size: 3em;
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
