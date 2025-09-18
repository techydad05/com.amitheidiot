<script>
  import { fade, fly } from 'svelte/transition';
  export let show = false;

  const stats = [
    {
      category: 'Literacy and Education',
      comparisons: [
        {
          title: 'Adult Literacy Rate',
          modern: '54% of U.S. adults read below 6th grade level (2023)',
          boomer: 'Over 80% literacy rate during the 1960s',
          source: 'National Center for Education Statistics',
        },
        {
          title: 'College Affordability',
          modern: 'Average student debt: $37,574 (2023)',
          boomer: '1970s: Could pay for college with summer job',
          source: 'Federal Reserve',
        },
        {
          title: 'Public Education Funding',
          modern: 'Many schools underfunded by $1,000+ per student',
          boomer: '1960s-70s: Significant public investment in education',
          source: 'Education Law Center',
        },
      ],
    },
    {
      category: 'Economic Reality',
      comparisons: [
        {
          title: 'Home Ownership',
          modern: 'Millennials: 48% own homes (age 26-41)',
          boomer: 'Boomers at same age: 70% owned homes',
          source: 'National Association of Realtors',
        },
        {
          title: 'Wage vs. Cost of Living',
          modern: 'Need 2.5x minimum wage to afford rent in most states',
          boomer: '1970: Could afford rent on minimum wage',
          source: 'National Low Income Housing Coalition',
        },
        {
          title: 'Wealth Distribution',
          modern: 'Millennials own 4.6% of U.S. wealth',
          boomer: 'Boomers owned 21% at same age',
          source: 'Federal Reserve',
        },
      ],
    },
    {
      category: 'Social Mobility',
      comparisons: [
        {
          title: 'Chance of Doing Better Than Parents',
          modern: '50% chance (born 1980s)',
          boomer: '90% chance (born 1940s)',
          source: 'Opportunity Insights',
        },
        {
          title: 'Income Required for Middle Class',
          modern: '2x 1970s amount adjusted for inflation',
          boomer: 'Single income sufficient for family',
          source: 'Pew Research',
        },
      ],
    },
  ];
</script>

<div
  class="bg-surface-backdrop-token fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 backdrop-blur-sm"
  transition:fade
  role="dialog"
  aria-modal="true"
  on:click|self={() => (show = false)}
  on:keydown={(e) => e.key === 'Escape' && (show = false)}
>
  <div
    class="card variant-filled-surface max-h-[90vh] w-full max-w-4xl overflow-y-auto p-6 shadow-xl"
    in:fly={{ y: -50, duration: 500 }}
    out:fade
    role="document"
  >
    <!-- Close button -->
    <button
      class="variant-filled-surface btn-icon btn-icon-sm absolute right-2 top-2"
      on:click={() => (show = false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <div class="text-center">
      <h2 class="mb-2 text-3xl font-bold text-primary-500">The Decline of American Education</h2>
      <p class="text-lg opacity-80">A stark comparison between generations</p>
    </div>

    <div class="space-y-8">
      {#each stats as category}
        <div class="card variant-soft-surface p-6">
          <h3 class="mb-4 text-2xl font-bold text-secondary-500">{category.category}</h3>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {#each category.comparisons as stat}
              <div class="card variant-filled-surface shadow-lg">
                <div class="p-4">
                  <h4 class="mb-2 text-lg font-bold">{stat.title}</h4>
                  <div class="space-y-2">
                    <div class="card variant-soft-error p-2">
                      <p class="text-sm">
                        <span class="font-bold text-error-500">Now:</span>
                        {stat.modern}
                      </p>
                    </div>
                    <div class="card variant-soft-success p-2">
                      <p class="text-sm">
                        <span class="font-bold text-success-500">Then:</span>
                        {stat.boomer}
                      </p>
                    </div>
                    <p class="text-xs italic opacity-60">Source: {stat.source}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <div class="mt-6 text-center">
      <p class="text-sm italic opacity-60">
        These statistics highlight the growing challenges in education and economic mobility.
        Understanding this context is crucial for addressing modern civic participation.
      </p>
    </div>
  </div>
</div>
