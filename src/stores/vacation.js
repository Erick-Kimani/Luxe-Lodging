import { defineStore } from "pinia";
import { ref, shallowRef, computed } from "vue";
import api from "@/services/api";

export const useVacationStore = defineStore("Vacation", () => {

  const headers = [
    { title: "ID", key: "id", align: "start" },
    { title: "Name", key: "name" },
    { title: "Price", key: "price" },
    { title: "Description", key: "description" },
    { title: "Vacation Code", key: "vacation_code" },
    { title: "Website URL", key: "website_url" },
    { title: "Vacation Image", key: "vacation_image" },
    { title: "Actions", key: "actions", align: "end", sortable: false },
  ];

  const Vacations = ref([]);
  const dialog = shallowRef(false);
  const formModel = ref(createNewRecord());

  const isEditing = computed(() => !!formModel.value.id);

  function createNewRecord() {
    return {
      id: null,
      name: "",
      price: "",
      description: "",
      vacation_code: "",
      website_url: "",
      vacation_image: null,
    };
  }

  function buildFormData() {
    const fd = new FormData();

    Object.keys(formModel.value).forEach((key) => {
      const value = formModel.value[key];
      if (key === "vacation_image" && !value) return;
      fd.append(key, value);
    });

    return fd;
  }

  // ✅ FIXED: correct REST endpoints
  async function save() {
    try {
      const formData = buildFormData();

      if (isEditing.value) {
        await api.post(
          `/vacations/${formModel.value.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            params: { _method: "PUT" }, // Laravel-friendly PUT
          }
        );
      } else {
        await api.post(
          "/vacations",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      await getVacations();
      dialog.value = false;
      formModel.value = createNewRecord();

    } catch (error) {
      console.error("Failed to save vacation hotel", error);
    }
  }

  async function getVacations() {
    try {
      const response = await api.get("/vacations");
      Vacations.value = response.data.Vacation || response.data || [];
    } catch (error) {
      console.error("Failed to fetch vacation hotels", error);
    }
  }

  function add() {
    formModel.value = createNewRecord();
    dialog.value = true;
  }

  function edit(id) {
    const found = Vacations.value.find(v => v.id === id);
    if (!found) return;

    formModel.value = {
      id: found.id,
      name: found.name,
      price: found.price,
      description: found.description,
      vacation_code: found.vacation_code,
      website_url: found.website_url,
      vacation_image: null,
    };

    dialog.value = true;
  }

  // ✅ FIXED: correct delete endpoint
  async function remove(id) {
    if (!confirm("Are you sure you want to delete this?")) return;

    try {
      await api.delete(`/vacations/${id}`);
      await getVacations();
    } catch (error) {
      console.error("Failed to delete vacation hotel", error);
    }
  }

  function reset() {
    dialog.value = false;
    formModel.value = createNewRecord();
  }

  return {
    headers,
    Vacations,
    formModel,
    dialog,
    isEditing,
    add,
    edit,
    remove,
    save,
    reset,
    getVacations,
  };
});
