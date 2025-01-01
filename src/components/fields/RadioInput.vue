<script setup lang="ts">
import useVuelidate, { ValidationArgs } from '@vuelidate/core';

const props = withDefaults(defineProps<{
    title: string,
    id?: string | undefined,
    value: unknown,
    childClass?: string,
    radioType?: "standard" | "pill" | "block",
    modelValue: unknown,
    disabled?: boolean,
    validation?: ValidationArgs,
}>(), {
    id: undefined,
    childClass: undefined,
    radioType: "standard",
    validation: undefined,
});

const emit = defineEmits<{
    (on:"update:modelValue", value: unknown): void
}>();

const v$ = useVuelidate();

const handleChange = () => {
    v$.value.$touch();
    emit('update:modelValue', props.value);
};
</script>

<template>
    <div :class="`radio-${radioType}`">
        <input
            :id="`${id}_${value}`"
            class="form-control radio btn-check"
            :value="value"
            :disabled="disabled"
            :checked="value === modelValue"
            type="radio"
            @change="handleChange"
        >
        <label
            :for="`${id}_${value}`"
            class="form-radio-label btn disable-selection align-middle show-pointer"
            :class="[childClass ? childClass : '', value === modelValue ? 'selected' : '']"
        >
            {{ title }}
        </label>
    </div>
</template>