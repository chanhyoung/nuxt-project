<template>
  <div class="ag-grid-container">
    <h2 class="grid-title">사용자 목록</h2>
    
    <!-- 상단 컨트롤 버튼들 -->
    <div class="grid-controls">
      <button class="btn btn-primary" @click="addUser">
        사용자 추가
      </button>
      <button class="btn btn-danger" @click="deleteSelected">
        선택 삭제
      </button>
      <button class="btn btn-success" @click="exportData">
        CSV 내보내기
      </button>
      <button class="btn btn-secondary" @click="clearFilters">
        필터 초기화
      </button>
    </div>

    <!-- AG Grid -->
    <ag-grid-vue
      class="ag-theme-alpine"
      style="height: 500px; width: 100%;"
      :column-defs="columnDefs"
      :row-data="rowData"
      :default-col-def="defaultColDef"
      :grid-options="gridOptions"
      :pagination="true"
      :pagination-page-size="20"
      :row-selection="'multiple'"
      @grid-ready="onGridReady"
      @cell-value-changed="onCellValueChanged"
      @selection-changed="onSelectionChanged"
    />

    <!-- 선택된 행 정보 -->
    <div v-if="selectedRows.length > 0" class="selection-info">
      <h3>선택된 사용자: {{ selectedRows.length }}명</h3>
      <div class="selected-users">
        <span 
          v-for="user in selectedRows" 
          :key="user.id" 
          class="user-tag"
        >
          {{ user.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ModuleRegistry, AllCommunityModule, provideGlobalGridOptions } from 'ag-grid-community';
ModuleRegistry.registerModules([ AllCommunityModule ]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy" });

// 반응형 데이터
const gridApi = ref(null)
const columnApi = ref(null)
const selectedRows = ref([])

// 샘플 데이터
const rowData = ref([
  { id: 1, name: '김철수', age: 25, email: 'kim@example.com', department: '개발팀', salary: 3000, active: true },
  { id: 2, name: '이영희', age: 30, email: 'lee@example.com', department: '디자인팀', salary: 3500, active: true },
  { id: 3, name: '박민수', age: 28, email: 'park@example.com', department: '마케팅팀', salary: 3200, active: false },
  { id: 4, name: '정수진', age: 32, email: 'jung@example.com', department: '개발팀', salary: 4000, active: true },
  { id: 5, name: '최우영', age: 27, email: 'choi@example.com', department: '영업팀', salary: 2800, active: true },
  { id: 6, name: '한지민', age: 29, email: 'han@example.com', department: '디자인팀', salary: 3300, active: false },
  { id: 7, name: '장동건', age: 35, email: 'jang@example.com', department: '관리팀', salary: 4500, active: true },
  { id: 8, name: '송혜교', age: 33, email: 'song@example.com', department: '마케팅팀', salary: 3800, active: true },
])

// 컬럼 정의
const columnDefs = ref([
  { 
    headerName: 'ID', 
    field: 'id', 
    width: 80,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    pinned: 'left'
  },
  { 
    headerName: '이름', 
    field: 'name', 
    width: 120,
    editable: true,
    // filter: 'agTextColumnFilter'
  },
  { 
    headerName: '나이', 
    field: 'age', 
    width: 100,
    editable: true,
    // filter: 'agNumberColumnFilter',
    cellStyle: { textAlign: 'center' }
  },
  { 
    headerName: '이메일', 
    field: 'email', 
    width: 200,
    editable: true,
    // filter: 'agTextColumnFilter'
  },
  { 
    headerName: '부서', 
    field: 'department', 
    width: 120,
    editable: true,
    // filter: 'agSetColumnFilter',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['개발팀', '디자인팀', '마케팅팀', '영업팀', '관리팀']
    }
  },
  { 
    headerName: '급여', 
    field: 'salary', 
    width: 120,
    editable: true,
    // filter: 'agNumberColumnFilter',
    cellRenderer: (params) => {
      return params.value ? `$${params.value.toLocaleString()}` : ''
    },
    cellStyle: { textAlign: 'right' }
  },
  { 
    headerName: '활성', 
    field: 'active', 
    width: 100,
    cellRenderer: (params) => {
      return params.value ? 
        '<span style="color: green;">✓ 활성</span>' : 
        '<span style="color: red;">✗ 비활성</span>'
    },
    // filter: 'agSetColumnFilter',
    cellStyle: { textAlign: 'center' }
  },
  {
    headerName: '액션',
    width: 150,
    cellRenderer: (params) => {
      return `
        <button class="btn btn-sm btn-edit" onclick="editUser(${params.data.id})">편집</button>
        <button class="btn btn-sm btn-delete" onclick="deleteUser(${params.data.id})">삭제</button>
      `
    },
    cellStyle: { textAlign: 'center' },
    sortable: false,
    filter: false
  }
])

// 기본 컬럼 설정
const defaultColDef = ref({
  sortable: true,
  // filter: true,
  resizable: true,
  // menuTabs: ['filterMenuTab', 'generalMenuTab']
})

// 그리드 옵션
const gridOptions = reactive({
  animateRows: true,
  // enableRangeSelection: true,
  suppressRowClickSelection: true,
  rowMultiSelectWithClick: true,
  suppressMenuHide: false,
  getRowStyle: (params) => {
    if (!params.data.active) {
      return { background: '#ffebee' }
    }
    return null
  }
})

// 그리드 준비 이벤트
const onGridReady = (params) => {
  gridApi.value = params.api
  columnApi.value = params.columnApi
  
  // 컬럼 자동 크기 조정
  params.api.sizeColumnsToFit()
}

// 셀 값 변경 이벤트
const onCellValueChanged = (event) => {
  console.log('셀 값 변경:', event.data)
  // 실제 API 호출하여 데이터 업데이트
  updateUser(event.data)
}

// 선택 변경 이벤트
const onSelectionChanged = () => {
  selectedRows.value = gridApi.value.getSelectedRows()
}

// 사용자 추가
const addUser = () => {
  const newUser = {
    id: Math.max(...rowData.value.map(u => u.id)) + 1,
    name: '새 사용자',
    age: 25,
    email: 'new@example.com',
    department: '개발팀',
    salary: 3000,
    active: true
  }
  
  rowData.value = [...rowData.value, newUser]
  
  // 새로 추가된 행으로 스크롤
  setTimeout(() => {
    gridApi.value.ensureIndexVisible(rowData.value.length - 1)
  }, 100)
}

// 선택된 사용자 삭제
const deleteSelected = () => {
  if (selectedRows.value.length === 0) {
    alert('삭제할 사용자를 선택해주세요.')
    return
  }
  
  if (confirm(`선택된 ${selectedRows.value.length}명의 사용자를 삭제하시겠습니까?`)) {
    const selectedIds = selectedRows.value.map(user => user.id)
    rowData.value = rowData.value.filter(user => !selectedIds.includes(user.id))
    selectedRows.value = []
  }
}

// 개별 사용자 삭제 (전역 함수)
const deleteUser = (id) => {
  if (confirm('이 사용자를 삭제하시겠습니까?')) {
    rowData.value = rowData.value.filter(user => user.id !== id)
  }
}

// 사용자 편집 (전역 함수)
const editUser = (id) => {
  const user = rowData.value.find(u => u.id === id)
  if (user) {
    // 편집 모드로 전환하거나 모달 열기
    alert(`${user.name} 사용자 편집`)
  }
}

// 데이터 내보내기
const exportData = () => {
  gridApi.value.exportDataAsCsv({
    fileName: 'users.csv',
    processCellCallback: (params) => {
      // 급여 컬럼에서 $ 기호 제거
      if (params.column.getColId() === 'salary') {
        return params.value
      }
      return params.value
    }
  })
}

// 필터 초기화
const clearFilters = () => {
  gridApi.value.setFilterModel(null)
}

// 사용자 업데이트 (API 호출 시뮬레이션)
const updateUser = async (user) => {
  try {
    // 실제로는 API 호출
    console.log('사용자 업데이트:', user)
    // await $fetch('/api/users/' + user.id, { method: 'PUT', body: user })
  } catch (error) {
    console.error('사용자 업데이트 실패:', error)
  }
}

// 전역 함수 등록
onMounted(() => {
  window.editUser = editUser
  window.deleteUser = deleteUser
})
</script>

<style scoped>
.ag-grid-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.grid-title {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.grid-controls {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.selection-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #007bff;
}

.selection-info h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
}

.selected-users {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.user-tag {
  background-color: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

/* AG Grid 커스텀 스타일 */
:deep(.ag-theme-alpine) {
  --ag-header-background-color: #f8f9fa;
  --ag-header-foreground-color: #333;
  --ag-border-color: #dee2e6;
}

:deep(.btn-sm) {
  padding: 2px 6px;
  font-size: 11px;
  border-radius: 3px;
  margin: 0 2px;
}

:deep(.btn-edit) {
  background-color: #17a2b8;
  color: white;
  border: none;
}

:deep(.btn-edit:hover) {
  background-color: #138496;
}

:deep(.btn-delete) {
  background-color: #dc3545;
  color: white;
  border: none;
}

:deep(.btn-delete:hover) {
  background-color: #c82333;
}
</style>