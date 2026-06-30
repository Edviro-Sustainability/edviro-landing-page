<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import logoIcon from '@/assets/img/logo-icon.png'

const props = withDefaults(defineProps<{ demoSpeed?: number }>(), {
  demoSpeed: 1,
})

interface Alert {
  src: string
  title: string
  detail: string
  sev: string
  sevLabel: string
}

interface RawAction {
  type: string
  title: string
  result: string
  tag: string
  green: boolean
}

interface PoolItem {
  alert: Alert
  action: RawAction
}

const POOL: PoolItem[] = [
  {
    alert: { src: 'Meter · Lincoln HS', title: 'Demand spike approaching tariff peak', detail: '4:12pm · +180 kW', sev: '#B5742A', sevLabel: 'PEAK' },
    action: { type: 'BMS setpoint', title: 'Pre-cooled and shifted load off peak', result: 'Avoided $1,240 demand charge', tag: 'Acted', green: true },
  },
  {
    alert: { src: 'BMS · Boiler plant', title: 'Boiler #2 short-cycling', detail: '14 starts / hr', sev: '#B14B3A', sevLabel: 'FAULT' },
    action: { type: 'Work order', title: 'WO #4821 dispatched to facilities', result: 'Guided step-by-step in the app', tag: 'Dispatched', green: false },
  },
  {
    alert: { src: 'Sensor · Gym B', title: 'CO₂ rising, ventilation running low', detail: '1,180 ppm', sev: '#3E6E8E', sevLabel: 'COMFORT' },
    action: { type: 'Schedule', title: 'Ventilation schedule corrected', result: 'Comfort restored, no overrun', tag: 'Acted', green: true },
  },
  {
    alert: { src: 'Utility · District', title: 'Off-hours runtime billed all weekend', detail: '+38% vs baseline', sev: '#6B5BA6', sevLabel: 'ANOMALY' },
    action: { type: 'M&V', title: 'Anomaly escalated and verified', result: 'Savings confirmed in meter data', tag: 'Verified', green: true },
  },
  {
    alert: { src: 'BMS · AHU-3', title: 'Damper stuck, heating and cooling at once', detail: 'since 2:00am', sev: '#B14B3A', sevLabel: 'FAULT' },
    action: { type: 'Setpoint', title: 'Damper override sent, reheat stopped', result: 'Eliminated simultaneous waste', tag: 'Acted', green: true },
  },
  {
    alert: { src: 'Meter · Roosevelt MS', title: 'Overnight base load creeping up', detail: '+9 kW vs 30-day', sev: '#B5742A', sevLabel: 'DRIFT' },
    action: { type: 'Schedule', title: 'Night setback restored', result: '14% lower overnight load', tag: 'Verified', green: true },
  },
  {
    alert: { src: 'Sensor · Library', title: 'Lights on with zero occupancy', detail: 'after 9:00pm', sev: '#3E6E8E', sevLabel: 'COMFORT' },
    action: { type: 'Lighting', title: 'Lighting schedule tightened', result: 'Recurring savings booked', tag: 'Acted', green: true },
  },
  {
    alert: { src: 'Tariff · District', title: 'Rate change lands next billing cycle', detail: 'new peak window', sev: '#6E6E5E', sevLabel: 'INFO' },
    action: { type: 'Re-optimize', title: 'All schedules re-tuned to new tariff', result: 'Forecast $3.1k / mo saved', tag: 'Acted', green: true },
  },
]

const Y = [96, 230, 364]

function mkAction(a: RawAction) {
  return {
    type: a.type,
    title: a.title,
    result: a.result,
    tag: a.tag,
    tagColor: a.green ? '#2F7A57' : '#3E6E8E',
    tagBg: a.green ? 'rgba(47,122,87,0.10)' : 'rgba(62,110,142,0.10)',
    resultColor: a.green ? '#2F7A57' : '#79796B',
  }
}

const revealed = ref(0)
const revealedAct = ref(0)
const cycle = ref(0)
const scale = ref(1)
const wrap = ref<HTMLElement | null>(null)

function speed() {
  return typeof props.demoSpeed === 'number' && props.demoSpeed > 0 ? props.demoSpeed : 1
}

const lanes = computed(() => {
  const len = POOL.length
  const base = (cycle.value * 3) % len
  return [0, 1, 2].map((i) => {
    const item = POOL[(base + i) % len]!
    const av = i < revealed.value
    const cv = i < revealedAct.value
    return {
      cardTop: Y[i]!,
      alert: item.alert,
      action: mkAction(item.action),
      alertOpacity: av ? 1 : 0,
      alertTransform: 'translateY(-50%) translateY(' + (av ? '0px' : '18px') + ')',
      actionOpacity: cv ? 1 : 0,
      actionTransform: 'translateY(-50%) translateY(' + (cv ? '0px' : '18px') + ')',
    }
  })
})

const stageH = computed(() => Math.round(460 * scale.value))
const pipeL0 = computed(() => (revealed.value > 0 ? 0.5 : 0))
const pipeL1 = computed(() => (revealed.value > 1 ? 0.5 : 0))
const pipeL2 = computed(() => (revealed.value > 2 ? 0.5 : 0))
const pipeR0 = computed(() => (revealedAct.value > 0 ? 0.5 : 0))
const pipeR1 = computed(() => (revealedAct.value > 1 ? 0.5 : 0))
const pipeR2 = computed(() => (revealedAct.value > 2 ? 0.5 : 0))

let timers: number[] = []
let loop: number | undefined
let dead = false

function fit() {
  const w = wrap.value
  if (!w) return
  const cw = w.clientWidth || 1120
  const s = Math.min(1, cw / 1120)
  if (Math.abs(s - scale.value) > 0.001) scale.value = s
}

function runCycle() {
  if (dead) return
  const u = 560 / speed()
  timers = []
  const at = (k: number, fn: () => void) =>
    timers.push(window.setTimeout(() => { if (!dead) fn() }, u * k))

  // build up: signal 1, action 1, signal 2, action 2, signal 3, action 3
  revealed.value = 0
  revealedAct.value = 0
  at(0.4, () => { revealed.value = 1 })
  at(1.3, () => { revealedAct.value = 1 })
  at(2.1, () => { revealed.value = 2 })
  at(3.0, () => { revealedAct.value = 2 })
  at(3.8, () => { revealed.value = 3 })
  at(4.7, () => { revealedAct.value = 3 })
  // hold, then wash out (cards + pipes) and advance to the next set
  at(7.6, () => { revealed.value = 0; revealedAct.value = 0 })
  at(8.7, () => { cycle.value += 1 })
  loop = window.setTimeout(() => { if (!dead) runCycle() }, u * 9.1)
}

function onResize() {
  fit()
}

onMounted(() => {
  fit()
  window.addEventListener('resize', onResize)
  requestAnimationFrame(() => fit())
  loop = window.setTimeout(() => runCycle(), 500 / speed())
})

onBeforeUnmount(() => {
  dead = true
  timers.forEach((t) => clearTimeout(t))
  if (loop !== undefined) clearTimeout(loop)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <!-- LIVE DEMO -->
  <div class="r-hide-mobile" style="margin-top: 58px;">
    <div style="display: flex; justify-content: center; width: 100%;">
      <div ref="wrap" style="position: relative; width: 100%; max-width: 1120px;" :style="{ height: stageH + 'px' }">
        <div style="position: absolute; top: 0; left: 0; width: 1120px; height: 460px; transform-origin: top left;" :style="{ transform: 'scale(' + scale + ')' }">

          <div style="position: absolute; left: 24px; top: -2px; font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: #9A9A8C;">Signals in</div>
          <div style="position: absolute; right: 24px; top: -2px; text-align: right; font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: #9A9A8C;">Actions out</div>

          <svg viewBox="0 0 1120 460" style="position: absolute; inset: 0; width: 1120px; height: 460px; overflow: visible;">
            <g fill="none" stroke="#DDD9CC" stroke-width="1.5">
              <path d="M324,96 C404,96 412,230 470,230"></path>
              <path d="M324,230 L470,230"></path>
              <path d="M324,364 C404,364 412,230 470,230"></path>
              <path d="M650,230 C708,230 716,96 796,96"></path>
              <path d="M650,230 L796,230"></path>
              <path d="M650,230 C708,230 716,364 796,364"></path>
            </g>
            <g fill="none" stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round" pathLength="100" stroke-dasharray="11 89">
              <path d="M324,96 C404,96 412,230 470,230" style="animation: glide 2.6s linear infinite; animation-delay: -0.2s; transition: opacity 0.5s ease;" :style="{ opacity: pipeL0 }"></path>
              <path d="M324,230 L470,230" style="animation: glide 2.6s linear infinite; animation-delay: -1.0s; transition: opacity 0.5s ease;" :style="{ opacity: pipeL1 }"></path>
              <path d="M324,364 C404,364 412,230 470,230" style="animation: glide 2.6s linear infinite; animation-delay: -1.8s; transition: opacity 0.5s ease;" :style="{ opacity: pipeL2 }"></path>
              <path d="M650,230 C708,230 716,96 796,96" style="animation: glide 2.6s linear infinite; animation-delay: -1.4s; transition: opacity 0.5s ease;" :style="{ opacity: pipeR0 }"></path>
              <path d="M650,230 L796,230" style="animation: glide 2.6s linear infinite; animation-delay: -2.2s; transition: opacity 0.5s ease;" :style="{ opacity: pipeR1 }"></path>
              <path d="M650,230 C708,230 716,364 796,364" style="animation: glide 2.6s linear infinite; animation-delay: -0.6s; transition: opacity 0.5s ease;" :style="{ opacity: pipeR2 }"></path>
            </g>
          </svg>

          <div style="position: absolute; left: 560px; top: 230px; transform: translate(-50%, -50%); width: 184px; height: 162px;">
            <div style="position: absolute; inset: 0; border-radius: 24px; background: color-mix(in oklab, var(--accent) 7%, #fff); border: 1px solid color-mix(in oklab, var(--accent) 28%, #D8D4C7); box-shadow: 0 14px 40px -26px rgba(0,0,0,0.25); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;">
              <img :src="logoIcon" alt="Edviro" style="width: 26px; height: 26px; border-radius: 8px; display: block;" />
              <span style="font-size: 21px; font-weight: 600; letter-spacing: -0.02em; color: #1A1B14; line-height: 1;">Edviro</span>
            </div>
          </div>

          <div
            v-for="(lane, i) in lanes"
            :key="'alert-' + i"
            style="position: absolute; left: 24px; width: 300px; background: #FFFFFF; border-radius: 14px; padding: 13px 15px; box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 16px 34px -26px rgba(0,0,0,0.22); transition: opacity 0.5s ease, transform 0.55s cubic-bezier(.2,.8,.2,1);"
            :style="{ top: lane.cardTop + 'px', transform: lane.alertTransform, opacity: lane.alertOpacity }"
          >
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 7px;">
              <span style="display: flex; align-items: center; gap: 7px; font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase; color: #93937F;">
                <span style="width: 7px; height: 7px; border-radius: 999px;" :style="{ background: lane.alert.sev }"></span>
                {{ lane.alert.src }}
              </span>
              <span style="font-family: 'IBM Plex Mono', monospace; font-size: 9.5px; color: #B6B5A4;">{{ lane.alert.sevLabel }}</span>
            </div>
            <div style="font-size: 14.5px; font-weight: 500; line-height: 1.3; color: #1A1B14;">{{ lane.alert.title }}</div>
            <div style="margin-top: 5px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #79796B;">{{ lane.alert.detail }}</div>
          </div>

          <div
            v-for="(lane, i) in lanes"
            :key="'action-' + i"
            style="position: absolute; right: 24px; width: 300px; background: #FFFFFF; border-radius: 14px; padding: 13px 15px; box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 16px 34px -26px rgba(0,0,0,0.22); transition: opacity 0.5s ease, transform 0.55s cubic-bezier(.2,.8,.2,1);"
            :style="{ top: lane.cardTop + 'px', transform: lane.actionTransform, opacity: lane.actionOpacity }"
          >
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 7px;">
              <span style="font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase; color: #93937F;">{{ lane.action.type }}</span>
              <span style="font-family: 'IBM Plex Mono', monospace; font-size: 9.5px; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 8px; border-radius: 999px;" :style="{ color: lane.action.tagColor, background: lane.action.tagBg }">{{ lane.action.tag }}</span>
            </div>
            <div style="font-size: 14.5px; font-weight: 500; line-height: 1.3; color: #1A1B14;">{{ lane.action.title }}</div>
            <div style="margin-top: 5px; font-family: 'IBM Plex Mono', monospace; font-size: 11px;" :style="{ color: lane.action.resultColor }">{{ lane.action.result }}</div>
          </div>

        </div>
      </div>
    </div>

    <div style="text-align: center; margin-top: 22px; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: #9A9A8C;">INGEST&nbsp;·&nbsp;DETECT&nbsp;·&nbsp;ACT&nbsp;·&nbsp;VERIFY</div>
  </div>
</template>
