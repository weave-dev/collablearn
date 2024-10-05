<div class="p-4 flex flex-col gap-4">
	<div class="navbar bg-base-100">
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/>
					</svg>
				</div>
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
				>
					<li><a>Homepage</a></li>
					<li><a>Portfolio</a></li>
					<li><a>About</a></li>
				</ul>
			</div>
		</div>
		<div class="navbar-center">
			<a class="btn btn-ghost text-xl">daisyUI</a>
		</div>
		<div class="navbar-end">
			<button class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</button>
			<button class="btn btn-ghost btn-circle">
				<div class="indicator">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/>
					</svg>
					<span class="badge badge-xs badge-primary indicator-item"></span>
				</div>
			</button>
		</div>
	</div>

	<div class="flex gap-2 justify-center items-center">
		<button class="btn btn-primary btn-lg">Button</button>
		<button class="btn btn-secondary btn-lg">Button</button>
		<button class="btn btn-accent btn-lg">Button</button>
		<button class="btn btn-error btn-lg">Button</button>
		<button class="btn btn-info btn-lg">Button</button>
		<button class="btn btn-success btn-lg">Button</button>
		<button class="btn btn-warning btn-lg">Button</button>
	</div>

	<div class="flex gap-2 justify-center items-center">
		<button class="btn btn-primary">Button</button>
		<button class="btn btn-secondary">Button</button>
		<button class="btn btn-accent">Button</button>
		<button class="btn btn-error">Button</button>
		<button class="btn btn-info">Button</button>
		<button class="btn btn-success">Button</button>
		<button class="btn btn-warning">Button</button>
	</div>

	<div class="flex gap-2 justify-center items-center">
		<button class="btn btn-primary btn-sm">Button</button>
		<button class="btn btn-secondary btn-sm">Button</button>
		<button class="btn btn-accent btn-sm">Button</button>
		<button class="btn btn-error btn-sm">Button</button>
		<button class="btn btn-info btn-sm">Button</button>
		<button class="btn btn-success btn-sm">Button</button>
		<button class="btn btn-warning btn-sm">Button</button>
	</div>

	<div class="flex gap-2 justify-center items-center">
		<button class="btn btn-primary btn-xs">Button</button>
		<button class="btn btn-secondary btn-xs">Button</button>
		<button class="btn btn-accent btn-xs">Button</button>
		<button class="btn btn-error btn-xs">Button</button>
		<button class="btn btn-info btn-xs">Button</button>
		<button class="btn btn-success btn-xs">Button</button>
		<button class="btn btn-warning btn-xs">Button</button>
	</div>

	<div class="mockup-code">
		<pre data-prefix="$"><code>npm i daisyui</code></pre>
		<pre data-prefix=">" class="text-warning"><code>installing...</code></pre>
		<pre data-prefix=">" class="text-success"><code>Done!</code></pre>
	</div>

	<div class="flex gap-4 flex-wrap justify-center">
		{#each { length: 6 } as _}
			<div class="flex w-52 flex-col gap-4">
				<div class="skeleton h-32 w-full"></div>
				<div class="skeleton h-4 w-28"></div>
				<div class="skeleton h-4 w-full"></div>
				<div class="skeleton h-4 w-full"></div>
			</div>
		{/each}
	</div>
</div>
