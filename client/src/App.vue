<template>
  <!--div class="layout">
    <Menubar :model="items" />

    <div class="content">
      <RouterView />
    </div>
  </div-->
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <div class="flex overflow-hidden">
          <div
            class="flex-shrink-0 flex align-items-center justify-content-center"
            style="width: 50px; height: 50px; padding: 0 10px"
          >
            <img
              alt=""
              class="ytCoreImageHost yt-spec-avatar-shape__image ytCoreImageFillParentHeight ytCoreImageFillParentWidth ytCoreImageContentModeScaleToFill ytCoreImageLoaded"
              src="https://yt3.googleusercontent.com/VO02OMAjxsLLgsTrX1Rc8IH_Zxo73AVyEnqK88i9TNjP5JRcFU0xBr_GGrZT-CwgTiRgqvretQ=s160-c-k-c0x00ffffff-no-rj"
            />
          </div>
          <div class="flex-grow-1 flex align-items-center">
            <small>FMZK Supporter</small>
          </div>
        </div>
      </div>

      <Menu :model="items" class="side-menu" />
    </aside>

    <!-- Main Area -->
    <div class="main">
      <!-- Top Bar -->
      <header class="topbar">
        <div class="topbar-left"></div>

        <div class="topbar-right">
          <span class="user">👤 John Doe</span>
        </div>
      </header>

      <!-- Page Content -->
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import Menu from "primevue/menu";

import { RouterView, useRouter } from "vue-router";

const router = useRouter();

const items = [
  { label: "Home", icon: "pi pi-home", command: () => router.push("/") },
  {
    label: "Terms & Conditions",
    icon: "pi pi-info-circle",
    command: () => router.push("/about"),
  },
  {
    label: "Manual",
    icon: "pi pi-info-circle",
    command: () => router.push("/about"),
  },
  {
    separator: true,
  },
  {
    label: "Main",
    items: [
      {
        label: "Crafting Master",
        icon: "pi pi-info-circle",
        command: () => router.push("/about"),
      },
      {
        label: "Craft Planner",
        icon: "pi pi-info-circle",
        command: () => router.push("/about"),
      },
      {
        label: "Craft Simulator",
        icon: "pi pi-info-circle",
        command: () => router.push("/about"),
      },
      {
        label: "Ingredient Maker",
        icon: "pi pi-info-circle",
        command: () => router.push("/about"),
      },
      {
        label: "Selling Price",
        icon: "pi pi-info-circle",
        command: () => router.push("/about"),
      },
    ],
  },
  {
    separator: true,
  },
  {
    label: "Master Data",
    items: [
      {
        label: "Item Management",
        icon: "pi pi-info-circle",
        command: () => router.push("/master_item"),
      },
      {
        label: "Price List",
        icon: "pi pi-info-circle",
        command: () => router.push("/master_item"),
      },
    ],
  },
];
</script>

<style>
body {
  margin: 0;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}

/* Layout */
.dashboard {
  background: red !important;
  width: 100%;
  display: flex;
  height: 100vh;
  background-color: #f4f6f8;
}

/* Sidebar */
.sidebar {
  width: 240px;
  background-color: #1e293b;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.logo {
  padding: 10px 0;
  font-size: 1.25rem;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* PrimeVue Menu styled like original */
.side-menu {
  width: 100%;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.side-menu .p-menu-submenu-label {
  padding: 0 10px;
  margin-top: 20px;
}

.side-menu .p-menu-item-label {
  padding: 0.75rem 0.5rem;
  width: 100%;
  color: #cbd5e1;
  border-radius: 0;
}

.side-menu .p-menu-item-label:hover {
  color: #fff;
}

.side-menu .p-menuitem-icon {
  margin-right: 0.75rem;
}
/* .menu {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.menu-item {
  padding: 0.75rem 1.5rem;
  color: #cbd5e1;
  text-decoration: none;
  transition:
    background 0.2s,
    color 0.2s;
}

.menu-item:hover {
  background-color: #334155;
  color: #fff;
}

.menu-item.active {
  background-color: #2563eb;
  color: #fff;
} */

/* Main area */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Topbar */
.topbar {
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}

.topbar-left {
  font-size: 1.1rem;
  font-weight: 600;
}

.topbar-right {
  font-size: 0.9rem;
  color: #374151;
}

/* Content */
.content {
  flex: 1;
  padding: 0 1.5rem;
  overflow-y: auto;
  background-color: #f9fafb;
}

.yt-spec-avatar-shape__image {
  border-radius: 100%;
  width: 100%;
}
</style>
