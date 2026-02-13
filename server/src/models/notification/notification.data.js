const mongoose = require("mongoose");
const { notificationCollection } = require("./notification.mongo");

const clampInt = (v, min, max, fallback) => {
  const n = Number.parseInt(v, 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(Math.max(n, min), max);
};

const createNotification = async (notification) => {
  // If dedupeKey is provided, use upsert to avoid duplicates
  if (notification.dedupeKey) {
    return await notificationCollection.findOneAndUpdate(
      { userId: notification.userId, dedupeKey: notification.dedupeKey },
      { $setOnInsert: notification },
      { upsert: true, returnDocument: "after" },
    );
  }

  return await notificationCollection.create(notification);
};

const getMyNotifications = async ({
  userId,
  unreadOnly = false,
  includeArchived = false,
  type,
  skip = 0,
  limit = 30,
}) => {
  const query = { userId: new mongoose.Types.ObjectId(userId) };

  if (unreadOnly) query.readAt = null;
  if (!includeArchived) query.archivedAt = null;
  if (type) query.type = type;

  return await notificationCollection
    .find(query)
    .sort({ createdAt: -1 })
    .skip(clampInt(skip, 0, 1_000_000, 0))
    .limit(clampInt(limit, 1, 100, 30))
    .lean();
};

const countMyUnreadNotifications = async (userId) => {
  return await notificationCollection.countDocuments({
    userId,
    readAt: null,
    archivedAt: null,
  });
};

const markMyNotificationRead = async (userId, notificationId) => {
  return await notificationCollection.findOneAndUpdate(
    { _id: notificationId, userId, archivedAt: null },
    { $set: { readAt: new Date() } },
    { returnDocument: "after" },
  );
};

const updateMyNotification = async (userId, notificationId, patch) => {
  // allow only safe fields to be updated by the user
  const update = {};
  if (patch.read === true) update.readAt = new Date();
  if (patch.read === false) update.readAt = null;
  if (patch.archive === true) update.archivedAt = new Date();
  if (patch.archive === false) update.archivedAt = null;

  return await notificationCollection.findOneAndUpdate(
    { _id: notificationId, userId },
    { $set: update },
    { returnDocument: "after" },
  );
};

const markAllMyNotificationsRead = async (userId) => {
  return await notificationCollection.updateMany(
    { userId, readAt: null, archivedAt: null },
    { $set: { readAt: new Date() } },
  );
};

module.exports = {
  createNotification,
  getMyNotifications,
  countMyUnreadNotifications,
  markMyNotificationRead,
  updateMyNotification,
  markAllMyNotificationsRead,
};
