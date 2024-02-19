<script lang="ts">
  import { appIsLoading, eventTopicCategories } from "./store";
  import { meetupAPI } from './api';
  import { time } from './util'

  const todayUTCms = new Date(new Date().toISOString().split('T')[0]!).getTime();
  const today = new Date(todayUTCms + time.min(new Date().getTimezoneOffset())).getTime();
  const week = Array(7).fill(0).map((_, i) => new Date(today + i * time.day(1)));
  log(week)

  let events: Event[] = [];
  let loadingBtns = {};
</script>

<main>
  {#if $appIsLoading}
    Loading...
  {:else}
    DONE!
    {#each $eventTopicCategories as { id, name }}
      <div><button
        on:click={async () => {
          loadingBtns[id] = true;
          const x = await meetupAPI.getEvents({
            lat: "28.489999771118164",
            lon: "-81.08000183105469",
            date: "2024-02-18",
            radius: 50,
            topicCategoryId: id
          });

          loadingBtns[id] = false;
          events = [...x.data, ...events]
        }}>{#if loadingBtns[id]}⏳{/if}{id}: {name}
      </button></div>
    {/each}
  {/if}
  {#each events as ev}
      <div>
        <img style="max-width: 100px" loading="lazy" alt="Event Group Photo" src={ev.group.keyGroupPhoto?.highResUrl || ''} />
        <h4><a href={ev.eventUrl} target="_blank">{ev.title}</a></h4>
        <p>{ev.description}</p>
      </div>
      <hr/>
  {/each}
</main>

<style>
</style>
