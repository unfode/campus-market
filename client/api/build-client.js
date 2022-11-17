import axios from "axios";


export default ({req}) => {
  if (typeof window === 'undefined') {
    // we are in the server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // we are in the browser
    return axios.create({});
  }
}