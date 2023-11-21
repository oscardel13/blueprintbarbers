const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: process.env.AWS_DEV_ACCESS_KEY,
  secretAccessKey: process.env.AWS_DEV_SECRET_KEY,
  region: process.env.AWS_REGION
});

// Create an S3 instance
const s3 = new AWS.S3();

// Function to upload a file to S3
function uploadToS3Static(objectKey, file) {
    const params = {
      Bucket: process.env.AWS_STATIC_BUCKET,
      Key: objectKey,
      Body: file
    };
  
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

function uploadObjectsToStatic(files){
  return new Promise((resolve, reject) => {
    // Upload each file individually
    Promise.all(
      files.map(file => {
        return s3.upload({
          Bucket: process.env.AWS_STATIC_BUCKET,
          Key: file.Key,
          Body: file.Body
        }).promise();
      })
    )
      .then(results => resolve(results))
      .catch(err => reject(err));
  });
}

function deleteFromS3Static(objectKey){
  console.log('delete KEY', objectKey)
    const params = {
        Bucket: process.env.AWS_STATIC_BUCKET,
        Key: objectKey
    }
    return new Promise((resolve, reject) => {
        s3.deleteObject(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = {
  uploadToS3Static,
  deleteFromS3Static,
  uploadObjectsToStatic
}
