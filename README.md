#ECOLAB CMS

##NOTES
  - manual password hash tool (for mongodb insertion of admins):
    http://www.passwordtool.hu/blowfish-password-hash-generator
  - regular users (end application users) will have a separate /auth route that the eventual frontend application will hit
  - structure:
    - S5D CMS is the new "strapi" layer
    - End-user CMS-like application for administering the ecolab modules
    - Both connected to same DB instance

##TODO
  - create new /component subdirectory for the user-facing part of the application (/EcoLabApp)
  - /EcoLabApp will hold all components, reducers, etc. pertaining to the ecolab application, not the admin CMS 
  - begin styling home login
  - begin styling users table/list view
  - enable admin emails to new users to reset their password
  - move/rearrange user signup route to be accessible from admin panel
  - add error message(s) upon user register fail
