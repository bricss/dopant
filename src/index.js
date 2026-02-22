export default (...args) => Promise.allSettled(
  args.map(async (it) => {
    const [url, attrs = {}] = Array.isArray(it) ? it : [it];

    if (url?.constructor !== String || attrs?.constructor !== Object) {
      throw new TypeError('Invalid input');
    }

    const isLink = attrs.rel || /\.\bcss\b/i.test(url);
    const el = document.createElement(isLink ? 'link' : 'script');

    if (/\bimportmap\b|\bspeculationrules\b/i.test(attrs.type)) {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch ${ attrs.type }: ${ url }`);
      }

      el.textContent = await res.text();
      el.type = attrs.type;
      document.head.append(el);

      return el;
    }

    Object.assign(
      el,
      isLink
      ? {
        ...attrs,
        href: url,
        rel: attrs.rel || 'stylesheet',
      }
      : {
        ...attrs,
        async: attrs.async ?? !attrs.defer,
        src: url,
      },
    );

    return new Promise((res, rej) => {
      el.onerror = (ev) => (ev.target.remove(), rej(ev.target));
      el.onload = (ev) => res(ev.target);
      document.head.append(el);
    });
  }),
);
