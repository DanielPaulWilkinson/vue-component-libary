<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = withDefaults(defineProps<{
    coffeeDelay?: number;
    espressoDelay?: number;
    milkDelay?: number;
    foamDelay?: number;
    chocolateDelay?: number;
    coffeePercent?: number;
    espressoPercent?: number;
    milkPercent?: number;
    foamPercent?: number;
    chocolatePercent?: number;
}>(), {
    coffeeDelay: 0,
    espressoDelay: 0,
    milkDelay: 0,
    foamDelay: 0,
    chocolateDelay: 0,
    coffeePercent: 0,
    espressoPercent: 0,
    milkPercent: 0,
    foamPercent: 0,
    chocolatePercent: 0,
});


const fillElement = (className: string, delay: number) => {
    if (delay) {
        setTimeout(() => {
            const element = document.getElementsByClassName(`${className}`);
            element[0].classList.add('fill');
        }, delay);
    }
};

onMounted(() => {
    props.coffeePercent ? fillElement('coffee', props.coffeeDelay) : '';
    props.espressoPercent ? fillElement('espresso', props.espressoDelay) : '';
    props.milkPercent ? fillElement('milk', props.milkDelay) : '';
    props.foamPercent ? fillElement('foam', props.foamDelay) : '';
    props.chocolatePercent ? fillElement('chocolate', props.chocolateDelay) : '';
});
</script>

<template>
    <div class="coffee-container">
        <div class="glass">
            <div v-if="chocolatePercent" :style="`bottom:${(props.coffeePercent ?? 0) + (props.espressoPercent ?? 0) + (props.milkPercent ?? 0) + (props.foamPercent ?? 0)}%; height:${props.chocolatePercent}%`" class="chocolate" />
            <div v-if="foamPercent" :style="`bottom:${(props.coffeePercent ?? 0) + (props.espressoPercent ?? 0) + (props.milkPercent ?? 0)}%; height:${props.foamPercent ?? 0}%`" class="foam" />
            <div v-if="milkPercent" :style="`bottom:${(props.coffeePercent ?? 0) + (props.espressoPercent ?? 0)}%; height:${props.milkPercent ?? 0}%`" class="milk" />
            <div v-if="espressoPercent" :style="`bottom:0%; height:${props.espressoPercent ?? 0}%`" class="espresso" />
            <div v-if="coffeePercent" :style="`bottom:0%; height:${props.coffeePercent ?? 0}%`" class="coffee" />
        </div>
        <p>{{ `${props.coffeePercent || props.espressoPercent}% Espresso` }}</p>
        <p>{{ `${props.milkPercent}% Milk` }}</p>
        <p> 100% Yummy! </p>
    </div>
</template>

<style scoped>


#coffee-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.glass {
    position: relative;
    width: 100px;
    height: 200px;
    border: 2px solid #000;
    border-radius: 10px;
    overflow: hidden;
}

.glass div {
    position: absolute;
    width: 100%;
    transition: height 0.5s ease;
}

.chocolate {
    background-color: #7b3f00;
}

.foam {
    background-color: #fff;
}

.milk {
    background-color: #f3e5ab;
}

.espresso {
    background-color: #4b2e00;
}

.coffee {
    background-color: #6f4e37;
}

.fill {
    transition: height 1s ease;
}
</style>