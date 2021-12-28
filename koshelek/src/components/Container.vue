<template>
  <div class="container">
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';

export default Vue.extend({
  name: 'Container',
})

</script>

<style lang="less">
.container {
  border: 2px solid tomato;
  border-radius: 12px;
  padding: 12px;
}
</style>