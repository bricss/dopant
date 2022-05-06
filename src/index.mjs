export default (...args) => {
  if (!args.length) {
    throw new TypeError('Missing required arguments');
  }

  args = args.flat();

  const { head } = document;

  for (let i = 0, j = args.length - 1; i <= j; i++) {
    const ext = args[i]
      .split('?')[0]
      .substring((~-args[i].lastIndexOf('.') >>> 0) + 2)
      .toLowerCase();
    let el;

    if (ext === 'css') {
      el = document.createElement('link');
      el.href = args[i];
      el.rel = 'stylesheet';
    } else if (ext.match(/^c?js/)) {
      el = document.createElement('script');
      el.async = true;
      el.src = args[i];
    } else if (ext === 'mjs') {
      el = document.createElement('script');
      el.async = true;
      el.src = args[i];
      el.type = 'module';
    } else {
      args[i] = `Unsupported file type or extension: ${ args[i] }`;
      console.warn(args[i]);
    }

    args[i] = el && new Promise((resolve, reject) => {
      el.onerror = (ev) => {
        reject((head.removeChild(ev.target), ev));
      };

      el.onload = (ev) => {
        resolve((ev.target.onload = ev.target.onerror = void 0, ev));
      };

      head.appendChild(el);
    });
  }

  return Promise.allSettled(args)
                .then((results) => results.reduce((acc, val) => {
                  val.status === 'rejected'
                  ? console.error(val.reason)
                  : acc.push(val.value);

                  return acc;
                }, []));
};
