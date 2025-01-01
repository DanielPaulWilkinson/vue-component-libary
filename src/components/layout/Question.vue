<script setup lang="ts">
import { ref, useSlots } from 'vue';
useSlots();

withDefaults(defineProps<{
    name: string,
    label: string,
    tooltip: string,
    formGroup?: boolean,
    error?: string,
}>(), {
    formGroup: true,
    error: '',
})

const showTooltip = ref(false);

</script>
<template>
        <fieldset :aria-labelledby="`${name}-id`">
            <div class="row mt-2" :class="{'_has_error': error}">
                <div :class="tooltip ? 'col-11 col-md-10 col-lg-10 col-xl-11' : 'col-12'">
                    <legend class="col-form-label">
                        <span>
                            {{label}}
                        </span>
                        <button v-if="tooltip" aria-label="Click for help text" class="circle primary text-center" :class="{'tooltip-button':tooltip}" type="button"
                        aria-expanded="false" :aria-controls="name + '_collapse'" @click="showTooltip = !showTooltip">
                        ?
                    </button>
                    </legend>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <slot />
                </div>
            </div>
            <Transition>
                <div v-if="showTooltip" :id="name + '_collapse'" class="show">
                    <div class="alert alert-warning alert-dismissible fade show mb-4" role="alert">
                        <span v-if="tooltip" v-html="tooltip" />
                        <slot v-if="!tooltip" name="tooltip" />
                        <button type="button" class="btn-close" aria-label="Close" @click="showTooltip = false" />
                    </div>
                </div>
            </Transition>
        </fieldset>
</template>
<style>
.tooltip-button {
    margin-left: 10px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
