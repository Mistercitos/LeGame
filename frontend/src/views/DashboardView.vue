<template>
  <div class="container mt-5">
    <div class="card shadow p-4">
      <h2 class="text-center">Bienvenido, {{ user?.first_name }}!</h2>
      <div v-if="user" class="mt-4">
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">Información del Usuario</h5>
                <p>
                  <strong>Nombre:</strong> {{ user.first_name }}
                  {{ user.last_name }}
                </p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Edad:</strong> {{ user.age }}</p>
                <p><strong>Rol:</strong> {{ user.role }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body text-center">
                <h5 class="card-title">Acciones</h5>
                <button class="btn btn-danger w-100 mt-3" @click="logout">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Cargando datos del usuario...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const user = ref(null);

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/sessions/current",
          { withCredentials: true }
        );
        user.value = res.data.user;
      } catch (error) {
        console.error("Error obteniendo usuario:", error.response.data);
        router.push("/login");
      }
    };

    const logout = () => {
      authStore.logout();
      router.push("/login");
    };

    onMounted(fetchUser);

    return { user, logout };
  },
};
</script>

<style>
.card {
  border-radius: 1rem;
}

.card-title {
  font-weight: bold;
}

.container {
  max-width: 800px;
}
</style>
