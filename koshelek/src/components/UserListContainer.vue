<template>
  <div class="user-list">
    <div class="user-list__toolbar" v-if="hasSearchBar">
      <container>
        <template v-slot:content>
          <div class="user-list__search">
            <slot name="search-field"/>
            <slot name="search-results"/>
          </div>
        </template>
      </container>

      <container>
        <template v-slot:content>
          <div class="user-list__sorting">
            <slot name="search-sorting"></slot>
          </div>
        </template>
      </container>
    </div>
    <slot name="scroll-list"></slot>
  </div>
</template>
<script lang="ts">
import Container from "./Container.vue";
export default {
  props: {
    hasSearchBar: {
      type: Boolean,
      default: true,
    }
  },

  components: {
    Container
  }
}
</script>

<style lang="less">
@import "../style/global";
.user-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  &__toolbar {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 120px;
    gap: 12px;

    @media screen and (max-width: 1085px) {
      grid-template-columns: 1fr;
    }
  }

  &__sorting {
    display: flex;
    justify-content: center;
  }

  &__search {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    position: relative;
    max-height: ~"calc(75vh)";
  }
}
</style>