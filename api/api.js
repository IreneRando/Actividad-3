const BASE_URL = 'https://mock.apidog.com/m1/873119-854329-default';

// Obtener todas las actividades
export const fetchActivities = async () => {
  const res = await fetch(`${BASE_URL}/activities`);
  if (!res.ok) throw new Error('Error al cargar actividades');
  return res.json();
};

// Obtener una actividad por ID
export const fetchActivityById = async (id) => {
  const res = await fetch(`${BASE_URL}/activities/${id}`);
  if (!res.ok) throw new Error('Actividad no encontrada');
  return res.json();
};

// Obtener todos los usuarios
export const fetchUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error('Error al cargar usuarios');
  return res.json();
};

// Obtener un usuario por ID
export const fetchUserById = async (id) => {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error('Usuario no encontrado');
  return res.json();
};

// Obtener todas las reservas
export const fetchReservations = async () => {
  const res = await fetch(`${BASE_URL}/reservations`);
  if (!res.ok) throw new Error('Error al cargar reservas');
  return res.json();
};

// Obtener las reservas de un usuario por su ID
export const fetchReservationsByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/reservations/user/${userId}`);
  if (!res.ok) throw new Error('Error al cargar reservas del usuario');
  return await res.json();
};

// Crear una nueva reserva
export const createReservation = async (reservation) => {
  const res = await fetch(`${BASE_URL}/reservations`, {
    method: 'POST',
    body: JSON.stringify(reservation),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Error al crear reserva');
  return res.json();
};

// Eliminar una reserva
export const deleteReservation = async (reservationId) => {
  const res = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar reserva');
  return res.json();
};