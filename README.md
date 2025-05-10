# DevTinder Frontend

- Created a Vite + React Project
- Remove Unnecessary Code
- Install Tailwind
- Intall daisyUI
- Add navbar component to app.jsx
- Create a NavBar.jsx separate component file
- Install react-router-dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in Body Component
- Create a Footer
- Create a Login
- Install axios
- CORS - install cors in the backend => add middleware to with configuration : origin, credentials : true
- Whenever you are making API call so pass axios => {withCredentials : true}
- Install Redux Toolkit and react-redux - https://redux-toolkit.js.org/tutorials/quick-start
- configureStore => provider => createSlice => add reducer to appstore
- Add Reduc toolkit in chrome
- Login and check whether data is coming properly in the store
- NavBar should update as soon as User logs in
- Refactor our code to add constant file + create a component folder
- You should not be access other routed without login
- If token is not present redirect to login page
- Logout Feature
- Input Validation
- Get the feed and add the feed on Store
- Build the user card on feed
- Edit Profile Feature
- Show Toast message on saved profiles
- New Page - See all connections

Body
NavBar
Routes = / => Feed
Routes = /login => Login
Routes = /connections => Connections
Routes = /profile => Profile
