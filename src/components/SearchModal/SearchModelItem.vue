<template>
    <a
        role="menuitem"
        ref="listitems"
        class="flex h-16 cursor-pointer items-center justify-between gap-1 rounded border-transparent px-6 hover:bg-neutral-300/50 focus:ring-0 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-teal-600/50"
        :class="{
            'border-transparent bg-neutral-300 dark:bg-teal-600':
                props.entry.display.highlighted,
        }"
    >
        <div
            class="flex items-center justify-start gap-4"
            :class="{
                'max-w-[75%]': props.entry.display.highlighted,
            }"
        >
            <div class="whitespace-nowrap">
                {{ props.entry.city }}
            </div>
            <span class="truncate text-sm text-gray-400">
                ({{ props.entry.country }})
            </span>
        </div>
        <span
            v-if="props.entry.display.added"
            class="h-8 w-8 flex-none rounded-full text-teal-500"
            :class="{
                'text-teal-500 dark:text-neutral-300':
                    props.entry.display.highlighted,
            }"
        >
            <CheckIcon class="h-full w-full" />
        </span>
        <span
            v-else-if="props.entry.display.highlighted"
            class="flex-none whitespace-nowrap text-teal-800 dark:text-neutral-300"
            >⏎ Add</span
        >
    </a>
</template>

<script setup lang="ts">
import CheckIcon from '~components/icons/CheckIcon.vue'
import { CityDisplay } from '~types'

const props = defineProps<{
    entry: CityDisplay
}>()
</script>

<style scoped></style>
