import AWS from 'aws-sdk'
import s3_cred from '../config/s3_config.js';

AWS.config.update(s3_cred['s3_cred']);


export const generateUniqueFileName = (ext) =>{
    // Generate a timestamp (current time in milliseconds)
    const timestamp = Date.now();
  
    // Generate a random string of 6 characters
    const randomString = Math.random().toString(36).substring(2, 8);
  
    // Combine timestamp, random string, and file extension to create a unique file name
    const uniqueFileName = `${timestamp}-${randomString}.${ext}`;
  
    return uniqueFileName;
  }

  export const splitAndTrim = (inputString)=> {
    // Split the input string by commas
    const parts = inputString.split(',');
  
    // Trim each part to remove extra spaces from left and right
    const trimmedParts = parts.map(part => part.trim());
  
    return trimmedParts;
    // // Example usage:
    // const inputString = "  apple , banana ,  orange,   mango  ";
    // const result = splitAndTrim(inputString);
    // console.log(result); // Output: ['apple', 'banana', 'orange', 'mango']
  }


  export const s3Upload = (buf, key, type)=>{
    let s3Bucket = new AWS.S3( { params: {Bucket: 'sis.storage'} } );
    let data = {
      Key: key, 
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: type,
      ACL : 'public-read'
    };

    s3Bucket.putObject(data, function(err, data){
        if (err) { 
          console.log(err);
          console.log('Error uploading data: ', data); 
        } else {
          console.log('successfully uploaded the document!');
        }
    });
  }
  

  export const generateS3ImageUrl = (name)=> {
    const s3 = new AWS.S3();
    const params = {
      Bucket: 'sis.storage',
      Key: `profilePictures/${name}`,
      Expires : 86400,
    };
  
    // Generate a presigned URL for the image with a validity period (e.g., 1 day)
    const url = s3.getSignedUrl('getObject', params);
  
    return url;
  }


  export const generateS3DataUrl = (key, originalName, fileType)=> {
    const s3 = new AWS.S3();
    const params = {
      Bucket: 'sis.storage',
      Key: key,
      Expires : 86400,
      ResponseContentDisposition: `inline; filename ="${originalName}"`,

    };
  
    // Generate a presigned URL for the image with a validity period (e.g., 1 day)
    const url = s3.getSignedUrl('getObject', params);
  
    return url;
  }