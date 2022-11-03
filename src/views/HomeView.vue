<script setup></script>

<template>
  <div class="home">

    <div class="bg">
      <div
        class="container flex flex-col gap-10 justify-center content-between items-center mx-auto h-full text-center fix-padding relative">
        <div class="drop-shadow">
          <h1 class="text-5xl">
            EPIC SEVEN COMPENDIUM
          </h1>
          <p>
            E7Compendium aims to be the one shop shop for heirs looking for information
            on Epic Seven.
          </p>

        </div>

        <label for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
        <div class="relative w-full lg:w-1/2">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input type="search" id="default-search"
            class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg dark:bg-gray-700/75 dark:placeholder-gray-400 dark:text-white focus:b-none"
            placeholder="Search heroes or artifacts..." required>
          <button type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700">Search</button>

        </div>
      </div>
    </div>
    <!-- <div class="justify-content-center">
      <global-search class="search-bar"></global-search>
    </div> -->
    <main class="container mx-auto fix-padding">

      <div class="grid grid-cols-4 gap-5">

        <div
          class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 ">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Current Features</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
          <ul class="my-3">
            <li>📄 Hero Information</li>
            <li>💠 Artifact Information</li>
            <li>📐 Mechanics Details</li>
            <li>⚔ Guides</li>
          </ul>
          </p>
        </div>

        <div
          class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-700 ">
          <h5 class="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Mechanics
          </h5>
        </div>
        <div
          class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-700 ">
          <h5 class="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Game Data
          </h5>
        </div>
        <div
          class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-700 ">
          <h5 class="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Resources
          </h5>
        </div>
        <div
          class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-700 ">
          <h5 class="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Tools
          </h5>
        </div>

        <div
          class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 ">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Planned Additions</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
          <ul class="my-3">
            <li>Morale Calculator</li>
            <li>Damage Calculator</li>
            <li>Language Support</li>
          </ul>
          </p>
        </div>

        <div
          class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Changelog</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            <i>Added basic functions</i>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  created() {
    document.title = "E7 Compendium "
  }
}
</script>

<style scoped>
main {
  min-height: auto !important;
}

.bg {
  background: transparent no-repeat scroll center center;
  height: calc(100vh - 77px);
  min-height: 50vh;
  position: relative;
  -webkit-box-shadow: inset 0 0 30px #000;
  -moz-box-shadow: inset 0 0 30px #000;
  box-shadow: inset 0 0 30px #000;
}

.bg::before {
  content: "";
  background: no-repeat scroll center center;
  background-image: url('../assets/background.png');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  opacity: 0.3;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
</style>
