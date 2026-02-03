<template>
  <v-app>
    <v-app-bar color="primary" elevation="1">
      <v-app-bar-nav-icon @click="rail = !rail">
        <v-icon>{{ rail ? 'mdi-menu' : 'mdi-menu-open' }}</v-icon>
      </v-app-bar-nav-icon>
      
      <v-toolbar-title class="font-weight-bold">Admin Dashboard</v-toolbar-title>
      <v-spacer />
      <v-btn icon="mdi-bell-outline" class="mr-2" />
      <v-avatar color="secondary" size="35" class="mr-4">
        {{ userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'AD' }}
      </v-avatar>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      elevation="2"
      @click="rail = false"
    >
      <v-list density="comfortable" nav>
        <v-list-item
          prepend-icon="mdi-account-details"
          title="0. Admin Profile"
          :active="currentView === 'profile'"
          @click="currentView = 'profile'"
          rounded="lg"
        />

        <v-list-item
          prepend-icon="mdi-palm-tree"
          title="1. Vacations"
          :active="currentView === 'vacations'"
          @click="currentView = 'vacations'"
          rounded="lg"
        />
        
        <v-list-item
          prepend-icon="mdi-bus"
          title="2. Transit"
          :active="currentView === 'transit'"
          @click="currentView = 'transit'"
          rounded="lg"
        />

        <v-list-item
          prepend-icon="mdi-account-group"
          title="3. Meeting"
          :active="currentView === 'meeting'"
          @click="currentView = 'meeting'"
          rounded="lg"
        />

        <v-list-item
          prepend-icon="mdi-room-service"
          title="4. Services"
          :active="currentView === 'services'"
          @click="currentView = 'services'"
          rounded="lg"
        />
        
        <v-list-item prepend-icon="mdi-chart-bar"
          title="5. Click Analytics"
          :active="currentView === 'analytics'"
          @click="loadAnalytics"
          rounded="lg"
        />

        <v-list-item
        prepend-icon="mdi-chart-bar"
        title="6. User Profiles"
        :active="currentView === 'userProfiles'"
        @click="currentView = 'userProfiles'"
        rounded="lg"
      />

      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            variant="text"
            block
            :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
            @click.stop="rail = !rail"
          >
            <v-icon v-if="rail">mdi-chevron-right</v-icon>
            <span v-else>Collapse Menu</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    













    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-6">
        <v-fade-transition hide-on-leave>
          
          <v-card v-if="currentView === 'profile'" elevation="2" border>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-h6 font-weight-medium">0. Logged-in Admin Details</v-toolbar-title>
            </v-toolbar>
            <v-divider />
            <v-table hover>
              <thead>
                <tr>
                  <th class="text-left font-weight-bold">Field</th>
                  <th class="text-left font-weight-bold">Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Admin Name</strong></td>
                  <td>{{ userProfile?.name || 'Loading...' }}</td>
                </tr>
                <tr>
                  <td><strong>Email Address</strong></td>
                  <td>{{ userProfile?.email || 'Loading...' }}</td>
                </tr>
                <tr>
                  <td><strong>Role Id</strong></td>
                  <td>{{ userProfile?.role_id || 'Loading...' }}</td>
                </tr>
                <tr>
                  <td><strong>Active/Inactive</strong></td>
                  <td>{{ userProfile?.is_active ? 'Active' : 'Inactive' }}</td>
                  
                </tr>
                
                

                <tr>
                  <td><strong>Permissions/Abilities</strong></td>
                  <td>
                    <div class="d-flex ga-1 flex-wrap">
                      <v-chip v-for="ability in userProfile?.abilities" :key="ability" size="x-small" color="deep-orange">
                        {{ ability }}
                      </v-chip>
                      <span v-if="!userProfile?.abilities?.length" class="text-caption text-grey">Default Admin Access</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
















          <v-card v-if="currentView === 'vacations'" elevation="2" border>
            <v-data-table
              :headers="VacationStore.headers"
              :items="VacationStore.Vacations || []"
              :hide-default-footer="(VacationStore.Vacations || []).length < 11"
              hover
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title class="text-h6 font-weight-medium">1. Vacations Management</v-toolbar-title>
                  <v-spacer />
                  <v-btn color="primary" prepend-icon="mdi-plus" variant="elevated" rounded="pill" @click="VacationStore.add()">
                    Add Vacation
                  </v-btn>
                </v-toolbar>
                <v-divider />
              </template>
              <template v-slot:item.vacation_image="{ item }">
                <v-avatar size="190" rounded="lg" class="my-2 border">
                  <v-img v-if="item.vacation_image" :src="`http://127.0.0.1:8000/storage/${item.vacation_image}`" cover />
                  <v-icon v-else color="grey-lighten-2">mdi-image-outline</v-icon>
                </v-avatar>
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-1">
                  <v-btn icon="mdi-pencil" variant="text" color="blue" size="small" @click="VacationStore.edit(item.id)" />
                  <v-btn icon="mdi-delete" variant="text" color="red" size="small" @click="VacationStore.remove(item.id)" />
                </div>
              </template>
            </v-data-table>
          </v-card>

















          <v-card v-else-if="currentView === 'transit'" elevation="2" border>
            <v-data-table
              :headers="TransitStore.headers"
              :items="TransitStore.Transits || []"
              :hide-default-footer="(TransitStore.Transits || []).length < 11"
              hover
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title class="text-h6 font-weight-medium">2. Transit Management</v-toolbar-title>
                  <v-spacer />
                  <v-btn color="primary" prepend-icon="mdi-plus" variant="elevated" rounded="pill" @click="TransitStore.add()">
                    Add Transit
                  </v-btn>
                </v-toolbar>
                <v-divider />
              </template>
              <template v-slot:item.transit_image="{ item }">
                <v-avatar size="190" rounded="lg" class="my-2 border">
                  <v-img v-if="item.transit_image" :src="`http://127.0.0.1:8000/storage/${item.transit_image}`" cover />
                  <v-icon v-else color="grey-lighten-2">mdi-image-outline</v-icon>
                </v-avatar>
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-1">
                  <v-btn icon="mdi-pencil" variant="text" color="blue" size="small" @click="TransitStore.edit(item.id)" />
                  <v-btn icon="mdi-delete" variant="text" color="red" size="small" @click="TransitStore.remove(item.id)" />
                </div>
              </template>
            </v-data-table>
          </v-card>


        <v-card v-else-if="currentView === 'meeting'" elevation="2" border>
            <v-data-table
              :headers="MeetingStore.headers"
              :items="MeetingStore.Meetings || []"
              :hide-default-footer="(MeetingStore.Meetings || []).length < 11"
              hover
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title class="text-h6 font-weight-medium">3. Meeting Management</v-toolbar-title>
                  <v-spacer />
                  <v-btn color="primary" prepend-icon="mdi-plus" variant="elevated" rounded="pill" @click="MeetingStore.add()">
                    Add Meeting
                  </v-btn>
                </v-toolbar>
                <v-divider />
              </template>
              <template v-slot:item.meeting_image="{ item }">
                <v-avatar size="190" rounded="lg" class="my-2 border">
                  <v-img v-if="item.meeting_image" :src="`http://127.0.0.1:8000/storage/${item.meeting_image}`" cover />
                  <v-icon v-else color="grey-lighten-2">mdi-image-outline</v-icon>
                </v-avatar>
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-1">
                  <v-btn icon="mdi-pencil" variant="text" color="blue" size="small" @click="MeetingStore.edit(item.id)" />
                  <v-btn icon="mdi-delete" variant="text" color="red" size="small" @click="MeetingStore.remove(item.id)" />
                </div>
              </template>
            </v-data-table>
          </v-card>
























          <v-card v-else-if="currentView === 'services'" elevation="2" border>
            <v-data-table
              :headers="ServiceStore.headers"
              :items="ServiceStore.Services || []"
              :hide-default-footer="(ServiceStore.Services || []).length < 11"
              hover
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title class="text-h6 font-weight-medium">4. Service Management</v-toolbar-title>
                  <v-spacer />
                  <v-btn color="primary" prepend-icon="mdi-plus" variant="elevated" rounded="pill" @click="ServiceStore.add()">
                    Add Service
                  </v-btn>
                </v-toolbar>
                <v-divider />
              </template>
              <template v-slot:item.service_image="{ item }">
                <v-avatar size="190" rounded="lg" class="my-2 border">
                  <v-img v-if="item.service_image" :src="`http://127.0.0.1:8000/storage/${item.service_image}`" cover />
                  <v-icon v-else color="grey-lighten-2">mdi-image-outline</v-icon>
                </v-avatar>
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-1">
                  <v-btn icon="mdi-pencil" variant="text" color="blue" size="small" @click="ServiceStore.edit(item.id)" />
                  <v-btn icon="mdi-delete" variant="text" color="red" size="small" @click="ServiceStore.remove(item.id)" />
                </div>
              </template>
            </v-data-table>
          </v-card>























          <v-card v-if="currentView === 'analytics'" elevation="2" border>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-h6 font-weight-medium">
                📊 Service Click Analytics
              </v-toolbar-title>
            </v-toolbar>
            <v-divider />
            <v-data-table
              :headers="analyticsHeaders"
              :items="clickStats"
              hover
            >
              <template v-slot:item.total_clicks="{ item }">
                <v-chip color="primary" variant="flat">
                  {{ item.total_clicks }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>




      <v-card v-else-if="currentView === 'userProfiles'" elevation="2" border>
    <v-toolbar flat color="white">
    <v-toolbar-title class="text-h6 font-weight-medium">
      6. User Profiles
    </v-toolbar-title>
  </v-toolbar>

  <v-divider />

  <v-data-table
    :items="users"
    :headers="userHeaders"
    :loading="loadingUsers"
    hover
  >
  
    <template #item.is_active="{ item }">
      <v-chip
        :color="item.is_active ? 'green' : 'grey'"
        size="small"
      >
        {{ item.is_active ? 'Active' : 'Inactive' }}
      </v-chip>
    </template>
  </v-data-table>
</v-card>

        </v-fade-transition>
      </v-container>
    </v-main>

    <v-dialog v-model="VacationStore.dialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5">{{ VacationStore.isEditing ? 'Update' : 'Create' }} Vacation</v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12"><v-text-field v-model="VacationStore.formModel.name" label="Hotel Name" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="VacationStore.formModel.price" label="Price ($)" type="number" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="VacationStore.formModel.vacation_code" label="Code" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="VacationStore.formModel.description" label="Description" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="VacationStore.formModel.website_url" label="Website URL" variant="outlined" /></v-col>
            <v-col cols="12"><v-file-input v-model="VacationStore.formModel.vacation_image" label="Upload Image" variant="outlined" prepend-inner-icon="mdi-camera" /></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer /><v-btn variant="text" @click="VacationStore.dialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" width="190" @click="VacationStore.save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="TransitStore.dialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5">{{ TransitStore.isEditing ? 'Update' : 'Create' }} Transit</v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12"><v-text-field v-model="TransitStore.formModel.name" label="Transit Name" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="TransitStore.formModel.price" label="Price ($)" type="number" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="TransitStore.formModel.transit_code" label="Code" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="TransitStore.formModel.description" label="Description" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="TransitStore.formModel.website_url" label="Website URL" variant="outlined" /></v-col>
            <v-col cols="12"><v-file-input v-model="TransitStore.formModel.transit_image" label="Upload Image" variant="outlined" prepend-inner-icon="mdi-camera" /></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer /><v-btn variant="text" @click="TransitStore.dialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" width="190" @click="TransitStore.save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="MeetingStore.dialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5">{{ MeetingStore.isEditing ? 'Update' : 'Create' }} Meeting</v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12"><v-text-field v-model="MeetingStore.formModel.name" label="Meeting Name" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="MeetingStore.formModel.price" label="Price ($)" type="number" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="MeetingStore.formModel.meeting_code" label="Code" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="MeetingStore.formModel.description" label="Description" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="MeetingStore.formModel.website_url" label="Website URL" variant="outlined" /></v-col>
            <v-col cols="12"><v-file-input v-model="MeetingStore.formModel.meeting_image" label="Upload Image" variant="outlined" prepend-inner-icon="mdi-camera" /></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer /><v-btn variant="text" @click="MeetingStore.dialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" width="190" @click="MeetingStore.save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="ServiceStore.dialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="pa-6 text-h5">{{ ServiceStore.isEditing ? 'Update' : 'Create' }} Service</v-card-title>
        <v-divider />
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12"><v-text-field v-model="ServiceStore.formModel.name" label="Service Name" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="ServiceStore.formModel.price" label="Price ($)" type="number" variant="outlined" /></v-col>
            <v-col cols="6"><v-text-field v-model="ServiceStore.formModel.service_code" label="Code" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="ServiceStore.formModel.description" label="Description" variant="outlined" /></v-col>
            <v-col cols="12"><v-textarea v-model="ServiceStore.formModel.website_url" label="Website URL" variant="outlined" /></v-col>
            <v-col cols="12"><v-file-input v-model="ServiceStore.formModel.service_image" label="Upload Image" variant="outlined" prepend-inner-icon="mdi-camera" /></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer /><v-btn variant="text" @click="ServiceStore.dialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" width="190" @click="ServiceStore.save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

import { useVacationStore } from "@/stores/vacation";
import { useTransitStore } from "@/stores/transit";
import { useMeetingStore } from "@/stores/meeting";
import { useServiceStore } from "@/stores/service";

const VacationStore = useVacationStore();
const TransitStore = useTransitStore();
const MeetingStore = useMeetingStore();
const ServiceStore = useServiceStore();

const drawer = ref(true);
const rail = ref(false); 
const currentView = ref("profile"); // Set default view to profile

const users =ref([]);
const loadingUsers = ref(false);
const userProfile = ref(null);
const clickStats = ref([]);
const analyticsHeaders = [
  { title: "Service ID", value: "service_id" },
  { title: "Service Name", value: "service_name" },
  { title: "Total Clicks", value: "total_clicks" },
];
const userHeaders = [
  { title: "Name", value: "name" },
  { title: "Email", value: "email" },
  { title: "Role ID", value: "role_id" },
  { title: "Role Name", value: "role_name" }, // nested property
  { title: "Status", value: "is_active" },
];

// NEW: API call to get current admin profile
const fetchAdminProfile = async () => {
  try {
    const res = await api.get("/me");
    userProfile.value = res.data;
  } catch (err) {
    console.error("Failed to load admin profile info", err);
  }
};
const fetchUsers = async () => {
  loadingUsers.value = true;
  try {
    const res =await api.get("/users");
    users.value = res.data.user;


  } catch (err) {
    console.error("Failed to load users", err);
  } finally {
    loadingUsers.value = false;
  }
}

const loadAnalytics = async () => {
  currentView.value = "analytics";
  try {
    const res = await api.get("/click-analytics");
    clickStats.value = res.data;
  } catch (err) {
    console.error("Failed to load click analytics", err);
  }
};

onMounted(async () => {
  try {
    // Load Admin Profile first
    await fetchAdminProfile();
    await fetchUsers();
    await Promise.all([
      VacationStore.getVacations(),
      TransitStore.getTransits(),
      MeetingStore.getMeetings(),
      ServiceStore.getServices(),
    ]);
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
});
</script>

<style scoped>
.v-main {
  min-height: 190vh;
}
</style>