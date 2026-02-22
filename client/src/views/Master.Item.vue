<template>
  <div class="card">
    <DataTable
      ref="dt"
      v-model:filters="ui.table.lazyParams.filters"
      :value="ui.table.data"
      :lazy="true"
      :paginator="true"
      :rows="20"
      stripedRows
      scrollable
      scrollHeight="800px"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[20, 50, 100]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      :totalRecords="ui.table.totalRecords"
      :loading="ui.table.loading"
      filterDisplay="menu"
      :globalFilterFields="['code', 'stock_point', 'status', 'created_at']"
      responsiveLayout="scroll"
      dataKey="autonum"
      v-model:expandedRows="ui.table.expandedRows"
      @page="onPage($event)"
      @sort="onSort($event)"
      @filter="onFilter($event)"
      @rowExpand="onRowExpand"
      @rowCollapse="onRowCollapse"
    >
      <template #empty> No items found. </template>
      <template #loading> Loading items. Please wait. </template>
      <Column expander style="width: 5rem" />
      <template #expansion="slotProps">
        <div class="p-2">
          <h4 class="text-blue-900">
            {{ slotProps.data["@uniquename"] }}
          </h4>
          <Splitter>
            <SplitterPanel :size="50">
              <Splitter layout="vertical">
                <SplitterPanel class="p-3" :size="30">
                  <table class="p-datatable-table">
                    <tr>
                      <td>Silver</td>
                      <td>:</td>
                      <td>
                        {{ slotProps.data.craftingrequirements["@silver"] }}
                      </td>
                    </tr>
                    <tr>
                      <td>Time</td>
                      <td>:</td>
                      <td>
                        {{ slotProps.data.craftingrequirements["@time"] }}
                      </td>
                    </tr>
                    <tr>
                      <td>Focus</td>
                      <td>:</td>
                      <td>
                        {{
                          slotProps.data.craftingrequirements["@craftingfocus"]
                        }}
                      </td>
                    </tr>
                  </table>
                </SplitterPanel>
              </Splitter>
            </SplitterPanel>
            <SplitterPanel class="flex items-center justify-center p-3">
              <table class="p-datatable-table">
                <thead>
                  <tr>
                    <th class="text-left">Resource</th>
                    <th class="text-left">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in slotProps.data.craftingrequirements
                      .craftresource"
                    :key="item['@uniquename']"
                  >
                    <td>
                      {{ item["@uniquename"] }}
                    </td>
                    <td>
                      {{ item["@count"] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </SplitterPanel>
            <SplitterPanel class="flex items-center justify-center p-3">
              <table class="p-datatable-table">
                <thead>
                  <tr>
                    <th class="text-left">Enhance Level</th>
                    <th class="text-left">Item Power</th>
                    <th class="text-left">Durability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in slotProps.data.enchantments.enchantment"
                    :key="item['@enchantmentlevel']"
                  >
                    <td>
                      {{ item["@enchantmentlevel"] }}
                    </td>
                    <td>
                      {{ item["@itempower"] }}
                    </td>
                    <td>
                      {{ item["@durability"] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </SplitterPanel>
          </Splitter>
        </div>
      </template>
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h2>Item Management</h2>
        </div>
      </template>
      <Column header="ID" class="align-right wrap_content">
        <template #body="slotProps">
          <h6 class="d-inline-flex">#{{ slotProps.data.autonum }}</h6>
        </template>
      </Column>
      <Column
        ref="@uniquename"
        field="@uniquename"
        header="Name"
        filterMatchMode="startsWith"
        :sortable="true"
        class="wrap_content"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="column-filter"
            placeholder="Search by name"
            @keydown.enter="filterCallback()"
          />
        </template>
        <template #body="slotProps">
          <Chip
            :label="slotProps.data['@uniquename']"
            :image="`${imageUrl}/images/${slotProps.data['@uniquename']}.png`"
            :pt="{
              root: {
                style: {
                  background: 'transparent',
                },
              },
              image: {
                style: {
                  width: '50px',
                  height: '50px',
                },
              },
            }"
          />
        </template>
      </Column>
      <Column
        ref="classification"
        field="classification"
        header="Classification"
        filterMatchMode="startsWith"
        :sortable="true"
        class="wrap_content"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="column-filter"
            placeholder="Search by name"
            @keydown.enter="filterCallback()"
          />
        </template>
        <template #body="slotProps">
          {{ slotProps.data.classification }}
        </template>
      </Column>
      <Column
        ref="@shopcategory"
        field="@shopcategory"
        header="Shop Category"
        filterMatchMode="startsWith"
        :sortable="true"
        class="wrap_content"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="column-filter"
            placeholder="Search by shop category"
            @keydown.enter="filterCallback()"
          />
        </template>
        <template #body="slotProps">
          {{ slotProps.data["@shopcategory"] }}
        </template>
      </Column>
      <Column
        ref="@shopsubcategory1"
        field="@shopsubcategory1"
        header="Shop Sub Category 1"
        filterMatchMode="startsWith"
        :sortable="true"
        class="wrap_content"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="column-filter"
            placeholder="Search by name"
            @keydown.enter="filterCallback()"
          />
        </template>
        <template #body="slotProps">
          {{ slotProps.data["@shopsubcategory1"] }}
        </template>
      </Column>
      <Column
        ref="@shopsubcategory2"
        field="@shopsubcategory2"
        header="Shop Sub Category 2"
        filterMatchMode="startsWith"
        :sortable="true"
        class="wrap_content"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="column-filter"
            placeholder="Search by name"
            @keydown.enter="filterCallback()"
          />
        </template>
        <template #body="slotProps">
          {{ slotProps.data["@shopsubcategory1"] }}
        </template>
      </Column>
      <template #footer>
        In total there are
        {{ ui.table.totalRecords }} products.
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import { ProductService } from "../services/item";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MasterItem",
  components: {},
  data() {
    return {
      imageUrl: import.meta.env.VITE_CORE,
      ui: {
        table: {
          expandedRows: {},
          loading: true,
          totalRecords: 0,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: [] as any[],
          lazyParams: {
            first: 0,
            rows: 0,
            sortField: "",
            sortOrder: "",
            filters: {
              "@uniquename": {
                operator: FilterOperator.OR,
                constraints: [
                  { value: "", matchMode: FilterMatchMode.CONTAINS },
                ],
              },
              "@shopcategory": {
                operator: FilterOperator.OR,
                constraints: [
                  { value: "", matchMode: FilterMatchMode.CONTAINS },
                ],
              },
              "@shopsubcategory1": {
                operator: FilterOperator.OR,
                constraints: [
                  { value: "", matchMode: FilterMatchMode.CONTAINS },
                ],
              },
              "@shopsubcategory2": {
                operator: FilterOperator.OR,
                constraints: [
                  { value: "", matchMode: FilterMatchMode.CONTAINS },
                ],
              },
              // stock_point: {
              //   operator: FilterOperator.AND,
              //   constraints: [
              //     { value: null, matchMode: FilterMatchMode.CONTAINS },
              //   ],
              // },
              // status: { value: null, matchMode: FilterMatchMode.IN },
              // created_by: {
              //   operator: FilterOperator.AND,
              //   constraints: [
              //     { value: "", matchMode: FilterMatchMode.CONTAINS },
              //   ],
              // },
            },
          },
        },
      },
    };
  },
  mounted() {
    this.loadLazyData();
  },
  methods: {
    onRowExpand(event) {
      console.log(this.ui.table.expandedRows);
    },
    onRowCollapse(event) {
      console.log(this.ui.table.expandedRows);
    },
    onPage(event: any) {
      this.ui.table.lazyParams = event;
      this.loadLazyData();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSort(event: any) {
      this.ui.table.lazyParams = event;
      this.loadLazyData();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFilter(event: any) {
      this.ui.table.lazyParams = event;
      this.loadLazyData();
    },
    async loadLazyData() {
      this.ui.table.loading = true;
      ProductService.getItems(this.ui.table.lazyParams).then(
        async (response) => {
          const parsedData = response.data;
          this.ui.table.data = parsedData;
          this.ui.table.totalRecords = response.totalRecords;
          this.ui.table.loading = false;
        },
      );
    },
  },
});
</script>
