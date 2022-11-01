<template>
    <main class="fix-padding">
        <div class="flex flex-col gap-5 items-center">
            <SearchBar v-model="searchTerm" />
            {{ searchTerm }}
        </div>
    </main>
</template>

<script>

import SearchBar from '../components/SearchBar.vue';
import { ref } from 'vue';
import getHeroesBase from '../composables/getHeroesBase';

export default {
    name: 'SearchHero',
    components: {
        SearchBar
    },
    setup() {
        const searchTerm = ref()
        const { heroes, load } = getHeroesBase()
        load()
        return { searchTerm, heroes }
    }
}
</script>