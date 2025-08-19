/*
This allows to grap the barbers data. we can always tell it exactly what to pull

Barbershop.findById(shopId)
  .populate("barbers", "name picture address")
  .exec();
*/