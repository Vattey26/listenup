<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { validationRegister, type RegisterForm } from '../utils/validation'

const auth = useAuthStore()
const router = useRouter()

const form = reactive<RegisterForm>({ username: '', password: '', confirm: '' })
const touched = reactive({ username: false, password: false, confirm: false })
const submitted = ref(false)

const errors = computed(() => validationRegister(form))
const show = (field: keyof RegisterForm) => (touched[field] || submitted.value) && errors.value[field]

async function onSubmit() {
  submitted.value = true
  if (Object.keys(errors.value).length > 0) return
  if (await auth.register(form.username)) router.push('/')
}
</script>

<template>
  <div class="w page narrow">
    <h1>Create an account</h1>
    <p>No email or real name needed.</p>

    <form novalidate @submit.prevent="onSubmit">
      <div class="fld">
        <label for="username">Username</label>
        <input id="username" v-model="form.username" autocomplete="username"
          :aria-invalid="!!show('username')" :aria-describedby="show('username') ? 'username-error' : undefined"
          @blur="touched.username = true" />
        <p v-if="show('username')" id="username-error" class="err" role="alert">{{ errors.username }}</p>
      </div>

      <div class="fld">
        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" autocomplete="new-password"
          :aria-invalid="!!show('password')" :aria-describedby="show('password') ? 'password-error' : undefined"
          @blur="touched.password = true" />
        <p v-if="show('password')" id="password-error" class="err" role="alert">{{ errors.password }}</p>
      </div>

      <div class="fld">
        <label for="confirm">Confirm password</label>
        <input id="confirm" v-model="form.confirm" type="password" autocomplete="new-password"
          :aria-invalid="!!show('confirm')" :aria-describedby="show('confirm') ? 'confirm-error' : undefined"
          @blur="touched.confirm = true" />
        <p v-if="show('confirm')" id="confirm-error" class="err" role="alert">{{ errors.confirm }}</p>
      </div>

      <p v-if="auth.error" class="err" role="alert">{{ auth.error }}</p>
      <button type="submit" class="btn" :disabled="auth.loading">
        {{ auth.loading ? 'Creating account...' : 'Create account' }}
      </button>
    </form>
    <p>Already have an account? <RouterLink to="/login"><b>Log in</b></RouterLink></p>
  </div>
</template>
