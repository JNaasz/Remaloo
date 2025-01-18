<template>
  <div class="main">
    <v-container>
      <!-- <transition name="fade"> -->
      <TrainingTracker v-if="activeTab === 0" :sheetData="sheetData" class="grow"/>
      <div v-else class="grow"><p>Tab 3 content</p></div>
      <!-- </transition> -->
      <TabComponent :activeTab="activeTab" :tabs="tabs" @update:activeTab="activeTab = $event" class="fixed" />
    </v-container>
  </div>
</template>

<script lang="ts">
import TrainingTracker from './layouts/TrainingTracker.vue';
import TabComponent from './components/TabComponent.vue';

export default {
  name: 'App',
  components: {
    TrainingTracker,
    TabComponent,
  },
  data() {
    return {
      sheetData: undefined as SheetData | undefined,
      activeTab: 0,
      tabs: ['Home', 'Temp Tab']
    };
  },
}
</script>

<style scoped>
/* Basic app styles */
.main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 20px;
  height: 100%;
}

.main > div {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.grow {
  flex-grow: 1;
}

.fixed {
  flex-grow: 0;
}

</style>
