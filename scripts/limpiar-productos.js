require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const col = mongoose.connection.collection('productos');

  // Elimina TODOS los documentos de la colección productos
  const result = await col.deleteMany({});
  console.log('Productos eliminados:', result.deletedCount);

  const restantes = await col.countDocuments();
  console.log('Productos que quedan:', restantes);

  await mongoose.disconnect();
  console.log('Listo.');
});
