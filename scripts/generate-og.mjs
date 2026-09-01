// One-off OG image generator. Run: npm i --no-save satori @resvg/resvg-js && node scripts/generate-og.mjs
import { readFile, writeFile } from 'node:fs/promises'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const toArrayBuffer = (u8) => u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength)

// Site's woff2 and the variable TTF both trip satori's opentype parser, so
// static-weight TTF instances are vendored in scripts/fonts/. To refresh them:
// curl -A curl "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300"
// then download the fonts.gstatic.com URL it returns (same for wght@600).
const grotesk = toArrayBuffer(await readFile('scripts/fonts/hanken-grotesk-300.ttf'))
const groteskSemibold = toArrayBuffer(await readFile('scripts/fonts/hanken-grotesk-600.ttf'))
const logo = `data:image/png;base64,${(await readFile('src/assets/img/logo-wordmark.png')).toString('base64')}`

const ACCENT = '#16493D'
const INK = '#171D1A'
const MUTED = '#75817B'

const el = (type, style, children) => ({ type, props: { style, children } })

const tree = el('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  background: '#EDF0EE',
  padding: '0 96px',
  fontFamily: 'Hanken Grotesk',
  fontWeight: 300,
}, [
  el('div', {
    flex: 1,
    background: '#F9FAF9',
    display: 'flex',
    flexDirection: 'column',
    padding: '56px 64px 48px',
  }, [
    { type: 'img', props: { src: logo, style: { height: 44 } } },
    el('div', { display: 'flex', flexDirection: 'column', marginTop: 74 }, [
      el('div', { fontSize: 74, lineHeight: 1.08, letterSpacing: '-0.03em', color: INK }, 'AI for the people who'),
      el('div', { fontSize: 74, lineHeight: 1.08, letterSpacing: '-0.03em', color: ACCENT, display: 'flex' }, [
        el('span', {}, 'run the buildings'),
        el('span', { color: INK }, '.'),
      ]),
    ]),
    el('div', {
      marginTop: 30,
      fontWeight: 600,
      fontSize: 21,
      letterSpacing: '0.18em',
      color: MUTED,
    }, 'ENERGY MANAGEMENT · DIGITAL TWINS · CAPITAL PLANNING'),
    el('div', { flex: 1, display: 'flex' }),
    el('div', {
      borderTop: `1px solid ${ACCENT}`,
      paddingTop: 26,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: 600,
      fontSize: 18,
    }, [
      el('div', { color: ACCENT, letterSpacing: '0.1em' }, 'INGEST · DETECT · ACT · VERIFY · SIMULATE'),
      el('div', { display: 'flex', alignItems: 'center', gap: 12, color: INK }, [
        el('div', {
          width: 26,
          height: 26,
          background: '#FB651E',
          color: '#fff',
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }, 'Y'),
        el('div', {}, 'Backed by Y Combinator'),
      ]),
    ]),
  ]),
])

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Hanken Grotesk', data: grotesk, weight: 300, style: 'normal' },
    { name: 'Hanken Grotesk', data: groteskSemibold, weight: 600, style: 'normal' },
  ],
})

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
await writeFile('public/og-image.png', png)
console.log('wrote public/og-image.png', png.length, 'bytes')
