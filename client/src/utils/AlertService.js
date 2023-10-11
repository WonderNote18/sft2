class AlertService {
  static redirectToWithAlert(router, redirect, alertOptions){
    const newUrl = {
      path: redirect,
      query: {
        alert: JSON.stringify(alertOptions)
      },
    };
    router.push(newUrl);
  }

}


export default AlertService;