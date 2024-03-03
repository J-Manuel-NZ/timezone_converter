<script>
    import { DateTime } from 'luxon';

    import { zones } from '$lib/index.js';

    let convertFromTime = DateTime.now().toISO();
    let currentTime = DateTime.now().toFormat('dd LLL yyyy HH:mm:ss');
    let convertedTime = '';
    let convertFromZone = 'Europe/London';
    let convertToZone = 'America/New_York';

    $: convertToZone;
    $: convertFromTime;

    const convertTime = () => {

        const timestamp = convertFromTime;
        // Create a DateTime object with the specified date and time in the original timezone
        let dt = DateTime.fromISO(timestamp, {zone: convertFromZone});
        currentTime = dt.toFormat('dd LLL yyyy HH:mm:ss');
        console.log("DT: " + dt)

        // Convert the DateTime object to the desired timezone
        let dtInOtherZone = dt.setZone(convertToZone);

        // Format the converted DateTime object to a string
        convertedTime = dtInOtherZone.toFormat('dd LLL yyyy HH:mm ZZZZ');
    }

    convertTime()

    let showCurrentLocationModal;
    let showSetTimeModal;
    let showToLocationModal;

    

    let searchQuery = '';
    let searchResults = [{label: 'No results', value: ''}];
    const search = () => {
        let results = [];
        for (let i = 0; i < zones.length; i++) {
            if (zones[i].label.toLowerCase().includes(searchQuery.toLowerCase())) {
                results.push(zones[i]);
            }
        }
        searchResults = results;
    }

    $: search(), searchQuery, convertFromZone, convertFromTime, currentTime;
</script>

<!-- CONVERTED TIME -->
<div class='h-1/2 w-full flex p-8 items-center justify-center'>
    <div class='w-full flex flex-col-reverse items-center xs:items-start xs:flex-row gap-12 xs:gap-0'>
        <div class="text-offWhite text-center w-full xs:w-1/2 flex flex-col items-center gap-4">
            {#each zones as zone}
                {#if zone.value === convertToZone}
                    <h2 class="text-3xl md:text-6xl">{zone.label.toUpperCase()}</h2>
                {/if}
            {/each}
            <button class="border border-offWhite rounded-full px-3 py-1 hover:bg-offWhite hover:text-darkGrey transition-all"
            on:click={() => {showToLocationModal.showModal()}}>
                <p class='text-sm md:text-base'>CHANGE</p>
            </button>
        </div>
        <div class="text-offWhite w-full xs:w-1/2 flex flex-col items-center gap-4 text-center">
            <h2 class="text-3xl md:text-6xl leading-tighter">{convertedTime}</h2>
        </div>
    </div>

</div>
<!-- <div class='h-[1px] bg-offWhite w-2/3 opacity-50' /> -->


<!-- CURRENT LOCATION -->
<div class='bg-offWhite flex flex-col-reverse gap-12 xs:flex-row xs:gap-0 w-full h-1/2  items-center p-8 justify-center'>
    <!-- LOCATION -->
    <div class="text-darkGrey w-full xs:w-1/2 flex flex-col items-center gap-4">
        <p class='text-base md:text-xl'>current location</p>
        {#each zones as zone}
            {#if zone.value === convertFromZone}
                <h2 class="text-3xl md:text-6xl">{zone.label.toUpperCase()}</h2>
            {/if}
        {/each}
        <button on:click={() => {showCurrentLocationModal.showModal();}} 
            class="border border-darkGrey rounded-full px-3 py-1 hover:bg-darkGrey hover:text-offWhite transition-all">
            <p class='text-sm md:text-base'>CHANGE</p>
        </button>
    </div>
    
    <!-- TIME -->
        <div class=' flex items-center w-full xs:w-1/2 justify-center'>
            <div class="text-darkGrey  flex flex-col items-center gap-4 text-center">
                <p class='text-base md:text-xl'>local time</p>
                <h2 class="text-3xl md:text-6xl">{currentTime}</h2>
                <button on:click={() => {showSetTimeModal.showModal();}} 
                class="border border-darkGrey rounded-full px-8 py-1 hover:bg-darkGrey hover:text-offWhite transition-all">
                    <p class='text-sm md:text-base'>SET</p>
                </button>
            </div>
        </div>
</div>

<!-- Current Location Modal -->

<dialog data-modal
	bind:this={showCurrentLocationModal}
	class="backdrop-blur-lg w-full rounded-md md:w-4/5 h-4/5 p-2 md:p-40 bg-darkGrey/60"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="flex flex-col h-full items-center gap-12 text-offWhite">
    <h2 class="text-3xl md:text-6xl">
        SELECT LOCATION
    </h2>
		<div class="h-full w-full my-4 overflow-y-hidden">
            <div class="w-full">
                <input 
                    class="bg-transparent w-full text-offWhite text-xl border-none" 
                    type="text" id="search" placeholder="search by city..." bind:value={searchQuery} />
                    <div class="h-[1px] bg-offWhite opacity-50 mt-1 mb-5"/>
            </div>
            <div class="flex overflow-y-auto justify-start flex-wrap gap-2" style="max-height: calc(100% - 100px);">
                {#each searchResults as zone}
                <div class="border border-offWhite rounded-full px-3 py-1 hover:bg-offWhite hover:text-darkGrey transition-all 
                {(zone.value === convertFromZone) ? 'bg-offWhite text-darkGrey' : '' }">
                    <button on:click={() => {convertFromZone = zone.value, convertTime();}}>{zone.label.toUpperCase()}</button>
                </div>
                {/each}
            </div>
        </div>
		<!-- svelte-ignore a11y-autofocus -->
		<button class="absolute bottom-4 px-3 py-1 border border-darkGrey rounded-full bg-darkGrey hover:bg-offWhite hover:text-darkGrey transition-all" 
        autofocus on:click={() => showCurrentLocationModal.close()}>SAVE</button>
	</div>
</dialog>

<!-- Convert To Location Modal -->

<dialog data-modal
	bind:this={showToLocationModal}
	class="backdrop-blur-lg w-full md:w-4/5 h-4/5 rounded-md p-2 md:p-40 bg-darkGrey/60 "
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="flex flex-col h-full items-center gap-12 text-offWhite">
    <h2 class="text-3xl md:text-6xl">
        SELECT TO LOCATION
    </h2>
		<div class="h-full w-full my-4 overflow-y-hidden">
            <div class="w-full">
                <input 
                    class="bg-transparent w-full text-offWhite text-xl border-none" 
                    type="text" id="search" placeholder="search by city..." bind:value={searchQuery} />
                    <div class="h-[1px] bg-offWhite opacity-50 mt-1 mb-5"/>
            </div>
            <div class="flex overflow-y-auto justify-start flex-wrap gap-2" style="max-height: calc(100% - 100px);">
                {#each searchResults as zone}
                <div class="border border-offWhite rounded-full px-3 py-1 hover:bg-offWhite hover:text-darkGrey transition-all 
                {(zone.value === convertToZone) ? "bg-offWhite text-darkGrey " : "" }">
                    <button on:click={() => {convertToZone = zone.value, convertTime();}}>{zone.label.toUpperCase()}</button>
                </div>
                {/each}
            </div>
        </div>
		<!-- svelte-ignore a11y-autofocus -->
		<button class="absolute bottom-4 px-3 py-1 border border-darkGrey rounded-full bg-darkGrey hover:bg-offWhite hover:text-darkGrey transition-all" autofocus on:click={() => showToLocationModal.close()}>SAVE</button>
	</div>
</dialog>

<!-- Set Time Modal -->

<dialog data-modal
	bind:this={showSetTimeModal}
	class="backdrop-blur-lg w-full rounded-md md:w-4/5 h-4/5 p-2 md:p-40 bg-darkGrey/60"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="flex flex-col h-full items-center gap-12 text-offWhite">
    <h2 class="text-3xl md:text-6xl">
        SET TIME
    </h2>
		<div class="h-full w-full my-4 overflow-y-hidden">
            <div class="w-full">
                <input 
                    class="bg-transparent w-full text-offWhite text-xl border-none" 
                    type="datetime-local" id="search" bind:value={convertFromTime} on:change={convertTime} />
                    <div class="h-[1px] bg-offWhite opacity-50 mt-1 mb-5"/>
            </div>
        </div>
		<!-- svelte-ignore a11y-autofocus -->
		<button class="absolute bottom-4 px-3 py-1 border border-darkGrey rounded-full bg-darkGrey hover:bg-offWhite hover:text-darkGrey transition-all" autofocus on:click={() => showSetTimeModal.close()}>SAVE</button>
	</div>
</dialog>