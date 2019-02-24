<template>
  <div>
    <Grid :singlePlayer="true" />
  </div>
</template>

<script>
  import Grid from '@/components/Grid.vue'

  export default {
    name: 'SinglePlayer',
    components: {
      Grid
    }
  }
</script>
