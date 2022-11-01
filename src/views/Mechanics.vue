<template>
    <component :is="'style'" type="text/css">
        footer {display: none}
    </component>
    <main class="flex justify-center overflow-hidden" ref="mainContainer" style="">
        <section class="overflow-y-auto border-r border-slate-700 flex-1">
            <article class="mx-auto max-w-[640px] :height overflow-y-auto" :class="{ '!ml-auto !mx-0': selectedHero }">
                <ul>
                    <li class="text-xl font-bold p-3 bg-slate-800 uppercase">Select a hero</li>
                    <li v-for="heroNumber in _.range(1, 51)" :key="heroNumber" @click="showHeroPanel(heroNumber)"
                        class="cursor-pointer p-3 hover:bg-slate-700"
                        :class="{ 'bg-slate-700': selectedHero === heroNumber }">
                        Hero {{ heroNumber }}
                    </li>
                </ul>
            </article>
        </section>

        <section class="overflow-y-auto flex-1" :class="{ 'max-w-[640px]': selectedHero && selectedExtra }"
            v-if="selectedHero">
            <article class="max-w-[640px] :height overflow-y-auto"
                :class="{ 'mr-auto': selectedHero, 'ml-auto': selectedExtra }">
                <ul class="text-center">
                    <li class="text-xl font-bold p-3 bg-slate-800 uppercase">SELECTED: Hero {{ selectedHero }}</li>
                    <li v-for="extraNumber in _.range(1, 51)" :key="extraNumber" @click="showExtraPanel(extraNumber)"
                        class="cursor-pointer p-3 hover:bg-slate-700">
                        Extra {{ extraNumber }}
                    </li>
                </ul>
            </article>
        </section>

        <section class="overflow-y-auto border-l border-slate-700 flex-1" v-if="selectedExtra">
            <article class="mr-auto max-w-[640px] :height overflow-y-auto">
                <ul>
                    <li class="text-xl font-bold p-3 bg-slate-800 uppercase">Extra {{ selectedExtra }}</li>
                    <li class="p-3" v-for="repeat in _.range(1, 21)" :key="repeat">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla deserunt, similique repellat
                        voluptatum dolore fugit esse dolores totam aut repudiandae porro voluptas sint veniam
                        distinctio, pariatur officiis quo libero est! {{ repeat * selectedExtra }}
                    </li>
                </ul>
            </article>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import _ from 'lodash'
document.title = "Testing | E7Compendium "

const selectedHero = ref('')
const selectedExtra = ref('')
const showHeroPanel = (heroName) => {
    console.log(`shoHeroPanel(${heroName})`)
    if (selectedHero.value === heroName) {
        selectedHero.value = ''
        return
    }
    selectedExtra.value = ''
    selectedHero.value = heroName
}
const showExtraPanel = (extraName) => {
    console.log(`shoExtraPanel(${extraName})`)
    if (selectedExtra.value === extraName) {
        selectedExtra.value = ''
        return
    }
    selectedExtra.value = extraName
}

const mainContainer = ref(null)

onMounted(() => {
    const navHeight = document.getElementById('navbar').clientHeight + 2
    mainContainer.value.style.height = `calc(100vh - ${navHeight}px)`
})

</script>

<style>

</style>