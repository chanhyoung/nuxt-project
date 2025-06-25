<template>
  <div>
    <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 400px;"
      :column-defs="columnDefs"
      :row-data="rowData"
      :pagination="true"
    />
  </div>
</template>

<script setup>
import { ModuleRegistry, AllCommunityModule, provideGlobalGridOptions } from 'ag-grid-community';
ModuleRegistry.registerModules([ AllCommunityModule ]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy" });

const columnDefs = ref([
  { headerName: '이름', field: 'name' },
  { headerName: '나이', field: 'age' },
  { headerName: '이메일', field: 'email' }
])

const rowData = ref([
  { name: '김철수', age: 25, email: 'kim@example.com' },
  { name: '이영희', age: 30, email: 'lee@example.com' }
])
</script>