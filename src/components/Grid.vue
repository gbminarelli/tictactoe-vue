<template>
  <div class="grid-wrapper">
    <b-container class="grid" :class="{ inactive: isInactive }">
      <b-row>
        <Cell data-index=0 :playerOne="playerOne" @valueUpdated="updatePlayer"/>
        <Cell data-index=1 :playerOne="playerOne" @valueUpdated="updatePlayer"/>
        <Cell data-index=2 :playerOne="playerOne" @valueUpdated="updatePlayer"/>
      </b-row>
      <b-row>
        <Cell data-index=3 :playerOne="playerOne" @valueUpdated="updatePlayer"/>
        <Cell data-index=4 :playerOne="playerOne" @valueUpdated="updatePlayer"/>
        <Cell data-index=5 :playerOne="playerOne" @valueUpdated="updatePlayer"/>
      </b-row>
      <b-row>
        <Cell data-index=6 :playerOne="playerOne" @valueUpdated="updatePlayer"/>
        <Cell data-index=7 :playerOne="playerOne" @valueUpdated="updatePlayer"/>
        <Cell data-index=8 :playerOne="playerOne" @valueUpdated="updatePlayer"/>
      </b-row>
    </b-container>
    <b-container v-if="isInactive" align-h="center" class="mt-5">
      <p>Player {{ playerOne? 1 : 2}} wins!</p>
      <b-button @click="replay">Replay?</b-button>
    </b-container>
  </div>
</template>

<script>
  import Cell from '@/components/Cell.vue'

  export default {
    name: 'Grid',
    components: {
      Cell
    },
    data: function () {
      return {
        playerOne: true,
        value: Array(9).fill(3),
        isInactive: false,
        gameOverConditions: [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ]
      }
    },
    methods: {
      updatePlayer: function (value, targetIndex) {
        this.value[targetIndex] = value;
        this.gameOverCheck()
        if (!this.isInactive) {
          this.playerOne = !this.playerOne;
          if (this.singlePlayer) {
            console.log(this.singlePlayer);
            // TODO: call bot
          }
        }
      },
      gameOverCheck: function () {
        this.gameOverConditions.forEach((item) => {
          if (this.sameValues(this.value[item[0]], this.value[item[1]], this.value[item[2]])) {
            this.isInactive = true;
          }
        });
      },
      sameValues: function (a, b, c) {
        return a === b && a === c & a !== 3 ? true : false;
      },
      replay: function () {
        this.$router.go();
      }
    },
    props: {
      singlePlayer: Boolean
    }
  }
</script>

<style scoped>
  .grid > .row:nth-of-type(-n+2) {
    border-bottom: 1px solid black;
  }

  .grid .col:nth-of-type(-n+2) {
    border-right: 1px solid black;
  }

  .inactive {
    pointer-events: none;
  }
</style>
