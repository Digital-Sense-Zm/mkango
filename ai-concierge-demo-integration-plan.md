# AI Concierge Demo Integration Plan for Existing Next.js Project

## Objective

Integrate a **working AI concierge demo** into the existing Next.js hotel website project so the client can experience a realistic, high-impact hospitality assistant without requiring full production messaging infrastructure.

The demo must feel credible to a non-technical hotel owner. It should showcase:

- instant AI responses to common guest questions
- structured lead capture for high-value requests
- clean human handoff into a staff-facing inbox
- a believable path to production

This is **not** the production system. It is a **sales-grade, production-shaped demo** built inside the current Next.js codebase.

---

## Core Demo Outcome

The final demo should allow a hotel owner to:

1. open the website
2. interact with the existing AI concierge CTA/widget
3. ask realistic guest questions
4. see the assistant answer from hotel-specific knowledge
5. trigger a lead capture or handoff flow for complex requests
6. open a staff dashboard/admin view and see the conversation appear there
7. optionally send a manual staff reply from the dashboard

The demo should make the owner think:

> "This can work as our digital front desk."

---

## High-Level Product Scope

### Included in demo

- website chat widget using the existing visible CTA already present in the project
- AI FAQ answering
- hotel-specific knowledge grounding
- structured lead capture
- conversation persistence
- simple conversation state model
- staff inbox view
- manual takeover / manual reply
- visual polish and realistic copy

### Explicitly excluded from demo

- real WhatsApp Cloud API integration
- real Meta webhook handling
- queue infrastructure
- real SMS/email notifications
- PMS or channel manager integration
- autonomous booking confirmation
- multilingual production orchestration
- advanced analytics

---

## Integration Strategy

The implementation must be added to the **existing Next.js hotel project** as a self-contained feature set, not as a separate app.

The coding agent should preserve the current website and integrate the AI demo in a way that supports later evolution into production.

### Guiding principles

- do not break existing booking demo flow
- keep the AI demo modular
- build production-shaped abstractions even if the demo uses mock data
- favor maintainability over shortcuts that create rewrite risk
- prefer server actions / route handlers only where they fit clearly
- keep admin/demo data flows simple and inspectable
- reuse the existing visible chat CTA already in the project rather than creating a new public trigger
- preserve the existing WhatsApp-style mockup/icon treatment because that aligns with the intended production channel

---

## Recommended Technical Shape

### App stack assumptions

- existing project uses Next.js App Router
- project likely already has Tailwind CSS
- project already has hotel website pages and booking demo
- project may or may not already include Payload

### Demo stack choices

- **Frontend UI:** existing Next.js app
- **AI layer:** Vercel AI SDK or equivalent server-side abstraction
- **LLM provider:** Groq
- **Persistence:** use the simplest existing persistence path available in the project
- **Admin/staff view:** either Payload admin/custom page if Payload already exists, or a temporary protected internal dashboard route in Next.js

### Persistence decision rule

The coding agent should follow this order of preference:

1. **If Payload is already installed and configured:** use Payload collections for demo persistence.
2. **If Payload is not yet installed but the project already has a database layer:** use the existing database layer.
3. **If neither exists and speed matters most for demo delivery:** use a temporary file-backed or local JSON/mock persistence abstraction behind a repository interface, but structure it so it can be swapped later.

Do not force a heavy infrastructure addition if it slows delivery of the demo.

---

## Feature Architecture

### 1. Guest Chat Widget

Integrate the AI concierge into the existing public-facing chat entry point already present in the project.

#### Requirements

- **Do not create a new visible CTA if one already exists in the project**
- reuse the existing visible CTA and wire it to the new AI concierge functionality
- preserve the existing **WhatsApp mockup/icon treatment**
- the widget should continue to visually suggest a WhatsApp-style guest entry point because the production version will use WhatsApp
- opens as a modal, drawer, or fixed panel
- supports multi-message conversation in one session
- displays assistant responses cleanly
- shows loading / thinking state
- supports escalation messaging
- visually matches hotel brand

#### Suggested placement

- use the existing project CTA placement as the primary trigger
- if the current project already uses a floating bottom-right WhatsApp-style trigger, preserve that pattern
- only add secondary access points if they are trivial and do not disrupt the existing site

#### UX details

- first message from assistant should feel hospitality-specific
- quick suggestion chips can improve demo quality
- examples:
  - Check-in time
  - Airport transfer
  - Family rooms
  - Conference booking
  - Breakfast hours

---

### 2. AI Concierge Logic

The assistant should answer only within a constrained hotel domain.

#### Responsibilities

- answer FAQs using hotel-specific facts
- ask follow-up questions when details are missing
- identify high-value commercial intent
- identify unsupported or sensitive requests
- escalate appropriately
- summarize conversations for staff

#### Intent categories

Use a lightweight classification approach with the following intent families:

- general_info
- room_inquiry
- airport_transfer
- dining
- conference_event
- complaint_or_sensitive
- unsupported

#### Escalation triggers

Escalate when:

- the guest asks about group/conference bookings
- the guest asks about a custom quotation
- the guest asks something outside known hotel knowledge
- the guest expresses dissatisfaction or complaint
- the model confidence is low

#### Important guardrails

The assistant must not:

- claim a booking is confirmed
- promise room availability as fact unless demo copy clearly frames it as an inquiry
- fabricate policies or prices
- pretend a human is already replying if no staff workflow exists

---

### 3. Hotel Knowledge Layer

The AI must answer from structured hotel knowledge, not vague generic hospitality wording.

#### Build a demo knowledge source

Create a hotel knowledge module containing:

- hotel description
- room types
- amenities
- check-in / check-out times
- breakfast info
- parking
- location highlights
- airport transfer availability
- conference/event capability
- cancellation summary
- contact details

#### Storage options

Use one of these:

- `src/data/hotel-knowledge.ts`
- CMS collection
- JSON file behind a loader

#### Recommendation

For the demo, prefer a structured TypeScript object or JSON source unless content is already in a CMS.

This gives reliable responses faster than building retrieval infrastructure.

#### Editing requirement

The coding agent should **author the first draft** of the hotel knowledge file with realistic placeholder/demo-safe content, but it must live in a clearly editable file path so the project owner can replace the content later with real hotel data.

**Preferred editable file path:**

- `src/data/hotel-knowledge.ts`

---

### 4. Lead Capture Flow

The demo must clearly show business value by capturing structured inquiries.

#### Trigger scenarios

- conference booking request
- airport transfer request
- special accommodation request
- group booking inquiry
- event/wedding inquiry

#### Data to capture

At minimum:

- guest name
- phone or email
- requested dates
- number of guests
- request type
- freeform notes

#### Behavior

When triggered, the assistant should:

1. explain that the request needs staff assistance
2. collect the missing details conversationally
3. save the inquiry to persistence
4. create or update a conversation record
5. mark the conversation as needing staff attention

---

### 5. Conversation State Model

Use a very small explicit state model.

#### Required states

- `AI_ACTIVE`
- `HUMAN_ACTIVE`
- `CLOSED`

#### Optional state

- `PENDING_HUMAN`

#### Demo behavior

- most new chats start as `AI_ACTIVE`
- escalation changes state to `HUMAN_ACTIVE` or `PENDING_HUMAN`
- staff can manually return a conversation to `AI_ACTIVE`
- resolved conversations can be `CLOSED`

This is essential even in the demo because it makes the system feel operationally real.

---

### 6. Staff Inbox / Dashboard

Create an internal staff-facing route to show captured conversations.

#### Route suggestion

- `/staff/inbox`
- or `/demo/admin`

#### Required capabilities

- list conversations
- show conversation status
- show last message preview
- open thread detail
- show AI-generated summary
- show captured lead data
- allow `Take Over`
- allow manual reply
- allow `Resolve` or `Return to AI`

#### Important note

This dashboard does not need to be beautiful in the enterprise sense, but it must feel credible and easy to understand in a live demo.

---

### 7. Manual Reply Flow

The owner should be able to see that a staff member can respond.

#### Demo-safe implementation

A manual reply from the staff dashboard can simply append a staff-authored message into the thread shown in the web chat if both are running in the same demo environment.

If real-time sync is too much overhead for this demo, polling is acceptable.

#### Acceptable demo mechanism

- save staff reply
- refresh or poll public chat thread
- display staff reply in conversation history

---

## Content and Rule Authoring Requirements

The coding agent should create the first draft of all AI content/configuration files needed for the demo, but these files must be **clearly separated and easy for the project owner to edit after testing**.

### Required editable files

#### 1. System prompt

**Purpose:** core concierge behavior, tone, allowed/disallowed actions, escalation instructions.

**Preferred file path:**

- `src/lib/ai/concierge-system-prompt.ts`

#### 2. Escalation rules

**Purpose:** explicit escalation triggers, fallback behavior, keywords or rule helpers.

**Preferred file path:**

- `src/lib/ai/escalation-rules.ts`

#### 3. FAQs

**Purpose:** editable FAQ entries or canned question/answer content that can support the demo and be swapped later.

**Preferred file path:**

- `src/data/hotel-faqs.ts`

#### 4. Hotel knowledge

**Purpose:** hotel facts and structured property data used by the assistant.

**Preferred file path:**

- `src/data/hotel-knowledge.ts`

### Instruction to the coding agent

The coding agent must:

- write the initial versions of the system prompt, escalation rules, FAQs, and hotel knowledge
- use realistic placeholder/demo-safe content
- keep these in clearly named standalone files
- import them into the AI route/service layer rather than burying them inside route handlers or UI components
- make it obvious that the project owner can later edit those files with real hotel data and policy details

---

## Suggested File / Module Structure

The coding agent should adapt this to the existing repository, not force it exactly.

```text
app/
  api/
    ai/
      concierge/route.ts
    demo/
      conversations/
        route.ts
      conversations/[id]/reply/route.ts
      conversations/[id]/status/route.ts
  staff/
    inbox/
      page.tsx
    inbox/[id]/page.tsx

components/
  ai/
    chat-widget.tsx
    chat-panel.tsx
    message-list.tsx
    message-input.tsx
    quick-prompts.tsx
    escalation-card.tsx
  staff/
    conversation-list.tsx
    conversation-thread.tsx
    lead-details-card.tsx
    status-badge.tsx

src/
  data/
    hotel-knowledge.ts
    hotel-faqs.ts
  lib/
    ai/
      concierge-system-prompt.ts
      escalation-rules.ts
      classify-intent.ts
      respond-to-conversation.ts
      summarize-conversation.ts
    conversations/
      create-or-load-conversation.ts
      append-message.ts
      update-conversation-status.ts
      capture-lead.ts
    repositories/
      conversations-repository.ts
      leads-repository.ts
    types/
      ai.ts
      conversation.ts
      lead.ts
```

If Payload already exists, collections and hooks can replace some repository logic.

---

## Data Model

Define a clean demo schema even if persistence is temporary.

### Conversation

```ts
{
  id: string
  guestName?: string
  guestContact?: string
  status: 'AI_ACTIVE' | 'HUMAN_ACTIVE' | 'CLOSED' | 'PENDING_HUMAN'
  intent?: string
  summary?: string
  unreadForStaff: boolean
  createdAt: string
  updatedAt: string
}
```

### Message

```ts
{
  id: string;
  conversationId: string;
  senderType: "guest" | "ai" | "staff" | "system";
  body: string;
  createdAt: string;
}
```

### Lead

```ts
{
  id: string
  conversationId: string
  requestType: string
  guestName?: string
  guestContact?: string
  checkInDate?: string
  checkOutDate?: string
  guestCount?: number
  notes?: string
  createdAt: string
}
```

---

## AI Prompting Plan

The coding agent must create a **strict system prompt** for the hotel assistant.

### Prompt goals

- behave like a hotel concierge, not a generic chatbot
- answer only from available hotel knowledge
- be concise, helpful, and polished
- ask follow-up questions when necessary
- escalate instead of hallucinating
- identify lead-worthy requests

### Prompt structure

Include:

1. role definition
2. hotel facts / context
3. allowed behaviors
4. disallowed behaviors
5. escalation rules
6. response style guidance
7. optional structured output instruction if needed

### Response style

- warm and professional
- short paragraphs
- not overly robotic
- commercially aware
- should feel premium hospitality, not tech support

### Editable implementation requirement

The initial prompt must be written by the coding agent into:

- `src/lib/ai/concierge-system-prompt.ts`

The route/service layer should import this file so the project owner can update wording and operational constraints after testing without hunting through business logic.

---

## FAQ Content Plan

The coding agent should also create a clearly editable FAQ file for demo-safe question and answer coverage.

### FAQ goals

- support common guest questions with high-confidence answers
- provide an obvious place to edit or expand common questions later
- improve demo reliability for likely scripted scenarios

### Editable implementation requirement

The initial FAQ content must be written by the coding agent into:

- `src/data/hotel-faqs.ts`

This file should be written in a simple, human-editable structure.

---

## Escalation Rules Plan

Escalation behavior should not be buried only in prose inside the prompt.

### Goals

- make escalation conditions explicit
- make them testable
- allow future editing without rewriting the route handler

### Editable implementation requirement

The coding agent must place the initial escalation definitions in:

- `src/lib/ai/escalation-rules.ts`

This file can include:

- escalation trigger categories
- keywords or helper rules
- fallback behavior text
- instructions for when the assistant should stop answering and begin lead capture / handoff

---

## API Flow

### Public chat request flow

1. user sends message from widget
2. frontend posts to `POST /api/ai/concierge`
3. server loads or creates conversation
4. inbound message is saved
5. server loads:
   - hotel knowledge from `src/data/hotel-knowledge.ts`
   - FAQs from `src/data/hotel-faqs.ts`
   - escalation rules from `src/lib/ai/escalation-rules.ts`
   - system prompt from `src/lib/ai/concierge-system-prompt.ts`
6. AI logic runs with recent messages + hotel knowledge + FAQs + escalation rules
7. AI decides:
   - answer normally
   - ask follow-up question
   - capture lead
   - escalate to staff

8. response is saved as outbound AI/system message
9. frontend updates thread

### Staff reply flow

1. staff opens conversation in inbox
2. staff submits reply
3. server saves staff message
4. conversation remains `HUMAN_ACTIVE` unless changed
5. public chat can fetch latest thread and show staff reply

### Status change flow

1. staff clicks `Take Over`, `Return to AI`, or `Close`
2. status route updates conversation state
3. UI updates accordingly

---

## UI Plan

### Public chat widget

#### Must feel premium

Use:

- subtle motion
- polished spacing
- clean message bubbles
- clear role labels if needed
- hotel branding touches

#### Suggested states

- initial welcome
- loading / thinking
- AI reply
- lead capture questions
- escalation notice
- staff reply
- conversation closed

### Staff inbox

#### Layout suggestion

Left column:

- conversations list

Right column:

- thread detail
- lead details
- status actions
- reply composer

This must be demo-friendly enough to present in one browser tab.

---

## Demo Script Alignment

The coding agent should optimize implementation for the likely live demo sequence.

### Recommended scripted scenarios

#### Scenario 1: FAQ

Guest asks: `What time is check-in and do you have breakfast?`

Expected result:

- AI answers accurately and confidently.

#### Scenario 2: Airport transfer lead

Guest asks: `Can you arrange airport pickup for tomorrow evening?`

Expected result:

- AI says this can be arranged by the team
- asks for arrival time and contact details
- creates lead
- marks conversation for staff

#### Scenario 3: Conference inquiry

Guest asks: `I need a conference room for 40 people next month.`

Expected result:

- AI collects details
- escalates to staff
- staff inbox shows the inquiry and summary

#### Scenario 4: Human takeover

Open staff inbox, click into the thread, add a manual reply.

Expected result:

- guest thread reflects staff response
- owner understands there is a real fallback path

---

## Implementation Phases for the Coding Agent

### Phase 1: Discovery and adaptation

- inspect current Next.js repo structure
- identify whether Payload is present
- identify existing UI patterns and design tokens
- identify the existing visible CTA/chat trigger and reuse it
- preserve the WhatsApp mockup/icon treatment already present in the project
- identify existing database/persistence setup
- document assumptions in comments or a short internal note

### Phase 2: Data and domain setup

- create conversation/message/lead types
- create repository abstraction
- create hotel knowledge source at `src/data/hotel-knowledge.ts`
- create FAQs source at `src/data/hotel-faqs.ts`
- create escalation rules at `src/lib/ai/escalation-rules.ts`
- seed realistic hotel knowledge and canned demo-safe examples

### Phase 3: AI service layer

- create system prompt file at `src/lib/ai/concierge-system-prompt.ts`
- create prompt builder / response service
- add escalation rules
- add lightweight summary generation
- add testable intent handling logic

### Phase 4: Public widget

- wire the existing CTA/widget to the new AI concierge flow
- preserve WhatsApp-style public entry treatment
- build or adapt the chat panel
- support thread rendering and user input
- connect to concierge route
- add quick prompt chips
- add empty/loading/error states

### Phase 5: Staff inbox

- build list/detail UI
- implement manual reply
- implement status update actions
- display captured lead data
- show summaries and unread status

### Phase 6: Demo polish

- refine copy for hospitality tone
- ensure transitions feel smooth
- make at least 3 scripted demo conversations reliable
- remove rough developer-facing artifacts from UI
- test end-to-end in local demo environment

---

## Acceptance Criteria

The work is complete when all of the following are true:

### Public demo

- visitor can open chat from the existing public CTA/widget already present in the site
- the CTA remains visually aligned with the current WhatsApp-style mockup/icon treatment
- visitor can ask at least 10 common hotel questions successfully
- visitor can trigger at least 2 lead capture flows
- visitor sees an escalation message for complex requests

### Staff demo

- staff inbox lists escalated conversations
- staff can open a conversation
- staff can see AI summary and lead details
- staff can send a manual reply
- staff can change conversation state

### Technical quality

- no obvious console errors in demo path
- code is modular enough for later productionization
- no hardcoded secrets in client components
- AI errors degrade gracefully
- project still builds and existing site features are unaffected
- system prompt, FAQs, escalation rules, and hotel knowledge all live in clearly editable standalone files

---

## Non-Functional Requirements

Even though this is a demo, the coding agent should maintain good engineering discipline.

### Required

- clear separation between UI, AI logic, and persistence logic
- environment variables for provider keys
- basic server-side validation
- no direct provider calls from the browser
- reusable types
- comments only where they add real clarity

### Nice to have

- simple mock seed data
- optimistic UI updates where safe
- polling or refresh strategy for staff/guest sync
- graceful fallback response if LLM call fails

---

## Demo-Safe Fallback Behavior

If the model fails or returns unusable output, the system should gracefully respond with something like:

> Thanks for your message. I’m unable to answer that automatically right now, but I can pass this to our team.

Then the system should create a staff-needed conversation rather than fail silently.

This protects the demo.

---

## Prompt and Content Quality Notes

The coding agent should avoid generic AI-sounding hospitality copy.

Bad style:

- overly wordy
- vague and repetitive
- too many exclamation marks
- fake certainty

Good style:

- concise
- specific
- polished
- warm
- commercially useful

---

## Production-Shaped Follow-Up Hooks

Even though the demo is intentionally lean, the code should make future production upgrades easier.

Design with later insertion points for:

- WhatsApp webhook ingestion
- idempotency
- queue-backed processing
- staff notifications
- role-based access control
- CRM analytics
- true omnichannel support

Do not build those now unless they are already trivial within the current repo.

---

## Risks to Avoid

The coding agent should actively avoid these mistakes:

- building a generic chatbot disconnected from hotel facts
- creating a second public CTA when a suitable one already exists
- removing or replacing the current WhatsApp-style public trigger treatment
- tightly coupling UI to one persistence implementation
- faking human takeover with no actual stored conversation state
- letting the AI invent policies or availability
- overbuilding infra that delays the demo
- adding a large new dependency set without necessity
- refactoring unrelated parts of the hotel site
- burying prompt text, FAQ data, escalation rules, or hotel facts inside route handlers where they are hard to edit later

---

## Final Delivery Expectation

The coding agent should deliver:

1. integration with the existing public CTA/widget already in the website
2. AI route and supporting service layer
3. hotel knowledge source at `src/data/hotel-knowledge.ts`
4. FAQ source at `src/data/hotel-faqs.ts`
5. system prompt file at `src/lib/ai/concierge-system-prompt.ts`
6. escalation rules file at `src/lib/ai/escalation-rules.ts`
7. persistence for conversations/messages/leads
8. staff inbox route and UI
9. clear environment variable requirements
10. short run instructions if needed

The outcome should be a **working, persuasive AI concierge demo embedded inside the current Next.js hotel project**.

---

## Final instruction to the coding agent

Build the smallest version of this system that feels convincingly real in front of a hotel owner.

Prioritize:

1. polished public chat experience
2. believable hotel-specific answers
3. visible lead capture
4. visible human handoff
5. reuse of the existing WhatsApp-style CTA/widget already present in the project
6. minimal disruption to the existing site

Do not chase enterprise infrastructure in this pass. Build a strong demo that can later be hardened into production.
