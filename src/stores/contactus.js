import { defineStore } from 'pinia'
import { ref, shallowRef, toRef } from 'vue'
import api from '@/services/api'

export const useContactUsStore = defineStore('contactus', () => {

  // TABLE HEADERS (for admin view)
  const headers = [
    { title: 'ID', key: 'id', align: 'start' },
    { title: 'Name', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Message', key: 'message' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
  ]

  const messages = ref([])
  const formModel = ref(createNewRecord())
  const dialog = shallowRef(false)
  const loading = ref(false)

  const isEditing = toRef(() => !!formModel.value.id)

  function createNewRecord () {
    return {
      name: '',
      email: '',
      message: ''
    }
  }

  /* =========================
     API CALLS (FULL CRUD)
     ========================= */

  // GET /contactus
  async function getMessages () {
    try {
      const response = await api.get('/contactus')
      messages.value = response.data.messages ?? response.data
    } catch (error) {
      console.error('Failed to fetch contact messages', error?.response?.data)
    }
  }

  // GET /contactus/{id}
  async function getMessage (id) {
    try {
      const response = await api.get(`/contactus/${id}`)
      formModel.value = response.data
      dialog.value = true
    } catch (error) {
      console.error('Failed to fetch contact message', error?.response?.data)
    }
  }

  // POST /contactus  |  PUT /contactus/{id}
  async function save () {
    loading.value = true
    try {
      if (isEditing.value) {
        await api.put(`/contactus/${formModel.value.id}`, formModel.value)
      } else {
        await api.post('/contactus', formModel.value)
      }
      await getMessages()
      reset()
    } catch (error) {
      console.error('Failed to save contact message', error?.response?.data)
    } finally {
      loading.value = false
    }
  }

  // DELETE /contactus/{id}
  async function remove (id) {
    try {
      await api.delete(`/contactus/${id}`)
      messages.value = messages.value.filter(m => m.id !== id)
    } catch (error) {
      console.error('Failed to delete contact message', error?.response?.data)
    }
  }

  /* =========================
     UI HELPERS
     ========================= */

  function add () {
    formModel.value = createNewRecord()
    dialog.value = true
  }

  function edit (id) {
    const found = messages.value.find(m => m.id === id)
    if (!found) return

    formModel.value = {
      id: found.id,
      name: found.name,
      email: found.email,
      message: found.message
    }
    dialog.value = true
  }

  function reset () {
    dialog.value = false
    formModel.value = createNewRecord()
  }

  return {
    headers,
    messages,
    formModel,
    dialog,
    loading,
    isEditing,
    add,
    edit,
    save,
    remove,
    reset,
    getMessages,
    getMessage,
    createNewRecord
  }
})
