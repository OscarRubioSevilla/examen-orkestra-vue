<template>
  <div class="container">
    <Buscador @buscar="buscar" />
    <hr class="separador" />  



    <div class="results-search__message">
        <h4 v-if="countClients === 0 && clients.data">Sin resultados</h4>
        <h4 v-else-if="countClients > 0">Resultados de la busqueda</h4>
    </div>
    <div v-if="loading" class="loading flex justify-content-center absolute w-100">
      <img class="icon-spinner" src="../src/assets/img/spinner.gif">
    </div>
    <div v-if="clients.total > 10" ref="pagination" class="flex justify-content-end tui-pagination"></div>
    <Client v-for="(client, index) of clients.data" :key="index" :client="client" />
    <div v-if="clients.total > 10" ref="pagination2" class="flex justify-content-end tui-pagination"></div>
  </div>
</template>

<script>
import "tui-pagination/dist/tui-pagination.min.css";
import "./scss/main.scss";
import Buscador from "./components/Buscador.vue";
import Client from "./components/Client.vue";
import { mapActions, mapState } from "vuex";
import Pagination from "tui-pagination";

export default {
  name: "App",
  components: {
    Buscador,
    Client,
  },
  data() {
    return {
      pagination: null,
      pagination2: null,
    };
  },
  computed: {
    ...mapState(["clients", "args", "loading"]),

    countClients() {
      if (this.clients.data) return this.clients.data.length;
      return this.clients.length;
    },
  },
  methods: {
    buscar() {

      if (this.clients.total > 10) {
        this.pagination = new Pagination(this.$refs.pagination, {
          totalItems: this.clients.total,
          itemsPerPage: this.clients.per_page,
          visiblePages: 3,
          centerAlign: true,
        });
  
        this.pagination2 = new Pagination(this.$refs.pagination2, {
          totalItems: this.clients.total,
          itemsPerPage: this.clients.per_page,
          visiblePages: 3,
          centerAlign: true,
        });
  
        this.pagination.on("afterMove", this.syncPagination1);
        this.pagination2.on("afterMove", this.syncPagination2);
      }
    },
    syncPagination1({ page }) {
      if (this.pagination2.getCurrentPage() !== page) {
        this.pagination2.movePageTo(page);
        this.getClients({
          search: this.args.search,
          page,
        });
      }
    },
    syncPagination2({ page }) {
      if (this.pagination.getCurrentPage() !== page) {
        this.pagination.movePageTo(page);
        this.getClients({
          search: this.args.search,
          page,
        });
      }
    },
    ...mapActions(["getClients"]),
  },
};
</script>
