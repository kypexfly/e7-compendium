<template>
    <div class="flex justify-between gap-2 my-2">
        <span class="text-sm font-medium text-blue-700 dark:text-white">
            {{ label }}
        </span>
        <span class="text-sm font-medium text-blue-700 dark:text-white">
            {{ labelValue }}
        </span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
        <div class="bg-blue-600 h-1.5 rounded-full" :style="'width:' + progress + '%'"></div>
    </div>
</template>
<script>
export default {
    name: "ProgressBar",
    props: {
        label: String,
        labelValue: [String, Number],
        progress: Number
    }
}
</script>
<style>

</style>