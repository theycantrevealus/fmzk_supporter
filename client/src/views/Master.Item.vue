<template>
  <div class="card">
    <DataTable
      ref="dt"
      v-model:filters="ui.table.lazyParams.filters"
      :value="ui.table.data"
      :lazy="true"
      :paginator="true"
      :rows="20"
      scrollable
      scrollHeight="800px"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[20, 50, 100]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      :totalRecords="ui.table.totalRecords"
      :loading="ui.table.loading"
      filterDisplay="menu"
      :rowClass="rowClassStyle"
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
        <div class="flex">
          <div class="flex font-bold w-6">
            <Fieldset
              :legend="`T${slotProps.data['tier']}.${slotProps.data['enchantment']} ${slotProps.data['name']}'s Crafting Requirements`"
              class="w-full !min-w-0 !max-w-full"
            >
              <Paginator
                :first="getPaginationState(slotProps.data.uniquename).first"
                :rows="getPaginationState(slotProps.data.uniquename).rows"
                :totalRecords="slotProps.data.craftingrequirements.length"
                template="PrevPageLink CurrentPageReport NextPageLink"
                @page="onSubPageChange($event, slotProps.data.uniquename)"
              />
              <table class="p-datatable-table custom-grid-table w-full">
                <thead>
                  <tr>
                    <th class="text-right">Silver</th>
                    <th class="text-right">Focus Point</th>
                    <th class="text-right">Time</th>
                    <th class="text-right">Crafted Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-for="cR in getPaginatedSubItems(
                      slotProps.data.uniquename,
                    )"
                    :key="cR['uniquename']"
                  >
                    <tr>
                      <td class="text-right">{{ cR.silver }}</td>
                      <td class="text-right">{{ cR.focus }}</td>
                      <td class="text-right">{{ cR.time }}</td>
                      <td class="text-right">
                        {{ cR["@amountcrafted"] }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4">
                        <table class="p-datatable-table">
                          <thead>
                            <tr>
                              <th class="text-left">Item</th>
                              <th class="text-right">Qty</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="resource in cR.craftresource">
                              <td>
                                T{{ resource.tier }}.{{ resource.enchantment }}
                                {{ resource.name }}
                              </td>
                              <td class="text-right">
                                {{ resource.count }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </Fieldset>
          </div>
          <div
            class="flex align-items-center justify-content-center font-bold m-2 px-5 py-3 border-round"
          ></div>
        </div>
      </template>
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h2>Item Management</h2>
        </div>
        <div class="flex">
          <div class="flex font-bold w-2">
            <Select
              @change="onFilterChange"
              v-model="ui.select.category.selected"
              :options="ui.select.category.options"
              optionLabel="name"
              placeholder="Enchantment"
              class="w-full md:w-56 mx-1"
            />
          </div>
          <div class="flex font-bold w-2">
            <Select
              @change="onFilterChange"
              v-model="ui.select.subcategory1.selected"
              :options="ui.select.subcategory1.options"
              optionLabel="name"
              placeholder="Enchantment"
              class="w-full md:w-56 mx-1"
            />
          </div>
          <div class="flex font-bold w-2">
            <Select
              @change="onFilterChange"
              v-model="ui.select.tier.selected"
              :options="ui.select.tier.options"
              optionLabel="name"
              placeholder="Tier"
              class="w-full md:w-56 mx-1"
            />
          </div>
          <div class="flex font-bold w-2">
            <Select
              @change="onFilterChange"
              v-model="ui.select.enchantment.selected"
              :options="ui.select.enchantment.options"
              optionLabel="name"
              placeholder="Enchantment"
              class="w-full md:w-56 mx-1"
            />
          </div>
        </div>
      </template>
      <Column header="ID" class="align-right wrap_content">
        <template #body="slotProps">
          <h5 class="d-inline-flex">
            #{{ slotProps.data.autonum.toString().padStart(6, "0") }}
          </h5>
        </template>
      </Column>
      <Column
        ref="name"
        field="name"
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
            :label="`T${slotProps.data['tier']}.${slotProps.data['enchantment']} ${slotProps.data['name']}`"
            :image="`${imageUrl}/images/${slotProps.data['uniquename']}.png`"
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
        <template #body="slotProps">
          {{ slotProps.data.classification }}
        </template>
      </Column>
      <Column
        ref="shopcategory"
        field="shopcategory"
        header="Shop Category"
        filterMatchMode="startsWith"
        :sortable="true"
        class="wrap_content"
      >
        <template #body="slotProps">
          {{ slotProps.data["shopcategory"] }}
        </template>
      </Column>
      <Column
        ref="shopsubcategory1"
        field="shopsubcategory1"
        header="Shop Sub Category 1"
        filterMatchMode="startsWith"
        :sortable="true"
        class="wrap_content"
      >
        <template #body="slotProps">
          {{ slotProps.data["shopsubcategory1"] }}
        </template>
      </Column>
      <Column
        ref="shopsubcategory2"
        field="shopsubcategory2"
        header="Shop Sub Category 2"
        filterMatchMode="startsWith"
        :sortable="true"
        class="wrap_content"
      >
        <template #body="slotProps">
          {{ slotProps.data["shopsubcategory1"] }}
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
      first: 0,
      imageUrl: import.meta.env.VITE_CORE,
      ui: {
        select: {
          category: {
            selected: { name: "All Category", code: "" },
            options: [
              { name: "All Category", code: "" },
              { name: "Farming", code: "farming" },
              { name: "Crafting", code: "crafting" },
              { name: "Artefacts", code: "artefacts" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
            ],
          },
          subcategory1: {
            selected: { name: "All Sub Category", code: "" },
            options: [
              { name: "All Sub Category", code: "" },
              { name: "Resources", code: "resources" },
              { name: "Refined Resources", code: "refinedresources" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
            ],
          },
          subcategory2: {
            selected: { name: "All Sub Category", code: 0 },
            options: [
              { name: "All Sub Category", code: 0 },
              { name: "T1", code: 1 },
              { name: "T2", code: 2 },
              { name: "T3", code: 3 },
              { name: "T4", code: 4 },
              { name: "T5", code: 5 },
              { name: "T6", code: 6 },
              { name: "T7", code: 7 },
              { name: "T8", code: 8 },
            ],
          },
          tier: {
            selected: { name: "All Tier", code: -1 },
            options: [
              { name: "All Tier", code: -1 },
              { name: "Tier 1", code: 1 },
              { name: "Tier 2", code: 2 },
              { name: "Tier 3", code: 3 },
              { name: "Tier 4", code: 4 },
              { name: "Tier 5", code: 5 },
              { name: "Tier 6", code: 6 },
              { name: "Tier 7", code: 7 },
              { name: "Tier 8", code: 8 },
            ],
          },
          enchantment: {
            selected: { name: "All Enchantment", code: -1 },
            options: [
              { name: "All Enchantment", code: -1 },
              { name: "Enchantment 0", code: 0 },
              { name: "Enchantment 1", code: 1 },
              { name: "Enchantment 2", code: 2 },
              { name: "Enchantment 3", code: 3 },
              { name: "Enchantment 4", code: 4 },
            ],
          },
        },
        table: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pagination: {} as any,
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
              name: {
                operator: FilterOperator.OR,
                constraints: [
                  { value: "", matchMode: FilterMatchMode.CONTAINS },
                ],
              },
              shopcategory: {
                operator: FilterOperator.OR,
                constraints: [
                  { value: "", matchMode: FilterMatchMode.CONTAINS },
                ],
              },
              shopsubcategory1: {
                operator: FilterOperator.AND,
                constraints: [
                  { value: "", matchMode: FilterMatchMode.CONTAINS },
                ],
              },
              shopsubcategory2: {
                operator: FilterOperator.OR,
                constraints: [
                  { value: "", matchMode: FilterMatchMode.CONTAINS },
                ],
              },
              tier: {
                operator: FilterOperator.AND,
                constraints: [{ value: 1, matchMode: FilterMatchMode.EQUALS }],
              },
              enchantment: {
                operator: FilterOperator.AND,
                constraints: [{ value: 0, matchMode: FilterMatchMode.EQUALS }],
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFilterChange(event: any) {
      this.loadLazyData();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRowExpand(event: any) {
      console.log(this.ui.table.expandedRows);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRowCollapse(event: any) {
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
    getPaginationState(id: string) {
      if (!this.ui.table.pagination[id]) {
        this.ui.table.pagination[id] = { first: 0, rows: 1 };
      }
      return this.ui.table.pagination[id];
    },
    getPaginatedSubItems(id: string) {
      const parent = this.ui.table.data.find((p: any) => p.uniquename === id);
      if (!parent) return [];

      const state = this.getPaginationState(id);
      return parent.craftingrequirements.slice(
        state.first,
        state.first + state.rows,
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubPageChange(event: any, id: string) {
      this.ui.table.pagination[id].first = event.first;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rowClassStyle(data: any) {
      const classes = ["item-table"];

      classes.push(`bg-tier-${data.tier}`);
      classes.push(`bg-enchantment-${data.enchantment}`);

      return classes;
    },
    async loadLazyData() {
      this.ui.table.loading = true;

      if (this.ui.select.tier.selected.code < 0) {
        this.ui.table.lazyParams.filters.tier.constraints = [];
      } else {
        this.ui.table.lazyParams.filters.tier.constraints = [
          {
            value: this.ui.select.tier.selected.code,
            matchMode: FilterMatchMode.EQUALS,
          },
        ];
      }

      if (this.ui.select.enchantment.selected.code < 0) {
        this.ui.table.lazyParams.filters.enchantment.constraints = [];
      } else {
        this.ui.table.lazyParams.filters.enchantment.constraints = [
          {
            value: this.ui.select.enchantment.selected.code,
            matchMode: FilterMatchMode.EQUALS,
          },
        ];
      }

      this.ui.table.lazyParams.filters.shopcategory.constraints = [
        {
          value: this.ui.select.category.selected.code,
          matchMode: FilterMatchMode.EQUALS,
        },
      ];

      this.ui.table.lazyParams.filters.shopsubcategory1.constraints = [
        {
          value: this.ui.select.subcategory1.selected.code,
          matchMode: FilterMatchMode.EQUALS,
        },
      ];

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
