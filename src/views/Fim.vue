<template>
  <v-container fluid>

    <!-- Nosso primeiro componente -->
    <Finalizar />

  </v-container>
</template>

<script>
// Importação do componente
import Finalizar from "../components/Finalizar.vue";


export default {
  // Registro do componente
  components: {
    Finalizar
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
