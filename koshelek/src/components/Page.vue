<template>
  <div class="page">
    <slot name="navbar"></slot>
    <slot name="content"></slot>
  </div>
</template>

<style lang="less">
.page {
  padding: 16px;
}
</style>