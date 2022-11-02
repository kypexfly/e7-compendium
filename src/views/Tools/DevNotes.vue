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
                    WIP. Might take time to figure out filtering and  make it mobile compatible.
                </li>
                <li>
                    Where is ATK, HP, DEF, SPD in hero-data.json?
                </li>
            </ul>

            <h2 class="text-2xl font-thin">About "Tools > Calculator" page</h2>
            <ul class="list-disc m-6">
                <li>
                    Might need better user interface, I don't like it.
                </li>
                <li>
                    FribbelsOptimizer's formula will be used.
                </li>
            </ul>

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
<style>

</style>