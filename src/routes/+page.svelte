<script>
    import { enhance } from '$app/forms';
</script>

<section>
   <h1> Crea il tuo Conta Daimoku</h1>

   <form method="post" use:enhance>
        <input type="text" placeholder="Codice" />
        <button type="submit">Crea</button>
   </form>
</section>

<style>

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    form input {
        width: 100%;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    form button {
        width: 100%;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    form button:hover {
        background-color: #ccc;
    }
</style>