<template>
  <b-col @click="updateValue($event)" class="text-center">{{ valueString }}</b-col>
</template>

<script>
  export default {
    name: 'Cell',
    data: function () {
      return {
        value: 3
      }
    },
    computed: {
      valueString: function() {
        return this.value === 3 ? "" : this.value === 1 ? "X" : this.value === 2 ? "O" : "ERROR";
      }
    },
    methods: {
      updateValue: function(event) {
        console.log(this.playerOne);
        if (this.value === 3) {
          this.value = this.playerOne ? 1 : 2;
          this.$emit('valueUpdated', this.value, event.target.dataset.index);
        }
      }
    },
    props: ['playerOne']
  }
</script>

<style scoped>
  .col {
    line-height: 50px;
    height: 50px;
    width: 50px;
  }
</style>
