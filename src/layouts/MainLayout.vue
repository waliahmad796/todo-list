<template>
  <div
    class="container absolute-center row justify-around"
    style="
      background: rgb(208, 239, 255);
      border-radius: 15px;
      width: fit-content;
      padding-bottom: 30px;
    "
  >
    <!-- left-container
    <div class="col-4" style="background: #f0ffff">
      <div class="q-pa-md">
        <q-list>
          <q-slide-item
            class="bg-dark"
            style="border-radius: 15px; margin: 5px"
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img
                    src="https://cdn.quasar.dev/img/avatar1.jpg"
                    draggable="false"
                  />
                </q-avatar>
              </q-item-section>
              <q-item-section
                class="text-weight-bold text-left"
                style="color: azure"
                >Do it Mr Jonas</q-item-section
              >
            </q-item>
          </q-slide-item>
        </q-list>
      </div>
      <q-separator inset size="5px" />
      <div class="q-pa-md">
        <q-list>
          <q-item clickable class="text-black text-weight-bold text-subtitle1">
            <q-icon
              name="today"
              class="q-mr-md"
              size="sm"
              style="margin-top: 4px"
            />
            <q-item-section>Today Tasks</q-item-section>
          </q-item>
          <q-item>
            <q-list class="q-ml-lg collum text-black text-subline2">
              <q-item clickable>
                <q-badge rounded color="yellow" class="list-icon" />
                <q-item-section>Item</q-item-section>
              </q-item>

              <q-item clickable>
                <q-badge rounded color="green" class="list-icon" />
                <q-item-section>Item</q-item-section>
              </q-item>

              <q-item clickable>
                <q-badge rounded color="red" class="list-icon" />
                <q-item-section>Item</q-item-section>
              </q-item>
            </q-list>
          </q-item>
        </q-list>
      </div>
    </div>
    <q-separator vertical /> -->

    <!-- right container -->
    <div class="row">
      <div class="col-md-12 text-weight-bold text-h5 q-py-md text-center">
        What are your tasks for today?
      </div>
      <div class="col-md-12">
        <TaskForm />
      </div>
    </div>
    <div class="q-mt-md col-md-8">
      <nav class="q-gutter-sm row" style="float: right">
        <q-btn class="glossy" label="All the Tasks" @click="filter = 'all'" />
        <q-btn
          class="glossy"
          label="Favorite Tasks"
          @click="filter = 'dones'"
        />
      </nav>
    </div>
    <!-- Tasks parts and container -->
    <!-- All the taska -->
    <div class="col-md-8 q-gutter-md" v-if="filter === 'all'">
      <p>All the Tasks: {{ taskStore.totalCount }}</p>
      <div
        class="tasks"
        v-for="(task, ind) in taskStore.tasks"
        v-bind:key="ind"
        style="border: 1px dotted; border-radius: 5px"
      >
        <TaskDetails v-bind:task="task" />
      </div>
    </div>
    <!-- The task the was done -->
    <div class="col-md-8 q-mt-md q-gutter-md" v-if="filter === 'dones'">
      <p>Favorite tasks: {{ taskStore.doneCount }}</p>
      <div
        class="tasks"
        v-for="(task, ind) in taskStore.dones"
        v-bind:key="ind"
        style="border: 1px dotted; border-radius: 5px"
      >
        <TaskDetails v-bind:task="task" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useTasksStore } from "src/stores/tasks";
import TaskDetails from "src/components/TaskDetails.vue";
import TaskForm from "src/components/TaskForm.vue";
export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTasksStore();

    const filter = ref("all");
    taskStore.getTasks();
    return { taskStore, filter };
  },
  data() {
    return {
      note: "",
      notes: [],
      editIndex: null,
    };
  },
  methods: {
    add() {
      console.log(this.taskStore.tasks);

      // if (this.editIndex !== null) {
      //   this.notes[this.editIndex].note = this.note;
      //   this.note = "";
      //   this.editIndex = null;
      // } else if (this.note) {
      //   this.notes.unshift({ note: this.note });
      //   this.note = null;
      // }
    },

    destroy(index) {
      let arr = this.notes;
      for (let i = 0; i < arr.length; i++) {
        if (index == i) {
          arr.splice(index, 1);
        }
      }
    },
    edit(index) {
      let myArr = this.notes.find((element, ind) => {
        if (index == ind) {
          this.note = element.note;
          this.editIndex = ind;
        }
      });
    },
  },
};
</script>
<style scoped>
.list-icon {
  height: 5px;
  margin-top: 10px;
  margin-right: 5px;
}
</style>
