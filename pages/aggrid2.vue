<template>
  <div class="page-container">
    <Head>
      <Title>AG Grid 샘플 - Nuxt3</Title>
      <Meta name="description" content="Nuxt3에서 AG Grid를 사용하는 샘플 페이지" />
    </Head>
    
    <header class="page-header">
      <h1>AG Grid 샘플</h1>
      <p>Nuxt3에서 AG Grid를 활용한 데이터 테이블 예제</p>
    </header>
    
    <main>
      <!-- 기본 AG Grid 컴포넌트 -->
      <BasicAgGrid />
      
      <!-- 추가 예제들 -->
      <section class="additional-examples">
        <h2>추가 기능 예제</h2>
        
        <div class="example-grid">
          <!-- 간단한 읽기 전용 그리드 -->
          <div class="example-item">
            <h3>읽기 전용 그리드</h3>
            <ag-grid-vue
              class="ag-theme-alpine"
              style="height: 300px; width: 100%;"
              :column-defs="simpleColumnDefs"
              :row-data="simpleRowData"
              :pagination="true"
              :pagination-page-size="10"
            />
          </div>
          
          <!-- 통계 그리드 -->
          <div class="example-item">
            <h3>통계 그리드</h3>
            <ag-grid-vue
              class="ag-theme-alpine"
              style="height: 300px; width: 100%;"
              :column-defs="statsColumnDefs"
              :row-data="statsRowData"
              :default-col-def="{ sortable: true, filter: true }"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ModuleRegistry, AllCommunityModule, provideGlobalGridOptions } from 'ag-grid-community';
ModuleRegistry.registerModules([ AllCommunityModule ]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy" });

// 메타 정보 설정
definePageMeta({
  title: 'AG Grid 샘플'
})

// 간단한 그리드 데이터
const simpleColumnDefs = ref([
  { headerName: '제품명', field: 'product', width: 150 },
  { headerName: '카테고리', field: 'category', width: 120 },
  { headerName: '가격', field: 'price', width: 100, 
    cellRenderer: (params) => `₩${params.value.toLocaleString()}` },
  { headerName: '재고', field: 'stock', width: 80, cellStyle: { textAlign: 'center' } }
])

const simpleRowData = ref([
  { product: '노트북', category: '전자제품', price: 1200000, stock: 15 },
  { product: '마우스', category: '전자제품', price: 25000, stock: 50 },
  { product: '키보드', category: '전자제품', price: 85000, stock: 30 },
  { product: '모니터', category: '전자제품', price: 350000, stock: 8 },
  { product: '책상', category: '가구', price: 150000, stock: 5 },
  { product: '의자', category: '가구', price: 120000, stock: 12 },
  { product: '스피커', category: '전자제품', price: 180000, stock: 20 },
  { product: '헤드셋', category: '전자제품', price: 95000, stock: 25 }
])

// 통계 그리드 데이터
const statsColumnDefs = ref([
  { headerName: '월', field: 'month', width: 80 },
  { headerName: '매출', field: 'sales', width: 120,
    cellRenderer: (params) => `₩${params.value.toLocaleString()}`,
    cellStyle: { textAlign: 'right' } },
  { headerName: '방문자', field: 'visitors', width: 100,
    cellRenderer: (params) => params.value.toLocaleString(),
    cellStyle: { textAlign: 'right' } },
  { headerName: '전환율', field: 'conversion', width: 100,
    cellRenderer: (params) => `${params.value}%`,
    cellStyle: { textAlign: 'center' } },
  { headerName: '성장률', field: 'growth', width: 100,
    cellRenderer: (params) => {
      const value = params.value
      const color = value >= 0 ? 'green' : 'red'
      const sign = value >= 0 ? '+' : ''
      return `<span style="color: ${color}">${sign}${value}%</span>`
    },
    cellStyle: { textAlign: 'center' } }
])

const statsRowData = ref([
  { month: '1월', sales: 5200000, visitors: 1200, conversion: 2.5, growth: 15.2 },
  { month: '2월', sales: 4800000, visitors: 1100, conversion: 2.3, growth: -7.7 },
  { month: '3월', sales: 6100000, visitors: 1400, conversion: 2.8, growth: 27.1 },
  { month: '4월', sales: 5900000, visitors: 1350, conversion: 2.7, growth: -3.3 },
  { month: '5월', sales: 7200000, visitors: 1600, conversion: 3.2, growth: 22.0 },
  { month: '6월', sales: 6800000, visitors: 1520, conversion: 3.0, growth: -5.6 }
])
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 20px;
  text-align: center;
}

.page-header h1 {
  font-size: 3rem;
  margin: 0 0 10px 0;
  font-weight: 700;
}

.page-header p {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
}

main {
  padding: 40px 20px;
}

.additional-examples {
  margin-top: 60px;
}

.additional-examples h2 {
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 40px;
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.example-item {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.example-item:hover {
  transform: translateY(-2px);
}

.example-item h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.3rem;
}

/* 반응형 */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
  
  .page-header p {
    font-size: 1rem;
  }
  
  .example-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .example-item {
    padding: 15px;
  }
}

/* AG Grid 전역 스타일 */
:deep(.ag-theme-alpine) {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>