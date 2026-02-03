const reviews = [];

// Create a new review
function createReview(reviewData) {
    const review = {
        id: Date.now(),
        userId: reviewData.userId,
        barberShopId: reviewData.barberShopId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        createdAt: new Date(),
        ...reviewData
    };
    reviews.push(review);
    return review;
}

// Get all reviews
function getAllReviews() {
    return reviews;
}

// Get review by ID
function getReviewById(id) {
    return reviews.find(review => review.id === id);
}

// Get reviews by barber shop
function getReviewsByBarberShop(barberShopId) {
    return reviews.filter(review => review.barberShopId === barberShopId);
}

// Update review
function updateReview(id, updateData) {
    const review = getReviewById(id);
    if (review) {
        Object.assign(review, updateData);
        return review;
    }
    return null;
}

// Delete review
function deleteReview(id) {
    const index = reviews.findIndex(review => review.id === id);
    if (index !== -1) {
        return reviews.splice(index, 1)[0];
    }
    return null;
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    getReviewsByBarberShop,
    updateReview,
    deleteReview
};