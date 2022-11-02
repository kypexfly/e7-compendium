<template>
    <main class="flex justify-center lg:gap-20">
        <section class="hidden md:block" :class="{'overflow-y-auto h-[82vh]': selectedHero}">
            <div class="container mx-auto flex flex-col gap-5 my-5 items-center">
                <SearchBar v-model="searchTerm" />
                <!-- <ul class="list-disc">
                    <li><small>Search term working (for now 😀): {{ searchTerm }}</small></li>
                    <li><small>Mercenary's Medicine: wrong avatar</small></li>
                    <li><small>Demon Blood Gem: wrong avatar</small></li>
                    <li><small>Hero selected: {{ selectedHero }}</small></li>
                </ul> -->
            </div>

            <div class="container lg:w-[650px] overflow-x-auto relative sm:rounded-sm mx-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-blue-600 dark:text-gray-200">
                        <tr>
                            <th scope="col" class="p-2.5">ID</th>
                            <th scope="col" class="p-2.5">Name</th>
                            <th scope="col" class="p-2.5">Element</th>
                            <th scope="col" class="p-2.5">Class</th>
                            <th scope="col" class="p-2.5">Grade</th>
                            <th scope="col" class="p-2.5">ATK</th>
                            <th scope="col" class="p-2.5">HP</th>
                            <th scope="col" class="p-2.5">DEF</th>
                            <th scope="col" class="p-2.5">SPD</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="hero in filteredHeroes" :key="hero.id" @click="showMore(hero.id)"
                            class="border-b dark:hover:bg-slate-900/50 dark:border-gray-700 cursor-pointer"
                            :class="{ 'bg-gray-600/50': (selectedHero === hero.id) }"
                            :data-modal-toggle="'popup-' + hero.id">
                            <td class="px-1">
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
                                <small>{{ hero.element }}</small>
                            </td>
                            <td class="px-1">
                                <img :src="`/assets/symbol/icon_class_${hero.role}.png`"
                                    class="inline-block align-middle mr-1" width=20 height=20 alt="">
                                <small>{{ hero.role }}</small>
                            </td>
                            <td class="px-1">
                                <img :src="`/assets/symbol/${hero.rarity}-star.png`" style="height:15px" alt="">
                            </td>
                            <td class="px-1">
                                ????
                            </td>
                            <td class="px-1">
                                ????
                            </td>
                            <td class="px-1">
                                ????
                            </td>
                            <td class="px-1">
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

        <section v-if="heroData" class="overflow-y-auto h-[82vh] fix-padding">
            <div class="lg:w-[650px] container mx-auto">

                <div class="flex gap-5">
                    <img :src="heroData.Hero_icon" class="w-[100px] h-[100px]" alt="">
                    <div>
                        <h1 class="my-3 text-4xl">{{ heroData.name }}</h1>
                        <p class="my-1 text-sm">{{ heroData.description }}</p>
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
                        <ProgressBar label="Atack" :labelValue="heroStats.attack" :progress="Math.floor((heroStats.attack / 1435) * 50)" />
                        <ProgressBar label="Health" :labelValue="heroStats.health"  :progress="Math.floor((heroStats.health / 7323) * 50)" />
                        <ProgressBar label="Defense" :labelValue="heroStats.defense"  :progress="Math.floor((heroStats.defense / 776) * 50)" />
                        <ProgressBar label="Speed" :labelValue="heroStats.speed"  :progress="Math.floor((heroStats.speed / 129) * 25)" />
                        <ProgressBar label="Crit. Change" :labelValue="heroStats.critChance"  :progress="Math.floor((heroStats.critChance / 27) * 25)" />
                        <ProgressBar label="Crit. Damage" :labelValue="heroStats.critDamage"  :progress="Math.floor((heroStats.critDamage / 165) * 25)" />
                        <ProgressBar label="Effectiveness" :labelValue="heroStats.effectiveness"  :progress="Math.floor((heroStats.effectiveness / 30) * 25)" />
                        <ProgressBar label="Effect Resistance" :labelValue="heroStats.resistance"  :progress="Math.floor((heroStats.resistance / 30) * 25)" />
                        <ProgressBar label="Dual Attack Chance" :labelValue="heroStats.dualAttack"  :progress="Math.floor((heroStats.dualattackchance / 100) * 25)" />

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam nunc sit amet nisi vehicula, vel
                            vulputate lacus semper. Phasellus ut nulla at nunc feugiat blandit. Vestibulum tincidunt nibh id ante
                            aliquam, et vestibulum tortor viverra. Mauris pulvinar quam quis eros sagittis, ut posuere nibh tempor.
                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer
                            eget leo gravida, suscipit nunc ut, rutrum erat. Pellentesque ornare turpis at varius pretium. Praesent
                            vel diam magna. Etiam a rhoncus lacus. Quisque id luctus dui. Donec euismod orci non feugiat porta.
                            Aenean tempor pharetra elit vel vulputate. Curabitur malesuada quis elit eu facilisis. Duis ultrices
                            nisi nec tincidunt finibus. Donec quis eleifend nulla, eget interdum massa.
                        </p>
                    </Tab>
                    <Tab name="information" title="Information">
                        No hero data available
                    </Tab>
                    <Tab name="model-viewer" title="Model Viewer">
                        No hero data available
                    </Tab>
                    <Tab name="relationships" title="Relationships">
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

document.title = "Game Data | E7Compendium"

</script>