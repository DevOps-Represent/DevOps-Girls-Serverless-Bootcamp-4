### Building a serverless website in AWS
## What we are going to do

In this practical session, we will

- Create a S3 bucket and configure it as a web server.
- Load the static pages of our website to the bucket.
- Set up a pipeline to publish any changes to the code to S3.

## Create S3 bucket as a web server

### 1.) Creating an S3 Bucket
Go to Services > S3, then click on "Create Bucket"

![Create Bucket](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-1-create-s3-bucket.png?raw=true)

### 2.) Choose a name for S3 Bucket
Enter a unique bucket name and click "Next". The bucket name has to be globally unique. So use something like `yourname-devopsgirls-site`

![Create Bucket](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-2-create-s3-bucket.png?raw=true)

### 3.) Accept defaults
Click "Next" without making any changes.

![Create Bucket](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-3-create-s3-bucket.png?raw=true)

### 4.) Make bucket public
In the "Manage public permissions" drop down choose "Grant public read access to this bucket". Note that you will have a warning, but since we want to host a public website in this bucket, it is ok. Click "Next".

![Create Bucket](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-4-create-s3-bucket.png?raw=true)

### 5.) Confirm bucket creation
Review the inputs, and click "Create Bucket"

![Create Bucket](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-5-create-s3-bucket.png?raw=true)

## Configure S3 bucket as a webserver

### 1.) Choose the S3 bucket just created
Go to Services > S3, then click on the bucket you just created

![Configure Bucket](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-6-configure-s3-bucket.png?raw=true)

### 2.) Modify bucket properties
Click on the "Properties" tab, and click on "Static Website Hosting"

![Configure Bucket](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-7-configure-s3-bucket.png?raw=true)

### 3.) Configure bucket to host a website
Choose "Use this bucket to host a website", enter "index.html" in the "Index document" text box, and click "Save".

![Configure Bucket](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-8-configure-s3-bucket.png?raw=true)

## Copy the static website files to S3 bucket and make them public

### 1.) Copy the static files to S3 bucket
If you have not yet done so, clone the DevOps-Girls/devopsgirls-bootcamp3 repo and change working directory to website_files:

```
$ git clone git@github.com:DevOps-Girls/devopsgirls-bootcamp3.git
$ cd devopsgirls-bootcamp3/website_files
```

Copy the files to the S3 bucket created above. If you have the AWS CLI client:

```
$ aws s3 sync . s3://`yourname-devopsgirls-site`
```

If not, got to `https://s3.console.aws.amazon.com/s3/buckets/yourname-devopsgirls-site` and upload the files via the AWS console (keep all the defaults):

![Upload Files](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-8-upload-files.png?raw=true)

### 2.) Confirm files have been uploaded
Navigate to the S3 bucket in the AWS console, and confirm all the files in the website_files directory are listed there.

### 3.) Make files public
Choose all the files, click on "More" and choose "Make Public". When prompted, confirm by clicking "Make Public" again

![Make Public](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-9-make-files-public.png?raw=true)


### 4.) Access the website
Note down the public URL of the S3 bucket and click on URL

![Website](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-10-s3-public-endpoint.png?raw=true)
