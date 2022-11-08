<template>
    <component :is="'style'" type="text/css">
        footer {display: none}
    </component>
    <main class="flex justify-center overflow-hidden" ref="mainContainer" @keyup.esc="removeSelectedHero" tabindex="0">
        <section class="overflow-y-auto flex-1">
            <article class="relative mx-auto max-w-[640px] overflow-y-auto" :class="{ '': selectedHero }">
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

        <section class="overflow-y-auto flex-1 mr-[-150vw] invisible transition-all duration-500 border-l border-slate-700" 
        :class="{'!visible !mr-[0vw]': selectedHero}">
            <article class="max-w-[640px] overflow-y-auto mx-auto">
                <ul class="text-center">
                    <li class="text-xl font-bold p-3 bg-slate-800 uppercase">SELECTED: Hero {{ selectedHero }}</li>
                    <li v-for="extraNumber in _.range(1, 51)" :key="extraNumber" @click="showExtraPanel(extraNumber)"
                        class="cursor-pointer p-3 hover:bg-slate-700">
                        Extra {{ extraNumber }}
                    </li>
                </ul>
            </article>
        </section>

        <section class="overflow-y-auto flex-1 mr-[-50vw] invisible transition-all duration-500 border-l border-slate-700"
        :class="{'!visible !flex-1 !mr-[0vw]': selectedExtra}">
            <article class="mx-auto max-w-[640px] overflow-y-auto">
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

const removeSelectedHero = () => {
    selectedHero.value = ''
}

const mainContainer = ref(null)

onMounted(() => {
    const navHeight = document.getElementById('navbar').clientHeight + 2
    mainContainer.value.style.height = `calc(100vh - ${navHeight}px)`
})

</script>

<style>

</style>