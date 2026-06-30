<script setup lang="ts">
import hurshImg from '@/assets/img/hursh.png'
import tanujImg from '@/assets/img/tanuj.png'
</script>

<template>
  <!-- TEAM -->
  <section id="team" style="padding: 30px 32px 116px; scroll-margin-top: 80px;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div style="max-width: 720px; margin-bottom: 44px;">
        <p style="margin: 0 0 18px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">The team</p>
        <h2 style="margin: 0; font-weight: 400; font-size: clamp(34px, 4.4vw, 50px); line-height: 1.05; letter-spacing: -0.03em;">Built for this.</h2>
      </div>
      <div class="r-split" style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px;">
        <div style="background: #FBFAF6; border: 1px solid #E3E0D5; border-radius: 18px; padding: 32px; display: flex; gap: 22px;">
          <img :src="hurshImg" alt="Hursh" style="flex: none; width: 64px; height: 64px; border-radius: 16px; object-fit: cover; object-position: 50% 18%;" />
          <div>
            <div style="font-size: 19px; font-weight: 600;">Hursh</div>
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #93937F; margin: 4px 0 12px;">Founder &amp; CEO</div>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #6B6C5E;">Started Edviro working hands-on with school facilities teams. Has built applied AI across climate, healthcare, and aviation, including a NeurIPS 2024 workshop model and a patent-pending screening system.</p>
          </div>
        </div>
        <div style="background: #FBFAF6; border: 1px solid #E3E0D5; border-radius: 18px; padding: 32px; display: flex; gap: 22px;">
          <img :src="tanujImg" alt="Tanuj" style="flex: none; width: 64px; height: 64px; border-radius: 16px; object-fit: cover; object-position: 50% 30%;" />
          <div>
            <div style="font-size: 19px; font-weight: 600;">Tanuj</div>
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #93937F; margin: 4px 0 12px;">Co-founder &amp; CTO</div>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #6B6C5E;">Programming since age 9, deep in scalable and agentic systems. 5× hackathon winner, former startup CTO, and a contracted developer with RTX and a major Bay Area networking company.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
