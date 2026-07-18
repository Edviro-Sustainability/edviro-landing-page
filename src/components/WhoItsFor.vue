<script setup lang="ts">
import { ref } from 'vue'

type Tab = 'schools' | 'realestate' | 'construction'

const activeTab = ref<Tab>('schools')

const tabColor = (t: Tab) => (activeTab.value === t ? '#1A1B14' : '#8A8A7C')
const tabWeight = (t: Tab) => (activeTab.value === t ? '600' : '500')
const tabBorder = (t: Tab) => (activeTab.value === t ? 'var(--accent)' : 'transparent')
</script>

<template>
  <!-- WHO IT'S FOR (tabbed) -->
  <section id="how" style="padding: 30px 32px 116px; scroll-margin-top: 80px;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <p style="margin: 0 0 22px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">Who it's for</p>

      <!-- tab bar -->
      <div style="display: flex; flex-wrap: wrap; gap: 30px; border-bottom: 1px solid #E3E0D5; margin-bottom: 44px;">
        <button
          type="button"
          style="appearance: none; background: none; border: none; padding: 0 0 14px; margin-bottom: -1px; font-family: inherit; font-size: 17px; cursor: pointer; transition: color 0.2s ease;"
          :style="{ fontWeight: tabWeight('schools'), color: tabColor('schools'), borderBottom: '2px solid ' + tabBorder('schools') }"
          @click="activeTab = 'schools'"
        >School facilities</button>
        <button
          type="button"
          style="appearance: none; background: none; border: none; padding: 0 0 14px; margin-bottom: -1px; font-family: inherit; font-size: 17px; cursor: pointer; transition: color 0.2s ease;"
          :style="{ fontWeight: tabWeight('realestate'), color: tabColor('realestate'), borderBottom: '2px solid ' + tabBorder('realestate') }"
          @click="activeTab = 'realestate'"
        >Real estate &amp; offices</button>
        <button
          type="button"
          style="appearance: none; background: none; border: none; padding: 0 0 14px; margin-bottom: -1px; font-family: inherit; font-size: 17px; cursor: pointer; transition: color 0.2s ease;"
          :style="{ fontWeight: tabWeight('construction'), color: tabColor('construction'), borderBottom: '2px solid ' + tabBorder('construction') }"
          @click="activeTab = 'construction'"
        >Construction teams</button>
      </div>

      <!-- SCHOOLS PANEL -->
      <div v-if="activeTab === 'schools'" class="r-split" style="display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px; align-items: center;">
        <div>
          <h2 style="margin: 0 0 22px; font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); line-height: 1.07; letter-spacing: -0.03em;">Built for the people who run the building.</h2>
          <div style="display: flex; flex-direction: column; gap: 22px;">
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">1</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">It plugs into what you already have</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #6B6C5E;">Your meters, your BMS, your utility bills. Edviro connects them all.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">2</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">It does the audit for you</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #6B6C5E;">Energy consultations for every site. The moment something drifts, Edviro catches it, not at next quarter's audit.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">3</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">It hands you the fix, or just does it</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #6B6C5E;">A step-by-step work order in your pocket, or an autonomous setpoint change overnight.&nbsp;</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">4</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">It backs up your budget asks</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #6B6C5E;">Every fix feeds a digital twin of each school, so replace-or-repair and bond-season decisions come with modeled payback, not gut feel.</div>
              </div>
            </div>
          </div>
        </div>

        <div style="background: #16170F; border-radius: 22px; padding: 30px; box-shadow: 0 40px 80px -40px rgba(0,0,0,0.45);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #8E907F;">Edviro · Mobile</span>
            <span style="font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #16170F; background: #6FCF97; padding: 3px 9px; border-radius: 999px;">Auto-generated</span>
          </div>
          <div style="background: #1F2017; border: 1px solid #2D2E22; border-radius: 14px; padding: 18px;">
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #8E907F; margin-bottom: 8px;">WORK ORDER #4821 · Boiler plant</div>
            <div style="font-size: 17px; font-weight: 600; color: #F4F2EC; line-height: 1.35; margin-bottom: 16px;">Boiler #2 short-cycling at 14 starts/hr. Check pump and reset differential.</div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C9CABA;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> Isolate and inspect circulation pump</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C9CABA;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> Reset firing differential to spec</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #8E907F;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #4A4B3C;"></span> Log starts/hr after 2-hr run</div>
            </div>
          </div>
          <div style="margin-top: 16px; display: flex; align-items: center; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #8E907F;">
            <span>Verifying in meter data…</span>
            <span style="color: #6FCF97;">est. −$2,100/yr</span>
          </div>
        </div>
      </div>

      <!-- REAL ESTATE PANEL -->
      <div v-if="activeTab === 'realestate'" class="r-split" style="display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px; align-items: center;">
        <div>
          <h2 style="margin: 0 0 22px; font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); line-height: 1.07; letter-spacing: -0.03em;">Built for the buildings people work in.</h2>
          <div style="display: flex; flex-direction: column; gap: 22px;">
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">1</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">It connects your whole building stack</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #6B6C5E;">BMS, meters, submeters, and the WiFi routers already on every floor, pulled into one live model.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">2</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">Occupancy-aware control</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #6B6C5E;">Edviro reads occupancy from the WiFi routers already in the building, then ties HVAC and lighting to who's actually there, so you only condition space that's in use. No new sensors to install.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">3</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">Comfort tenants notice, opex they don't</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #6B6C5E;">Autonomous setbacks and demand management cut energy and peak charges while keeping tenants comfortable.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">4</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">Capex ranked by payback</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #6B6C5E;">The digital twin simulates retrofits and replacements across the portfolio, so capital goes to the projects that pay back first.</div>
              </div>
            </div>
          </div>
        </div>

        <div style="background: #16170F; border-radius: 22px; padding: 30px; box-shadow: 0 40px 80px -40px rgba(0,0,0,0.45);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #8E907F;">Edviro · Building</span>
            <span style="font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #16170F; background: #6FCF97; padding: 3px 9px; border-radius: 999px;">Auto-generated</span>
          </div>
          <div style="background: #1F2017; border: 1px solid #2D2E22; border-radius: 14px; padding: 18px;">
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #8E907F; margin-bottom: 8px;">ZONE · Floor 4 East · occupancy</div>
            <div style="font-size: 17px; font-weight: 600; color: #F4F2EC; line-height: 1.35; margin-bottom: 16px;">Wing empty after 6:00pm but still fully conditioned. Setting back to unoccupied mode.</div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C9CABA;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> Occupancy confirmed from WiFi routers</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C9CABA;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> HVAC and lighting set back</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #8E907F;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #4A4B3C;"></span> Restore on first morning badge-in</div>
            </div>
          </div>
          <div style="margin-top: 16px; display: flex; align-items: center; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #8E907F;">
            <span>Verifying in meter data…</span>
            <span style="color: #6FCF97;">est. −$3,400/yr</span>
          </div>
        </div>
      </div>

      <!-- CONSTRUCTION PANEL -->
      <div v-if="activeTab === 'construction'" class="r-split" style="display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px; align-items: center;">
        <div>
          <h2 style="margin: 0 0 22px; font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); line-height: 1.07; letter-spacing: -0.03em;">Baselining and M&amp;V, built into the build.</h2>
          <div style="display: flex; flex-direction: column; gap: 22px;">
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">1</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">Independent baselining</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #6B6C5E;">Set a measured energy baseline before and during construction, so every savings claim holds up.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">2</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">Audit-grade M&amp;V</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #6B6C5E;">Verify performance against that baseline continuously, with reports owners and lenders trust.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">3</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">Maintenance agents from day one</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #6B6C5E;">The same agents that verify also catch faults and waste, so new buildings run as designed from handover.</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', monospace; font-size: 13px;">4</span>
              <div>
                <div style="font-size: 17px; font-weight: 600; margin-bottom: 4px;">Design model vs. as-built twin</div>
                <div style="font-size: 15.5px; line-height: 1.55; color: #6B6C5E;">The as-built digital twin is checked against the design model, so variance surfaces during the build, not after handover.</div>
              </div>
            </div>
          </div>
        </div>

        <div style="background: #16170F; border-radius: 22px; padding: 30px; box-shadow: 0 40px 80px -40px rgba(0,0,0,0.45);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #8E907F;">Edviro · M&amp;V</span>
            <span style="font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #16170F; background: #6FCF97; padding: 3px 9px; border-radius: 999px;">Audit-grade</span>
          </div>
          <div style="background: #1F2017; border: 1px solid #2D2E22; border-radius: 14px; padding: 18px;">
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #8E907F; margin-bottom: 8px;">BASELINE · Tower A · fit-out</div>
            <div style="font-size: 17px; font-weight: 600; color: #F4F2EC; line-height: 1.35; margin-bottom: 16px;">Independent baseline locked. Measured load tracking 8% above the design model.</div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C9CABA;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> Baseline fit to metered data</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C9CABA;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> Variance flagged to the GC</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #8E907F;"><span style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #4A4B3C;"></span> Issue M&amp;V report to owner</div>
            </div>
          </div>
          <div style="margin-top: 16px; display: flex; align-items: center; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #8E907F;">
            <span>Verifying against baseline…</span>
            <span style="color: #6FCF97;">lender-ready</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
