<script setup lang="ts">
import useVuelidate, { ValidationArgs } from '@vuelidate/core';
import { useSlots } from 'vue';
import Validation from './Validation.vue';
import { watch } from 'vue';

    useSlots();
    const props = withDefaults(defineProps<{
        id: string,
        name: string,
        class?: string,
        error?: string,
        validation?: ValidationArgs,
        modelValue: number | string | boolean | null,
    }>(), {});

    const v$ = useVuelidate();

    watch(() => props.validation, () => {
        console.log(props.validation);
    });
</script>
<template>
    <div class="radio-set">
        <slot />
    </div>
    <Validation v-if="v$.$error" :model-value="modelValue" :validation="props.validation" />
</template>