<template>
    <div class="border-b">
        <div
            class="flex justify-between bg-neutral-200 p-4 text-2xl focus:ring-0 dark:border-b dark:bg-neutral-900"
        >
            <div class="w-1/3">City</div>
            <div class="w-1/3">Time</div>
            <div class="w-1/3">
                TZ
                <button
                    @click="toggleTzView"
                    data-testid="toggle-tz-view"
                    class="w-16 cursor-pointer px-1 text-base text-teal-500"
                >
                    {{ tzView === 'number' ? 'offset' : 'name' }}
                </button>
            </div>
        </div>
        <div class="flex h-full flex-col">
            <slot :tzview="tzView">
                <div
                    data-testid="timezonelist-defaultslot"
                    class="flex justify-center border-stone-500 p-4 text-center text-2xl text-neutral-500 dark:border-b dark:bg-neutral-900"
                >
                    No cities have been added. <br />
                    Add one and it will appear here.
                </div>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TimeZoneView } from '~types'

const tzView = ref<TimeZoneView>('name')
const toggleTzView = () => {
    switch (tzView.value) {
        case 'name':
            tzView.value = 'number'
            break
        case 'number':
            tzView.value = 'name'
            break
        // no default can ever happen here
    }
}
</script>

<style scoped></style>
