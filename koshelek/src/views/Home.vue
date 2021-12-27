<template>
  <div class="home">
    <dataset/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Dataset from '@/components/Dataset';

export default Vue.extend({
  name: 'Home',
  components: {
    Dataset,
  }
});
</script>
