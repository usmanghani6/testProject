export default class NetworkManager {

  constructor() {
    this.baseURL = "http://www.khanlab.co/panikers/";
    this.body = new Map();
  }

  addParams(key : string, value : string) {
    this.body.set(key, value);
  }

  setMethod(methodParam : string) {
    this.method = methodParam;
  }

  getResponse(apiCall : string) {
    switch (apiCall) {
      case "signup":
        return this.getData(this.baseURL + "signup.php");
        break;
      case "login":
        return this.getData(this.baseURL + "login.php");
        break;
      default:
    }
  }

  getData(api : string) {
    return fetch(api, {
      method: this.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.strMapToObj(this.body))
    }).then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        return false;
      }
    }).then(responseJson => {
      console.log("response is :"+responseJson);
      try {
        return JSON.stringify(responseJson);
      } catch (e) {
        return "invalid response";
      }

    }).catch((error) => {
      console.error("error" + error);
      return false;
    });
  }

  strMapToObj(strMap) {
    obj = Object.create(null);
    for (const [k,
      v]of strMap) {
      // We don’t escape the key '__proto__'
      // which can cause problems on older engines
      obj[k] = v;
    }
    return obj;
  }

}
