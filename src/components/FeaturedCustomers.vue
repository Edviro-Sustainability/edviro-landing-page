<script setup lang="ts">
import pausdLogo from '@/assets/img/pausd-logo.svg'
import lgsuhsdLogo from '@/assets/img/lgsuhsd-logo.png'
</script>

<template>
  <!-- FEATURED CUSTOMERS -->
  <section
    id="customers"
    aria-label="Featured customers"
    style="padding: 0 32px 116px; scroll-margin-top: 80px"
  >
    <div style="max-width: 1180px; margin: 0 auto; width: 100%">
      <p
        style="
          margin: 0 0 44px;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #75817b;
          text-align: center;
        "
      >
        Featured customers
      </p>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-evenly;
          gap: 40px;
        "
      >
        <img
          :src="pausdLogo"
          alt="Palo Alto Unified School District"
          style="
            height: 74px;
            width: auto;
            filter: grayscale(1);
            mix-blend-mode: multiply;
            opacity: 0.88;
          "
        />
        <img
          :src="lgsuhsdLogo"
          alt="Los Gatos-Saratoga Union High School District"
          style="
            height: 98px;
            width: auto;
            filter: grayscale(1);
            mix-blend-mode: multiply;
            opacity: 0.88;
          "
        />
      </div>
    </div>
  </section>
</template>
