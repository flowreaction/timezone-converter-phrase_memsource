<template>
    <div>
        <input
            type="search"
            ref="input"
            id="zonesearch"
            name="zonesearch"
            placeholder="City name"
            @click="searching = true"
            @keydown.up.exact.prevent="focusPrevious(true)"
            @keydown.down.exact.prevent="focusNext(true)"
            @keydown.esc.exact="resetInputField"
            @keydown.enter.exact.prevent="addTimezone(results[focusedIndex])"
            @input="searchForCity"
            class="form-input w-full rounded-full border border-black py-2 px-6 text-xl focus:border-black focus:ring-0 dark:bg-stone-300 dark:text-neutral-900"
            :class="{
                'rounded-b-none rounded-t-3xl': searching,
            }"
        />
        <div
            v-if="searching"
            ref="dropdown"
            class="overflow-hidden rounded-3xl border border-black bg-white dark:bg-neutral-300"
            :class="{
                'rounded-t-none': searching,
            }"
        >
            <div
                v-if="results.length === 0"
                class="flex h-12 items-center justify-center text-gray-500"
            >
                Enter a city name to search.
            </div>
            <a
                v-for="(entry, index) in results"
                :key="index"
                role="menuitem"
                tabindex="-1"
                ref="listitems"
                @click="addTimezone(entry)"
                class="flex h-10 cursor-pointer items-center justify-between gap-1 border-transparent px-6 last:border-none hover:bg-stone-200 focus:ring-0 dark:text-neutral-900"
                :class="{
                    'border-transparent bg-neutral-100 dark:bg-neutral-200':
                        entry.display.highlighted,
                }"
            >
                <div class="flex max-w-[90%] items-center justify-start gap-4">
                    <div class="whitespace-nowrap">
                        {{ entry.city }}
                    </div>
                    <span class="truncate text-sm text-gray-600">
                        ({{ entry.country }})
                    </span>
                </div>
                <span
                    v-if="entry.display.added"
                    class="flex-none rounded-full bg-green-600 text-white"
                >
                    <CheckIcon />
                </span>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { City, useTimezones } from '../composables/useTimezones'
import CheckIcon from './icons/CheckIcon.vue'

const { selectedCities, addTimezone, removeTimezone, filteredCities } =
    useTimezones()

const dropdown = ref<HTMLElement | null>(null)

onClickOutside(dropdown, () => (searching.value = false))

const searching = ref(false)

const search = ref('')

interface CityDisplay extends City {
    display: {
        highlighted: boolean
        added: boolean
    }
}

const searchForCity = (event: Event) => {
    if (!searching.value) searching.value = true

    search.value = (event.target as HTMLInputElement).value
}

const results = ref<CityDisplay[]>([])

watchEffect(() => {
    const state = filteredCities(search.value)
    results.value = state.map((city) => ({
        ...city,
        display: {
            highlighted: false,
            added: selectedCities.value.some(
                (selectedCity) => selectedCity.id === city.id
            ),
        },
    }))
})

const resetInputField = () => {
    if (!searching.value) {
        input.value?.blur()
    }
    searching.value = false
    search.value = ''
    focusedIndex.value = -1
}

//keyboard navigation
const input = ref<HTMLInputElement | null>(null)
const listitems = ref<HTMLElement[] | null>(null)
const focusedIndex = ref(-1)

const focusNext = (wrap: boolean) => {
    if (focusedIndex.value < results.value.length - 1) {
        focusedIndex.value++
    } else if (wrap) {
        focusedIndex.value = 0
    }
}
const focusPrevious = (wrap: boolean) => {
    if (focusedIndex.value > 0) {
        focusedIndex.value--
    } else if (focusedIndex.value === 0 && wrap) {
        focusedIndex.value = results.value.length - 1
    }
}

watch(focusedIndex, (newIndex, oldIndex) => {
    if (results.value.length === 0) return
    unHighlightItem(oldIndex)
    highlightItem(newIndex)
})

watch(search, () => {
    if (search.value) {
        if (results.value.length === 0) return
        focusedIndex.value = 0
        highlightItem(0)
    }
})

const highlightItem = (index: number) => {
    if (results.value) {
        results.value[index].display.highlighted = true
    }
}
const unHighlightItem = (index: number) => {
    if (results.value && index >= 0) {
        results.value[index].display.highlighted = false
    }
}
</script>

<style scoped></style>
