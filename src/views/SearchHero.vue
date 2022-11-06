<template>
    <component :is="'style'" type="text/css">
        html {
        overflow: hidden;
        }
        footer {
        display: none;
        }
    </component>
    <main class="flex justify-center overflow-hidden" @keyup.esc="removeSelectedHero" tabindex="0">
        <!-- first panel  -->
        <section class="w-full overflow-y-auto"
            :class="{ 'h-full hidden sm:block basis-2/3 xl:basis-auto border-r border-x-slate-700': selectedHero }">

            <div class="w-full lg:w-[650px] sticky top-0 z-10 container my-4 mx-auto"
                :class="{ 'ml-auto mr-0': selectedHero }">
                <SearchBar v-model="searchTerm" />
            </div>

            <!-- Filter options -->
            <div class="container lg:w-[650px] overflow-x-auto relative sm:rounded-sm mx-auto mb-4 text-slate-400 text-sm"
                :class="{ 'ml-auto mr-0': selectedHero }">

                <!-- Search history -->
                <p class="mb-2 border-slate-700 flex justify-between gap-4 items-center">
                    Search history (max 16)
                    <button @click="removeSearchHistory"
                        class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                        clean history
                    </button>
                </p>
                <!-- <StackedAvatars> -->
                <div class="flex flex-wrap">
                    <Avatar v-if="!searchHistory.size" rounded />
                    <Avatar v-else v-for="heroId in searchHistory" :key="heroId" class="cursor-pointer"
                        @click="showMore(heroId)"
                        :img="'https://assets.epicsevendb.com/_source/face/' + heroId + '_s.png'" rounded />
                </div>
                <!-- </StackedAvatars> -->

                <p class="mb-2 border-slate-700 flex justify-between gap-4 items-center">Filter by
                    <button @click="resetSelectedFilter"
                        class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                        remove all filters
                    </button>
                </p>

                <!-- For testing purposes -->
                <!-- <div class="flex justify-between my-4">
                    <span>Roles: {{ selectedFilter.roles }}</span>
                    <span>Elements: {{ selectedFilter.elements }}</span>
                    <span>Rarities: {{ selectedFilter.rarities }}</span>
                </div> -->

                <!-- Filter by role -->
                <div class="flex flex-wrap justify-between gap-2">
                    <ul class="flex gap-1">
                        <li v-for="role in filterOptions.roles" :key="role">
                            <input type="checkbox" :id="role + '-option'" :value="role" class="hidden peer"
                                v-model="selectedFilter.roles">
                            <label :for="role + '-option'"
                                class="inline-flex justify-center items-center p-1 w-10 h-8 text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img :src="`/assets/symbol/icon_class_${role}.png`"
                                    class="inline-block align-middle w-5 h-5" alt="">
                            </label>
                        </li>
                        <li>
                            <button @click="selectedFilter.roles.length = 0"
                                class="inline-flex justify-center items-center p-1 w-8 h-8 cursor-pointer">
                                <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>

                    <!-- Filter by element -->
                    <ul class="flex gap-1">
                        <li v-for="element in filterOptions.elements" :key="element">
                            <input type="checkbox" :id="element + '-option'" :value="element" class="hidden peer"
                                v-model="selectedFilter.elements">
                            <label :for="element + '-option'"
                                class="inline-flex justify-center items-center p-1 w-10 h-8 text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img :src="`/assets/symbol/icon_${element}.png`"
                                    class="inline-block align-middle w-5 h-5" alt="">
                            </label>
                        </li>
                        <li>
                            <button @click="selectedFilter.elements.length = 0"
                                class="inline-flex justify-center items-center p-1 w-8 h-8 cursor-pointer">
                                <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>

                    <!-- Filter by rarity -->
                    <ul class="flex gap-1">
                        <li v-for="rarity in filterOptions.rarities" :key="rarity">
                            <input type="checkbox" :id="rarity + '-option'" :value="rarity" class="hidden peer"
                                v-model="selectedFilter.rarities">
                            <label :for="rarity + '-option'"
                                class="inline-flex justify-center items-center p-1 w-10 h-8 text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <span class="text-xs text-center mr-1">{{ rarity }}</span>
                                <img src="/assets/symbol/1-star.png" class="inline-block align-middle w-4 h-4" alt="">
                            </label>
                        </li>
                        <li>
                            <button @click="selectedFilter.rarities.length = 0"
                                class="inline-flex justify-center items-center p-1 w-8 h-8 cursor-pointer">
                                <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Table with heroes data -->
            <div class="container lg:w-[650px] overflow-x-auto relative sm:rounded-sm mx-auto mb-10"
                :class="{ 'ml-auto mr-0': selectedHero }">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-blue-600 dark:text-gray-200">
                        <tr>
                            <th scope="col" class="p-2.5 hidden sm:table-cell cursor-pointer" @click="sortTableBy('id')"
                                :class="{ '!hidden md:!table-cell': selectedHero }">ID</th>
                            <th scope="col" class="p-2.5 cursor-pointer" @click="sortTableBy('name')">Name</th>
                            <th scope="col" class="p-2.5 cursor-pointer" @click="sortTableBy('element')">Element</th>
                            <th scope="col" class="p-2.5 cursor-pointer" @click="sortTableBy('role')">Class</th>
                            <th scope="col" class="p-2.5 cursor-pointer" @click="sortTableBy('rarity')">Grade</th>
                            <th scope="col" class="p-2.5 hidden sm:table-cell"
                                :class="{ '!hidden lg:!table-cell': selectedHero }">
                                ATK
                            </th>
                            <th scope="col" class="p-2.5 hidden sm:table-cell"
                                :class="{ '!hidden lg:!table-cell': selectedHero }">
                                HP
                            </th>
                            <th scope="col" class="p-2.5 hidden sm:table-cell"
                                :class="{ '!hidden lg:!table-cell': selectedHero }">
                                DEF
                            </th>
                            <th scope="col" class="p-2.5 hidden sm:table-cell"
                                :class="{ '!hidden lg:!table-cell': selectedHero }">
                                SPD
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="hero in filteredHeroes" :key="hero.id" @click="showMore(hero.id)"
                            class="border-b dark:hover:bg-gray-600/50 dark:border-gray-700 cursor-pointer"
                            :class="{ 'bg-gray-600/50': (selectedHero === hero.id) }"
                            :data-modal-toggle="'popup-' + hero.id">
                            <td class="px-1 hidden sm:table-cell" :class="{ '!hidden md:!table-cell': selectedHero }">
                                <small>
                                    <pre>{{ hero.id }}</pre>
                                </small>
                            </td>
                            <th scope="row" class="px-1 font-medium text-gray-900 whitespace-nowrap dark:text-gray-100">
                                <img :src="hero.Hero_icon" loading="lazy" width=40 height=40 alt=""
                                    class="inline-block align-middle mr-1" /> {{ hero.name }}
                            </th>
                            <td class="px-1">
                                <img :src="`/assets/symbol/icon_${hero.element}.png`"
                                    class="inline-block align-middle mr-1" width=20 height=20 alt="">
                            </td>
                            <td class="px-1">
                                <img :src="`/assets/symbol/icon_class_${hero.role}.png`"
                                    class="inline-block align-middle mr-1" width=20 height=20 alt="">
                            </td>
                            <td class="px-1">
                                <img :src="`/assets/symbol/${hero.rarity}-star.png`" class="h-[15px]" alt="">
                            </td>
                            <td class="px-1 hidden sm:table-cell" :class="{ '!hidden lg:!table-cell': selectedHero }">
                                <small>{{ hero.attack }}</small>
                            </td>
                            <td class="px-1 hidden sm:table-cell" :class="{ '!hidden lg:!table-cell': selectedHero }">
                                <small>{{ hero.health }}</small>
                            </td>
                            <td class="px-1 hidden sm:table-cell" :class="{ '!hidden lg:!table-cell': selectedHero }">
                                <small>{{ hero.defense }}</small>
                            </td>
                            <td class="px-1 hidden sm:table-cell" :class="{ '!hidden lg:!table-cell': selectedHero }">
                                <small>{{ hero.speed }}</small>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p v-if="!filteredHeroes.length" class="text-sm text-center text-gray-500 dark:text-gray-400">
                    No results for "{{ searchTerm }}"</p>
            </div>
        </section>

        <!-- Second panel  -->
        <section id="right-panel" v-if="heroData" class="w-full overflow-y-auto h-full fix-padding">
            <div class="w-full xl:w-[650px] mr-auto relative">
                <button @click="removeSelectedHero" type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm mb-2 p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-300" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7">
                        </path>
                    </svg>
                    back
                    <span class="sr-only">Close modal</span>
                </button>

                <div class="flex gap-5 w-full min-h-[7rem]">
                    <img :src="heroData.Hero_icon" class="w-[100px] h-[100px]" alt="">
                    <div>
                        <h1 class="my-3 text-4xl">{{ heroData.name }}
                            <span
                                class="inline-block align-middle bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{{
                                        heroData.id
                                }}</span>
                        </h1>

                        <p class="my-1 text-sm ">{{ heroData.description }}</p>
                    </div>
                </div>

                <div class="flex flex-wrap gap-5 my-3 justify-evenly items-center">
                    <span>
                        <img :src="`/assets/symbol/icon_${heroData.element}.png`" class="inline-block align-middle mr-1"
                            width=20 height=20 alt="">
                        <small> {{ heroData.element }}</small>
                    </span>
                    <span>
                        <img :src="`/assets/symbol/icon_class_${heroData.role}.png`"
                            class="inline-block align-middle mr-1" width=20 height=20 alt="">
                        <small> {{ heroData.role }}</small>
                    </span>
                    <span>
                        <img :src="`/assets/symbol/icon_zodiac_${heroData.zodiac}.png`"
                            class="inline-block align-middle mr-1" width=20 height=20 alt="">
                        <small>
                            {{ heroData.zodiac }}
                        </small>
                    </span>
                    <span>
                        <img :src="`/assets/symbol/${heroData.rarity}-star.png`"
                            class="h-[20px] inline-block align-middle mr-1" alt="">
                        <small> {{ heroData.rarity }} stars</small>
                    </span>
                </div>

                <Tabs variant="underline" v-model="activeTab" class="p-5">
                    <!-- class appends to content DIV for all tabs -->
                    <Tab name="information" title="Information">
                        <h2 class="text-m uppercase font-bold">{{ heroData.name }}'s story</h2>
                        <p>
                            {{ heroData.story }}
                        </p>

                        <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />

                        <h2 class="text-m uppercase font-bold">Specialty Skill</h2>
                        <div class="flex gap-5 w-full py-4 items-center">
                            <img :src="heroData.mission_specialty_icon" class="w-[74px] h-[74px]" alt="">
                            <div>
                                <h3 class="text-xl">{{ heroData.mission_specialty_name }}</h3>

                                <p class="my-1 text-sm ">{{ heroData.mission_specialty_description }}</p>
                                <span v-if="heroData.mission_attribute_name"
                                    class="inline-block align-middle bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                    {{ heroData.mission_attribute_name }}
                                </span>
                                <span
                                    class="inline-block align-middle bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                    {{ heroData.mission_specialty_effect_type === 'reward_bonus' ? 'Reward Bonus' :
                                            'Time Reduce'
                                    }}
                                    {{ heroData.mission_specialty_effect_value * 100 }}%
                                </span>
                            </div>
                        </div>

                        <ul class="list-inside text-sm mt-4 flex flex-wrap justify-evenly gap-4">
                            <li class="flex gap-2 items-center border border-slate-700 rounded-md p-2">
                                <img src="https://assets.epicsevendb.com/stat/cm_icon_stat_command.png"
                                    class="w-5 h-5" />
                                <span class="font-bold text-slate-300">Command</span> {{ heroData.command }}
                            </li>
                            <li class="flex gap-2 items-center border border-slate-700 rounded-md p-2">
                                <img src="https://assets.epicsevendb.com/stat/cm_icon_stat_charm.png" class="w-5 h-5" />
                                <span class="font-bold text-slate-300">Charm</span> {{ heroData.charm }}
                            </li>
                            <li class="flex gap-2 items-center border border-slate-700 rounded-md p-2">
                                <img src="https://assets.epicsevendb.com/stat/cm_icon_stat_politics.png"
                                    class="w-5 h-5" />
                                <span class="font-bold text-slate-300">Politics</span> {{ heroData.politics }}
                            </li>
                        </ul>

                        <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />

                        <h2 class="text-m uppercase font-bold">Memory Imprint</h2>

                        <div class="flex justify-between gap-10">
                            <div class="flex-1">
                                <h3 class="font-light mt-4">Imprint Release</h3>

                                <ul class="space-y-1 list-disc list-inside mt-4">
                                    <li v-for="level in ['d', 'c', 'b', 'a', 's', 'ss', 'sss']" :key="level"
                                        class="flex justify-between">
                                        <span>
                                            <img :src="`https://assets.epicsevendb.com/_source/img/hero_dedi_a_${level}.png`"
                                                class="w-[20px] inline-block align-middle" alt="" />
                                            {{ statNames[heroData.self_imprint_stat] }}
                                        </span>
                                        <span>{{ checkTypeImprint(heroData['self_imprint_' + level.toUpperCase()])
                                        }}</span>
                                    </li>
                                </ul>
                            </div>

                            <div class="flex-1">
                                <h3 class="font-light mt-4">Imprint Concentration</h3>

                                <ul class="space-y-1 list-disc list-inside mt-4">
                                    <li v-for="level in ['d', 'c', 'b', 'a', 's', 'ss', 'sss']" :key="level"
                                        class="flex justify-between">
                                        <span>
                                            <img :src="`https://assets.epicsevendb.com/_source/img/hero_dedi_a_${level}.png`"
                                                class="w-[20px] inline-block align-middle" alt="" />
                                            {{ statNames[heroData.release_imprint_stat] }}
                                        </span>
                                        <span>{{ checkTypeImprint(heroData['release_imprint_' + level.toUpperCase()])
                                        }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />

                        <h2 class="text-m uppercase font-bold">Camping</h2>
                        <p>
                            <span class="font-bold text-slate-300">Personalities:</span> {{
                                    heroData.camping_Personality_1
                            }}, {{ heroData.camping_Personality_2 }}
                        </p>
                        <p>
                            <span class="font-bold text-slate-300">Topics: </span> {{ heroData.camping_Topic_1 }}, {{
                                    heroData.camping_Topic_2
                            }}
                        </p>

                        <ul class="list-inside text-sm mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <li v-for="morale in morales" :key="morale"
                                class="flex flex-col justify-center items-center text-center bg-slate-800 rounded-md p-2">
                                <span class="font-bold text-slate-300">
                                    {{ morale }}
                                </span>
                                <span class="font-bold" :class="{
                                    'text-red-600': heroData['camping_result_' + morale] < 0,
                                    'text-lime-600': heroData['camping_result_' + morale] > 0
                                }">
                                    {{ heroData['camping_result_' + morale] }}
                                </span>
                            </li>
                        </ul>
                    </Tab>
                    <Tab name="skills" title="Skills">
                        <div class="flex flex-col gap-3">
                            <div class="flex gap-5 w-full py-4 px-2 items-center cursor-pointer bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                                v-for="skill in [1, 2, 3]" :key="skill">
                                <img :src="heroData[`Skill_${skill}_icon`]" class="w-[82px] h-[84px]" alt="">
                                <div>
                                    <h3 class="text-xl">{{ heroData[`Skill_${skill}_name`] }} </h3>
                                    <span class="inline-block align-middle bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded 
                                        dark:bg-gray-700 dark:text-gray-300">
                                        +{{ heroData[`Skill_${skill}_soul_gain`] }} soul
                                    </span>
                                    <span class="inline-block align-middle bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded 
                                        dark:bg-gray-700 dark:text-gray-300"
                                        v-if="heroData[`Skill_${skill}_cooldown`]">
                                        {{ heroData[`Skill_${skill}_cooldown`] }} turn cooldown
                                    </span>

                                    <p class="mt-3 text-sm ">{{ heroData[`Skill_${skill}_description`] }}</p>

                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab name="stats" title="Stats">
                        <h2 class="text-m uppercase font-bold">LEVEL {{ heroLevel }} - Awakened {{ heroAwaken }}⭐</h2>

                        <p>
                            <slider v-model="heroLevel" tooltip tooltipText="Level %v" tooltipColor="#374151"
                                tooltipTextColor="white" alwaysShowHandle color="rgb(28, 100, 242)" :min=1 :max=60
                                :height=10 track-color="#374151" />
                        </p>

                        <div class="flex items-center justify-between my-4 flex-auto flex-wrap">
                            <label
                                class="flex-1  text-center ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                                <input type="radio" value="1" name="inline-radio-group" v-model="heroAwaken"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                1 <img :src="`/assets/symbol/1-star-awaken.png`"
                                    class="inline-block align-middle w-[20px] h-[20px]" alt="" />
                            </label>
                            <label
                                class="flex-1  text-center ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                                <input type="radio" value="2" name="inline-radio-group" v-model="heroAwaken"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                2 <img :src="`/assets/symbol/1-star-awaken.png`"
                                    class="inline-block align-middle w-[20px] h-[20px]" alt="" />
                            </label>
                            <label
                                class="flex-1  text-center ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                                <input type="radio" value="3" name="inline-radio-group" v-model="heroAwaken"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                3 <img :src="`/assets/symbol/1-star-awaken.png`"
                                    class="inline-block align-middle w-[20px] h-[20px]" alt="" />
                            </label>
                            <label
                                class="flex-1  text-center ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                                <input type="radio" value="4" name="inline-radio-group" v-model="heroAwaken"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                4 <img :src="`/assets/symbol/1-star-awaken.png`"
                                    class="inline-block align-middle w-[20px] h-[20px]" alt="" />
                            </label>
                            <label
                                class="flex-1  text-center ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                                <input type="radio" value="5" name="inline-radio-group" v-model="heroAwaken"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                5 <img :src="`/assets/symbol/1-star-awaken.png`"
                                    class="inline-block align-middle w-[20px] h-[20px]" alt="" />
                            </label>
                            <label
                                class="flex-1  text-center ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                                <input type="radio" value="6" name="inline-radio-group" v-model="heroAwaken" checked
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                6 <img :src="`/assets/symbol/1-star-awaken.png`"
                                    class="inline-block align-middle w-[20px] h-[20px]" alt="" />
                            </label>
                        </div>

                        <ProgressBar label="Attack" :labelValue="heroStats.attack"
                            :progress="Math.floor((heroStats.attack / 1435) * 50)" />
                        <ProgressBar label="Health" :labelValue="heroStats.health"
                            :progress="Math.floor((heroStats.health / 7323) * 50)" />
                        <ProgressBar label="Defense" :labelValue="heroStats.defense"
                            :progress="Math.floor((heroStats.defense / 776) * 50)" />
                        <ProgressBar label="Speed" :labelValue="heroStats.speed"
                            :progress="Math.floor((heroStats.speed / 129) * 25)" />
                        <ProgressBar label="Crit. Change" :labelValue="heroStats.critChance + '%'"
                            :progress="Math.floor((heroStats.critChance / 27) * 25)" />
                        <ProgressBar label="Crit. Damage" :labelValue="heroStats.critDamage + '%'"
                            :progress="Math.floor((heroStats.critDamage / 165) * 25)" />
                        <ProgressBar label="Effectiveness" :labelValue="heroStats.effectiveness + '%'"
                            :progress="Math.floor((heroStats.effectiveness / 30) * 25)" />
                        <ProgressBar label="Effect Resistance" :labelValue="heroStats.resistance + '%'"
                            :progress="Math.floor((heroStats.resistance / 30) * 25)" />
                        <ProgressBar label="Dual Attack Chance" :labelValue="heroStats.dualAttack + '%'"
                            :progress="Math.floor((heroStats.dualattackchance / 100) * 25)" />
                    </Tab>
                    <Tab name="model-viewer" title="Model Viewer">
                        <p>
                            No hero data available
                        </p>

                        <!-- <img class="max-w-full h-auto" :src="`https://assets.epicsevendb.com/herofull/${urlSlug(heroData.name)}.png`" alt=""> -->
                    </Tab>
                    <Tab name="guides" title="Guides">
                        No hero data available
                    </Tab>
                </Tabs>

            </div>
        </section>

    </main>

</template>

<script setup>
import _ from 'lodash'
import urlSlug from 'url-slug'
import SearchBar from '../components/SearchBar.vue';
import { ref, computed } from 'vue';
import { Tabs, Tab, Button, Avatar } from 'flowbite-vue'
import ProgressBar from '../components/ProgressBar.vue';
import heroStatService from '../services/hero-stat.service'
import slider from "vue3-slider"
import HEROES from '../assets/data/hero-data.json'

document.title = "Game Data | E7Compendium"

// # Tabs in profile
const activeTab = ref('information')

// Filtering heroes feature

const heroes = ref(HEROES)

const filterOptions = {
    roles: ["warrior", "knight", "thief", "ranger", "mage", "soul weaver"],
    elements: ["fire", "ice", "earth", "light", "dark"],
    rarities: [3, 4, 5]
}

const selectedFilter = ref({
    roles: [],
    elements: [],
    rarities: []
})

const morales = ['Criticism', 'Reality Check', 'Heroic Tale', 'Comforting Cheer', 'Cute Cheer', 'Heroic Cheer', 'Sad Memory', 'Joyful Memory',
    'Happy Memory', 'Unique Comment', 'Self-Indulgent', 'Occult', 'Myth', 'Bizarre Story', 'Food Story', 'Horror Story', 'Gossip', 'Dream',
    'Advice', 'Complain', 'Belief', 'Interesting Story']

const statNames = {
    max_hp_rate: "Health",
    def_rate: "Defense",
    acc: "Effectiveness",
    max_hp: "Health",
    def: "Defense",
    att: "Attack",
    res: "Effect Resistance",
    att_rate: "Attack",
    speed: "Speed",
    cri: "Crit Chance",
    coop: "Dual Attack"
}

const searchTerm = ref('')
const selectedHero = ref('')

const checkMultipleFilterValues = (value, filterArray) => {
    if (!filterArray.length) return true

    let tempChecks = [];
    for (let i = 0; i < filterArray.length; i++) {
        tempChecks.push(value.indexOf(filterArray[i]) > -1);
    }

    return tempChecks.some(value => value === true)
}

const resetSelectedFilter = () => {
    selectedFilter.value.roles.length = 0
    selectedFilter.value.elements.length = 0
    selectedFilter.value.rarities.length = 0
}

const filteredHeroes = computed(() => heroes.value.filter((hero) => {
    console.log(`trigger: heroes.filter() by: [${selectedFilter.value.roles}], [${selectedFilter.value.elements}], [${selectedFilter.value.rarities}]`)
    return (hero.name.toLowerCase().indexOf(searchTerm.value.toLowerCase()) > -1
        && checkMultipleFilterValues(hero.role, selectedFilter.value.roles) // [...selectedFilter.roles] -> converts Sets() to Arrays[]
        && checkMultipleFilterValues(hero.element, selectedFilter.value.elements)
        && checkMultipleFilterValues(hero.rarity, selectedFilter.value.rarities)
    )
}))

// Sorting heroes feature

const sortTableBy = (property) => {
    console.log(`function sortBy(${property})`)
    heroes.value = _.sortBy(heroes.value, property)
    // console.log('sortByName:', heroes.value)
}

// Hero profile feature (second panel)
const heroData = computed(() => heroes.value.filter((hero) => {
    return hero.id === selectedHero.value
})[0])

const searchHistory = ref(new Set(JSON.parse(window.localStorage.getItem('searchHistory'))))

const heroLevel = ref(60)
const heroAwaken = ref(6)

const heroStats = computed(() => {
    console.log("trigger: heroStats " + heroData.value.name)
    return {
        attack: heroStatService.getAttack(heroData.value, heroLevel.value, heroAwaken.value),
        health: heroStatService.getHealth(heroData.value, heroLevel.value, heroAwaken.value),
        defense: heroStatService.getDefense(heroData.value, heroLevel.value, heroAwaken.value),
        speed: heroStatService.getSpeed(heroData.value, heroLevel.value, heroAwaken.value),
        critChance: heroStatService.getCritChance(heroData.value, heroAwaken.value),
        critDamage: heroStatService.getCritDamage(heroData.value, heroAwaken.value),
        effectiveness: heroStatService.getEffectiveness(heroData.value, heroAwaken.value),
        resistance: heroStatService.getResistance(heroData.value, heroAwaken.value),
        dualAttack: heroStatService.getDualAttack()
    }
})

const showMore = (heroId) => {
    if (heroId === selectedHero.value) return selectedHero.value = ""

    selectedHero.value = ""
    selectedHero.value = heroId

    if (searchHistory.value.size < 16) {
        searchHistory.value.add(heroId)
        window.localStorage.setItem('searchHistory', JSON.stringify([...searchHistory.value]))
    } else {
        if (searchHistory.value.has(heroId)) return
        searchHistory.value.delete([...searchHistory.value][0])
        searchHistory.value.add(heroId)
        window.localStorage.setItem('searchHistory', JSON.stringify([...searchHistory.value]))
    }

    console.log(`trigger: showMore(${heroId})`)
}
const removeSelectedHero = () => {
    selectedHero.value = ''
    console.log("selectedHero removed")
}
const removeSearchHistory = () => {
    searchHistory.value.clear()
    window.localStorage.setItem('searchHistory', JSON.stringify([]))
    console.log("SearchHistory removed")
}

const checkTypeImprint = (value) => {
    if (value === undefined) return '-'
    if (value < 1) return `${(Number(value) * 100).toFixed(1)}%`
    return value

}

</script>

<style>
main {
    height: calc(100vh - 77px);
}

#right-panel * {
    transition: 0.2s ease !important;
}
</style>