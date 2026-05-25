export async function loadFonts () {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')
  webFontLoader.default.load({
    google: {
      families: [
        'Barlow+Condensed:wght@700;800;900',
        'Barlow:wght@400;500;600;700;800',
        'Inter:wght@400;500;600',
      ],
    },
  })
}
