<template>
    <main class="fix-padding">
        <div class="container mx-auto flex flex-col gap-5 my-5 items-center">
            <SearchBar v-model="searchTerm" />
            Search term (not working): {{ searchTerm }}
        </div>

        <div class="container lg:w-[650px] overflow-x-auto relative shadow-md sm:rounded-lg mx-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-blue-600 dark:text-gray-200">
                    <tr>
                        <th scope="col" class="p-3">ID</th>
                        <th scope="col" class="p-3">Avatar</th>
                        <th scope="col" class="p-3">Name</th>
                        <th scope="col" class="p-3">Element</th>
                        <th scope="col" class="p-3">Class</th>
                        <th scope="col" class="p-3">Grade</th>
                        <th scope="col" class="p-3">ATK</th>
                        <th scope="col" class="p-3">HP</th>
                        <th scope="col" class="p-3">DEF</th>
                        <th scope="col" class="p-3">SPD</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="hero in heroes" :key="hero.id"
                        class="border-b dark:hover:bg-slate-900/50 dark:border-gray-700 cursor-pointer">
                        <td class="px-1">
                            {{ hero.id }}
                        </td>
                        <td class="px-1">
                            <img :src="hero.Hero_icon" width=40 alt="" />
                        </td>
                        <th scope="row" class="p-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ hero.name }}
                        </th>
                        <td class="px-1">
                            <img :src="`/assets/symbol/icon_${hero.element}.png`" width=20 alt="">
                        </td>
                        <td class="px-1">
                            <img :src="`/assets/symbol/icon_class_${hero.role}.png`" width=20 alt="">
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
        </div>

    </main>
</template>

<script>

import SearchBar from '../components/SearchBar.vue';
import { ref, computed } from 'vue';
import heroes from '../assets/data/hero-data.json'
// import getHeroesBase from '../composables/getHeroesBase';

export default {
    name: 'SearchHero',
    components: {
        SearchBar
    },
    setup() {
        const searchTerm = ref()
        // const filteredAllHeroes = filteredHeroes()

        // const filterHeroes = () => computed(() => {
        //     console.log("start filtering")
        //     const filteredHeroes = heroes
        //         .filter((hero) => {
        //             return hero.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        //         })
        //     return filteredHeroes
        // })

        return { searchTerm, heroes }
    }
}
</script>