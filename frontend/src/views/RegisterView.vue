<template>
  <div class="container mt-5">
    <div class="card shadow p-4">
      <h2 class="text-center">Registro</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input
            v-model="user.first_name"
            type="text"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Apellido</label>
          <input
            v-model="user.last_name"
            type="text"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            v-model="user.email"
            type="email"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Edad</label>
          <input
            v-model="user.age"
            type="number"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Rol</label>
          <div>
            <input type="radio" id="user" value="user" v-model="user.role" />
            <label for="user">Usuario</label>
          </div>
          <div>
            <input type="radio" id="admin" value="admin" v-model="user.role" />
            <label for="admin">Administrador</label>
          </div>
        </div>
        <button type="submit" class="btn btn-success w-100">Registrarse</button>
        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user = reactive({
      first_name: "",
      last_name: "",
      email: "",
      age: "",
      password: "",
      role: "user", // Rol por defecto
    });

    const errorMessage = ref("");
    const authStore = useAuthStore();
    const router = useRouter();

    const register = async () => {
      const success = await authStore.register(user);
      if (success) {
        router.push("/login");
      } else {
        errorMessage.value =
          "El usuario ya existe o hubo un error en el registro.";
      }
    };

    return { user, register, errorMessage };
  },
};
</script>
