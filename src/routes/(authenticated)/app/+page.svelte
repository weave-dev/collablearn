<script lang="ts">
	import { authService } from '$lib/modules/authentication'
	import { translate } from '$lib/translations'
	const auth = authService()
</script>

<h1>Welcome</h1>
<button on:click={auth.signOutUser}>
	{$translate('common.label.signOut')}
</button>
