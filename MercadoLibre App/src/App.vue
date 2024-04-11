<script >
import { apiRequest } from '@/api'

export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          title: 'ID',
          align: 'start',
          sortable: false,
          key: 'id',
        },
				{ title: 'Nombre', key: 'name' },
				{ title: 'identification', key: 'identification' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      people: [],
      editedItem: {
				id: '',
				name: '',
				identification: '',
				email: '',
				direction: '',
				phone: ''
      },
      defaultItem: {
				id: '',
				name: '',
				identification: '',
				email: '',
				direction: '',
				phone: ''
      },
			onlyView: false,
    }),

    computed: {},

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize();
    },

    methods: {
      async initialize () {
        this.people = await apiRequest.listPeople();
      },

	  close () {
			this.dialog = false;
			this.onlyView = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
			})
		},
		async lookItem(item) {
			this.editedItem = await apiRequest.detailPerson(item.id);
			this.onlyView = true;
			this.dialog = true;
		},
		async save () {
			await apiRequest.createPerson(this.editedItem);
			this.close()
			this.initialize();
		},
    },
  }
</script>

<template>
	<v-data-table :headers="headers" :items="people">
		<template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>ML App</v-toolbar-title>
			<v-divider class="mx-4" inset vertical></v-divider>
			<v-spacer></v-spacer>
			<v-dialog v-model="dialog" max-width="500px">
				<template v-slot:activator="{ props }">
					<v-btn class="mb-2" color="primary" dark v-bind="props">
						Crear Persona
					</v-btn>
				</template>
				<v-card>
					<v-card-title>
						<span class="text-h5">Añadir persona</span>
					</v-card-title>

					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12" md="4" sm="6">
									<v-text-field v-model="editedItem.id" label="ID"></v-text-field>
								</v-col>
								<v-col cols="12" md="4" sm="6">
									<v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
								</v-col>
								<v-col cols="12" md="4" sm="6">
									<v-text-field v-model="editedItem.identification" label="Identificación"
									></v-text-field>
								</v-col>
								<v-col cols="12" md="4" sm="6">
									<v-text-field v-model="editedItem.email" label="Correo"></v-text-field>
								</v-col>
								<v-col cols="12" md="4" sm="6">
									<v-text-field v-model="editedItem.direction" label="Dirección"></v-text-field>
								</v-col>
								<v-col cols="12" md="4" sm="6">
									<v-text-field v-model="editedItem.phone" label="Telefono"></v-text-field>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
					
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue-darken-1" variant="text" @click="close">
							Cancelar
						</v-btn>
						<v-btn color="blue-darken-1" v-show="!onlyView" variant="text" @click="save">
							Guardar
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-toolbar>
	</template>
	<template v-slot:item.actions="{ item }">
		<v-icon class="me-2" size="small" @click="lookItem(item)">
			mdi-eye-circle
		</v-icon>
	</template>
	<template v-slot:no-data>
		No hay personas
	</template>
	</v-data-table>
</template>

<style scoped>

</style>
