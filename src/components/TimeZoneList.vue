<template>
    <div class="rounded border-b">
        <div
            class="flex justify-between bg-neutral-200 p-4 text-2xl focus:ring-0 dark:border-b dark:bg-neutral-900"
        >
            <span class="grow px-2">City</span>
            <span class="grow px-2">Time</span>
            <span class="grow px-2">TZ</span>
        </div>
        <div class="flex h-full flex-col">
            <slot>
                <div
                    class="flex justify-center border-stone-500 p-4 text-2xl text-neutral-500 dark:border-b dark:bg-neutral-900"
                >
                    No cities have been added yet. Enter a city name to add one.
                </div>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
