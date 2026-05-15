<template>
    <BaseCard class="w-full max-w-sm">
        <h1 class="text-2xl font-bold mb-6">Login</h1>

        <form class="space-y-4" @submit.prevent="submit">
            <BaseInput v-model="form.email" type="email" placeholder="Email" />
            <BaseInput
                v-model="form.password"
                type="password"
                placeholder="Password"
            />

            <BaseButton type="submit">Login</BaseButton>
        </form>

        <p v-if="error" class="mt-4 text-[var(--color-danger)]">{{ error }}</p>
    </BaseCard>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'
import BaseButton from '../../../components/ui/BaseButton.vue'
import BaseCard from '../../../components/ui/BaseCard.vue'
import BaseInput from '../../../components/ui/BaseInput.vue'

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
