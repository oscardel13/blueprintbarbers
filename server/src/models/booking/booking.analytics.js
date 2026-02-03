const mongoose = require("mongoose");
const { bookingCollection } = require("./booking.mongo");

const getTopClientsForBarber = async ({
  barberId,
  limit = 5,
  start,
  end,
  statuses = ["confirmed", "finished"], // tweak as you want
}) => {
  const match = {
    barber: new mongoose.Types.ObjectId(barberId),
    status: { $in: statuses },
  };

  if (start || end) {
    match.startTime = {};
    if (start) match.startTime.$gte = new Date(start);
    if (end) match.startTime.$lt = new Date(end);
  }

  const pipeline = [
    { $match: match },

    {
      $group: {
        _id: "$customer",
        totalBookings: { $sum: 1 },
        totalSpent: { $sum: "$service.price" },
        lastBookingAt: { $max: "$startTime" },
      },
    },

    { $sort: { totalSpent: -1, totalBookings: -1, lastBookingAt: -1 } },
    { $limit: Math.min(Math.max(Number(limit) || 5, 1), 50) },

    // join users collection for display fields
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "client",
      },
    },
    { $unwind: "$client" },

    {
      $project: {
        _id: 1,
        totalBookings: 1,
        totalSpent: 1,
        lastBookingAt: 1,
        name: "$client.name",
        email: "$client.email",
        phone: "$client.phone",
        picture: "$client.picture",
      },
    },
  ];

  return await bookingCollection.aggregate(pipeline);
};

module.exports = {
  // ...existing exports
  getTopClientsForBarber,
};
