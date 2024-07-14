const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

  // Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.
  it('GET /cafes - debería devolver un status 200 y un arreglo con al menos un objeto', async () => {
    const response = await request(server).get('/cafes');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.
  it('DELETE /cafes/:id - debería devolver un status 404 si el id no existe', async () => {
    const response = await request(server).delete('/cafes/999').set('Authorization', 'Bearer token');
    expect(response.status).toBe(404);
  });

});
