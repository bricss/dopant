export default (deps) => {
  if (!deps) {
    throw new Error('Oops! Missing arguments');
  } else {
    deps = Array.isArray(deps) ? deps : [deps];
  }

  const { head } = document;

  for (let i = 0, j = deps.length - 1; i <= j; i++) {
    const ext = deps[i]
      .split('?')[0]
      .substr((~-deps[i].lastIndexOf('.') >>> 0) + 2)
      .toLowerCase();
    let el;

    if (ext === 'css') {
      el = document.createElement('link');
      el.href = deps[i];
      el.rel = 'stylesheet';
    } else if (ext === 'js') {
      el = document.createElement('script');
      el.async = true;
      el.src = deps[i];
    } else {
      console.warn('Unsupported file type or extension:', deps[i]);
    }

    deps[i] = new Promise((resolve, reject) => {
      el.onload = (ev) => {
        resolve((ev.target.onload = ev.target.onerror = undefined, ev));
      };

      el.onerror = (ev) => {
        reject((head.removeChild(ev.target), ev));
      };

      head.appendChild(el);
    });
  }

  return Promise.all(deps);
};
