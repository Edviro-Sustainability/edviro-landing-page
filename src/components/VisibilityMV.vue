<script setup lang="ts"></script>

<template>
  <section id="mv" style="padding: 116px 32px; background: #101815; color: #EDF0EE; scroll-margin-top: 80px;">
    <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">
      <div>
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #79867E;">Measurement and verification</p>
        <h2 style="margin: 0 0 22px; font-weight: 400; font-size: clamp(34px, 4.4vw, 50px); line-height: 1.05; letter-spacing: -0.03em; color: #F2F5F1;">Proof your board can read.</h2>
        <p style="margin: 0 0 18px; font-size: 18px; line-height: 1.65; color: #C4CBC5;">Every completed intervention can be measured against a learned baseline, so the district can show what changed and whether the result persisted.</p>
        <p style="margin: 0; font-size: 18px; line-height: 1.65; color: #C4CBC5;">Edviro is designed to support IPMVP-standard measurement and verification workflows and board-ready reporting. Verified outcomes also improve the operating history behind the next capital decision.</p>
      </div>

      <div style="background: #17201B; border: 1px solid #26302A; border-radius: 20px; padding: 28px;">
        <div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 22px;">
          <div>
            <div style="font-weight: 600; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #79867E;">Illustrative baseline comparison</div>
            <div style="font-size: 30px; font-weight: 500; letter-spacing: -0.02em; color: #F2F5F1; margin-top: 8px;">Energy down, comfort held.</div>
          </div>
          <div style="text-align: right; font-weight: 600; font-size: 11px; color: #6FCF97;">Measured<br /><span style="color: #79867E;">vs baseline</span></div>
        </div>
        <svg viewBox="0 0 460 180" style="width: 100%; height: auto; display: block;" aria-label="Illustrative graph comparing predicted baseline with actual performance">
          <defs>
            <linearGradient id="sv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#6FCF97" stop-opacity="0.28"></stop>
              <stop offset="100%" stop-color="#6FCF97" stop-opacity="0"></stop>
            </linearGradient>
          </defs>
          <line x1="0" y1="40" x2="460" y2="40" stroke="#26302A"></line>
          <line x1="0" y1="90" x2="460" y2="90" stroke="#26302A"></line>
          <line x1="0" y1="140" x2="460" y2="140" stroke="#26302A"></line>
          <path d="M0,52 C90,46 150,60 230,54 C320,47 390,58 460,50 L460,140 L0,140 Z" fill="#26302A" opacity="0.5"></path>
          <path d="M0,52 C90,46 150,60 230,54 C320,47 390,58 460,50" fill="none" stroke="#5F6B65" stroke-width="2" stroke-dasharray="5 5"></path>
          <path d="M0,52 C70,70 130,104 210,108 C300,112 380,118 460,116 L460,140 L0,140 Z" fill="url(#sv)"></path>
          <path d="M0,52 C70,70 130,104 210,108 C300,112 380,118 460,116" fill="none" stroke="#6FCF97" stroke-width="2.5"></path>
        </svg>
        <div style="display: flex; justify-content: space-between; margin-top: 14px; font-weight: 500; font-size: 10.5px; color: #79867E;">
          <span style="display: inline-flex; align-items: center; gap: 7px;"><span style="width: 18px; height: 0; border-top: 1.5px dashed #5F6B65;"></span> Predicted baseline</span>
          <span style="display: inline-flex; align-items: center; gap: 7px;"><span style="width: 18px; height: 0; border-top: 2px solid #6FCF97;"></span> Actual with Edviro</span>
        </div>
      </div>
    </div>
  </section>
</template>
