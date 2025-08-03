import { ref } from "vue";
import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export const useFirestore = () => {
  const loading = ref(false);
  const error = ref(null);

  const addTask = async (userId, taskData) => {
    loading.value = true;
    try {
      const tasksRef = collection(db, "users", userId, "tasks");
      const docRef = await addDoc(tasksRef, {
        ...taskData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      // Fetch the newly created task data
      const newTaskSnap = await getDoc(docRef);
      console.log("addTask: new task", {
        id: docRef.id,
        ...newTaskSnap.data(),
      });
      return { success: true, id: docRef.id, data: newTaskSnap.data() };
    } catch (err) {
      console.error("addTask Firestore error:", err);
      error.value = err.message;
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const getTasks = async (userId) => {
    loading.value = true;
    try {
      console.log("getTasks: userId", userId); // DEBUG
      const tasksRef = collection(db, "users", userId, "tasks");
      const q = query(tasksRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      console.log("getTasks: querySnapshot.size", querySnapshot.size); // DEBUG
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });
      console.log("getTasks: tasks", tasks);
      return { success: true, data: tasks };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const updateTask = async (userId, taskId, updates) => {
    loading.value = true;
    try {
      const taskRef = doc(db, "users", userId, "tasks", taskId);
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const deleteTask = async (userId, taskId) => {
    loading.value = true;
    try {
      const taskRef = doc(db, "users", userId, "tasks", taskId);
      await deleteDoc(taskRef);
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };

  const getUserStats = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      } else {
        const initialStats = {
          xp: 0,
          level: 1,
          streak: 0,
          lastCompletedDate: null,
          totalTasksCompleted: 0,
        };
        await setDoc(userRef, initialStats);
        return { success: true, data: initialStats };
      }
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    }
  };

  const updateUserStats = async (userId, updates) => {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(
        userRef,
        {
          ...updates,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, error: err.message };
    }
  };

  return {
    loading,
    error,
    addTask,
    getTasks,
    updateTask,
    deleteTask,
    getUserStats,
    updateUserStats,
  };
};
