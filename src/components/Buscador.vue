<template>
    <form id="search_form" @submit.prevent="handleSubmit">
        <div class="search">
            <div class="search-input">
                <input v-model="args.search" @keyup="handleKeyup" class="search-input__text" placeholder="Ingresa nombre o celular" type="text">
                <button @click="handleEraseText" type="button" class="search-input__close" v-if="enabled">x</button>
            </div>
            <button type="submit" :disabled="!enabled" class="search-input__button" :class="{ 'active' : enabled }" id="search_btn">BUSCAR</button>
        </div>
    </form>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'Main',
  data() {
      return {
          args: {
            search: '',
            page: ''
          },
          enabled: false
      }
  },
  methods: {
      ...mapActions(['getClients']),
      ...mapMutations(['setArgs']),
      async handleSubmit() {
        this.setArgs(this.args);
        
        await this.getClients(this.args);
        this.$emit('buscar');
      },
      handleKeyup() {
          this.enabled = this.args.search.length > 2;
      },
      handleEraseText() {
          this.$emit('eraseText');
          this.args.search = '';
          this.enabled = false;
      }
      
  }
}
</script>