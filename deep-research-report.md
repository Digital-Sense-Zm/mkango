# Mandatory Knowledge and Operating Rules for an AI Hotel Concierge in Zambia

## Zambian hospitality context that matters for chatbot design

A concierge bot for entity["country","Zambia","southern africa"] should be designed as a **digital front desk** that can answer routine questions instantly, but can also **capture leads** and execute **clean human handoff** for high-value or high-risk requests (events, transfers, complaints, safety). This is especially relevant because the Travel & Tourism sector is a meaningful contributor to the economy, with recent estimates placing Travel & Tourism’s **total contribution to GDP around the mid‑single digits (e.g., 6.2% in 2023)** while supporting a large number of jobs (direct + total employment effects), making service reliability and conversion (bookings and MICE leads) commercially important. citeturn16search15

From a guest-experience angle, the most common “Zambia questions” guests ask hotels are not only hotel ops (check-in/out, Wi‑Fi, breakfast) but also: **seasonality**, **safari and attraction planning**, **border/visa logic** (including KAZA Univisa), **airport logistics**, and **safety/emergency guidance**. Zambia’s official visitor information describes two main seasons (rainy vs dry) and splits the dry season into cooler and hotter periods—details that often drive travel planning questions and activity recommendations. citeturn1view3

The national marketing and planning perspective (tourism circuits / destination areas) reinforces that hotels often sell not just rooms, but **itineraries** (Livingstone/Victoria Falls, Kafue, Lower Zambezi, Luangwa Valley, lakes and waterfalls circuits). The Zambia Tourism Agency strategic planning documents list priority destination areas such as **entity["city","Lusaka","Zambia"]** and **entity["city","Livingstone","Zambia"] and explicitly frame the country as organized into tourism circuits that guests commonly traverse. citeturn14view3turn15view0

image_group{"layout":"carousel","aspect_ratio":"16:9","query":["Victoria Falls Zambia travel","South Luangwa National Park safari Zambia","Kafue National Park Zambia landscape","Lusaka Zambia skyline"],"num_per_query":1}

Digitally, a realistic production path for hospitality chat in Zambia is messaging-first. The national ICT survey found that among internet users with social media accounts, **WhatsApp was the second most-used platform (after Facebook)**, and it explicitly highlights the rise of OTT apps like WhatsApp and Messenger due to convenience and cost effectiveness—supporting your strategic “demo now, WhatsApp in production” direction. citeturn21view0

## Regulatory, tax, and safety facts your bot should treat as mandatory

The most damaging concierge failures are compliance-adjacent: giving wrong bill totals, giving unsafe health advice, mishandling personal data, or giving guests incorrect border/medicine guidance. The following items should be treated as **core “always loaded” knowledge** (your `hotel-knowledge.ts` baseline and escalation guardrails), even if the property-specific facts change.

### Mandatory bill components: tourism levy and service charge

Hotels in Zambia frequently present guests with line items that are not “optional add-ons,” and many guest disputes come from misunderstandings about these charges.

**Tourism Levy (1.5%)**
The Tourism Levy regulations require a tourism enterprise/facility providing accommodation services and events to charge a tourism levy, and specify **“one point five per cent” of the person’s total bill** on the leviable services. citeturn8view0turn8view3  
The regulations also define “events” broadly (e.g., conferences, exhibitions, gala dinners, and social/family occasions above a threshold), which intersects directly with your lead-capture and escalation logic for MICE. citeturn8view3  
The regulations additionally state that the tourism levy amount **is not considered for the purposes of VAT computation** under the VAT Act—important for how totals are explained to guests. citeturn7view4turn8view0

**Service Charge (commonly 10%)**
The Service Charge regulations define a service charge as a fee charged on accommodation, food, beverages and other tourism-related services, and require accommodation establishments and restaurants to impose a service charge on the total bill, with the **rate specified as 10%**. citeturn5view0

**Implication for the bot**
Your bot must be able to answer “why is my bill higher than the room rate?” without guessing. It should:
1) identify whether the guest is looking at *room rate*, *subtotal*, or *final invoice total*;  
2) explain tourism levy and service charge as standard line items;  
3) escalate immediately if the guest disputes amounts or requests refunds/waivers (because that becomes a policy/authority decision).

### Licensing and guest register expectations

Zambia’s licensing framework for accommodation enterprises explicitly requires that an accommodation establishment **maintain a register of guests**, and it allows this register to be maintained **in electronic format**. citeturn3view2

**Implication for the bot**
This supports two design requirements:
- The chatbot should never pretend that ID/passport capture is “optional” at check-in; it should phrase it as “standard check-in requirements apply, and front desk may request identification” and then confirm property specifics with staff if needed. (Keep the phrasing factual and non-legalistic.)
- When you add “production” integrations to PMS/CRM, you should plan for guest-registration workflows that are **data-minimized** and aligned with data protection law (below).

### Data protection: personal data collection must be minimized and controlled

Zambia has a formal data protection framework. Subsidiary legislation on registration and licensing indicates:
- data controllers/processors are registered in categories (micro/medium/large/individual); citeturn24view0  
- entities intending to operate as a data controller/processor apply to the Data Protection Commissioner for a certificate of registration; citeturn24view0  
- the regulations explicitly include governance concepts such as **records of processing activities** and **data protection impact assessments** in the structure of the framework. citeturn24view0

Independent analysis and commentary on the Data Protection Act emphasizes that the law applies broadly to automated processing and more traditional processing, and it highlights special protections (e.g., around children/vulnerable persons and consent). citeturn7view1

**Implication for the bot**
Your lead-capture must be “privacy by design”:
- Ask only what you need (name, contact method, dates, purpose, party size).
- Never ask for or store card numbers, passport scans, or national ID details in chat unless you have a formal, secure, compliant workflow (and even then, strongly prefer a secure payment/ID link rather than chat text).
- Provide a short, consistent privacy notice in the handoff flow (“we’ll use this to contact you about your request…”).

### Prohibited and controlled drugs: a real-world FAQ with legal risk

Zambia Tourism Agency materials (downloaded as a guest-facing list) connect Zambia’s controlled substances enforcement to the Narcotic Drugs and Psychotropic Substances Act, and provide a practical distinction:
- some drugs are prohibited; citeturn5view4  
- controlled drugs require a doctor’s prescription in minimal quantities and must be **declared upon entry**;  
- larger quantities may require a permit from the Zambia Medicines Regulatory Authority (ZAMRA) before traveling. citeturn5view5

**Implication for the bot**
This is a classic “helpful but high-risk” topic. The bot should:
- provide **general guidance + official references**, then  
- strongly recommend confirming with immigration/health authorities, and  
- escalate if the guest’s question implies risk (e.g., carrying opioids, controlled psychiatric medications, large quantities, or unclear prescriptions).

### Emergency numbers and escalation-first safety behavior

A Zambia Tourism emergency numbers sheet advises travelers to save national short codes and provides specific Lusaka/Livingstone contacts (e.g., Emergency 999; Police 991; Ambulance 991; Fire 993; plus key station/hospital lines). citeturn23view0  
The Zambia police service’s official “Contact Us” page also lists emergency numbers (Emergency 991; Ambulance 992; Fire 993). citeturn23view1

**Implication for the bot**
Because sources show some variation in how “emergency” is labeled, the bot should:
- prioritize **“If someone is in immediate danger, call local emergency services now”** plus provide multiple relevant short codes;  
- never “handle” emergencies conversationally;  
- immediately escalate to human staff and mark the thread as urgent.

## Hotel knowledge blueprint for `hotel-knowledge.ts`

Your hotel knowledge file should be structured into two layers: **Zambia baseline** (stable facts + compliance facts) and **property truth** (the hotel’s actual policies, rates, and services). The bot should always answer with **property truth first**, and fall back to Zambia baseline only when property truth is missing.

### Zambia baseline knowledge fields that should exist in every deployment

A Zambia-oriented concierge should include the following baseline knowledge blocks because they recur in guest conversations and/or create legal or safety risk if answered incorrectly:

**Taxes & charges explainer**
- Tourism levy: 1.5% on total bill for accommodation services and events. citeturn8view0turn8view3  
- Service charge: imposed on total bill; 10% rate under the service charge regulations. citeturn5view0  
- VAT relationship: tourism levy is not considered for VAT computation (so invoices can show separate treatment). citeturn7view4  
Your knowledge should contain “invoice-language templates” so the bot can explain charges consistently without improvising.

**Visitor logistics defaults**
- Seasonality: rainy season vs dry season, and the subdivision of dry season into cool vs hot periods. citeturn1view3turn15view3  
- Key airport context for transfers. For example, entity["company","Zambia Airports Corporation Limited","state-owned airports operator"] notes that **Kenneth Kaunda International Airport is about 27 km from Lusaka’s main business district**, which affects transfer times and pricing conversations. citeturn27search7  
- Emergency numbers: store as structured data for the bot to render in emergencies. citeturn23view0turn23view1

**Payments & currency**
- “Zambian Kwacha and Ngwee (100 ngwee = K1)” and current currency family; prevent the bot from confusing “K” usage. citeturn27search12turn27search0  
- A dedicated rule: the bot never quotes FX conversions as guaranteed; it can call out that exchange rates fluctuate and suggest asking front desk for accepted payment methods.

**Electricity & adapters**
- Standard power: 230V, 50Hz; plug types C/D/G. citeturn27search10  
This is a frequent traveler question and an easy win for concierge usefulness.

**Accommodation category and grading vocabulary**
Zambia Tourism Agency classification definitions help the bot use correct local terms (hotel vs guest house vs lodge vs safari camp vs lodge rates inclusive of activities, etc.). For example, the ZTA classification document defines:  
- hotels as professionally managed with reception and F&B availability and a minimum room count;  
- guest houses and B&Bs by room thresholds;  
- lodges/safari camps as nature-based with rates often inclusive of F&B and activities. citeturn29view0  
Even if you don’t expose this to guests directly, it improves intent detection (“I’m looking for a lodge-style package inclusive of activities”).

### Property truth fields that should be mandatory before any “production” claim is made

For the demo you can stub these, but for production you should require them in CMS (Payload) before the AI is allowed to answer without escalation:

- check-in/check-out times; early check-in/late check-out rules  
- breakfast inclusion; restaurant hours; dietary handling  
- Wi‑Fi policy; outage contingency messaging  
- transfer offerings; trusted driver partners; “meet & greet” protocol  
- cancellations, amendments, no‑show rules  
- accepted payments; whether foreign currency cards are accepted; deposit policy  
- child policies; extra bed policies  
- accessibility statements (rooms, ramps, lifts)  
- security facts (guards, parking security, area safety guidance language)  
- complaint handling promise (SLA + who responds)

If any of the above is missing, the bot should default to “I can confirm this with the team—can I take your dates and a contact number?” and escalate.

## Zambia-specific FAQ set for `hotel-faqs.ts`

Instead of writing FAQs as a flat list, model them as: **(Question intent → structured answer → evidence links → escalation flag)**. The aim is to reduce hallucinations by giving the LLM “known good” responses for high-frequency intents.

### High-frequency travel and entry FAQs

**Visa types and fees (must be source-bound)**
The Zambia Department of Immigration provides specific visa types and fees (single, double, multiple entry; day tripper; KAZA Univisa), including fee amounts and validity descriptions. citeturn1view3  
Because immigration rules are changeable, the bot should answer with “as published by immigration” and include a “verify before travel” nudge.

**KAZA Univisa**
Immigration describes KAZA Univisa as allowing multiple entry between Zambia and Zimbabwe within validity rules and covering Botswana day trips via Kazungula; it lists where it can be obtained and its fee. citeturn1view3  
The UK’s travel advice page mirrors the KAZA cost and validity, reinforcing the general shape of guidance from an independent government source. citeturn26view1

**Passport validity**
UK travel advice states passport validity expectations (at least 6 months remaining and blank pages) and stresses that Zambia sets and enforces entry rules. citeturn26view1  
Immigration visitor guidance similarly refers to passport validity and blank pages for visa-on-arrival logic. citeturn1view3

### Health FAQs with safe boundaries

**Malaria and routine travel vaccines**
The CDC traveler guidance for Zambia states that travelers should take prescription medicine to prevent malaria and provides additional vaccine guidance; FCDO advises travelers to check vaccine recommendations and highlights risks including malaria and cholera. citeturn26view3turn26view2  
Your FAQ answer should be: general guidance + “talk to a clinician” + “confirm any entry requirements based on your route.”

**Yellow fever certificate**
UK travel advice states that a yellow fever certificate is required **if coming from a country listed as a transmission risk**, and points to specialist travel health guidance for details. citeturn26view1  
Do not let the bot claim “you always need yellow fever.” Treat it as itinerary-dependent.

### Money, power, and practicalities FAQs

**Currency**
Bank of Zambia describes the currency as kwacha and ngwee (100 ngwee = K1) and provides official context for denominations and currency family. citeturn27search12turn27search0

**Power plugs**
Electrical Safety First’s travel guidance lists Zambia’s plug types (C/D/G) and the 230V/50Hz supply. citeturn27search10

**Airport transfers**
Zambia Airports Corporation content provides distance context relevant to transfer planning. citeturn27search7  
For production, you should store exact transfer times by time-of-day (peak vs off-peak) as property truth, but still keep Zambia baseline context for when the user hasn’t specified the property city.

### Billing and “why the total changed” FAQs

**Tourism levy and service charge**
The Tourism Levy regulations specify a 1.5% levy on the total bill for accommodation services/events. citeturn8view0turn8view3  
Service charge regulations specify a 10% service charge on the total bill for accommodation, food/beverages, and other tourism-related services. citeturn5view0  
These should be pinned as “gold answers” because they drive disputes.

### Safety and prohibited items FAQs

**Emergency numbers**
Zambia Tourism emergency numbers (and the police site’s emergency numbers) should be a stored FAQ that can be displayed instantly. citeturn23view0turn23view1

**Medication and controlled substances**
The prohibited/controlled drug guidance emphasizes declaration requirements and permits for larger quantities for controlled substances. citeturn5view5  
The FAQ should be framed as “general guidance; confirm with immigration / your airline / a qualified medical professional,” and escalate if the medication is likely regulated.

## Escalation rules for `escalation-rules.ts` and code-level guardrails

Your escalation strategy should combine **prompt-level behavior** (“offer human help”) with a **deterministic `shouldEscalate()`** function. Zambia-specific research points to several escalation classes.

### Immediate escalation: safety, legal risk, and urgent harm

Escalate immediately (set conversation to `PENDING_HUMAN` and show emergency guidance) when the user mentions:
- medical emergencies, injury, assault, fire, immediate danger  
- theft in progress, violence or threats  
- “police / ambulance / fire” or equivalent language  

Your bot should respond with emergency numbers and a “call now” instruction, using official references for short codes. citeturn23view0turn23view1

### High-value escalation: events, conferences, and large groups

The Tourism Levy regulations explicitly treat “events” as leviable services alongside accommodation, and they define “events” to include conferences/exhibitions/gala dinners and social occasions meeting a size threshold—meaning event business is structurally important and often complex. citeturn8view3  
Therefore:
- Any conference, group booking, wedding, or “function room” inquiry should trigger lead capture and escalation to sales/banqueting staff.
- Your lead form should request minimum viable details (dates, pax, format, budget range, AV needs), but postpone pricing until staff confirms availability.

### Operational escalation: pricing, refunds, policy exceptions, or anything that can create liability

Escalate when:
- user disputes bill totals, asks for tax waivers, refunds, chargebacks  
- user requests a written guarantee (“confirm in writing that…”)  
- user asks legal-sounding questions about drugs/customs/immigration that go beyond basic references  

The Tourism Levy and Service Charge rules are straightforward to explain, but any dispute becomes a real policy and authority issue. citeturn8view0turn5view0

### Data-and-privacy escalation: sensitive personal data

Escalate (or route to a secure workflow) if a user tries to provide:
- payment card numbers  
- passport numbers or scans  
- medical records  

Given Zambia’s data protection registration and governance expectations (registration, record of processing, DPIA), the safe default is to refuse collecting sensitive data in chat and offer alternatives (“secure payment link” or “front desk will assist”). citeturn24view0turn7view1

### Recommended escalation output format for the bot

To support your staff inbox, every escalation should include:
- reason code (EVENTS, TRANSFER, COMPLAINT, EMERGENCY, POLICY, PRIVACY)  
- urgency (IMMEDIATE / SAME_DAY / NORMAL)  
- extracted entities (dates, pax, flight number if offered, city)  
- next question for staff (“confirm rate inclusions + taxes?”)

This is demo-friendly and production-realistic.

## System prompt requirements for `concierge-system-prompt.ts`

Your system prompt should not be generic “helpful assistant.” It should encode Zambia-specific guardrails and a front-desk identity. Below is a research-driven checklist of what must be in the prompt (and reinforced by server-side logic).

### Identity, scope, and truthfulness

The assistant is a hotel concierge that:
- answers using **property truth** first;  
- falls back to **Zambia baseline** only when appropriate;  
- never invents policies, prices, or availability.

When discussing bill totals, it must mention that Zambia hotels can apply Tourism Levy and Service Charge as regulated charges, and it should ask whether the guest is looking at a proforma quote or final invoice. citeturn8view0turn5view0

### Compliance and safety behaviors

The prompt should enforce:
- Emergency override: if the message implies danger, provide emergency numbers and urge calling emergency services; then escalate. citeturn23view0turn23view1  
- Medication/drugs: provide general guidance and official references, warn about declaration/permits for controlled substances, and escalate if uncertain. citeturn5view5  
- Borders/visa: quote immigration facts with “verify before travel.” citeturn1view3turn26view1  
- Health: provide general CDC/FCDO pointers; refuse to give individualized medical advice; advise professional consultation. citeturn26view3turn26view2

### Data minimization and consent language

System prompt must instruct:
- Only collect name + preferred contact + dates + request details.  
- Never request card numbers or passport scans in chat.  
- Provide a short privacy notice during lead capture consistent with data protection governance expectations. citeturn24view0turn7view1

### Tone calibrated for Zambia hospitality

Use a human front-desk tone:
- polite, warm, brief;  
- confirm city/property assumptions (“Are you staying with us in Lusaka or Livingstone?”) because destination context changes transfer, tours, and safety info. citeturn15view0

## Production feature suggestions grounded in the findings

The demo architecture you described (Next.js + staff inbox + human takeover + structured datasets) is the right foundation. The research suggests additional features that are both **Zambia-relevant** and **sales-demo convincing**.

### WhatsApp-first production channel with policy controls

Because the national ICT survey highlights strong uptake and convenience of OTT apps like WhatsApp, and reports WhatsApp as one of the most used platforms among internet users with social accounts, WhatsApp is a realistic “production bridge” from a web demo. citeturn21view0  
Production features to add:
- WhatsApp Business API integration (or provider-based) with the same conversation state machine (`AI_ACTIVE`, `PENDING_HUMAN`, `HUMAN_ACTIVE`, `CLOSED`)
- message templates for high-risk topics (emergency, visa, bill disputes) so answers are consistent

### Invoice explainer and dispute prevention layer

Given the Tourism Levy (1.5%) and Service Charge (10%) rules, add:
- a “Bill Breakdown” micro-feature: user can tap “Why is my bill higher?” → bot asks 2–3 clarifying questions then outputs a clean breakdown explanation
- flagged intents: “refund / dispute / waive charge” auto-escalate to staff with extracted amounts and date range citeturn8view0turn5view0

### Event and conference lead capture tuned to Zambia’s levy definitions

Since levy definitions cover events (including conferences and other organized occasions), add:
- a dedicated “Event Planner” flow: room setup, pax, AV, catering, dates, and whether it meets the threshold definition (e.g., social occasions with 25+ people) for internal classification  
- auto-summary to staff referencing the structured definition of events and the need to confirm invoice line-item structure citeturn8view3

### Safety and emergency “one-tap” UI modules

Because emergency numbering can be confusing across sources (different labeling of emergency vs police vs ambulance), add:
- an emergency panel that shows **999 / 991 / 992 / 993** with a short explanation and a city selector (Lusaka vs Livingstone numbers) citeturn23view0turn23view1  
- “I feel unsafe” intent → immediate escalation + staff notification + emergency panel

### “Travel readiness” pre-arrival checklist

Guests frequently need a simple checklist to reduce front-desk volume:
- passport validity guidance and KAZA Univisa explainer (with “verify before travel”) citeturn26view1turn1view3  
- health advisories links and malaria prevention reminder framed as general advice citeturn26view3turn26view2  
- plugs/adapters guidance (230V/50Hz; C/D/G) citeturn27search10

### Data-protection-ready storage and redaction

To align with Zambia’s data protection governance (registration framework, DPIA expectations), add:
- automatic redaction of card numbers/passport-like strings in conversation logs  
- retention controls (auto-delete or archive after a defined window)  
- role-based access in staff inbox (front desk vs sales vs management) citeturn24view0turn7view1

### Licensed / graded establishment trust badge

ZTA publishes lists of licensed and graded establishments (including star rating and category examples). citeturn13view3turn29view2  
Production feature:
- “Licensed by ZTA” badge with an internal field storing the hotel’s license number and (if applicable) star grade, plus renewal dates (staff-only if you prefer)
- This improves guest confidence and helps sales conversations, especially for corporate travelers.

### Destination intelligence add-on for upsell

ZTA materials describe Zambia’s destination areas and circuits, enabling a concierge to suggest relevant excursions without hallucinating. citeturn15view0turn13view2  
Production feature:
- an “Experiences” module (curated, CMS-driven): top activities per destination area, with seasonality tags (e.g., low-water vs high-water activities near Victoria Falls) citeturn13view2turn15view3  
- a partner directory (airport transfers, tour operators, restaurants) with vetted contacts and escalation paths

These additions stay aligned with your demo philosophy (polished, believable, not overbuilt) while anchoring the bot in Zambia-specific realities: regulated bill components, entry/visa complexity, WhatsApp suitability, and safety-critical escalation.