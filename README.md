# LiveFoodJournal



*-[USER MOBILE - Basic Authorization]-*
- create a user (username : password)
- model (created w mongoose)
- post (save json) => post (username : password)



*-[Install Packages]-*
- mongoose
- express
- bcrypt
- jwt (jsonwebtoken)
- bluebird



*-Ecryption-*
- https for security
- hash is a 1 way algorithm (bcrypt)
- hashing (you can't retrieve text back)
- blowfish (if you have secret key (you may convert into text)



***"If you're using a website where you can recover your old password.. STOP USING THAT WEBSITE"***



Authorization: Bearer <access_token>



# App.js

- first we're checking to make sure both an email and password exists.
- we then create an account and profile obj based on the data requested.
- the pid that we're saving into the account obj is a unique key.
- password will be saved using bycrpt (hash)
- following validation of incoming data (look up account by email) if data comes back for email, we can compare.
- set up doc expiration. after an hour, if expiration hasn't been refreshed, doc will erase from db (good because it will force user to sign in and get new session)
