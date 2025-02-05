import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || "",
  }),
  actions: {
    async login(email, password) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/sessions/login",
          { email, password },
          { withCredentials: true }
        );
        this.user = res.data.user; // Actualizar datos del usuario
        this.token = res.data.token;
        localStorage.setItem("token", this.token);
        return true;
      } catch (error) {
        console.error("Error en el login:", error.response.data);
        return false;
      }
    },
    async register(userData) {
      try {
        await axios.post(
          "http://localhost:5000/api/sessions/register",
          userData
        );
        return true;
      } catch (error) {
        console.error("Error en el registro:", error.response.data);
        return false;
      }
    },
    async fetchCurrentUser() {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/sessions/current",
          { withCredentials: true }
        );
        this.user = res.data.user;
      } catch (error) {
        console.error("Error obteniendo usuario actual:", error.response.data);
        throw error;
      }
    },
    logout() {
      this.user = null;
      this.token = "";
      localStorage.removeItem("token");
    },
  },
});
