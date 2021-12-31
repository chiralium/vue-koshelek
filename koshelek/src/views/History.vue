<template>
  <div class="history">
    <h1>History page</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  mounted() {
    this.filter = this.$route.query.filter as string;
  },

  data() {
    return {
      filter: '',
    }
  },
})
</script>