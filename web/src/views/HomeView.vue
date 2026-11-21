<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="hero">
    <div class="w">
      <div>
        <span class="chip rise">Support, in writing</span>
        <h1 class="rise d1">You don't have to say it out loud.</h1>
        <p class="rise d2">
          Chat with an approved volunteer, or find a therapist or support service you can afford.
        </p>
        <div class="row rise d3">
          <RouterLink class="btn" to="/chat/waiting">Talk to someone</RouterLink>
          <RouterLink class="btn o" to="/providers">Find support</RouterLink>
        </div>
        <div class="ck rise d3">
          <span>&#10003; No real name or email</span>
          <span>&#10003; Help without logging in</span>
        </div>
      </div>
      <div class="art" aria-hidden="true">
        <div class="bl b1 fl"></div>
        <div class="bl b2 f2"></div>
        <div class="bl b3 f3"></div>
        <div class="bu u1 f2">Hello, I'm here to listen.</div>
        <div class="bu u2 fl">Thank you. It helps to write it down.</div>
      </div>
    </div>
  </section>

  <section class="tr">
    <div class="w">
      <div class="it"><span class="ic">&#10003;</span>Approved volunteers</div>
      <div class="it"><span class="ic">&#9679;</span>No real names or emails</div>
      <div class="it"><span class="ic">$</span>Free to paid options</div>
      <div class="it"><span class="ic">!</span>Immediate help, no login</div>
    </div>
  </section>

  <section id="how" class="sec">
    <div class="w">
      <h2>How it works</h2>
      <p class="lead">Three steps, at your own pace.</p>
      <div class="g3">
        <div class="cd">
          <div class="num">1</div>
          <h3>Ask for a chat</h3>
          <p>Create a username and password. We never ask for your name or email.</p>
        </div>
        <div class="cd">
          <div class="num">2</div>
          <h3>A volunteer accepts</h3>
          <p>An approved volunteer picks up your request. You can cancel any time.</p>
        </div>
        <div class="cd">
          <div class="num">3</div>
          <h3>Talk in writing</h3>
          <p>Write at your own pace. End the chat whenever you want.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="sec alt">
    <div class="w">
      <h2>Find support you can afford</h2>
      <p class="lead">Browse verified therapists, clinics and organisations, from free to paid.</p>
      <div class="g4">
        <RouterLink class="tp" to="/providers?free=1" style="background: #fff"
          ><h3>Free services</h3>
          <span>Browse &#8594;</span></RouterLink
        >
        <RouterLink class="tp" to="/providers" style="background: var(--mint)"
          ><h3>Online sessions</h3>
          <span>Browse &#8594;</span></RouterLink
        >
        <RouterLink class="tp" to="/providers" style="background: var(--sun)"
          ><h3>Therapists</h3>
          <span>Browse &#8594;</span></RouterLink
        >
        <RouterLink class="tp" to="/providers" style="background: var(--lav)"
          ><h3>Clinics and NGOs</h3>
          <span>Browse &#8594;</span></RouterLink
        >
      </div>
    </div>
  </section>

  <section id="faq" class="sec">
    <div class="w fq">
      <h2 style="margin-bottom: 24px">Questions</h2>
      <details>
        <summary>Is ListenUp a crisis service?</summary>
        <div class="ans">
          No. It is a student prototype and never replaces real helplines. If you are in danger,
          contact emergency services first.
        </div>
      </details>
      <details>
        <summary>Who are the volunteers?</summary>
        <div class="ans">
          Adults approved by an admin before they can accept chats. They do not give advice or
          diagnoses.
        </div>
      </details>
      <details>
        <summary>Is my chat private?</summary>
        <div class="ans">
          Only you and your volunteer can read it. We do not collect your name or email.
        </div>
      </details>
    </div>
  </section>

  <section class="band">
    <div class="w">
      <div>
        <h2>In danger? Contact emergency services first.</h2>
        <p>Helpline numbers are one tap away, without logging in.</p>
      </div>
      <RouterLink class="btn w2" to="/help">Open immediate help</RouterLink>
    </div>
  </section>
</template>
