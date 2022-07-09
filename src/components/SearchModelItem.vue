<template>
    <a
        role="menuitem"
        ref="listitems"
        @click="addTimezone(props.entry)"
        class="flex h-16 cursor-pointer items-center justify-between gap-1 rounded border-transparent px-6 hover:bg-neutral-300/50 focus:ring-0 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-teal-600/50"
        :class="{
            'border-transparent bg-neutral-300 dark:bg-teal-600':
                props.entry.display.highlighted,
        }"
    >
        <div class="flex max-w-[90%] items-center justify-start gap-4">
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
            class="text-teal-800 dark:text-neutral-300"
            >⏎ Add</span
        >
    </a>
</template>

<script setup lang="ts">
import { useTimezones } from '../composables/useTimezones'
import CheckIcon from './icons/CheckIcon.vue'

const { addTimezone } = useTimezones()

const props = defineProps<{
    entry: {
        display: {
            highlighted: boolean
            added: boolean
        }
        city: string
        country: string
        timezone: string
        id: number
    }
}>()
</script>

<style scoped></style>
