<template>
    <div>
        <input
            ref="input"
            @click="searching = true"
            @keydown.up.exact.prevent="focusPrevious(true)"
            @keydown.down.exact.prevent="focusNext(true)"
            @keydown.esc.exact="
                () => {
                    searching = false
                    search = ''
                    currentValue = ''
                }
            "
            class="w-full rounded-full border py-2 px-4 dark:bg-stone-300 dark:text-neutral-900"
            type="search"
            placeholder="City name"
            :placeholder="currentValue"
            name="zonesearch"
            id="zonesearch"
            @input="debounceSearch"
            :class="{
                'rounded-b-none rounded-t-3xl': searching,
            }"
        />
        <!-- :value="currentValue" -->
        <div
            v-if="searching"
            ref="dropdown"
            class="max-h-80 overflow-y-scroll rounded-3xl border bg-white dark:bg-neutral-300"
            :class="{
                'rounded-t-none': searching,
            }"
        >
            <a
                role="menuitem"
                tabindex="-1"
                v-for="(result, index) in results"
                :key="index"
                :id="`menuitem${index}`"
                ref="listitems"
                @keydown.up.exact.prevent="focusPrevious(true)"
                @keydown.down.exact.prevent="focusNext(true)"
                @keydown.esc.exact="input?.focus()"
                @mouseover="focusItem(index), (focusedIndex = index)"
                @mouseleave="blurItem(index), (focusedIndex = -1)"
                @click="addTimezone(result)"
                @keydown.enter.exact.prevent="addTimezone(result)"
                @focus="currentValue = result.city"
                class="flex h-10 cursor-pointer items-center justify-start gap-3 px-4 ring-0 last:border-none hover:rounded focus:bg-neutral-100 focus:ring-0 dark:text-neutral-900 dark:focus:bg-neutral-200"
            >
                {{ result.city }}
                <span class="text-base text-gray-600"
                    >({{ result.country }})</span
                >
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { City, useTimezones } from '../composables/useTimezones'
import { onClickOutside } from '@vueuse/core'

const { cityMapped, addTimezone, removeTimezone, filteredCities } =
    useTimezones()

const dropdown = ref<HTMLElement | null>(null)
onClickOutside(dropdown, () => (searching.value = false))

const searching = ref(false)
const search = ref('')

const debouncer = ref<NodeJS.Timeout>()
const debounceSearch = (event: Event) => {
    if (!searching.value) searching.value = true
    focusedIndex.value = -1
    currentValue.value = (event.target as HTMLInputElement).value
    clearTimeout(debouncer.value)
    debouncer.value = setTimeout(() => {
        search.value = (event.target as HTMLInputElement).value
    }, 300)
}
const results = computed(() => {
    return filteredCities(search.value)
})

//keyboard navigation
const input = ref<HTMLInputElement | null>(null)
const listitems = ref<HTMLElement[] | null>(null)
const focusedIndex = ref(-1)
const currentValue = ref('')
const focusNext = (wrap: boolean) => {
    if (focusedIndex.value < results.value.length - 1) {
        focusedIndex.value++
        focusItem(focusedIndex.value)
    }
}
const focusPrevious = (wrap: boolean) => {
    if (focusedIndex.value > 0) {
        focusedIndex.value--
        focusItem(focusedIndex.value)
    } else if (focusedIndex.value === 0) {
        input.value?.focus()
        focusedIndex.value = -1
    }
}
const focusItem = (index: number) => {
    if (listitems.value) {
        listitems.value[index].focus()
    }
}
const blurItem = (index: number) => {
    if (listitems.value) {
        listitems.value[index].blur()
    }
}
</script>

<style scoped></style>
