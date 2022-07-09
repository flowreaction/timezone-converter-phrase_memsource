<template>
    <button
        type="button"
        class="flex w-full flex-nowrap items-center justify-between gap-2 rounded-lg bg-teal-500 px-4 py-2 text-white transition-colors hover:bg-teal-600"
    >
        <SearchIcon />
        <div class="grow truncate whitespace-nowrap">
            <slot>Search</slot>
        </div>
    </button>
</template>

<script lang="ts" setup>
import SearchIcon from '~components/icons/SearchIcon.vue'
</script>

<style scoped></style>
