<template>
    <div>
        <SearchButton @click.prevent="openModal"> Add City</SearchButton>

        <Teleport to="body">
            <div
                v-if="modalIsOpen"
                id="modalbackdrop"
                class="absolute inset-0 z-10 bg-neutral-500/50 backdrop-blur-sm"
            >
                <div
                    ref="modal"
                    class="relative inset-0 h-screen overflow-hidden bg-neutral-100 p-4 dark:bg-neutral-800 md:left-1/2 md:top-[10%] md:h-fit md:max-w-3xl md:-translate-x-1/2 md:rounded-lg md:pb-10"
                >
                    <div class="mb-8 flex items-center justify-between gap-1">
                        <div class="relative w-full">
                            <input
                                type="search"
                                ref="input"
                                id="zonesearch"
                                name="zonesearch"
                                placeholder="City name"
                                @keydown.up.exact.prevent="focusPrevious(true)"
                                @keydown.down.exact.prevent="focusNext(true)"
                                @keydown.esc.exact="closeModal"
                                @keydown.enter.exact.prevent="
                                    enterSearchedCity(focusedIndex)
                                "
                                v-model="search"
                                class="form-input h-16 w-full rounded-md bg-white py-2 px-6 text-2xl text-neutral-900 placeholder:text-neutral-400 focus:border-green-400 focus:ring-0 dark:bg-neutral-600 dark:text-neutral-200"
                            />
                            <div
                                class="absolute right-2 top-1/2 h-full w-12 -translate-y-1/2 cursor-pointer p-2 text-teal-800 dark:text-teal-500"
                                @click="clearSearch"
                            >
                                <XIcon class="h-full w-full" />
                            </div>
                        </div>
                        <button
                            class="h-full w-fit px-2 text-pink-700 dark:text-pink-400"
                            @click.prevent="closeModal"
                        >
                            Cancel
                        </button>
                    </div>
                    <div
                        class="box-border h-full overflow-y-scroll md:h-[60vh]"
                    >
                        <div v-if="results.length === 0">
                            <p
                                class="flex h-64 items-center justify-center text-gray-500"
                            >
                                No recent searches
                            </p>
                        </div>
                        <div
                            v-else
                            class="flex flex-col justify-start gap-1 overflow-y-scroll pb-4"
                        >
                            <span
                                v-if="
                                    recentSearches.length > 0 && search === ''
                                "
                                class="text-neutral-500"
                                >Recent searches</span
                            >
                            <SearchModelItem
                                @click="
                                    breakpoint.isSmaller('md')
                                        ? closeModal()
                                        : null
                                "
                                v-for="(entry, index) in results"
                                :key="index"
                                :entry="entry"
                            />
                        </div>
                    </div>
                    <footer
                        v-if="breakpoint.isGreater('md')"
                        class="absolute bottom-4 z-50 -m-4 mt-8 flex h-10 w-full items-center justify-center gap-8 whitespace-nowrap border-t border-neutral-500 px-4 text-sm text-neutral-500 dark:bg-neutral-900"
                        id="modalfooter"
                    >
                        <span>⏎ to select</span>
                        <span>↑ ↓ to navigate</span>
                        <div class="flex items-center justify-start">
                            <span class="text-4xl">␛</span><span>to exit</span>
                        </div>
                    </footer>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch, watchEffect } from 'vue'
import {
    onClickOutside,
    useBreakpoints,
    breakpointsTailwind,
    useStorage,
} from '@vueuse/core'

import SearchButton from './SearchButton.vue'
import SearchModelItem from './SearchModelItem.vue'
import XIcon from './icons/XIcon.vue'

import { City, useTimezones } from '../composables/useTimezones'

// define city interface
interface CityDisplay extends City {
    display: {
        highlighted: boolean
        added: boolean
    }
}

//local storage
const recentSearches = useStorage<CityDisplay[]>('recentSearches', [])

//getting the current breakpoint
const breakpoint = useBreakpoints(breakpointsTailwind)

//template refs
const input = ref<HTMLInputElement | null>(null)
const modal = ref<HTMLDivElement>()

//Modal controls
const modalIsOpen = ref(false)
const openModal = () => {
    modalIsOpen.value = true
}
const closeModal = () => {
    modalIsOpen.value = false
    search.value = ''
}
// autofocues input element on open of modal
watch(modalIsOpen, () => {
    if (modal.value && input.value) {
        input.value.focus()
    }
})
onClickOutside(modal, () => closeModal())

//search controlls
const clearSearch = () => {
    search.value = ''
    input.value?.focus()
}

//autofocus on input element
const focusInput = ref(false)
watchEffect(() => {
    if (input.value) {
        input.value.focus()
    }
})

//getting the cities and timezone state
const { selectedCities, addTimezone, filteredCities } = useTimezones()

//add selected city to local storage and to state
const enterSearchedCity = (index: number) => {
    addTimezone(results.value[index])
    addToRecentSearches(results.value[index])
}

const addToRecentSearches = (city: CityDisplay) => {
    const index = recentSearches.value.findIndex(
        (zone) => zone.city === city.city && zone.country === city.country
    )
    if (index === -1) {
        recentSearches.value.push({
            display: {
                added: false,
                highlighted: false,
            },
            city: city.city,
            country: city.country,
            timezone: city.timezone,
            id: city.id,
        })
    }
}

//local search state and searching mechanisms
const search = ref('')
const results = ref<CityDisplay[]>([])

//get filtered array and map to results with aditional properties
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
//set results array to recent searches if search is empty
watchEffect(() => {
    if (!search.value) {
        results.value = recentSearches.value.map((city) => {
            return {
                ...city,
                display: {
                    highlighted: false,
                    added: selectedCities.value.some(
                        (selectedCity) => selectedCity.id === city.id
                    ),
                },
            }
        })
    }
})

//keyboard navigation
const focusedIndex = ref(0)

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
