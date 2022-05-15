export function validateEmail(email) {
  return String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}

export function validateURL(url) {
  var elm;
  if(url !== "") {  
    if(!elm) {
      elm = document.createElement('input');
      elm.setAttribute('type', 'url');
    }
    elm.value = url;
    return elm.validity.valid;
  } else {
    return false
  }
}
