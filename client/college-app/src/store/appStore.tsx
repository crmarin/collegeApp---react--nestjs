import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";
import api from "../components/utils/api";

const actionDefault = {
  teachers: false,
  students: false,
  classes: false,
};
const totalActions = ["teachers", "students", "classes"];

const store = (set, get) => ({
  error: null,
  action: actionDefault,
  success: false,
  users: [],
  _classes: [],
  teachers: [],
  students: [],
  user: null,
  _class: null,
  setAction: (_option: number) => {
    set({ action: actionDefault }, false, {
      type: "setActionDefault",
    });
    set({ action: { ...get().action, [totalActions[_option]]: true } }, false, {
      type: "setAction",
    });
  },
  getAllUsers: async () => {
    try {
      const { teachers, students, classes } = get().action;
      let data = {};
      if (students) {
        const response = await api.get("students");
        data = response.data;
      }
      if (teachers) {
        const response = await api.get("teachers");
        data = response.data;
      }
      set({ users: data }, false, { type: "getAllusers" });
      if (classes) {
        const teachers = await api.get("teachers");
        data = teachers.data;
        set({ teachers: data }, false, { type: "getAllusers" });
        const students = await api.get("students");
        data = students.data;
        set({ students: data }, false, { type: "getAllusers" });
      }
    } catch (err) {
      set({ error: err.response }, false, {
        type: "getAllUsers-fail",
      });
    }
  },
  getUser: async (id) => {
    try {
      const { teachers, students } = get().action;
      let data = {};
      if (students) {
        const response = await api.get(`students/${id}`);
        data = response.data;
      }
      if (teachers) {
        const response = await api.get(`teachers/${id}`);
        data = response.data;
      }
      set({ user: data }, false, { type: "getUser" });
    } catch (err) {
      set({ error: err.response }, false, {
        type: "getUser-fail",
      });
    }
  },
  getAllClasses: async () => {
    try {
      const response = await api.get("classes");
      set({ _classes: response.data }, false, { type: "getAllClasses" });
    } catch (err) {
      set({ error: err.response }, false, {
        type: "getAllClasses-fail",
      });
    }
  },
  getClass: async (id) => {
    try {
      const response = await api.get(`classes/${id}`);
      set({ _class: response.data }, false, { type: "getClass" });
    } catch (err) {
      set({ error: err.response }, false, {
        type: "getClass-fail",
      });
    }
  },
  registerUser: async (formData) => {
    try {
      const { teachers, students } = get().action;
      if (students) {
        await api.post("students", formData);
      }
      if (teachers) {
        await api.post("teachers", formData);
      }
      set({ success: !get().success }, false, {
        type: "registerUser",
      });
      get().getAllUsers();
    } catch (err) {
      set({ error: err.response }, false, {
        type: "registerUser-fail",
      });
    }
  },
  editUser: async (formData) => {
    try {
      const { teachers, students } = get().action;
      if (students) {
        await api.put(`students/${get().user.id}`, formData);
      }
      if (teachers) {
        await api.put(`teachers/${get().user.id}`, formData);
      }
      set({ success: !get().success }, false, {
        type: "editUser",
      });
      set({ user: null }, false, {});
      get().getAllUsers();
    } catch (err) {
      set({ error: err.response }, false, {
        type: "editUser-fail",
      });
    }
  },
  removeUser: async (id) => {
    try {
      const { teachers, students } = get().action;
      if (students) {
        await api.delete(`students/${id}`);
      }
      if (teachers) {
        await api.delete(`teachers/${id}`);
      }
      set({ success: !get().success }, false, {
        type: "removeUser",
      });
      get().getAllUsers();
    } catch (err) {
      set({ error: err.response }, false, {
        type: "removeUser-fail",
      });
    }
  },
  registerClass: async (formData) => {
    try {
      await api.post("classes", formData);

      set({ success: !get().success }, false, {
        type: "registerClass",
      });
      get().getAllClasses();
    } catch (err) {
      set({ error: err.response }, false, {
        type: "registerClass-fail",
      });
    }
  },
  editClass: async (formData) => {
    try {
      await api.put(`classes/${get()._class.id}`, formData);

      set({ success: !get().success }, false, {
        type: "editClass",
      });
      set({ _class: null }, false, {});
      get().getAllClasses();
    } catch (err) {
      set({ error: err.response }, false, {
        type: "editClass-fail",
      });
    }
  },
  removeClass: async (id) => {
    try {
      await api.delete(`classes/${id}`);
      set({ success: !get().success }, false, {
        type: "removeClass",
      });
      get().getAllClasses();
    } catch (err) {
      set({ error: err.response }, false, {
        type: "removeClass-fail",
      });
    }
  },
});

const appStore = createWithEqualityFn(
  devtools(store, {
    name: "accordion",
  }),
  Object.is // Specify the default equality function, which can be shallow
);

export { appStore };
