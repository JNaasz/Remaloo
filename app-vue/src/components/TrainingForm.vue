<template>
	<form @submit.prevent="submit">
		<!-- TODO: add date picker popup to modify date - https://vuetifyjs.com/en/components/date-pickers/#guide -->
		<v-text-field v-model="date" type="date" label="Practice Date:"></v-text-field>
		<v-text-field v-model="duration" label="How many minutes did you practice?"></v-text-field>
		<v-text-field v-model="place" label="Where were you practicing?"></v-text-field>
		<v-text-field v-model="comment" label="Additional comments:"></v-text-field>

		<div class="buttons">
			<v-btn @click="cancel" class="me-4">Cancel</v-btn>
			<v-btn @click="submit">Submit</v-btn>
		</div>

	</form>
</template>

<script lang="ts">
import { setSheetData } from '../../../common/api/sheets';
import user from '../../../common/config/user';

export default {
  name: 'DogForm',
  data: () => ({
    date: '',
    duration: 0,
    place: '',
    comment: ''
  }),
  methods: {
    cancel() {
      this.$emit('update:trainingStatus', false);
    },
    async submit() {
			const sheetItem: SheetItem = this.buildSheetItem();
			const response: PostResponse = await setSheetData(sheetItem);
			if (response.success) {
				this.$emit('update:submitSuccess', true);
			} else {
				this.$emit('update:submitSuccess', false);
				console.error('Error adding training item:', response.error);
			}
    },
    setInitialDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
      this.date = `${year}-${month}-${day}`; // Format: YYYY-MM-DD
    },
		formatDate(date: string): string {
			const dateParts = date.split('-');
			return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`
		},
		buildSheetItem(): SheetItem {
			const sheetItem: SheetItem = {
				Date: this.formatDate(this.date),
				Duration: this.duration,
				Place: this.place,
				Comment: this.comment,
				Person: user,
			}
			return sheetItem;
		}
  },

  mounted() {
    this.setInitialDate();
  }
}
</script>

<style scoped>
.buttons {
	text-align: right;

	button {
		margin-left: 10px;
	}
}
</style>