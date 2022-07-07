<template>
    <div>
        <input
            ref="input"
            @click="searching = true"
            @keydown.up.exact.prevent="focusPrevious(true)"
            @keydown.down.exact.prevent="focusNext(true)"
            @keydown.esc.exact="searching = false"
            class="w-full rounded-full border py-2 px-4 dark:bg-stone-300 dark:text-neutral-900"
            type="text"
            placeholder="City name"
            name="zonesearch"
            id="zonesearch"
            v-model="search"
            :class="{
                'rounded-b-none rounded-t-3xl': searching,
            }"
        />
        <div
            v-if="searching"
            ref="dropdown"
            class="max-h-80 overflow-y-scroll rounded-3xl border bg-white dark:bg-neutral-300"
            :class="{
                'rounded-t-none': searching,
            }"
        >
            <div
                v-for="(result, index) in results"
                :key="index"
                ref="listitems"
                @click="addTimezone(result)"
                @keydown.enter.exact.prevent="
                    addTimezone(result), (search = '')
                "
                class="flex h-10 cursor-pointer items-center justify-start gap-3 px-4 last:border-none hover:rounded hover:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
                {{ result.city }}
                <span class="text-base text-gray-600"
                    >({{ result.country }})</span
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { City, useTimezones } from '../composables/useTimezones'
import { onClickOutside } from '@vueuse/core'

const { cityMapped, addTimezone, removeTimezone } = useTimezones()

const dropdown = ref<HTMLElement | null>(null)
onClickOutside(dropdown, () => (searching.value = false))

const addToTimezoneList = (city: City) => {
    console.log('adding', city)
    addTimezone(city)
}
const testFunc = () => {
    console.log('click')
}

const searching = ref(false)

const search = ref('')
const results = computed(() => {
    return cityMapped.value.filter(
        (city) => city.city.toLowerCase().includes(search.value.toLowerCase()) //||
        // city.country.toLowerCase().includes(search.value.toLowerCase())
    )
    // .slice(0, 50)
})

//keyboard navigation
const listitems = ref<HTMLElement[] | null>(null)
const focusedIndex = ref(0)
const focusNext = (wrap: boolean) => {
    if (focusedIndex.value < results.value.length - 1) {
        focusedIndex.value++
        focusItem(focusedIndex.value)
    } else if (wrap) {
        focusedIndex.value = 0
    }
}
const focusPrevious = (wrap: boolean) => {
    if (focusedIndex.value > 0) {
        focusedIndex.value--
        focusItem(focusedIndex.value)
    } else if (wrap) {
        focusedIndex.value = results.value.length - 1
    }
}
const focusItem = (index: number) => {
    if (listitems.value) {
        listitems.value[index].focus()
    }
}
</script>

<style scoped></style>
