<template>
  <form @submit.prevent="handleSubmit" class="row justify-center">
    <q-input
      class="col-md-10"
      dense
      rounded
      outlined
      autogrow
      required
      v-model="newTask"
      label="What is your next task?"
    />
    <q-btn class="glossy col-md-2" label="Add" rounded @click="handleSubmit" />
  </form>
</template>

<script>
import { ref } from "vue";
import { useTasksStore } from "src/stores/tasks";

export default {
  setup() {
    const taskStore = useTasksStore();

    const newTask = ref("");

    const handleSubmit = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          title: newTask.value,
          isDone: false,
          id: Math.floor(Math.random() * 100000),
        });
      }
      newTask.value = "";
    };

    return { handleSubmit, newTask };
  },
};
</script>
