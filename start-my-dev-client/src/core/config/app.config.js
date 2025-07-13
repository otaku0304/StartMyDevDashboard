export class Appconfig {
  static getAPIURI() {
    return process.env.REACT_APP_BACKEND_URL;
  }
}
