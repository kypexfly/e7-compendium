<template>
    <main class="fix-padding">
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
                        :class="{ 'bg-gray-700/50': (selectedHero === hero.id) }"
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
                            <img :src="`/assets/symbol/icon_${hero.element}.png`" class="inline-block align-middle mr-1"
                                width=20 height=20 alt="">
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
            <p v-if="!filteredHeroes.length" class="text-sm text-center text-gray-500 dark:text-gray-400">No results for
                "{{ searchTerm }}"</p>
        </div>
        

        <aside v-if="heroData" class="fix-padding my-5">
            <div class="lg:w-[650px] container mx-auto">
    
                <div class="flex gap-5">
                    <img :src="heroData.Hero_icon" width=100 height=100 alt="">
                    <div>
                        <h1 class="my-3 text-5xl">{{ heroData.name }}</h1>
                        <p class="my-1">{{ heroData.description }}</p>
                    </div>
                </div>
    
                <div class="flex gap-5 my-3 justify-center items-center">
                    <span>
                        <img :src="`/assets/symbol/${heroData.rarity}-star.png`" class="h-[20px] inline-block align-middle mr-1"
                        alt="">
                        <small> {{ heroData.rarity }} stars</small>
                    </span>
                    <span>
                        <img :src="`/assets/symbol/icon_${heroData.element}.png`" class="inline-block align-middle mr-1"
                            width=20 height=20 alt="">
                        <small> {{ heroData.element }}</small>
                    </span>
                    <span>
                        <img :src="`/assets/symbol/icon_class_${heroData.role}.png`" class="inline-block align-middle mr-1"
                            width=20 height=20 alt="">
                        <small> {{ heroData.role }}</small>
                    </span>
                    <span>
                        <img :src="`/assets/symbol/icon_zodiac_${heroData.zodiac}.png`"
                            class="inline-block align-middle mr-1" width=20 height=20 alt="">
                        <small>
                            {{ heroData.zodiac }}
                        </small>
                    </span>
                </div>
    
    
                <h3 class="text-lg font-bold">Stats</h3>
                <p>Here goes stats</p>
    
            </div>
        </aside>

    </main>

</template>

<script>
import SearchBar from '../components/SearchBar.vue';
// import Modal from '../components/Modal.vue';
import { ref, computed } from 'vue';
import heroes from '../assets/data/hero-data.json'

export default {
    name: 'SearchHero',
    components: {
        SearchBar
    },
    setup() {
        const searchTerm = ref('')
        const selectedHero = ref('')

        const filteredHeroes = computed(() => heroes.slice(0, 15).filter((hero) => {
            return hero.name.toLowerCase().indexOf(searchTerm.value.toLowerCase()) > -1;
        }))

        const heroData = computed(() => heroes.filter((hero) => {
            return hero.id === selectedHero.value
        })[0])

        const showMore = (heroId) => {
            selectedHero.value = heroId
            console.log("hero.id:", heroId)
        }

        return { searchTerm, filteredHeroes, selectedHero, showMore, heroData }
    }
}
</script>