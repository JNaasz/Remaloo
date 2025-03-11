<template>
  <div class="sheetData">
    <div class="title">
      <div class="last-date">
        <h2 v-if="lastTraing">
          Last Training: <br> {{ lastTraing }}
        </h2>
      </div>
      <v-btn v-if="!logTraining" @click="beginLog">
        Log Training
      </v-btn>
    </div>

    <div class="trainingItems" v-if="!logTraining">
      <TrainingItem v-for="item in sheetItems" :sheetItem="item"></TrainingItem>
    </div>

    <div class="training-form" v-if="logTraining">
      <TrainingForm 
      @update:trainingStatus="logTraining = $event"
      @update:submitSuccess="handleFormSubmit"></TrainingForm>
    </div>

    <v-alert 
      v-model="alert"
      title="Error Adding Training Log."
      text="Please try again."
      type="error"
      variant="tonal"
      closable
    ></v-alert>
  </div>
</template>

<script lang="ts">
import TrainingItem from '../components/TrainingItem.vue';
import TrainingForm from '../components/TrainingForm.vue';
import { getSheetData } from '../../../common/src/api/sheets';

export default {
  name: 'TrainingTracker',
  components: {
    TrainingItem,
    TrainingForm,
  },
  data: () => ({
    sheetData: undefined as SheetData | undefined,
    logTraining: false,
    date: '',
    duration: 0,
    place: '',
    comment: '',
    alert: false,
  }),
  computed: {
    sheetItems() {
      return this.sheetData?.sheets[0].items;
    },
    lastTraing() {
      return this.sheetItems != undefined ? this.sheetItems[0].Date : null;
    }
  },
  methods: {
    async fetchItems() {
      try {
        const data = await getSheetData('dog,plants');
        this.sheetData = data;
      } catch (error) {
        console.error('Error fetching sheet data:', error);
      }
    },
    beginLog() {
      this.logTraining = true;
    },
    cancel() {
      this.logTraining = false;
    },
    submit() {
      // re-fetch the training list
      this.fetchItems();
      this.logTraining = false;
    },
    handleFormSubmit(isSuccess: boolean) {
      console.log('handleFormSubmit', isSuccess);
      if (isSuccess) {
        this.logTraining = false;
        this.fetchItems();
      } else {
        this.alert = true;
      }

      console.log('this.alert', this.alert);
    }
  },
  async mounted() {
    this.fetchItems();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  display: flex;
  justify-content: space-between;

  .last-date {
    flex: 1 1 auto;
    text-align: left;
  }
}

li {
  display: inline-block;
  margin: 0 10px;
}

.training-form {
  /* TODO: mixin/extend */
  margin-top: 30px;
  border: 1px solid #6200ea;
  border-radius: 5px;
  padding: 10px;
}

.v-alert {
  margin-top: 20px;
  text-align: left;
}

/* TODO: close icon is not showing properly */
::v-deep(.v-alert__close .v-btn) {
  color: white;
  border: 2px solid white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
}

::v-deep(.v-alert__close .v-btn:hover) {
  background-color: rgba(255, 255, 255, 0.2);
  color: yellow;
}

::v-deep(.v-alert__close .mdi-close) {
  font-size: 20px;
}

</style>
