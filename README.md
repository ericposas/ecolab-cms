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
  - dim or dull out 'disabled' modules / tours / companies
  - check all 'disabled' flags when populating dropdown(s) (when creating a 'Tour' for example)
