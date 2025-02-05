<template>
  <div class="container text-center mt-5">
    <div class="row">
      <div class="col-md-12">
        <h1 class="display-4">
          🎮 Bienvenido a <span class="text-primary">LeGame</span>
        </h1>
        <p class="lead">
          Tu tienda de videojuegos digitales favorita. Descubre, compra y
          disfruta de los mejores títulos.
        </p>
        <router-link to="/register" class="btn btn-primary btn-lg me-2"
          >Regístrate</router-link
        >
        <router-link to="/login" class="btn btn-outline-primary btn-lg"
          >Inicia Sesión</router-link
        >
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-4">
        <div class="card shadow">
          <img
            src="https://elcomercio.pe/resizer/v2/YY4IP4QJ6RFHBG65D6F3PGC4BU.jpg?auth=b76e88d94316e05ed70b60037daeda0901c29ddbabd637b4f54a48b0c9185f35&width=1200&height=900&quality=75&smart=true"
            class="card-img-top"
            alt="Juegos populares"
          />
          <div class="card-body">
            <h5 class="card-title">Juegos Populares</h5>
            <p class="card-text">
              Explora los títulos más populares del momento.
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow">
          <img
            src="https://nintenduo.com/wp-content/uploads/2024/07/Ofertas-Prime-Day-Switch-Final-1200x900.webp"
            class="card-img-top"
            alt="Nuevas ofertas"
          />
          <div class="card-body">
            <h5 class="card-title">Nuevas Ofertas</h5>
            <p class="card-text">
              Aprovecha descuentos y promociones especiales.
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkI9QHBfyjU0D4I4T7NyT_NS15kq3Mn5-61A&s"
            class="card-img-top"
            alt="Explora categorías"
          />
          <div class="card-body">
            <h5 class="card-title">Explora Categorías</h5>
            <p class="card-text">
              Descubre juegos por género, desarrolladores y más.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style>
h1 {
  font-weight: bold;
  margin-bottom: 1rem;
}

.card {
  border-radius: 1rem;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  border-radius: 1rem 1rem 0 0;
}
</style>
