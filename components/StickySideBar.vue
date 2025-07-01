<template>
  <aside>
    <slot></slot>
  </aside>
</template>

<style scoped>
.sticky-side-bar {
  position: sticky;
  top: 66px;
  z-index: 2;
  overflow-y: scroll;
  height: fit-content !important;
}
</style>