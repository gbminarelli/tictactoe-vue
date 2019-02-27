<template>
  <b-col @click="updateCell($event)" class="text-center">{{ valueString }}</b-col>
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
      updateCell: function(event) {
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
    font-size: 50px;
    line-height: 100px;
    height: 100px;
  }
</style>
