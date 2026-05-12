<template>
    <div>
        <h1>Login</h1>

        <form @submit.prevent="submit">
            <input v-model="form.email" type="email" placeholder="Email" />
            <input v-model="form.password" type="password" placeholder="Password" />

            <button type="submit">Login</button>
        </form>

        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const error = ref('')

const form = reactive({
    email: '',
    password: '',
})

async function submit() {
    try {
        error.value = ''

        await auth.login(form)

        router.push('/admin')
    } catch (e) {
        error.value = 'Invalid login details'
    }
}
</script>