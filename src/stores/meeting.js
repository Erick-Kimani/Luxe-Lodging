import { defineStore } from "pinia";
import { ref, shallowRef, computed } from "vue";
import api from "@/services/api";

export const useMeetingStore = defineStore("Meeting", () => {

  const headers = [
    { title: "ID", key: "id", align: "start" },
    { title: "Name", key: "name" },
    { title: "Price", key: "price" },
    { title: "Description", key: "description" },
    { title: "Meeting Code", key: "meeting_code" },
    { title: "Website URL", key: "website_url" },
    { title: "Meeting Image", key: "meeting_image" },
    { title: "Actions", key: "actions", align: "end", sortable: false },
  ];

  const Meetings = ref([]);
  const dialog = shallowRef(false);
  const formModel = ref(createNewRecord());

  const isEditing = computed(() => !!formModel.value.id);

  function createNewRecord() {
    return {
      id: null,
      name: "",
      price: "",
      description: "",
      meeting_code: "",
      website_url: "",
      meeting_image: null,
    };
  }

  function buildFormData() {
    const fd = new FormData();

    Object.keys(formModel.value).forEach((key) => {
      const value = formModel.value[key];
      if (key === "meeting_image" && !value) return;
      fd.append(key, value);
    });

    return fd;
  }

  // ✅ Correct save endpoints
  async function save() {
    try {
      const formData = buildFormData();

      if (isEditing.value) {
        await api.post(
          `/meetings/${formModel.value.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            params: { _method: "PUT" }, // Laravel-compatible PUT
          }
        );
      } else {
        await api.post(
          "/meetings",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      await getMeetings();
      dialog.value = false;
      formModel.value = createNewRecord();

    } catch (error) {
      console.error("Failed to save meeting hotel", error);
    }
  }

  // ✅ Correct GET endpoint
  async function getMeetings() {
    try {
      const response = await api.get("/meetings");
      Meetings.value = response.data.Meeting || response.data || [];
    } catch (error) {
      console.error("Failed to fetch meeting hotels", error);
    }
  }

  function add() {
    formModel.value = createNewRecord();
    dialog.value = true;
  }

  function edit(id) {
    const found = Meetings.value.find(p => p.id === id);
    if (!found) return;

    formModel.value = {
      id: found.id,
      name: found.name,
      price: found.price,
      description: found.description,
      meeting_code: found.meeting_code,
      website_url: found.website_url,
      meeting_image: null,
    };

    dialog.value = true;
  }

  // ✅ Correct DELETE endpoint
  async function remove(id) {
    if (!confirm("Are you sure you want to delete this?")) return;

    try {
      await api.delete(`/meetings/${id}`);
      await getMeetings();
    } catch (error) {
      console.error("Failed to delete meeting hotel", error);
    }
  }

  function reset() {
    dialog.value = false;
    formModel.value = createNewRecord();
  }

  return {
    headers,
    Meetings,
    formModel,
    dialog,
    isEditing,
    add,
    edit,
    remove,
    save,
    reset,
    getMeetings,
  };
});
