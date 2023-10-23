const AWS = require('aws-sdk');
var fs = require('fs');

export const s3 = () =>{

    const s3 = new AWS.S3({
        accessKeyId: "ENTER YOUR accessKeyId",
        secretAccessKey: "ENTER YOUR secretAccessKey",
    });
        
    const BUCKET = '<YOUR BUCKET NAME>';

    //You can upload files or data to a bucket by: 
    //upload() method, putObject() method, or generate a signed URL for the upload file.
}

//upload() method
//The S3 Transfer Manager is in charge of the upload file method, 
//which means it will manage multipart uploads for you behind the scenes if necessary.
const uploadMethod = (filePath, keyName) => {
    return new Promise((resolve, reject) => {
        try {
            const file = fs.readFileSync(filePath);
            const BUCKET = '<YOUR BUCKET NAME>';
        
            const uploadParams = {
                Bucket: BUCKET,
                Key: keyName,
                Body: file
            };
        
            s3.upload(uploadParams, function (err, data) {
                if (err) {
                    return reject(err);
                }
                if (data) {
                    return resolve(data);
                }
            });
        } catch (err) {
            return reject(err);
        }
    })
}


//putObject method
//The put object method corresponds to the S3 API request at the lowest level. 
//It does not assist you with multipart uploads. It will try to send the whole body in a single request.
const putObject = (key, fileBuffer) => {
    return new Promise((resolve, reject) => {
        try {
            const BUCKET = '<YOUR BUCKET NAME>';
        
            const params = {
                Bucket: '<YOUR BUCKET NAME>',
                Key: key,
                Body: fileBuffer
            };
        
            s3.putObject(params, function (err, data) {
                if (err) return reject(err);
                data.url = `https://${BUCKET}.${dosCredentials.region}.digitaloceanspaces.com/${key}`;
                data.key = key;
                return resolve(data);
            });
        } catch (err) {
            return reject(err);
        }
    });
}

//getSignedUrl
//You can use a pre-signed URL to grant temporary access to someone without AWS credentials or access permissions. 
//An AWS user with access to the item generates a pre-signed URL. 
//The unauthorized user is then given the generated URL, 
//which they can use to submit files or objects to the bucket using putObject with getSignedUrl.
const getSignUrl = (key) => {
    return new Promise((resolve, reject) => {
        try {
            var params = {
                Bucket : '<YOUR BUCKET NAME>',
                Key : key,
                Expires : 30 * 60,
                ContentType : mime.lookup(path.basename(filename)),
            };
        
            const signedUrl = s3.getSignedUrl('putObject', params);
        
            if (signedUrl) {
                return resolve(signedUrl);
            } else {
                return reject("Cannot create signed URL");
            }
        } catch (err) {
            return reject("Cannot create signed URL!");
        }
    });
}
