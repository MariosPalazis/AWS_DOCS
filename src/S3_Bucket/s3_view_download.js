const AWS = require('aws-sdk');

export const s3 = () =>{

    const s3 = new AWS.S3({
        accessKeyId: "ENTER YOUR accessKeyId",
        secretAccessKey: "ENTER YOUR secretAccessKey",
    });
        
    const BUCKET = '<YOUR BUCKET NAME>';

    //You can upload files or data to a bucket by: 
    //upload() method, putObject() method, or generate a signed URL for the upload file.
}

// getObject,
//By using getObject, the unauthorized user can access bucket files or objects.
const getSignUrlForFile = (key) => {
    return new Promise((resolve, reject) => {
        try {
            const path = require('path');
            const fileName = path.basename(key);
            
            var params = {
                Bucket: '<YOUR BUCKET NAME>',
                Key: key,
                Expires: 30 * 60
            };
            
            const signedUrl = s3.getSignedUrl('getObject', params);
    
            if (signedUrl) {
                return resolve({
                signedUrl,
                fileName,
                });
            } else {
                return reject("Cannot create signed URL");
            }
        } catch (err) {
            return reject("Cannot create signed URL!");
        }
    });
}

//Delete object/file from the bucket
//Using the Amazon S3 console, AWS SDKs, AWS Command Line Interface (AWS CLI), or REST API, 
//you can delete one or more objects directly from Amazon S3. 
//You should delete things that you no longer need because all objects in your S3 bucket incur storage expenses. 
//If you’re collecting log files, for example, it’s a good idea to delete them when you’re done with them. 
//You can use a lifecycle rule to have items like log files deleted automatically.

const deleteObject = (key) => {
    return new Promise((resolve, reject) => {
        try {
            var params = {
                Bucket: '<YOUR BUCKET NAME>',
                Key: key
            };
        
            s3.deleteObject(params, function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
        } catch (err) {
            return reject(err);
        }
    });
}