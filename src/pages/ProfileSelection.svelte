<script>

  const profiles = [
    {
      name: 'Profile0',
      picture: 'http://hdqwalls.com/download/mortal-kombat-x-sub-zero-2048x2048.jpg',
    },
    { name: 'Profile1', picture: 'https://images.hdqwalls.com/download/scorpion-in-mortal-kombat-2048x2048.jpg' }];
</script>

<div class="page-container">
    <div class="main-centered">
        <h1 class="profile-header">Choose your fighter</h1>
        <ul class="profile-list">
            {#each profiles as profile}
                <li class="profile">
                    <a class="profile-link" href="#/profile">
                        <img alt="profile icon" class="profile-icon"
                             src={profile.picture}/>
                        <span class="profile-name">{profile.name}</span>
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
