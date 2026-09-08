<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, serviceLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import {
  ASSETS_PATH,
  BLOG_URL,
  BOOK_DEMO_PATH,
  CAPITAL_PLANNING_PATH,
  CMMS_PATH,
  FACILITIES_OPS_PATH,
  MV_PATH,
  SCHOOL_ENERGY_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'School facilities operations', path: FACILITIES_OPS_PATH },
]

const workflow = [
  { title: 'Spot the issue', body: 'A staff request, a utility change, a BMS alarm, an inspection finding, or a schedule mismatch indicates a problem.' },
  { title: 'Find the likely cause', body: 'Edviro gathers the schedule, weather, asset history, prior work, and interval data around it and explains what is most likely happening.' },
  { title: 'Create or route the work', body: 'The work order is created and assigned in Edviro, or routed into the CMMS the district already uses.' },
  { title: 'Complete it in the field', body: 'The technician gets the asset history, the steps, and the inspection workflow on a phone or tablet.' },
  { title: 'Verify the result', body: 'Edviro checks the building and energy data afterwards to confirm the problem actually stopped.' },
  { title: 'Learn from recurrence', body: 'Repeat issues raise the priority of preventive work and become evidence for projects, budgets, and the capital plan.' },
]

const diagnosticsExamples = [
  'A "too hot" request from a classroom matched to a stuck damper the BMS never alarmed on',
  'After-hours HVAC runtime traced to a schedule that never learned about the new bell times',
  'A gas meter that kept running over winter break, ranked above a hundred low-severity alarms',
  'A boiler short-cycling 14 times an hour, flagged before anyone called about the cold gym',
  'The third belt failure on the same rooftop unit in twelve months, surfaced as a pattern',
]

const roles = [
  { role: 'Director of maintenance and operations', gets: 'One view of every open issue across the district—likely cause, priority, owner, age—without chasing people for updates.' },
  { role: 'Technicians and custodial leads', gets: 'Assignments on their phone with the asset history and steps attached; photos, notes, and completion from the field.' },
  { role: 'Business officials and energy managers', gets: 'Verified savings, labor and parts cost, and utility performance on the same record as the work that produced them.' },
  { role: 'Superintendents and boards', gets: 'A capital plan that traces back to inspections, repeated failures, and cost history instead of a wish list.' },
]

const faqs: FaqItem[] = [
  {
    question: 'What is an AI-powered O&M platform?',
    answer:
      'An AI-powered operations and maintenance (O&M) platform combines the records a facilities team already keeps—work orders, assets, inspections, schedules, projects, and budgets—with the signals coming out of the buildings, such as BMS alarms, utility bills, and interval meter data. AI does the watching and investigating: it detects problems, gathers the relevant context, explains the likely cause, proposes the next step, and later checks whether the fix worked. People stay in charge of what gets approved and done. Edviro is built this way for school districts.',
  },
  {
    question: 'How is Edviro different from a traditional CMMS?',
    answer:
      'A traditional CMMS is a system of record: it stores work orders and assets and waits for someone to enter, prioritize, assign, and close them. Edviro does the record-keeping too, but it also connects the record to what the buildings are doing. It can open work from a detected problem, attach the likely cause and asset history, help prioritize the backlog, and confirm from the building data that a closed work order actually resolved the issue. Districts can use Edviro as their CMMS or keep their current one and connect it.',
  },
  {
    question: 'How is Edviro different from a building automation system?',
    answer:
      'A building automation system (BAS or BMS) controls equipment and raises alarms. It does not decide which alarms matter, who should respond, or whether the response worked—and it knows nothing about your utility bills, asset history, or budget. Edviro sits above the BAS: it reads its alarms and data alongside meters, schedules, requests, and asset records, turns real problems into work, and verifies the outcome. Edviro does not replace your building controls or the people who run them.',
  },
  {
    question: 'Can technicians use Edviro in the field?',
    answer:
      'Yes. Technicians receive assignments and updates on a phone or tablet, see the equipment history and any step-by-step guidance, and complete inspections, photos, notes, and completion status from the field. What they record becomes part of the asset\'s service history.',
  },
  {
    question: 'Can Edviro connect maintenance history with capital planning?',
    answer:
      'Yes. Because inspections, work orders, repeated failures, and repair costs are logged against the asset, Edviro can show which equipment is consuming the most attention and money, model repair versus replace against real operating data, and carry that evidence into projects, budgets, and multi-year capital priorities.',
  },
  {
    question: 'Can Edviro replace our existing CMMS?',
    answer:
      'It can. Edviro includes native work orders, asset records, service history, inspections, and mobile field workflows, so districts that are unhappy with their current CMMS can run those functions in Edviro. Districts that want to keep their system can connect it instead and still use Edviro for monitoring, diagnostics, verification, and planning. Integration scope is confirmed system by system.',
  },
]

usePageSeo({
  title: 'School Facilities Management Software | AI-Powered O&M | Edviro',
  titleTemplate: null,
  description:
    'Manage school work orders, assets, inspections, preventive maintenance, building issues, projects, budgets, and energy in one AI-powered facilities operations platform.',
  path: FACILITIES_OPS_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro school facilities operations and maintenance platform',
      description:
        'AI-powered operations and maintenance for school facilities: work orders, assets, inspections, preventive maintenance, mobile field workflows, energy monitoring, diagnostics, projects, budgets, capital planning, and measurement and verification.',
      path: FACILITIES_OPS_PATH,
      serviceType: 'K–12 facilities operations and maintenance software',
      areaServed: 'United States',
    }),
    faqLd(faqs),
  ],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <!-- HERO -->
    <section style="padding: 40px 32px 64px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div style="max-width: 800px;">
          <p style="margin: 0 0 22px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">School facilities management software</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.2vw, 60px); line-height: 1.05; letter-spacing: -0.035em;">AI-powered operations and maintenance for <span style="color: var(--accent);">school facilities</span></h1>
          <p style="margin: 26px 0 0; max-width: 680px; font-size: 19px; line-height: 1.6; color: #4B5550;">Edviro connects building signals, work orders, assets, schedules, field teams, projects, and budgets so school facilities teams can detect problems, coordinate the response, and verify that the work succeeded.</p>
          <p style="margin: 16px 0 0; max-width: 640px; font-size: 16px; line-height: 1.55; color: #171D1A; font-weight: 500;">Use Edviro as your work-order and asset system—or connect the systems you already have.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</RouterLink>
            <a href="#workflow" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #171D1A; background: transparent; padding: 13px 24px; border-radius: 999px; border: 1px solid #C0CCC3;">See how the work flows</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 1. THE PROBLEM -->
    <section id="problem" style="padding: 30px 32px 70px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">The problem</p>
        <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 720px;">Fragmented systems and manual triage.</h2>
        <p style="margin: 0 0 40px; max-width: 720px; font-size: 17px; line-height: 1.6; color: #4B5550;">In most districts, facilities information is split across a BMS alarm list, a work-order system or an inbox, utility portals, spreadsheets, a binder of asset records, and the memory of a few veteran staff. Someone has to read it all, decide what is real, figure out who should go, and follow up by phone. That person is usually the director—and it is why so many problems are found by a complaint instead of by the data.</p>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Signals live in different places</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">The alarm is in the BMS, the request is in email, the bill is in a portal, and the equipment history is in a filing cabinet. Nobody sees them together.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Triage is a person's job</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">Deciding which of two hundred alarms and forty requests matters most takes judgment and time—time that comes out of evenings and weekends.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Nobody confirms the fix</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">A closed work order means someone showed up. It does not mean the boiler stopped short-cycling or the weekend runtime went away.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. SIGNAL-TO-RESOLUTION WORKFLOW -->
    <section id="workflow" style="padding: 80px 32px; background: #F5F7F5; border-top: 1px solid #E3E8E4; border-bottom: 1px solid #E3E8E4;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">How the work flows</p>
        <h2 style="margin: 0 0 40px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 720px;">From the first signal to a verified resolution.</h2>
        <ol class="r-cols-3" style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
          <li v-for="(step, i) in workflow" :key="step.title" style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 16px; padding: 22px 22px 20px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">{{ i + 1 }}</span>
              <h3 style="margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.01em;">{{ step.title }}</h3>
            </div>
            <p style="margin: 0; font-size: 15px; line-height: 1.55; color: #5F6B65;">{{ step.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- 3. AI-ASSISTED INVESTIGATION AND PRIORITIZATION -->
    <section id="diagnostics" style="padding: 90px 32px 70px;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Diagnostics and alerts</p>
          <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em;">AI-assisted investigation and prioritization.</h2>
          <p style="margin: 0 0 16px; font-size: 17px; line-height: 1.6; color: #4B5550;">An alarm tells you something tripped. Edviro tells you what is most likely wrong and how much it matters. For each signal it pulls together the occupancy schedule, weather, the asset's age and service history, prior work orders, related alarms, and interval energy data, then explains the likely cause in plain language and proposes a priority based on comfort, safety, cost, and recurrence.</p>
          <p style="margin: 0; font-size: 17px; line-height: 1.6; color: #4B5550;">The result is an energy or building alert a director can act on in one read—and a backlog ordered by impact, not by arrival time.</p>
        </div>
        <div style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 18px; padding: 26px 28px;">
          <p style="margin: 0 0 14px; font-weight: 600; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #75817B;">What this looks like in practice</p>
          <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 12px;">
            <li v-for="ex in diagnosticsExamples" :key="ex" style="display: flex; gap: 12px; font-size: 15px; line-height: 1.5; color: #4B5550;">
              <span aria-hidden="true" style="flex: none; margin-top: 8px; width: 7px; height: 7px; border-radius: 999px; background: var(--accent);"></span>
              <span>{{ ex }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 4. WORK ORDERS AND SERVICE REQUESTS -->
    <section id="work-orders" style="padding: 70px 32px;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Work orders and service requests</p>
          <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em;">A complete work-order system, connected to the building.</h2>
          <p style="margin: 0 0 20px; font-size: 17px; line-height: 1.6; color: #4B5550;">Staff submit requests through the web or supported messaging workflows. Edviro helps categorize and prioritize each one, routes it by school, asset, project, or trade, notifies the technician, and carries the equipment history and instructions with the work. Photos, inspection results, notes, and completion status land on the record from the field.</p>
          <p style="margin: 0 0 24px; font-size: 17px; line-height: 1.6; color: #4B5550;">Then Edviro does the part a CMMS never did: it checks the subsequent building and energy data to confirm the original problem is gone.</p>
          <RouterLink :to="WORK_ORDERS_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: var(--accent); text-decoration: none;">Explore school work-order software →</RouterLink>
        </div>
        <ul class="r-cols-2" style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <li v-for="item in ['Request intake', 'AI-assisted categorization and priority', 'Assignment by school, asset, project, or trade', 'Mobile technician notifications', 'Equipment history and relevant instructions', 'Photos, inspections, notes, completion', 'Backlog, overdue-work, and priority review', 'Verification against building data']" :key="item" style="background: #F5F7F5; border: 1px solid #E3E8E4; border-radius: 12px; padding: 14px 16px; font-size: 14.5px; font-weight: 500; color: #171D1A;">{{ item }}</li>
        </ul>
      </div>
    </section>

    <!-- 5. REPLACE OR INTEGRATE -->
    <section id="cmms" style="padding: 70px 32px; background: #101815; color: #EDF0EE;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #79867E;">Your CMMS, your choice</p>
        <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; color: #F2F5F1; max-width: 720px;">Replace your CMMS—or connect the one you already use.</h2>
        <p style="margin: 0 0 36px; max-width: 720px; font-size: 17px; line-height: 1.6; color: #C4CBC5;">Districts frustrated with their current work-order system can run work orders and assets in Edviro. Districts that like theirs can keep it and connect it. Either way, monitoring, diagnostics, verification, and planning work the same.</p>
        <div class="r-cols-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div style="background: #17201B; border: 1px solid #26302A; border-radius: 16px; padding: 26px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600; color: #EDF0EE;">Use Edviro as your work-order and asset system</h3>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C4CBC5;">Native request intake, work orders, asset records, service history, inspections, and mobile field workflows—one record from the first signal to the verified fix. Migration of existing asset lists and open work is scoped with your team.</p>
          </div>
          <div style="background: #17201B; border: 1px solid #26302A; border-radius: 16px; padding: 26px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600; color: #EDF0EE;">Connect your existing CMMS</h3>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C4CBC5;">Edviro finds and diagnoses the problem, then routes the work into your current system and reads the outcome back to verify it. Integration scope is confirmed system by system before you commit.</p>
          </div>
        </div>
        <RouterLink :to="CMMS_PATH" class="text-link" style="display: inline-block; margin-top: 28px; font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">Compare Edviro with a traditional CMMS →</RouterLink>
      </div>
    </section>

    <!-- 6. ASSET REGISTRY AND MAINTENANCE HISTORY -->
    <section id="assets" style="padding: 90px 32px 70px;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Assets and inspections</p>
          <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em;">Asset registry and maintenance history.</h2>
          <p style="margin: 0 0 20px; font-size: 17px; line-height: 1.6; color: #4B5550;">Every boiler, rooftop unit, chiller, pump, panel, and controller gets a record: type, location, age, nameplate details, documents, and known issues. Each work order, inspection, and repair is logged against it, so the history that used to live in one technician's head is on the record for the next one.</p>
          <p style="margin: 0 0 24px; font-size: 17px; line-height: 1.6; color: #4B5550;">Asset history is also what makes the rest of the platform smarter: diagnostics read it, priorities weigh it, and capital planning is built on it.</p>
          <RouterLink :to="ASSETS_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: var(--accent); text-decoration: none;">Explore school asset management software →</RouterLink>
        </div>
        <div style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 18px; padding: 26px 28px;">
          <p style="margin: 0 0 14px; font-weight: 600; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #75817B;">On each asset record</p>
          <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; font-size: 15px; line-height: 1.5; color: #4B5550;">
            <li>Equipment type, building, and location</li>
            <li>Age, nameplate details, and documents</li>
            <li>Inspections and recurring maintenance tasks</li>
            <li>Every work order and repair, with photos and notes</li>
            <li>Known issues and repeated-failure patterns</li>
            <li>Related energy and building signals</li>
            <li>Repair-versus-replace status and capital plan link</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 7. PREVENTIVE AND PREDICTIVE MAINTENANCE -->
    <section id="preventive-maintenance" style="padding: 70px 32px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Preventive maintenance</p>
        <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 720px;">Preventive and predictive maintenance, prioritized by history.</h2>
        <p style="margin: 0 0 40px; max-width: 760px; font-size: 17px; line-height: 1.6; color: #4B5550;">Recurring work is scheduled against the asset, not a spreadsheet. Priority comes from what the record shows: equipment with repeated failures, high repair cost, or a growing history moves up. And because Edviro watches building and energy data continuously, it can raise equipment that is behaving abnormally—short cycling, runtime creeping up, zones fighting each other—before the complaint arrives. That is predictive maintenance in the practical sense: earlier, data-driven attention, not a guarantee.</p>
        <div class="r-cols-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #D8DED9; border: 1px solid #D8DED9; border-radius: 18px; overflow: hidden;">
          <div style="background: #F9FAF9; padding: 26px 24px;">
            <h3 style="margin: 0 0 8px; font-size: 17px; font-weight: 600;">Recurring work on the asset</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.55; color: #5F6B65;">Filter changes, belt checks, seasonal start-ups—generated and tracked per asset.</p>
          </div>
          <div style="background: #F9FAF9; padding: 26px 24px;">
            <h3 style="margin: 0 0 8px; font-size: 17px; font-weight: 600;">History-based priority</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.55; color: #5F6B65;">Repeated failures and rising cost raise the priority of preventive tasks automatically.</p>
          </div>
          <div style="background: #F9FAF9; padding: 26px 24px;">
            <h3 style="margin: 0 0 8px; font-size: 17px; font-weight: 600;">Early signals from the data</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.55; color: #5F6B65;">Abnormal equipment behavior in building and energy data is flagged for inspection early.</p>
          </div>
          <div style="background: #F9FAF9; padding: 26px 24px;">
            <h3 style="margin: 0 0 8px; font-size: 17px; font-weight: 600;">Backlog you can defend</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.55; color: #5F6B65;">Overdue and deferred work reviewed by impact, with the reasoning attached.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. MOBILE FIELD WORKFLOWS -->
    <section id="mobile" style="padding: 70px 32px; background: #F5F7F5; border-top: 1px solid #E3E8E4; border-bottom: 1px solid #E3E8E4;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">In the field</p>
          <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em;">Mobile workflows built for technicians.</h2>
          <p style="margin: 0; font-size: 17px; line-height: 1.6; color: #4B5550;">Technicians get their assignments on a phone or tablet with the asset's history and the steps attached. They complete inspections, add photos and notes, and close the work order from the mechanical room—no trip back to the office to update a spreadsheet. Everything they record becomes part of the service history the next technician will rely on.</p>
        </div>
        <ol style="list-style: none; margin: 0; padding: 0; display: grid; gap: 10px;">
          <li v-for="(s, i) in ['Receive the assignment and its priority', 'Open the asset record and last service notes', 'Follow the steps or inspection checklist', 'Attach photos, readings, and notes', 'Mark complete—verification starts automatically']" :key="s" style="display: flex; gap: 14px; align-items: center; background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 12px; padding: 14px 16px;">
            <span style="flex: none; width: 28px; height: 28px; border-radius: 8px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 12.5px;">{{ i + 1 }}</span>
            <span style="font-size: 15px; font-weight: 500; color: #171D1A;">{{ s }}</span>
          </li>
        </ol>
      </div>
    </section>

    <!-- 9. PROJECTS, BUDGETS, AND CAPITAL PLANS -->
    <section id="planning" style="padding: 90px 32px 70px;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Projects, budgets, and capital plans</p>
          <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em;">Connect today's maintenance decisions to tomorrow's capital plan.</h2>
          <p style="margin: 0 0 24px; font-size: 17px; line-height: 1.6; color: #4B5550;">When a repair becomes a project, it keeps its owner, funding source, and budget. When an asset fails for the third time, it is already evidence. Edviro models repair versus replace against real operating data and cost history, and turns the result into multi-year capital priorities the board can trace back to the maintenance record.</p>
          <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: var(--accent); text-decoration: none;">Explore capital planning →</RouterLink>
        </div>
        <div style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 18px; padding: 26px 28px;">
          <p style="margin: 0 0 14px; font-weight: 600; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #75817B;">What carries through</p>
          <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; font-size: 15px; line-height: 1.5; color: #4B5550;">
            <li>Asset records and equipment history</li>
            <li>Inspections and recurring work</li>
            <li>Repeated failures and their cost</li>
            <li>Repair-versus-replace analysis</li>
            <li>Projects with owners, funding sources, and budgets</li>
            <li>Ranked multi-year capital priorities</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 10. ENERGY OPTIMIZATION AND VERIFICATION -->
    <section id="energy" style="padding: 70px 32px; background: #101815; color: #EDF0EE;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #79867E;">Energy optimization and verification</p>
          <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; color: #F2F5F1;">Energy is where most districts start—and where every fix is proven.</h2>
          <p style="margin: 0 0 16px; font-size: 17px; line-height: 1.6; color: #C4CBC5;">Edviro began as energy management software for schools, and energy remains a first-class part of the platform: electricity, gas, water, solar, and demand read together with schedules and building systems; abnormal performance detected and diagnosed; corrective work coordinated; results measured against a learned baseline.</p>
          <p style="margin: 0 0 24px; font-size: 17px; line-height: 1.6; color: #C4CBC5;">That measurement and verification (M&amp;V) is what turns a closed work order into a result a business official or board can read: what changed, why, what it cost, whether performance improved, and whether it lasted.</p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <RouterLink :to="SCHOOL_ENERGY_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">Explore energy management software for schools →</RouterLink>
            <RouterLink :to="MV_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">How measurement and verification works →</RouterLink>
          </div>
        </div>
        <div style="background: #17201B; border: 1px solid #26302A; border-radius: 16px; padding: 26px;">
          <p style="margin: 0 0 14px; font-weight: 600; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #79867E;">What Edviro catches</p>
          <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; font-size: 15px; line-height: 1.5; color: #C4CBC5;">
            <li>Unexpected gas or water usage</li>
            <li>After-hours HVAC operation</li>
            <li>Demand spikes that set the month's charge</li>
            <li>Solar underperformance and production-guarantee review</li>
            <li>Simultaneous heating and cooling</li>
            <li>Equipment short cycling</li>
            <li>Schedule and occupancy mismatch</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 11. ROLES -->
    <section id="roles" style="padding: 90px 32px 40px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Who uses it</p>
        <h2 style="margin: 0 0 36px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 720px;">One record, read by everyone who runs the district's buildings.</h2>
        <div class="r-cols-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div v-for="r in roles" :key="r.role" style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 16px; padding: 22px 24px;">
            <h3 style="margin: 0 0 8px; font-size: 17px; font-weight: 600;">{{ r.role }}</h3>
            <p style="margin: 0; font-size: 15px; line-height: 1.55; color: #5F6B65;">{{ r.gets }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 12. FAQ -->
    <FaqList eyebrow="Questions from districts" heading="School facilities operations FAQ" :items="faqs" />

    <!-- RELATED -->
    <section style="padding: 0 32px 90px;">
      <div style="max-width: 820px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 14px; font-weight: 600; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #75817B;">Related</p>
        <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; font-size: 15.5px;">
          <li><RouterLink :to="SCHOOL_ENERGY_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">Energy management software for schools</RouterLink></li>
          <li><RouterLink :to="WORK_ORDERS_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">School work-order software</RouterLink></li>
          <li><RouterLink :to="CMMS_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">CMMS for schools: replace or integrate</RouterLink></li>
          <li><RouterLink :to="ASSETS_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">School asset management software</RouterLink></li>
          <li><RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">Capital planning</RouterLink></li>
          <li><RouterLink :to="MV_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">Measurement and verification</RouterLink></li>
          <li><a :href="`${BLOG_URL}/blog/what-ai-powered-operations-and-maintenance-means-for-a-school-district/`" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">What AI-powered operations and maintenance means for a school district</a></li>
          <li><a :href="`${BLOG_URL}/blog/from-bas-alert-to-completed-work-order/`" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">From BAS alert to completed work order: closing the facilities operations loop</a></li>
          <li><a :href="`${BLOG_URL}/blog/cmms-vs-ai-native-om-platform-for-school-districts/`" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">CMMS vs. AI-native O&amp;M platform: what school districts actually need</a></li>
        </ul>
      </div>
    </section>

    <CtaSection />
  </main>
</template>

<style scoped>
.book-btn:hover {
  filter: brightness(1.12);
}
.outline-btn:hover {
  border-color: #171D1A !important;
}
.text-link:hover {
  text-decoration: underline;
}
</style>
