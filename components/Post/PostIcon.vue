<template>
  <div v-bind="$attrs">
    <q-icon :name="name" color="grey" size="xs"></q-icon>
    <span v-if="label" class="text-grey q-ml-xs text-body2">{{ label }}</span>
    <q-tooltip v-if="tooltip" :offset="[0, 4]">{{ tooltip }}</q-tooltip>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: Number
  },
  tooltip: {
    type: String
  },
})
</script>