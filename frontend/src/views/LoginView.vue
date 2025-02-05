<template>
  <div class="container mt-5">
    <div class="card shadow p-4">
      <h2 class="text-center">Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Ingresar</button>
        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const authStore = useAuthStore();
    const router = useRouter();

    const login = async () => {
      const success = await authStore.login(email.value, password.value);
      if (success) {
        router.push("/dashboard");
      } else {
        errorMessage.value =
          "Credenciales incorrectas o error al iniciar sesión.";
      }
    };

    return { email, password, login, errorMessage };
  },
};
</script>
