<template>
  <div class="overlay">
    <div class="close-btn" @click="close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></div>
    <div ref="talkjs" style="width: 1000px; margin: 30px; height: 500px">
      <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
      <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
      </div>
    </div>
  </div>
</template>

<script>
    import Talk from 'talkjs';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    export default {
      components: {
        PulseLoader
      },
      data() {
        return {
          loading: true,
          color: '#ba1a35',
          size: '50px'
        }
      },
        name: 'Inbox',
        props: {
            currentUser: {
              type: Object,
              required: true
          },
          chatWith: {
            type: Object,
            required: true
          }
        },
        methods: {
          close() {
            this.$emit('close');
          }
        },
        async mounted() {
          try{
          await Talk.ready
          const me = new Talk.User({
            id: this.currentUser.id,
            name: this.currentUser.firstName + ' ' + this.currentUser.lastName,
            email: this.currentUser.email,
            photoUrl: this.currentUser.photoPath,
            welcomeMessage: "Hey there! How are you? :-)",
            role: "booker"
          })

          const talkSession = new Talk.Session({
            appId: 't0PAhdLQ',
            me: me,
          });

          const other = new Talk.User({
            id: this.chatWith.id,
            name: this.chatWith.firstName + ' ' + this.chatWith.lastName,
            email: this.chatWith.email,
            photoUrl: this.chatWith.profile.photoPath,
            welcomeMessage: 'Hey, how can I help?',
          });

          const conversation = talkSession.getOrCreateConversation(
            Talk.oneOnOneId(me, other)
          );

          conversation.setParticipant(me);
          conversation.setParticipant(other);

          const inbox = talkSession.createInbox();
          inbox.select(conversation);

          inbox.mount(this.$refs.talkjs);
        }
        catch (error) {
          console.error('Error fetching profile:', error);
          alert('Erro ao carregar chat, cadastre-se ou tente fazer login novamente.');
          this.$emit('close');
        }
    }
  }
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11000;
} 
.close-btn {
  position: absolute;
  top: 5%;
  right: 10%;
  font-size: 2em;
  cursor: pointer;
  padding: 10px;
  border-radius: 50px;
  background-color: #ba1a35;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close-btn svg {
  fill: white;
  height: 30px;
}
i {
  color: white;
  font-size: 1.5em;
  text-align: center;
  margin-top: 20px;
}
</style>