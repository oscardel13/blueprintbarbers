// models/notification/notification.controller.js
const mongoose = require("mongoose");
const {
  getMyNotifications,
  updateMyNotification,
  markAllMyNotificationsRead,
  countMyUnreadNotifications,
} = require("../../models/notification/notification.data");

const parseBool = (v) => {
  if (v === true || v === "true" || v === "1" || v === 1) return true;
  if (v === false || v === "false" || v === "0" || v === 0) return false;
  return undefined;
};

const parseIntSafe = (v, fallback) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
};

// GET /notifications/me?unreadOnly=true&includeArchived=false&type=...&skip=0&limit=30&withUnreadCount=true
async function httpGetMyNotifications(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const unreadOnly = parseBool(req.query.unreadOnly) ?? false;
    const includeArchived = parseBool(req.query.includeArchived) ?? false;
    const withUnreadCount = parseBool(req.query.withUnreadCount) ?? false;

    const type = req.query.type || undefined;
    const skip = Math.max(parseIntSafe(req.query.skip, 0), 0);
    const limit = Math.min(Math.max(parseIntSafe(req.query.limit, 30), 1), 100);

    const [items, unreadCount] = await Promise.all([
      getMyNotifications({
        userId,
        unreadOnly,
        includeArchived,
        type,
        skip,
        limit,
      }),
      withUnreadCount
        ? countMyUnreadNotifications(userId)
        : Promise.resolve(undefined),
    ]);

    if (withUnreadCount) {
      return res.status(200).json({ items, unreadCount });
    }

    return res.status(200).json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

// PATCH /notifications/me/:id
// Body examples: { "read": true } | { "archive": true } | { "read": false, "archive": false }
async function httpUpdateMyNotification(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid notification id" });
    }

    const read = parseBool(req.body?.read);
    const archive = parseBool(req.body?.archive);

    if (read === undefined && archive === undefined) {
      return res.status(400).json({
        error:
          'Nothing to update. Send {"read": true/false} and/or {"archive": true/false}.',
      });
    }

    const updated = await updateMyNotification(userId, id, { read, archive });
    if (!updated)
      return res.status(404).json({ error: "Notification not found" });

    return res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

// POST /notifications/me/mark-read
async function httpMarkAllMyNotificationsRead(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const result = await markAllMyNotificationsRead(userId);
    // result.modifiedCount exists in newer drivers; older uses nModified
    return res.status(200).json({
      ok: true,
      modifiedCount: result.modifiedCount ?? result.nModified ?? 0,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  httpGetMyNotifications,
  httpUpdateMyNotification,
  httpMarkAllMyNotificationsRead,
};
