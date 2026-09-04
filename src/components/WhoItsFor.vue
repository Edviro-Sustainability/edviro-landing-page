<script setup lang="ts">
import { ref } from 'vue'

type Tab = 'schools' | 'construction' | 'datacenters'

const activeTab = ref<Tab>('schools')

const tabColor = (t: Tab) => (activeTab.value === t ? '#171D1A' : '#75817B')
const tabWeight = (t: Tab) => (activeTab.value === t ? '600' : '500')
const tabBorder = (t: Tab) => (activeTab.value === t ? 'var(--accent)' : 'transparent')
</script>

<template>
  <!-- WHO IT'S FOR (tabbed) -->
  <section id="how" style="padding: 30px 32px 116px; scroll-margin-top: 80px;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <p style="margin: 0 0 22px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Who it's for</p>

      <!-- tab bar -->
      <div style="display: flex; flex-wrap: wrap; gap: 30px; border-bottom: 1px solid #D8DED9; margin-bottom: 44px;">
        <button
          type="button"
          style="appearance: none; background: none; border: none; padding: 0 0 14px; margin-bottom: -1px; font-family: inherit; font-size: 17px; cursor: pointer; transition: color 0.2s ease;"
          :style="{ fontWeight: tabWeight('schools'), color: tabColor('schools'), borderBottom: '2px solid ' + tabBorder('schools') }"
          @click="activeTab = 'schools'"
        >School facilities</button>
        <button
          type="button"
          style="appearance: none; background: none; border: none; padding: 0 0 14px; margin-bottom: -1px; font-family: inherit; font-size: 17px; cursor: pointer; transition: color 0.2s ease;"
          :style="{ fontWeight: tabWeight('construction'), color: tabColor('construction'), borderBottom: '2px solid ' + tabBorder('construction') }"
          @click="activeTab = 'construction'"
        >Construction teams</button>
        <button
          type="button"
          style="appearance: none; background: none; border: none; padding: 0 0 14px; margin-bottom: -1px; font-family: inherit; font-size: 17px; cursor: pointer; transition: color 0.2s ease;"
          :style="{ fontWeight: tabWeight('datacenters'), color: tabColor('datacenters'), borderBottom: '2px solid ' + tabBorder('datacenters') }"
          @click="activeTab = 'datacenters'"
        >Data centers</button>
      </div>

      <!-- SCHOOLS PANEL -->
      <div v-if="activeTab === 'schools'" class="r-split" style="display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px; align-items: center;">
        <div>
          <h2 style="margin: 0 0 22px; font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); line-height: 1.07; letter-spacing: -0.03em;">Built for school maintenance and operations.</h2>
          <div style="display: flex; flex-direction: column; gap: 22px;">
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">1</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">It connects the operating record</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #5F6B65;">Bring requests, work orders, assets, inspections, schedules, energy, and supported BMS data into one usable context.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">2</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">It helps your team find the cause</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #5F6B65;">Edviro connects the request with available history and building evidence so staff begin with a likely cause and supporting facts.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">3</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">It routes the work</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #5F6B65;">Use Edviro's native work-order system or connect the CMMS your team keeps. Supported controls changes require the right integration, review, and authorization.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">4</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">It strengthens repair-or-replace decisions</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #5F6B65;">Connect recurring failures, service history, energy performance, and modeled scenarios to a clearer capital case.</div>
              </div>
            </div>
          </div>
        </div>

        <div style="background: #101815; border-radius: 22px; padding: 30px; box-shadow: 0 40px 80px -40px rgba(0,0,0,0.45);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <span style="font-weight: 600; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #79867E;">Edviro · Mobile</span>
            <span style="font-weight: 600; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #101815; background: #6FCF97; padding: 3px 9px; border-radius: 999px;">Evidence attached</span>
          </div>
          <div style="background: #17201B; border: 1px solid #26302A; border-radius: 14px; padding: 18px;">
            <div style="font-weight: 600; font-size: 11px; color: #79867E; margin-bottom: 8px;">WORK ORDER #4821 · Boiler plant</div>
            <div style="font-size: 17px; font-weight: 600; color: #EDF0EE; line-height: 1.35; margin-bottom: 16px;">Boiler #2 short-cycling at 14 starts/hr. Check pump and reset differential.</div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C4CBC5;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> Isolate and inspect circulation pump</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C4CBC5;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> Reset firing differential to spec</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #79867E;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #39443E;"></span> Log starts/hr after 2-hr run</div>
            </div>
          </div>
          <div style="margin-top: 16px; display: flex; align-items: center; justify-content: space-between; font-weight: 500; font-size: 11px; color: #79867E;">
            <span>Outcome review</span>
            <span style="color: #6FCF97;">awaiting verification</span>
          </div>
        </div>
      </div>

      <!-- CONSTRUCTION PANEL -->
      <div v-if="activeTab === 'construction'" class="r-split" style="display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px; align-items: center;">
        <div>
          <h2 style="margin: 0 0 22px; font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); line-height: 1.07; letter-spacing: -0.03em;">Baselining and M&amp;V for project handover.</h2>
          <div style="display: flex; flex-direction: column; gap: 22px;">
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">1</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">Independent baselining</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #5F6B65;">Set a measured energy baseline before and during construction, so every savings claim holds up.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">2</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">Defined M&amp;V workflow</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #5F6B65;">Use an agreed baseline and reviewable reporting in workflows designed to support IPMVP-standard practices.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">3</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">Operational follow-through from day one</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #5F6B65;">Connect verification, fault review, and accountable work so teams can investigate whether a new building is operating as intended.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">4</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">Design model vs. as-built twin</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #5F6B65;">The as-built digital twin is checked against the design model, so variance surfaces during the build, not after handover.</div>
              </div>
            </div>
          </div>
        </div>

        <div style="background: #101815; border-radius: 22px; padding: 30px; box-shadow: 0 40px 80px -40px rgba(0,0,0,0.45);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <span style="font-weight: 600; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #79867E;">Edviro · M&amp;V</span>
            <span style="font-weight: 600; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #101815; background: #6FCF97; padding: 3px 9px; border-radius: 999px;">Reviewable</span>
          </div>
          <div style="background: #17201B; border: 1px solid #26302A; border-radius: 14px; padding: 18px;">
            <div style="font-weight: 600; font-size: 11px; color: #79867E; margin-bottom: 8px;">BASELINE · Tower A · fit-out</div>
            <div style="font-size: 17px; font-weight: 600; color: #EDF0EE; line-height: 1.35; margin-bottom: 16px;">Independent baseline locked. Measured load tracking 8% above the design model.</div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C4CBC5;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> Baseline fit to metered data</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C4CBC5;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> Variance flagged to the GC</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #79867E;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #39443E;"></span> Issue M&amp;V report to owner</div>
            </div>
          </div>
          <div style="margin-top: 16px; display: flex; align-items: center; justify-content: space-between; font-weight: 500; font-size: 11px; color: #79867E;">
            <span>Verifying against baseline…</span>
            <span style="color: #6FCF97;">stakeholder-ready</span>
          </div>
        </div>
      </div>

      <!-- DATA CENTERS PANEL -->
      <div v-if="activeTab === 'datacenters'" class="r-split" style="display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px; align-items: center;">
        <div>
          <h2 style="margin: 0 0 22px; font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); line-height: 1.07; letter-spacing: -0.03em;">Built for the sites where cooling is the constraint.</h2>
          <div style="display: flex; flex-direction: column; gap: 22px;">
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">1</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">It models the site from data you already have</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #5F6B65;">Power, cooling, and environmental telemetry already coming out of the site feed a physics-based thermal model. No new instrumentation.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">2</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">It answers the headroom question</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #5F6B65;">How much cooling headroom the site actually has at today's load, and how much more it could take.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">3</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">It simulates density before you commit racks</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #5F6B65;">Test higher rack densities and cooling scenarios against the model, not the live floor, and see where supply temperature becomes the constraint.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">4</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">It proves itself on one live pod</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #5F6B65;">Pilot-scale by design: predictions are verified against measured data on a single pod before you plan capacity with them.</div>
              </div>
            </div>
          </div>
        </div>

        <div style="background: #101815; border-radius: 22px; padding: 30px; box-shadow: 0 40px 80px -40px rgba(0,0,0,0.45);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <span style="font-weight: 600; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #79867E;">Edviro · Thermal</span>
            <span style="font-weight: 600; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #101815; background: #6FCF97; padding: 3px 9px; border-radius: 999px;">Physics-based</span>
          </div>
          <div style="background: #17201B; border: 1px solid #26302A; border-radius: 14px; padding: 18px;">
            <div style="font-weight: 600; font-size: 11px; color: #79867E; margin-bottom: 8px;">HEADROOM · Pod 3 · N+1 cooling</div>
            <div style="font-size: 17px; font-weight: 600; color: #EDF0EE; line-height: 1.35; margin-bottom: 16px;">Cooling headroom 240 kW at design inlet. Supports +12 racks at 17 kW before ΔT becomes the constraint.</div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C4CBC5;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> Thermal model calibrated to site telemetry</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C4CBC5;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> Density scenario simulated at N+1</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #79867E;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #39443E;"></span> Verify against measured inlet temps</div>
            </div>
          </div>
          <div style="margin-top: 16px; display: flex; align-items: center; justify-content: space-between; font-weight: 500; font-size: 11px; color: #79867E;">
            <span>Verifying against live telemetry…</span>
            <span style="color: #6FCF97;">pilot: one live pod</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
