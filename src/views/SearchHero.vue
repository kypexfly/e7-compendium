<template>
    <component :is="'style'" type="text/css">
        html {
        overflow: hidden;
        }
        footer {
        display: none;
        }
    </component>
    <main class="flex justify-center overflow-hidden" @keyup.esc="removeSelectedHero" tabindex="0">
        <!-- Left side panel  -->
        <section class="w-full overflow-y-auto"
            :class="{ 'h-full hidden sm:block basis-2/3 lg:basis-auto border-r border-x-slate-700': selectedHero }">

            <div class="w-full lg:w-[650px] sticky top-0 z-10 container my-4 mx-auto"
                :class="{ 'ml-auto mr-0': selectedHero }">
                <SearchBar v-model="searchTerm" />
            </div>

            <!-- Filter options -->
            <div class="container lg:w-[650px] overflow-x-auto relative sm:rounded-sm mx-auto mb-4 text-slate-400 text-sm"
                :class="{ 'ml-auto mr-0': selectedHero }">

                <!-- Search history -->
                <p class="mb-1">
                    Search history
                    <button @click="searchHistory.clear()" class="rounded-md dark:bg-slate-800 dark:hover:bg-slate-700 ml-2 px-2 py-1">
                        Delete
                    </button>
                </p>
                <!-- <StackedAvatars> -->
                <div class="flex">
                    <Avatar v-for="heroId in searchHistory" :key="heroId" class="cursor-pointer"
                        @click="showMore(heroId)"
                        :img="'https://assets.epicsevendb.com/_source/face/' + heroId + '_s.png'" rounded />
                </div>
                <!-- </StackedAvatars> -->

                <p class="mb-1">Filter by</p>

                <!-- For testing purposes -->
                <!-- <div class="flex justify-between my-4">
                    <span>Roles: {{ selectedFilter.roles }}</span>
                    <span>Elements: {{ selectedFilter.elements }}</span>
                    <span>Rarities: {{ selectedFilter.rarities }}</span>
                </div> -->

                <!-- Filter by role -->
                <div class="flex flex-wrap justify-between gap-2">
                    <ul class="flex gap-1">
                        <li v-for="role in filterOptions.roles" :key="role">
                            <input type="checkbox" :id="role + '-option'" :value="role" class="hidden peer"
                                v-model="selectedFilter.roles">
                            <label :for="role + '-option'"
                                class="inline-flex justify-center items-center p-1 w-10 h-8 text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img :src="`/assets/symbol/icon_class_${role}.png`"
                                    class="inline-block align-middle w-5 h-5" alt="">
                            </label>
                        </li>
                        <li>
                            <button @click="selectedFilter.roles.length = 0"
                                class="inline-flex justify-center items-center p-1 w-8 h-8 cursor-pointer">
                                <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>

                    <!-- Filter by element -->
                    <ul class="flex gap-1">
                        <li v-for="element in filterOptions.elements" :key="element">
                            <input type="checkbox" :id="element + '-option'" :value="element" class="hidden peer"
                                v-model="selectedFilter.elements">
                            <label :for="element + '-option'"
                                class="inline-flex justify-center items-center p-1 w-10 h-8 text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img :src="`/assets/symbol/icon_${element}.png`"
                                    class="inline-block align-middle w-5 h-5" alt="">
                            </label>
                        </li>
                        <li>
                            <button @click="selectedFilter.elements.length = 0"
                                class="inline-flex justify-center items-center p-1 w-8 h-8 cursor-pointer">
                                <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>

                    <!-- Filter by rarity -->
                    <ul class="flex gap-1">
                        <li v-for="rarity in filterOptions.rarities" :key="rarity">
                            <input type="checkbox" :id="rarity + '-option'" :value="rarity" class="hidden peer"
                                v-model="selectedFilter.rarities">
                            <label :for="rarity + '-option'"
                                class="inline-flex justify-center items-center p-1 w-10 h-8 text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <span class="text-xs text-center mr-1">{{ rarity }}</span>
                                <img src="/assets/symbol/1-star.png" class="inline-block align-middle w-4 h-4" alt="">
                            </label>
                        </li>
                        <li>
                            <button @click="selectedFilter.rarities.length = 0"
                                class="inline-flex justify-center items-center p-1 w-8 h-8 cursor-pointer">
                                <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Table with heroes data -->
            <div class="container lg:w-[650px] overflow-x-auto relative sm:rounded-sm mx-auto mb-4"
                :class="{ 'ml-auto mr-0': selectedHero }">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-blue-600 dark:text-gray-200">
                        <tr>
                            <th scope="col" class="p-2.5 hidden sm:table-cell"
                                :class="{ '!hidden md:!table-cell': selectedHero }">ID</th>
                            <th scope="col" class="p-2.5">Name</th>
                            <th scope="col" class="p-2.5">Element</th>
                            <th scope="col" class="p-2.5">Class</th>
                            <th scope="col" class="p-2.5">Grade</th>
                            <th scope="col" class="p-2.5 hidden sm:table-cell"
                                :class="{ '!hidden lg:!table-cell': selectedHero }">
                                ATK
                            </th>
                            <th scope="col" class="p-2.5 hidden sm:table-cell"
                                :class="{ '!hidden lg:!table-cell': selectedHero }">
                                HP
                            </th>
                            <th scope="col" class="p-2.5 hidden sm:table-cell"
                                :class="{ '!hidden lg:!table-cell': selectedHero }">
                                DEF
                            </th>
                            <th scope="col" class="p-2.5 hidden sm:table-cell"
                                :class="{ '!hidden lg:!table-cell': selectedHero }">
                                SPD
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="hero in filteredHeroes" :key="hero.id" @click="showMore(hero.id)"
                            class="border-b dark:hover:bg-gray-600/50 dark:border-gray-700 cursor-pointer"
                            :class="{ 'bg-gray-600/50': (selectedHero === hero.id) }"
                            :data-modal-toggle="'popup-' + hero.id">
                            <td class="px-1 hidden sm:table-cell" :class="{ '!hidden md:!table-cell': selectedHero }">
                                <small>
                                    <pre>{{ hero.id }}</pre>
                                </small>
                            </td>
                            <th scope="row" class="px-1 font-medium text-gray-900 whitespace-nowrap dark:text-gray-100">
                                <img :src="hero.Hero_icon" loading="lazy" width=40 height=40 alt=""
                                    class="inline-block align-middle mr-1" /> {{ hero.name }}
                            </th>
                            <td class="px-1">
                                <img :src="`/assets/symbol/icon_${hero.element}.png`"
                                    class="inline-block align-middle mr-1" width=20 height=20 alt="">
                                <small class="hidden xs:inline-block"
                                    :class="{ '!hidden md:!inline-block': selectedHero }">{{ hero.element }}</small>
                            </td>
                            <td class="px-1">
                                <img :src="`/assets/symbol/icon_class_${hero.role}.png`"
                                    class="inline-block align-middle mr-1" width=20 height=20 alt="">
                                <small class="hidden xs:inline-block"
                                    :class="{ '!hidden md:!inline-block': selectedHero }">{{ hero.role }}</small>
                            </td>
                            <td class="px-1">
                                <img :src="`/assets/symbol/${hero.rarity}-star.png`" style="height:15px" alt="">
                            </td>
                            <td class="px-1 hidden sm:table-cell" :class="{ '!hidden lg:!table-cell': selectedHero }">
                                ????
                            </td>
                            <td class="px-1 hidden sm:table-cell" :class="{ '!hidden lg:!table-cell': selectedHero }">
                                ????
                            </td>
                            <td class="px-1 hidden sm:table-cell" :class="{ '!hidden lg:!table-cell': selectedHero }">
                                ????
                            </td>
                            <td class="px-1 hidden sm:table-cell" :class="{ '!hidden lg:!table-cell': selectedHero }">
                                ????
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p v-if="!filteredHeroes.length" class="text-sm text-center text-gray-500 dark:text-gray-400">No results
                    for
                    "{{ searchTerm }}"</p>
            </div>
        </section>

        <!-- Right side panel  -->
        <section id="right-panel" v-if="heroData" class="w-full overflow-y-auto h-full fix-padding">
            <div class="w-full xl:w-[650px] mr-auto relative">
                <button @click="removeSelectedHero" type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm mb-2 p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-300" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7">
                        </path>
                    </svg>
                    go back
                    <span class="sr-only">Close modal</span>
                </button>

                <div class="flex gap-5 w-full min-h-[7rem]">
                    <img :src="heroData.Hero_icon" class="w-[100px] h-[100px]" alt="">
                    <div>
                        <h1 class="my-3 text-4xl">{{ heroData.name }}
                            <span
                                class="inline-block align-middle bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{{
                                        heroData.id
                                }}</span>
                        </h1>

                        <p class="my-1 text-sm ">{{ heroData.description }}</p>
                    </div>
                </div>

                <div class="flex flex-wrap gap-5 my-3 justify-evenly items-center">
                    <span>
                        <img :src="`/assets/symbol/icon_${heroData.element}.png`" class="inline-block align-middle mr-1"
                            width=20 height=20 alt="">
                        <small> {{ heroData.element }}</small>
                    </span>
                    <span>
                        <img :src="`/assets/symbol/icon_class_${heroData.role}.png`"
                            class="inline-block align-middle mr-1" width=20 height=20 alt="">
                        <small> {{ heroData.role }}</small>
                    </span>
                    <span>
                        <img :src="`/assets/symbol/icon_zodiac_${heroData.zodiac}.png`"
                            class="inline-block align-middle mr-1" width=20 height=20 alt="">
                        <small>
                            {{ heroData.zodiac }}
                        </small>
                    </span>
                    <span>
                        <img :src="`/assets/symbol/${heroData.rarity}-star.png`"
                            class="h-[20px] inline-block align-middle mr-1" alt="">
                        <small> {{ heroData.rarity }} stars</small>
                    </span>
                </div>

                <Tabs variant="underline" v-model="activeTab" class="p-5">
                    <!-- class appends to content DIV for all tabs -->
                    <Tab name="stats" title="Stats">
                        <h2 class="text-m uppercase font-bold">Lv. 60 + 6 ⭐ stats</h2>
                        <ProgressBar label="Attack" :labelValue="heroStats.attack"
                            :progress="Math.floor((heroStats.attack / 1435) * 50)" />
                        <ProgressBar label="Health" :labelValue="heroStats.health"
                            :progress="Math.floor((heroStats.health / 7323) * 50)" />
                        <ProgressBar label="Defense" :labelValue="heroStats.defense"
                            :progress="Math.floor((heroStats.defense / 776) * 50)" />
                        <ProgressBar label="Speed" :labelValue="heroStats.speed"
                            :progress="Math.floor((heroStats.speed / 129) * 25)" />
                        <ProgressBar label="Crit. Change" :labelValue="heroStats.critChance + '%'"
                            :progress="Math.floor((heroStats.critChance / 27) * 25)" />
                        <ProgressBar label="Crit. Damage" :labelValue="heroStats.critDamage + '%'"
                            :progress="Math.floor((heroStats.critDamage / 165) * 25)" />
                        <ProgressBar label="Effectiveness" :labelValue="heroStats.effectiveness + '%'"
                            :progress="Math.floor((heroStats.effectiveness / 30) * 25)" />
                        <ProgressBar label="Effect Resistance" :labelValue="heroStats.resistance + '%'"
                            :progress="Math.floor((heroStats.resistance / 30) * 25)" />
                        <ProgressBar label="Dual Attack Chance" :labelValue="heroStats.dualAttack + '%'"
                            :progress="Math.floor((heroStats.dualattackchance / 100) * 25)" />
                    </Tab>
                    <Tab name="information" title="Information">
                        <h2 class="text-m uppercase font-bold">{{ heroData.name }}'s story</h2>
                        <p>
                            {{ heroData.story }}
                        </p>

                        <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />

                        <h2 class="text-m uppercase font-bold">Specialty Skill</h2>
                        <div class="flex gap-5 w-full py-4 items-center">
                            <img :src="heroData.mission_specialty_icon" class="w-[74px] h-[74px]" alt="">
                            <div>
                                <h1 class="text-xl">{{ heroData.mission_specialty_name }}</h1>

                                <p class="my-1 text-sm ">{{ heroData.mission_specialty_description }}</p>
                                <span
                                    class="inline-block align-middle bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                    {{ heroData.mission_attribute_name }}
                                </span>
                                <span
                                    class="inline-block align-middle bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                    {{ heroData.mission_specialty_effect_type === 'reward_bonus' ? 'Reward Bonus' :
                                            'Time Reduce'
                                    }}
                                    {{ heroData.mission_specialty_effect_value * 100 }}%
                                </span>
                            </div>
                        </div>

                        <ul class="list-inside text-sm mt-4 flex flex-wrap justify-evenly gap-4">
                            <li class="flex gap-2 items-center border border-slate-700 rounded-md p-2">
                                <img src="https://assets.epicsevendb.com/stat/cm_icon_stat_command.png"
                                    class="w-5 h-5" />
                                <span class="font-bold text-slate-300">Command</span> {{ heroData.command }}
                            </li>
                            <li class="flex gap-2 items-center border border-slate-700 rounded-md p-2">
                                <img src="https://assets.epicsevendb.com/stat/cm_icon_stat_charm.png" class="w-5 h-5" />
                                <span class="font-bold text-slate-300">Charm</span> {{ heroData.charm }}
                            </li>
                            <li class="flex gap-2 items-center border border-slate-700 rounded-md p-2">
                                <img src="https://assets.epicsevendb.com/stat/cm_icon_stat_politics.png"
                                    class="w-5 h-5" />
                                <span class="font-bold text-slate-300">Politics</span> {{ heroData.politics }}
                            </li>
                        </ul>

                        <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />

                        <h2 class="text-m uppercase font-bold">Camping</h2>
                        <p>
                            Data
                        </p>

                        <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />

                        <h2 class="text-m uppercase font-bold">Memory Imprint</h2>
                        <p>
                            Data
                        </p>

                        <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />

                        <h2 class="text-m uppercase font-bold">Relationships</h2>
                        <p>
                            Data
                        </p>

                    </Tab>
                    <Tab name="model-viewer" title="Model Viewer">
                        See model at <a :href="'https://www.e7vau.lt/portrait-viewer.html?id=' + heroData.id"
                            target="_blank" rel="noopener noreferrer">e7vau.lt</a>
                    </Tab>
                    <Tab name="skills" title="Skills">
                        No hero data available
                    </Tab>
                    <Tab name="guides" title="Guides">
                        No hero data available
                    </Tab>
                </Tabs>

            </div>
        </section>

    </main>

</template>

<script setup>
import SearchBar from '../components/SearchBar.vue';
import { ref, computed } from 'vue';
import heroes from '../assets/data/hero-data.json'
import { Tabs, Tab, Button, Avatar } from 'flowbite-vue'
import ProgressBar from '../components/ProgressBar.vue';
import heroStatService from '../services/hero-stat.service'

document.title = "Game Data | E7Compendium"

// # Tabs in profile
const activeTab = ref('stats')

// Filtering heroes feature

const filterOptions = {
    roles: ["warrior", "knight", "thief", "ranger", "mage", "soul weaver"],
    elements: ["fire", "ice", "earth", "light", "dark"],
    rarities: [3, 4, 5]
}

const selectedFilter = ref({
    roles: [],
    elements: [],
    rarities: []
})

const searchTerm = ref('')
const selectedHero = ref('')

const checkMultipleFilterValues = (value, filterArray) => {
    if (!filterArray.length) return true

    let tempChecks = [];
    for (let i = 0; i < filterArray.length; i++) {
        tempChecks.push(value.indexOf(filterArray[i]) > -1);
    }

    return tempChecks.some(value => value === true)
}

const filteredHeroes = computed(() => heroes.filter((hero) => {
    console.log("computing filter")
    return (hero.name.toLowerCase().indexOf(searchTerm.value.toLowerCase()) > -1
        && checkMultipleFilterValues(hero.role, selectedFilter.value.roles) // [...selectedFilter.roles] -> converts Sets() to Arrays[]
        && checkMultipleFilterValues(hero.element, selectedFilter.value.elements)
        && checkMultipleFilterValues(hero.rarity, selectedFilter.value.rarities)
    )
}))

// Hero profile feature (right side)
const heroData = computed(() => heroes.filter((hero) => {
    return hero.id === selectedHero.value
})[0])

const searchHistory = ref(new Set(JSON.parse(window.localStorage.getItem('searchHistory'))))

const heroStats = computed(() => {
    console.log("computing heroStats")
    return {
        attack: heroStatService.getAttack(heroData.value, 60, 6),
        health: heroStatService.getHealth(heroData.value, 60, 6),
        defense: heroStatService.getDefense(heroData.value, 60, 6),
        speed: heroStatService.getSpeed(heroData.value, 60, 6),
        critChance: heroStatService.getCritChance(heroData.value, 60, 6),
        critDamage: heroStatService.getCritDamage(heroData.value, 60, 6),
        effectiveness: heroStatService.getEffectiveness(heroData.value, 60, 6),
        resistance: heroStatService.getResistance(heroData.value, 60, 6),
        dualAttack: heroStatService.getDualAttack(heroData.value, 60, 6)
    }
})

const showMore = (heroId) => {
    searchHistory.value.add(heroId)
    window.localStorage.setItem('searchHistory', JSON.stringify([...searchHistory.value]))
    if (heroId === selectedHero.value) return selectedHero.value = ""
    selectedHero.value = heroId
    console.log("hero.id:", heroId)
}
const removeSelectedHero = () => {
    selectedHero.value = ''
    console.log("selectedHero removed")
}

</script>

<style>
main {
    height: calc(100vh - 77px);
}

#right-panel * {
    transition: 0.2s ease !important;
}
</style>