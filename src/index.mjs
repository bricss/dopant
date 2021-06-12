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
    } else if (ext.match(/^c?js/)) {
      el = document.createElement('script');
      el.async = true;
      el.src = deps[i];
    } else if (ext === 'mjs') {
      el = document.createElement('script');
      el.async = true;
      el.src = deps[i];
      el.type = 'module';
    } else {
      deps[i] = `Unsupported file type or extension: ${ deps[i] }`;
      console.warn(deps[i]);
    }

    deps[i] = el && new Promise((resolve, reject) => {
      el.onerror = (ev) => {
        reject((head.removeChild(ev.target), ev));
      };

      el.onload = (ev) => {
        resolve((ev.target.onload = ev.target.onerror = void 0, ev));
      };

      head.appendChild(el);
    });
  }

  return Promise.allSettled(deps)
                .then((results) => results.reduce((acc, val) => {
                  val.status === 'rejected'
                  ? console.error(val.reason)
                  : acc.push(val.value);

                  return acc;
                }, []));
};
