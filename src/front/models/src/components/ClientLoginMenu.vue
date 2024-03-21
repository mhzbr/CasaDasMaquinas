<template>
    <div>
        <a :href="cliente"><button :class="{ 'highlight': isClient }">Cliente</button></a>
        <a :href="parceiro"><button :class="{ 'highlight': !isClient }">Parceiro(a)</button></a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        };
    },
    props: {
              isClient: {
            type: Boolean,
            default: true 
        },
        cliente: {
            type: String,
            default: '/' 
        },
        parceiro: {
            type: String,
            default: '/'
        }
    },

    methods: {
        toggleColors() {
            this.isClient = !this.isClient;
            this.sendToggle();
        },
        sendToggle() {
            this.$emit('onCLick'); 
        }
    }
};
</script>

<style scoped>

.button {
    width: 100%;
    background-color: #ccc;
    color: #000;
}


.highlight {
    width: 100%;
    background-color: #000;
    color: #fff;
}
</style>
