<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div class="container">
        <router-link to="/" class="navbar-brand">🎮 LeGame</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <template v-if="isAuthenticated">
              <li class="nav-item" v-if="authStore.user">
                <span class="nav-link text-light">👋 Hola, {{ authStore.user.first_name }}</span>
              </li>
              <li class="nav-item">
                <button class="btn btn-outline-danger btn-sm" @click="logout">Cerrar Sesión</button>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link to="/login" class="btn btn-outline-light btn-sm mx-2">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/register" class="btn btn-outline-light btn-sm">Register</router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useAuthStore } from './store/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const isAuthenticated = computed(() => !!authStore.token);

    const logout = () => {
      authStore.logout();
      router.push('/login');
    };

    onMounted(async () => {
      if (!authStore.user && authStore.token) {
        try {
          await authStore.fetchCurrentUser();
        } catch {
          authStore.logout();
        }
      }
    });

    return { isAuthenticated, logout, authStore };
  }
};
</script>
