export const COMMON_APP = {
  //HOST_API: 'https://seo-backend.herokuapp.com/',
  HOST_API: ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3001' : 'https://seo-backend.herokuapp.com'),
  getCookie: function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  },
  setCookie: function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },
  deleteCookie: function (name, path, domain) {
    // If the cookie exists
    if (this.getCookie(name))
      this.setCookie(name, "", -1, path, domain);
  },
  checkCookie: function (loginRes) {
    return true
  },
};
