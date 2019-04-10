export function setSession(id, params) {
  if (!params || !id) {
    console.error('params and id needed!');
    return false;
  }

  if (typeof params !== 'object') {
    console.error('params needs to be an object!');
    return false;
  }

  sessionStorage.setItem(id, JSON.stringify(params));

  return { id: params };
}

export function getSession(id) {
  if (!id) {
    console.error('id needed!');
    return false;
  }

  return JSON.parse(sessionStorage.getItem(id));
}
