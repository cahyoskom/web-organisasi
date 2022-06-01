import http from "../http-common";

class OrganisasiDataService {
  getAll() {
    return http.get("/organisasi");
  }

  get(id) {
    return http.get(`/organisasi/${id}`);
  }

  create(data) {
    return http.post("/organisasi", data);
  }

  update(id, data) {
    return http.put(`/organisasi/${id}`, data);
  }

  delete(id) {
    return http.delete(`/organisasi/${id}`);
  }

  deleteAll() {
    return http.delete(`/organisasi`);
  }

  findByNama(nama) {
    return http.get(`/organisasi?nama=${nama}`);
  }
}

export default new OrganisasiDataService();