import buildClient from "../api/build-client";


const LandingPage = ({currentUser}) => {
  return currentUser ? (
    <h1>You are signed in.</h1>
  ) : (
    <h1>You are not signed in.</h1>
  );
};

LandingPage.getInitialProps = async context => {
  try {
    const response = await buildClient(context).get('/api/users/currentuser');
    return response.data;
  } catch (e) {
    console.log(e);
  }
  return {};
};

export default LandingPage;