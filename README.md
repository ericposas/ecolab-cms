#ECOLAB CMS

##NOTES
  - manual password hash tool (for mongodb insertion of admins):
    http://www.passwordtool.hu/blowfish-password-hash-generator
  - regular users (end application users) will have a separate /auth route that the eventual frontend application will hit
  - structure:
    - S5D CMS is the new "strapi" layer
    - End-user CMS-like application for administering the ecolab modules
    - Both connected to same DB instance
    - create new /component subdirectory for the user-facing part of the application (/EcoLabApp)
    - /EcoLabApp will hold all components, reducers, etc. pertaining to the ecolab application, not the admin CMS

##TODO
  - multer causes an error with sessions; needed to format the multer middleWare according to: https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
  - add user auth check in every route in the end-user application
  - add file size and file extension check on company logo upload
  - show thumbnail of uploaded image after upload 
