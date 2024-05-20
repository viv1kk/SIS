import dotenv from 'dotenv'
dotenv.config()

const s3_cred={
    "accessKeyId": process.env.S3_ACCESSKEYID,
    "secretAccessKey": process.env.S3_SECRETACCESSKEY,
    "region": process.env.S3_REGION
  }

export default {s3_cred}