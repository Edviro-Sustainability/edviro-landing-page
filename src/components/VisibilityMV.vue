<script setup lang="ts"></script>

<template>
  <!-- VISIBILITY / M&V -->
  <section id="mv" style="padding: 116px 32px; background: #16170F; color: #F4F2EC; scroll-margin-top: 80px;">
    <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">
      <div>
        <p style="margin: 0 0 18px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8E907F;">Visibility &amp; M&amp;V</p>
        <h2 style="margin: 0 0 22px; font-weight: 400; font-size: clamp(34px, 4.4vw, 50px); line-height: 1.05; letter-spacing: -0.03em; color: #F8F7F1;">Proof your board can read.</h2>
        <p style="margin: 0 0 18px; font-size: 18px; line-height: 1.65; color: #C9CABA;">Every action is measured against a learned baseline, so you can show exactly what changed, what it saved, and that it's still saving.</p>
        <p style="margin: 0; font-size: 18px; line-height: 1.65; color: #C9CABA;">Board-ready reports and audit-grade measurement and verification, generated automatically. And every verified fix updates the digital twin, so your next capital decision starts from better data.</p>
      </div>

      <div style="background: #1F2017; border: 1px solid #2D2E22; border-radius: 20px; padding: 28px;">
        <div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 22px;">
          <div>
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #8E907F;">Verified vs baseline · Lincoln HS</div>
            <div style="font-size: 30px; font-weight: 500; letter-spacing: -0.02em; color: #F8F7F1; margin-top: 8px;">Energy down, comfort held.</div>
          </div>
          <div style="text-align: right; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #6FCF97;">−21.4%<br /><span style="color: #8E907F;">vs baseline</span></div>
        </div>
        <svg viewBox="0 0 460 180" style="width: 100%; height: auto; display: block;">
          <defs>
            <linearGradient id="sv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#6FCF97" stop-opacity="0.28"></stop>
              <stop offset="100%" stop-color="#6FCF97" stop-opacity="0"></stop>
            </linearGradient>
          </defs>
          <line x1="0" y1="40" x2="460" y2="40" stroke="#2D2E22"></line>
          <line x1="0" y1="90" x2="460" y2="90" stroke="#2D2E22"></line>
          <line x1="0" y1="140" x2="460" y2="140" stroke="#2D2E22"></line>
          <path d="M0,52 C90,46 150,60 230,54 C320,47 390,58 460,50 L460,140 L0,140 Z" fill="#2D2E22" opacity="0.5"></path>
          <path d="M0,52 C90,46 150,60 230,54 C320,47 390,58 460,50" fill="none" stroke="#6E6F5E" stroke-width="2" stroke-dasharray="5 5"></path>
          <path d="M0,52 C70,70 130,104 210,108 C300,112 380,118 460,116 L460,140 L0,140 Z" fill="url(#sv)"></path>
          <path d="M0,52 C70,70 130,104 210,108 C300,112 380,118 460,116" fill="none" stroke="#6FCF97" stroke-width="2.5"></path>
        </svg>
        <div style="display: flex; justify-content: space-between; margin-top: 14px; font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: #8E907F;">
          <span style="display: inline-flex; align-items: center; gap: 7px;"><span style="width: 18px; height: 0; border-top: 1.5px dashed #6E6F5E;"></span> Predicted baseline</span>
          <span style="display: inline-flex; align-items: center; gap: 7px;"><span style="width: 18px; height: 0; border-top: 2px solid #6FCF97;"></span> Actual with Edviro</span>
        </div>
      </div>
    </div>
  </section>
</template>
