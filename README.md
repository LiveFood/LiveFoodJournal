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



# App.js

- first we're checking to make sure both an email and password exists.
- we then create an account and profile obj based on the data requested.
- the pid that we're saving into the account obj is a unique key.
- password will be saved using bycrpt (hash)
