import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasksStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),

  getters: {
    dones() {
      return this.tasks.filter((t) => t.isDone);
    },
    doneCount() {
      return this.tasks.reduce((p, c) => {
        return c.isDone ? p + 1 : p;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },

  actions: {
    async getTasks() {
      this.loading = true;
      const res = await fetch("http://localhost:3000/task");
      const data = await res.json();
      this.tasks = data;

      this.loading = false;
    },
    async addTask(task) {
      this.tasks.push(task);

      const res = await fetch("http://localhost:3000/task", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });

      if (res.error) {
        console.log("there is an error");
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((t) => {
        return t.id !== id;
      });

      const res = await fetch("http://localhost:3000/task/" + id, {
        method: "DELETE",
      });

      if (res.error) {
        console.log("there is an error");
      }
    },
    async toggleDone(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isDone = !task.isDone;

      const res = await fetch("http://localhost:3000/task/" + id, {
        method: "PATCH",
        body: JSON.stringify({ isDone: task.isDone }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.error) {
        console.log("there is an error");
      }
    },
  },

  // actions: {
  //   increment() {
  //     this.counter++;
  //   },
  // },
});
