file sharing app

seber server (google drive)

1. User will upload the file to our server (post http://localhost:8080/api/files/:)
2. Generate a sharable link (Get http://localhost:8080/files/:uuid)
3. use the link to download the file (Get http://localhost:8080/files/download/:uuid)
4. Send the downloadable link to email (post http://localhost:8080/api/files/send)

multer:
1. create a multer instance
2. create a configuration object
3. use the function to upload a file

where to save the file?(loaction) -> done
file validation
size
extension
