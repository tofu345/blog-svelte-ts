TODO

// headers: {
//   Authorization: user ? `Bearer ${user.accessToken}` : "",
// },

-----
Change the way the frontend - backend connection works
have the modal for the create post component be inside it

------------------
- DONE: Create Login page
- get token using simple jwt
- Save token in local storage

- If token does not exist in local storage then redirect to login page 
- Also implement - (if you are redirected to login from a page when done logging in redirect back to the page using searchparams)

- Signout functionality delete token from localstorage if it is there and redirect to login page


------------------
- attach token to all requests
- make all views login required
- token duration to 7 days