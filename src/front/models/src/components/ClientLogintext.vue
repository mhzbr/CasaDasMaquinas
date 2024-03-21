<template>
    <div class="text">
        <p>{{ text }}</p>
        <a :href="linkProp">{{ linkText }}</a>
    </div>
</template>

<script>
export default {
    props: {
        linkProp: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            text: "Não possui uma conta? Clique aqui para se cadastrar!",
            linkText: "Cadastrar-se"
        };
    }
};
</script>

<style scoped>
.text {
    padding-left: 10px;
    justify-content: center;
    align-items: center;
    width: 70%;
    text-align: left;
}
</style>
