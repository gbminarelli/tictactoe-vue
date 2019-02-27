<template>
  <div class="grid-wrapper">
    <b-container class="grid my-3" :class="{ inactive: isInactive }">
      <p class="mb-5 mt-4"><span class="font-weight-bolder">{{ playerOne? 'X' : 'O'}}</span> Turn</p>
      <b-row>
        <Cell data-index=0 :playerOne="playerOne" @valueUpdated="updateGrid"/>
        <Cell data-index=1 :playerOne="playerOne" @valueUpdated="updateGrid"/>
        <Cell data-index=2 :playerOne="playerOne" @valueUpdated="updateGrid"/>
      </b-row>
      <b-row>
        <Cell data-index=3 :playerOne="playerOne" @valueUpdated="updateGrid"/>
        <Cell data-index=4 :playerOne="playerOne" @valueUpdated="updateGrid"/>
        <Cell data-index=5 :playerOne="playerOne" @valueUpdated="updateGrid"/>
      </b-row>
      <b-row>
        <Cell data-index=6 :playerOne="playerOne" @valueUpdated="updateGrid"/>
        <Cell data-index=7 :playerOne="playerOne" @valueUpdated="updateGrid"/>
        <Cell data-index=8 :playerOne="playerOne" @valueUpdated="updateGrid"/>
      </b-row>
    </b-container>
    <transition name="fade">
      <b-container v-if="isInactive && winner" align-h="center" class="mt-5">
        <p v-if="winner !== 3">Player {{ winner }} wins!</p>
        <p v-else>Draw!</p>
        <b-button @click="replay" id="replay-button">Replay?</b-button>
      </b-container>
    </transition>
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
        winner: null,
        turn: 1,
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
      updateGrid: function (value, targetIndex) {
        this.turn++;
        this.value[targetIndex] = value;
        this.gameOverCheck()
        if (!this.winner) {
          this.playerOne = !this.playerOne;
          // Bot
          if (this.singlePlayer && !this.playerOne) {
            this.isInactive = true;
            window.setTimeout(() => {
              this.bot();
              if (!this.winner) {
                this.isInactive = false;
              }
            }, 800);
          }
        }
      },
      gameOverCheck: function () {
        if (this.turn >= 10) {
          this.isInactive = true;
          this.winner = 3;
        } else {
          this.gameOverConditions.forEach((item) => {
            if (this.sameValues(this.value[item[0]], this.value[item[1]], this.value[item[2]])) {
              this.isInactive = true;
              this.winner = this.playerOne? 1 : 2;
            }
          });
        }
      },
      sameValues: function (a, b, c) {
        return a === b && a === c & a !== 3 ? true : false;
      },
      replay: function () {
        this.$router.go();
      },
      bot: function () {
        // TODO: Refactor
        let targetCell = null;
        this.gameOverConditions.forEach((item, index) => {
          if (this.sameValues(this.value[item[0]], this.value[item[1]], this.value[item[0]]) && this.value[item[2]] == 3) {
            if (this.value[item[0]] === 2 || !targetCell) {
              targetCell = item[2];
            }
          } else if (this.sameValues(this.value[item[0]], this.value[item[2]], this.value[item[0]]) && this.value[item[1]] == 3) {
            if (this.value[item[0]] === 2 || !targetCell) {
              targetCell = item[1];
            }
          } else if (this.sameValues(this.value[item[1]], this.value[item[2]], this.value[item[1]]) && this.value[item[0]] == 3) {
            if (this.value[item[1]] === 2 || !targetCell) {
              targetCell = item[0];
            }
          }
        });
        if (!targetCell && targetCell !== 0) {
          // TODO: Make the bot unbeatable: check for setups
          // TODO: Randomize
          if (this.botPaths()[0]) {
            this.botPaths()[0].forEach((pathValue) => {
              if (this.value[pathValue] === 3 && !targetCell && targetCell !== 0) {
                targetCell = pathValue;
              }
            });
          } else {
            targetCell = this.value.indexOf(3);
          }
        }
        if (targetCell || targetCell === 0) {
          // BUG: cell is rendered on the LocalMultiplayer grid if we quickly switch to it (navbar link) after triggering the bot.
          this.renderTargetCell(targetCell);
        }
      },
      botPaths: function () {
        return this.gameOverConditions.filter((path) => ![
          this.value[path[0]],
          this.value[path[1]],
          this.value[path[2]]
        ].includes(1));
      },
      renderTargetCell: function (targetCell) {
        document.querySelector(`[data-index="${targetCell}"]`).click();
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

  .grid {
    width: 360px;
  }

  #replay-button {
    background-color: #00a7e1;
    border: none;
  }

  #replay-button:hover {
    background-color: #007ea7;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .8s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
