<template>
	<nav id="navbar"
		class="bg-white border-gray-200 fix-padding dark:bg-gray-900/30 sticky top-0 z-20 w-full backdrop-blur border-b border-y-slate-700">
		<div class="container flex flex-wrap justify-between items-center mx-auto">
			<router-link to="/" class="flex items-center">
				<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">E7 Compendium</span>
			</router-link>
			<button data-collapse-toggle="mobile-menu" type="button"
				class="inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500"
				aria-controls="mobile-menu-2" aria-expanded="false">
				<span class="sr-only">Open main menu</span>
				<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"></path>
				</svg>
			</button>
			<div class="hidden w-full md:block md:w-auto" id="mobile-menu">
				<ul
					class="flex flex-col p-2 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:mt-0 md:text-[0.95rem] md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
					<li>
						<router-link to="/"
							class="block py-2 pr-4 pl-3 font-bold text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:py-2 md:px-3 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							aria-current="page">
							Home
						</router-link>
					</li>

					<li>
						<router-link to="/mechanics"
							class="block py-2 pr-4 pl-3 font-bold text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:py-2 md:px-3 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
							Testing
						</router-link>
					</li>
					<li>
						<router-link to="/search/"
							class="block py-2 pr-4 pl-3 font-bold text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:py-2 md:px-3 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
							Game Data</router-link>
					</li>
					<li>
						<button id="dropdownNavbarLink" data-dropdown-toggle="dropdownResource"
							class="flex justify-between items-center py-2 pr-4 pl-3 font-bold text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:py-2 md:px-3 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
							Resources
							<svg class="ml-1 w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"></path>
							</svg>
						</button>
						<!-- Dropdown menu -->
						<div id="dropdownResource"
							class="hidden z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
							<ul class="py-1 text-sm text-gray-700 dark:text-gray-400"
								aria-labelledby="dropdownLargeButton">
								<li>
									<router-link to="/resources/beginner-progression"
										class="block py-2 px-4 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
										Beginner Progression</router-link>
								</li>
								<li>
									<router-link to="/resources/raid"
										class="block py-2 px-4 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
										Raid</router-link>
								</li>
								<li>
									<router-link to="/resources/hunt"
										class="block py-2 px-4 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
										Hunt</router-link>
								</li>
								<li>
									<router-link to="/resources/expedition"
										class="block py-2 px-4 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
										Expedition</router-link>
								</li>
							</ul>
						</div>
					</li>
					<li>
						<button id="dropdownNavbarLink" data-dropdown-toggle="dropdownTools"
							class="flex justify-between items-center py-2 pr-4 pl-3 font-bold text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:py-2 md:px-3 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
							Tools
							<svg class="ml-1 w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"></path>
							</svg></button>
						<!-- Dropdown menu -->
						<div id="dropdownTools"
							class="hidden z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
							<ul class="py-1 text-sm text-gray-700 dark:text-gray-400"
								aria-labelledby="dropdownLargeButton">
								<li>
									<router-link to="/tools/calculator"
										class="block py-2 px-4 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
										Calculator
									</router-link>
								</li>
								<li>
									<router-link to="/tools/dev-notes"
										class="block py-2 px-4 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
										Dev notes
									</router-link>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</nav>

</template>

<script>
export default {
	name: "NavBar"
}
</script>

<style>
.router-link-active {
	@apply text-white !important;
}
</style>