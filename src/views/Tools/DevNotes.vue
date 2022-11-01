<template>
    <main class="fix-padding">
        <div class="container mx-auto">
            <h1>
                Developer Notes
            </h1>
            <ul class="list-disc m-6">
                <li>
                    This project is using Vue 3 + Tailwind frameworks.
                </li>
                <li>
                    Search Hero page is WIP. It might take some time to figure out the filtering and  make it responsive design (mobile view).
                </li>
                <li>
                    ... +
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