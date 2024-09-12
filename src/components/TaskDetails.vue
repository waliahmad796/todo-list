<template>
  <div class="task">
    <q-item-section side top>
      <q-btn
        dense
        round
        color="transparent"
        text-color="balck"
        :class="{ active: task.isDone }"
        icon="favorite"
        @click="taskStore.toggleDone(task.id)"
      />
    </q-item-section>
    <q-item-section>
      <p>{{ task.title }}</p>
    </q-item-section>
    <q-item-section side top>
      <q-btn
        dense
        round
        color="transparent"
        text-color="black"
        icon="delete"
        @click="taskStore.deleteTask(task.id)"
      />
    </q-item-section>
  </div>
</template>

<script>
import { useTasksStore } from "src/stores/tasks";

export default {
  props: ["task"],
  data() {
    return {
      doneCheckBox: false,
    };
  },
  // methods: {
  //   check() {
  //     if (this.task.isDone) {
  //       this.doneCheckBox = true;
  //     } else {
  //       this.doneCheckBox = false;
  //     }
  //   },
  // },
  setup() {
    const taskStore = useTasksStore();

    return { taskStore };
  },
  // data() {
  //   return {
  //     checkbox: false,
  //   };
  // },
};
</script>

<style scoped>
.task {
  display: flex;
  justify-content: center;
  align-items: center;
}
.task p {
  margin-bottom: auto;
  font-size: 16px;
  font-weight: 500;
}
.active {
  color: red;
}
</style>
