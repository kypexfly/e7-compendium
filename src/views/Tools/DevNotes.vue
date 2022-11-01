<template>
    <main class="fix-padding">
        <div class="container mx-auto">
            <h1 class="my-5 text-center">
                Developer Notes
            </h1>
            
            <h2 class="text-2xl font-thin">About The Project</h2>

            <ul class="list-disc m-6">
                <li>
                    This project is using Vue 3 + Tailwind framework.
                </li>
            </ul>

            <h2 class="text-2xl font-thin">About "Game Data" page</h2>
            <ul class="list-disc m-6">
                <li>
                    <strike>WIP. Might take time to figure out filtering and  make it mobile compatible.</strike>
                </li>
                <li>
                    <strike>Where is ATK, HP, DEF, SPD in hero-data.json?</strike> 
                </li>
                <li>
                    Might be better to put raw values of ATK, HP, DEF and SPD instead calculating because of browser performance.
                </li>
                <li>
                    I suggest adding lazy load, it means when scrolling loads the needed data and make the page smoother. Just that I don't know how to 😢
                </li>
                <li>
                    Sorting by clicking table header needs 
                </li>
            </ul>

            <!-- <h2 class="text-2xl font-thin">About "Tools > Calculator" page</h2>
            <ul class="list-disc m-6">
                <li>
                    Might need better user interface, I don't like it.
                </li>
                <li>
                    FribbelsOptimizer's formula will be used.
                </li>
                <li>
                    Forgot to ask, but what type of calculator is it?
                </li>
            </ul> -->

            <small>This section will deleted after finishing the project.</small>
        </div>
    </main>
</template>
<script>
export default {
    name: 'DevNotes',
    created() {
        document.title = "DevNotes | E7Compendium "
    }
}
</script>
<style scoped>
strike {
    @apply text-slate-600
}
</style>