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

  // Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.
  it('POST /cafes - debería agregar un nuevo café y devolver un status 201', async () => {
    const nuevoCafe = { id: 5, nombre: 'Latte' };
    const response = await request(server).post('/cafes').send(nuevoCafe);
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(nuevoCafe);
  });

  // Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.
  it('PUT /cafes/:id - debería devolver un status 400 si el id del parámetro es diferente al id del payload', async () => {
    const cafeActualizado = { id: 6, nombre: 'Espresso' };
    const response = await request(server).put('/cafes/1').send(cafeActualizado);
    expect(response.status).toBe(400);
  });

});
