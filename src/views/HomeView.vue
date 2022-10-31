<script setup></script>

<template>
  <div class="home">

    <div class="bg">
      <div class="container flex flex-col justify-center items-center mx-auto h-full text-center fix-padding relative">
          <input class="fix-padding rounded text-slate-800 w-1/2" type="search" placeholder="Search something..." />
          <button>Search</button>
      </div>
    </div>
    <!-- <div class="justify-content-center">
      <global-search class="search-bar"></global-search>
    </div> -->
    <main class="fix-padding">
      <div class="container flex-wrap justify-center items-center mx-auto">
        <div class="text-center fix-padding">
          <h1>
            E7Compendium
          </h1>
          <p>
            Epic7Compendium aims to be the one shop shop for heirs looking for information
            on Epic Seven.
          </p>
          <strong>Current Features</strong>
          <ul class="list-disc my-3">
            <li>Hero Information</li>
            <li>Artifact Information</li>
            <li>Mechanics Details</li>
            <li>Guides</li>
          </ul>
          <strong>Planned Additions</strong>
          <ul class="list-disc my-3">
            <li>Morale Calculator</li>
            <li>Damage Calculator</li>
            <li>Language Support</li>
          </ul>
          <p><i>Changelog: added basic functions</i></p>
          <small>
            <p>
              Maintained by <a href="https://twitter.com/ichinosekuri">@ichinoseKuri</a> (
              <i>Discord ID: 『Kuri』#0002</i>
              )
            </p>
          </small>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.bg {
  background: #252B35 no-repeat scroll center center;
  height: 460px;
  position: relative;
}

.bg::before {    
  content: "";
  background: transparent no-repeat scroll center center;
  background-image: url('../assets/background.png');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  opacity: 0.25;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

</style>
