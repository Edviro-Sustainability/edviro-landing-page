// One-off OG image generator. Run: npm i --no-save satori @resvg/resvg-js wawoff2 && node scripts/generate-og.mjs
import { readFile, writeFile } from 'node:fs/promises'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import wawoff2 from 'wawoff2'

const toArrayBuffer = (u8) => u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength)
const ttf = async (path) => toArrayBuffer(await wawoff2.decompress(await readFile(path)))

// Site's woff2 and the variable TTF both trip satori's opentype parser; use a
// static-weight TTF: curl -A curl "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300"
// then download the fonts.gstatic.com URL it returns.
const grotesk = toArrayBuffer(await readFile('/tmp/hanken-static.ttf'))
const mono = await ttf('src/assets/fonts/ibm-plex-mono-400-latin.woff2')
const logo = `data:image/png;base64,${(await readFile('src/assets/img/logo-wordmark.png')).toString('base64')}`

const ACCENT = '#1C3F33'
const INK = '#1A1B14'
const MUTED = '#8A8A7C'

const el = (type, style, children) => ({ type, props: { style, children } })

const tree = el('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  background: '#F4F2EC',
  padding: '0 96px',
  fontFamily: 'Hanken Grotesk',
}, [
  el('div', {
    flex: 1,
    background: '#FCFBF7',
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
      fontFamily: 'IBM Plex Mono',
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
      fontFamily: 'IBM Plex Mono',
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
    { name: 'IBM Plex Mono', data: mono, weight: 400, style: 'normal' },
  ],
})

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
await writeFile('public/og-image.png', png)
console.log('wrote public/og-image.png', png.length, 'bytes')
