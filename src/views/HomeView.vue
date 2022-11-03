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

    <main class="container mx-auto fix-padding min-h-screen flex justify-center items-center flex-col">

      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        What are you looking for?
      </h1>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-5">

        <div
          class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-700">
          <div class="block">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Current Features</h5>
          <p class="w-full font-normal text-gray-700 dark:text-gray-400">
            <ul>
              <li>📄 Hero Information</li>
              <li>💠 Artifact Information</li>
              <li>📐 Mechanics Details</li>
              <li>⚔ Guides</li>
            </ul>
          </p>
        </div>
        </div>

        <RouterLink to="/mechanics"
          class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div class="block">
            <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Mechanics</h5>
            <div class="w-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam nunc sit
              amet nisi vehicula.
            </div>
          </div>
        </RouterLink>
        <RouterLink to="/search"
          class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div class="block">
            <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Game Data</h5>
            <div class="w-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam nunc sit
              amet nisi vehicula.
            </div>
          </div>
        </RouterLink>
        <RouterLink to="/resources"
          class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div class="block">
            <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Resources</h5>
            <div class="w-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam nunc sit
              amet nisi vehicula.
            </div>
          </div>
        </RouterLink>


        <!-- <div
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
        </div> -->

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
  background-image: url('../assets/bg-summer.jpg');
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
