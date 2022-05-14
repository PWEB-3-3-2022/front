<script>
    import { getUserProfiles } from '../account.js';
    let profiles = [];
    getUserProfiles().then((prof) => {profiles = [...prof];});

    function OnClickProfile(id) {
        const date = new Date().getDate();
        const expirationDate = new Date().setDate(date + 7);
        document.cookie = `profile=${id}; path=/; expires=${new Date(expirationDate).toUTCString()}`;
    }
</script>

<div class="page-container">
    <div class="main-centered">
        <h1 class="profile-header">Choisissez votre profil</h1>
        <ul class="profile-list">
            {#each profiles as prof, i}
                <li class="profile">
                    <a class="profile-link" href="#/profiles" on:click={() => OnClickProfile(i)}>
                        <img alt="profile icon" class="profile-icon"
                            src={prof.picture}/>
                        <span class="profile-name">{prof.name}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .page-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    .main-centered {
        max-width: 80%;
    }

    .profile-header {
        font-size: 3.5vw;
        width: 100%;
        margin: .67em 0;
    }

    .profile-list {
        margin: 2em 0;
    }

    .profile {
        display: inline-block;
        width: 10vw;
        min-width: 84px;
        max-width: 200px;
        vertical-align: top;
    }

    li.profile:not(:last-child) {
        margin: 0 2vw 0 0;
    }

    .profile-link:hover > .profile-name {
        color: var(--text-color-primary);
    }

    .profile-link:hover > .profile-icon {
        outline: 4px solid white;
        outline-offset: -4px;
    }

    .profile-icon {
        border-radius: 4px;
    }

    .profile-name {
        font-size: 1.5vw;
        display: block;
        min-height: 1.8em;
        margin: .6em 0;
        color: var(--text-color-secondary);
    }
</style>
