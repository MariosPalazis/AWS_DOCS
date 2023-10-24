const AWS = require('aws-sdk');


export const sqs = () => {
    const sqs = new AWS.SQS({
        accessKeyId: 'IAM user access key',
        secretAccessKey: 'IAM user secret key',
        region: 'region where you created queue(like ap-south-1)',
        apiVersion: '2012-11-05',
      });

    var params = {
    // Remove DelaySeconds parameter and value for FIFO queues
    DelaySeconds: 10,
    MessageAttributes: {
        "Title": {
        DataType: "String",
        StringValue: "The Whistler"
        },
        "Author": {
        DataType: "String",
        StringValue: "John Grisham"
        },
        "WeeksOn": {
        DataType: "Number",
        StringValue: "6"
        }
    },
    MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
    // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
    // MessageGroupId: "Group1",  // Required for FIFO queues
    QueueUrl: "SQS_QUEUE_URL"
    };

    sqs.sendMessage(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.MessageId);
    }
    });

    //Receive and Delete
    var queueURL = "SQS_QUEUE_URL";

    var params = {
    AttributeNames: [
        "SentTimestamp"
    ],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
        "All"
    ],
    QueueUrl: queueURL,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
    };

    sqs.receiveMessage(params, function(err, data) {
    if (err) {
        console.log("Receive Error", err);
    } else if (data.Messages) {
        var deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle
        };
        sqs.deleteMessage(deleteParams, function(err, data) {
        if (err) {
            console.log("Delete Error", err);
        } else {
            console.log("Message Deleted", data);
        }
        });
    }
    });

}