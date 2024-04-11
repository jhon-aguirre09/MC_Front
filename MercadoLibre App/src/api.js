import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://localhost:8006",
	withCredentials: false,
});

export const apiRequest = {
	async createPerson(client) {
		return apiClient.post(`/create`, client);
	},
	async detailPerson(pk) {
		const resp = await apiClient.get(`/people/${pk}`);
		return resp.data;
	},
	async listPeople() {
		const resp = await apiClient.get(`/people`);
		return resp.data;
	},
}
