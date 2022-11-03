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
        <section class="w-full overflow-y-auto"
            :class="{ 'h-full hidden sm:block basis-2/3 lg:basis-auto border-r border-x-slate-700': selectedHero }">

            <div class="w-full lg:w-[650px] sticky top-0 z-10 container my-4 mx-auto"
                :class="{ 'ml-auto mr-0': selectedHero }">
                <SearchBar v-model="searchTerm" />
            </div>

            <div class="container lg:w-[650px] overflow-x-auto relative sm:rounded-sm mx-auto mb-4"
                :class="{ 'ml-auto mr-0': selectedHero }">
                <p class="text-sm text-slate-400">Filter by:</p>
                <!-- Filter options -->

                <!-- Filter by roles -->
                <div class="flex gap-5">
                    <span class="w-20">Role</span>
                    <div class="flex items-center">
                        <input checked id="inline-checked-checkbox" type="checkbox" value="all"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600">
                        <label for="inline-checked-checkbox"
                            class="w-max ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                    </div>
                    <div v-for="role in filterOptions.roles" :key="role" class="flex items-center">
                        <input id="inline-checkbox" type="checkbox" :value="role"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="inline-checkbox" class="w-max ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            <img :src="`/assets/symbol/icon_class_${role}.png`" class="inline-block align-middle mr-1"
                                width=20 height=20 alt="">
                        </label>
                    </div>
                </div>

                <!-- Filter by elements -->
                <div class="flex gap-5">
                    <span class="w-20">Element</span>
                    <div class="flex items-center">
                        <input checked id="inline-checked-checkbox" type="checkbox" value="all"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="inline-checked-checkbox"
                            class="w-max ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                    </div>
                    <div v-for="element in filterOptions.elements" :key="element" class="flex items-center">
                        <input id="inline-checkbox" type="checkbox" :value="element"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="inline-checkbox" class="w-max ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            <img :src="`/assets/symbol/icon_${element}.png`" class="inline-block align-middle mr-1"
                                width=20 height=20 alt="">
                        </label>
                    </div>
                </div>

                <!-- Filter by rarity -->
                <div class="flex gap-5">
                    <span class="w-20">Rarity</span>
                    <div class="flex items-center">
                        <input checked id="inline-checked-checkbox" type="checkbox" value="all"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="inline-checked-checkbox"
                            class="w-max ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                    </div>
                    <div v-for="rarity in filterOptions.rarity" :key="rarity" class="flex items-center">
                        <input id="inline-checkbox" type="checkbox" :value="rarity"
                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="inline-checkbox" class="w-max ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            <img :src="`/assets/symbol/${rarity}-star.png`" class="inline-block align-middle mr-1 h-[12px] w-auto" alt="">
                        </label>
                    </div>
                </div>


            </div>

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

        <section v-if="heroData" class="w-full overflow-y-auto h-full fix-padding">
            <div class="w-full xl:w-[650px] mr-auto relative">
                <button @click="removeSelectedHero" type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm mb-2 p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="defaultModal">
                    <!-- <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-300" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7">
                        </path>
                    </svg> -->
                    <svg aria-hidden="true" class="w-5 h-5 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                    Close
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
import { Tabs, Tab } from 'flowbite-vue'
import ProgressBar from '../components/ProgressBar.vue';
import heroStatService from '../services/hero-stat.service'
document.title = "Game Data | E7Compendium"

const filterOptions = {
    roles: ["warrior", "knight", "thief", "ranger", "mage", "soul weaver"],
    elements: ["fire", "ice", "earth", "light", "dark"],
    rarity: [2,3,4,5]
}
const activeTab = ref('stats')
const searchTerm = ref('')
const selectedHero = ref('')

const filteredHeroes = computed(() => heroes.filter((hero) => {
    return hero.name.toLowerCase().indexOf(searchTerm.value.toLowerCase()) > -1;
}))

const heroData = computed(() => heroes.filter((hero) => {
    return hero.id === selectedHero.value
})[0])

const heroStats = computed(() => {
    console.log("computing hero stats")
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
    selectedHero.value = heroId
    console.log("hero.id:", heroId)
}
const removeSelectedHero = () => {
    selectedHero.value = ''
    console.log("selectedHero removed")
}

</script>

<style scoped>
main {
    height: calc(100vh - 77px);
}
</style>