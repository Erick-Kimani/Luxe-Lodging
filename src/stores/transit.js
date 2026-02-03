import { defineStore } from "pinia";
import { ref, shallowRef, computed } from "vue";
import api from "@/services/api";

export const useTransitStore = defineStore("Transit", () => {

  const headers = [
    { title: "ID", key: "id", align: "start" },
    { title: "Name", key: "name" },
    { title: "Price", key: "price" },
    { title: "Description", key: "description" },
    { title: "Transit Code", key: "transit_code" },
    { title: "Website URL", key: "website_url" },
    { title: "Transit Image", key: "transit_image" },
    { title: "Actions", key: "actions", align: "end", sortable: false },
  ];

  const Transits = ref([]);
  const dialog = shallowRef(false);
  const formModel = ref(createNewRecord());

  const isEditing = computed(() => !!formModel.value.id);

  function createNewRecord() {
    return {
      id: null,
      name: "",
      price: "",
      description: "",
      transit_code: "",
      website_url: "",
      transit_image: null,
    };
  }

  function buildFormData() {
    const fd = new FormData();

    Object.keys(formModel.value).forEach((key) => {
      const value = formModel.value[key];
      if (key === "transit_image" && !value) return;
      fd.append(key, value);
    });

    return fd;
  }

  // ✅ Correct save endpoints
  async function save() {
    try {
      const formData = buildFormData();

      if (isEditing.value) {
        // Laravel expects PUT at /transits/{id}, using _method for formData
        await api.post(
          `/transits/${formModel.value.id}`,
          formData,
          { 
            headers: { "Content-Type": "multipart/form-data" },
            params: { _method: "PUT" },
          }
        );
      } else {
        await api.post(
          "/transits",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      await getTransits();
      dialog.value = false;
      formModel.value = createNewRecord();

    } catch (error) {
      console.error("Failed to save transit hotel", error);
    }
  }

  // ✅ Correct GET endpoint
  async function getTransits() {
    try {
      const response = await api.get("/transits");
      Transits.value = response.data.Transit || response.data || [];
    } catch (error) {
      console.error("Failed to fetch transit hotels", error);
    }
  }

  function add() {
    formModel.value = createNewRecord();
    dialog.value = true;
  }

  function edit(id) {
    const found = Transits.value.find(p => p.id === id);
    if (!found) return;

    formModel.value = {
      id: found.id,
      name: found.name,
      price: found.price,
      description: found.description,
      transit_code: found.transit_code,
      website_url: found.website_url,
      transit_image: null,
    };

    dialog.value = true;
  }

  // ✅ Correct DELETE endpoint
  async function remove(id) {
    if(!confirm("Are you sure you want to delete this?")) return;

    try {
      await api.delete(`/transits/${id}`);
      await getTransits();
    } catch (error) {
      console.error("Failed to delete transit hotel", error);
    }
  }

  function reset() {
    dialog.value = false;
    formModel.value = createNewRecord();
  }

  return {
    headers,
    Transits,
    formModel,
    dialog,
    isEditing,
    add,
    edit,
    remove,
    save,
    reset,
    getTransits,
  };
});
