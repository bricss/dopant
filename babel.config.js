const loose = true;

module.exports = function (api) {
  api?.cache(false);
  const useESModules = process.env.NODE_ENV === 'test';

  return {
    plugins: [
      [
        '@babel/plugin-transform-modules-commonjs',
        { loose },
      ],
      [
        '@babel/plugin-transform-runtime',
        { useESModules },
      ],
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          bugfixes: true,
          loose,
          ...useESModules && { modules: false },
          shippedProposals: true,
        },
      ],
    ],
  };
};
