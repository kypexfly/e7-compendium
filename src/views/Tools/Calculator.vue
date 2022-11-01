<template>
    <main class="fix-padding">
        <div class="container mx-auto">
            <h1>
                Gear Score Calculator
            </h1>

            <div class="my-5 text-center">
                <button v-for="substat in substats" @click="toggleStats" type="button" :key="substat.name"
                    :name="substat.name" class="btn-alternative">
                    {{ substat.name }}
                </button>
            </div>

            <div v-for="selectedStat in selectedStats" :key="selectedStat"
                class="flex flex-col justify-center items-center">
                <label for="input-group-1" class="block mb-2 text-m font-medium text-gray-900 dark:text-gray-300">
                    <span class="font-bold">{{ selectedStat }}</span>
                </label>
                <div class="relative mb-6 lg:w-1/2 w-full">
                    <input type="text" id="input-group-1" placeholder="0"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                </div>
            </div>

            <div>Score
                <span>{{ sub }}</span>
            </div>

        </div>
    </main>
</template>
<script>
import { ref, computed } from 'vue';
export default {
    name: 'DevNotes',
    setup() {
        const substats = [
            { name: "ATK%", multiplier: 1},
            { name: "DEF%", multiplier: 1},
            { name: "HP%", multiplier: 1},
            { name: "ATK", multiplier: 3.46 / 39},
            { name: "DEF", multiplier: 4.99 / 31},
            { name: "HP", multiplier: 3.09 / 174},
            { name: "EFF", multiplier: 1},
            { name: "RES", multiplier: 1},
            { name: "SPD", multiplier: 2},
            { name: "CC", multiplier: 8 / 5},
            { name: "CD", multiplier: 8 / 7},
        ]
        const selectedStats = ref([])
        const toggleStats = (e) => {
            if (!selectedStats.value.includes(e.target.name) && selectedStats.value.length < 4) {
                selectedStats.value.push(e.target.name)
            } else {
                selectedStats.value = selectedStats.value.filter(stat => stat !== e.target.name)
            }
            console.log(selectedStats.value)
        }

        const score = computed(() => {
            substats[selectedStats].multiplier
        })

        return { substats, selectedStats, score, toggleStats }
    },
    created() {
        document.title = "Calculator | E7Compendium "
    }
}
</script>
<style>
.btn-alternative {
    @apply py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover: bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700
}

.btn-default {
    @apply text-white bg-blue-700 hover: bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
}
</style>