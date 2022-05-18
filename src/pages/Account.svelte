<script>
  import { push } from 'svelte-spa-router';
  import { get } from 'svelte/store';
  import * as api from '../api.js';
  import { currentProfile, reloadAccount, logout } from '../account.js';
  import { validateEmail, validateURL } from '../utils';

  const expanded = [];
  let email = '';
  let created = '';
  let name = '';
  let createdDate = '';
  let createdMonth = '';
  let createdYear = '';
  let profiles = [];
  let actionOnProfile = -1;
  let hasTextEmail = true;
  let hasTextName = false;
  let hasTextPicture = false;
  let targetProfileId = -1;
  let error = '';
  let success = '';
  let createProfileName = '';
  let createProfilePic = '';

  api.getAccountInfos().then(async (response) => {
    if (response.ok) {
      const body = await response.json();
      if ('error' in body) {
        logout();
        await push('#/');
        return;
      }
      email = body.email;
      name = body.name;
      created = body.created;
      createdDate = new Date(parseInt(created, 10));
      createdMonth = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(createdDate);
      createdYear = createdDate.getFullYear();
      profiles = body.profiles;
    } else if (response.status === 500) {
      // TODO
    }
  });

  function changeProfileEmail(profileId, newEmail) {
    if (newEmail !== '' && !validateEmail(newEmail)) {
      error = 'Veuillez saisir une adresse mail valide.';
      return;
    }
    error = '';
    api.changeProfileEmail(profileId, newEmail).then(async (response) => {
      if (response.ok) {
        const body = await response.json();
        if ('error' in body) {
          if (body.error === 'InvalidTokenError') {
            logout();
            await push('#/');
            return;
          }
          if (body.error === 'InvalidProfileIdError') {
            error = 'Le profil sélectionné n\'existe pas.';
            return;
          }
          if (body.error === 'InvalidEmailError') {
            error = 'Veuillez saisir une adresse mail valide.';
            return;
          }
        }

        success = 'La nouvelle adresse mail a bien été définie.';
        setTimeout(() => {
          actionOnProfile = -1;
          success = '';
        }, 2000);
      } else if (response.status === 400) {
          error = 'Bad Request';
      }
    });
  }

  function deleteProfile(profileId) {
    error = '';
    api.deleteUserProfile(profileId).then(async (response) => {
      if (response.ok) {
        const body = await response.json();
        if ('error' in body) {
          if (body.error === 'InvalidTokenError') {
            logout();
            await push('#/');
            return;
          }
          if (body.error === 'InvalidProfileIdError') {
            error = 'Le profil sélectionné n\'existe pas.';
            return;
          }
          error = 'Une erreur s\'est produite.';
          return;
        }
        success = 'Le profil a bien été supprimé.';
        delete profiles[profileId];
        setTimeout(() => {
          actionOnProfile = -1;
          success = '';
          if (get(currentProfile) === profileId) {
            push('#/profile');
          }
        }, 2000);
      }
    });
  }

  function createProfile(name, picture) {
    error = '';
    if (!validateURL(picture)) {
      error = 'Veuillez saisir une URL valide.';
      return;
    }
    if (name === '') {
      error = 'Le nom ne doit pas être vide.';
      return;
    }
    api.createUserProfile({ profileName: name, profilePicture: picture })
      .then(async (response) => {
        if (response.ok) {
          const body = await response.json();
          if ('error' in body) {
            if (body.error === 'InvalidTokenError') {
              logout();
              await push('#/');
              return;
            }
            if (body.error === 'InvalidUrlError') {
              error = 'L\'URL spécifiée est incorrecte.';
              return;
            }
            if (body.error === 'InvalidNameError') {
              error = 'Le nom de profil spécifié est incorrecte.';
              return;
            }
            error = 'Une erreur s\'est produite.';
            return;
          }
          success = 'Le profil a bien été créé';
          await reloadAccount();
          actionOnProfile = -1;
          success = '';
        }
      });
  }
</script>

<div class="bd">
    <div class="responsive-account-container">
        {#if actionOnProfile < 0}
            <div>
                <h1 class="account-header account-header-inline">Compte</h1>
                <div class="account-section-membersince" data-uia="member-since">
                    <div class="account-section-membersince--svg"></div>
                    Membre depuis {createdMonth} {createdYear}
                </div>
                <div class="account-pre-messages-container" data-uia="account-pre-messages-container"></div>
                <div class="account-messages-container"></div>
                <div class="responsive-account-content" data-uia="account-content">
                    <div class="account-section collapsable-panel clearfix membership-section-wrapper"
                         data-uia="membership-section">
                        <header class="account-section-header collapsable-section-toggle">
                            <h2 class="account-section-heading">Informations</h2>
                        </header>
                        <section class="collapsable-section-content account-section-content">
                            <div class="account-subsection clearfix">
                                <div class="clearfix">
                                    <div class="account-section-group">
                                        <div class="account-section-item account-section-email"
                                             data-uia="account-email">{email}</div>
                                        <div class="account-section-item account-section-item-disabled"
                                             data-uia="account-password">
                                            Mot de passe : ********
                                        </div>
                                        <div class="account-section-item account-section-item-disabled"
                                             data-uia="account-phone"></div>
                                    </div>
                                    <div class="account-section-group">
                                        <div class="account-section-item"><a class="account-section-link"
                                                                             data-uia="account-email-link"
                                                                             href="#/">Modifier l&#x27;adresse
                                            e-mail du compte</a></div>
                                        <div class="account-section-item"><a class="account-section-link"
                                                                             data-uia="account-password-link"
                                                                             href="#/">Modifier le mot de
                                            passe</a></div>
                                        <div class="account-section-item"><a class="account-section-link"
                                                                             data-uia="account-phone-link"
                                                                             href="#/">Ajouter un
                                            numéro de téléphone</a></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="account-section collapsable-panel clearfix" data-uia="profile-section">
                        <header class="account-section-header collapsable-section-toggle">
                            <h2 class="account-section-heading">Profils</h2>
                        </header>
                        <section class="collapsable-section-content account-section-content">
                            <div class="account-subsection clearfix">
                                <div class="profile-hub">
                                    <ul>
                                        {#each profiles as prof, i}
                                            {#if (prof != null)}
                                                <li class="single-profile expanded"
                                                    class:expanded="{expanded[i]}"
                                                    data-uia="single-profile-{i}" id="profile_{i}"
                                                    on:click="{() => { expanded[i] = !expanded[i]; }}">
                                                    <div aria-expanded="false" class="profile-header">
                                                        <img alt="${prof.name}"
                                                             class="activeProfile"
                                                             src={prof.picture}/>
                                                        <div class="profile-summary">
                                                            <h3>{prof.name}</h3>
                                                            <div>Tous les âges</div>
                                                        </div>
                                                        <button aria-controls="profile_{i}"
                                                                aria-label="Étendre ce profil"
                                                                class="profile-action-icons">
                                                            <svg class="svg-icon svg-icon-chevron-down" fill="none"
                                                                 height="24"
                                                                 viewBox="0 0 24 24"
                                                                 width="24"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path clip-rule="evenodd"
                                                                      d="M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z"
                                                                      fill="currentColor"
                                                                      fill-rule="evenodd"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <ul class="profile-links">
                                                        {#if i !== 0}
                                                            <li class="account-section-item">
                                                                <a class="profile-link"
                                                                   data-uia="action-{prof.email !== '' ? 'change' : 'add'}-profile-email"
                                                                   href="#/Account"
                                                                   on:click={() => { actionOnProfile = prof.email === '' ? 1 : 2; targetProfileId = i; }}>


                                                                    <div class="profile-main">
                                                                        <h4>Adresse e-mail du profil</h4>
                                                                        {prof.email !== '' ? prof.email : ''}
                                                                    </div>
                                                                    <div class="profile-change">{prof.email !== ''
                                                                        ? 'Modifier'
                                                                        : 'Ajouter'}</div>
                                                                </a>
                                                            </li>
                                                        {/if}
                                                        <li class="account-section-item">
                                                            <a class="profile-link"
                                                               data-uia="action-language-preferences"
                                                               href="#/Account">
                                                                <div class="profile-main">
                                                                    <h4>Langue</h4>
                                                                    français
                                                                </div>
                                                                <div class="profile-change">Modifier</div>
                                                            </a>
                                                        </li>
                                                        <li class="account-section-item">
                                                            <a class="profile-link"
                                                               data-uia="action-viewing-activity"
                                                               href="#/Account">
                                                                <div class="profile-main">
                                                                    <h4>Historique</h4>
                                                                </div>
                                                                <div class="profile-change">Afficher</div>
                                                            </a>
                                                        </li>
                                                        {#if i !== 0}
                                                            <li class="account-section-item">
                                                                <a class="profile-link"
                                                                   data-uia="action-video-quality"
                                                                   href="#/Account"
                                                                   on:click={() => { actionOnProfile = 4; targetProfileId = i; }}>
                                                                    <div class="profile-main">
                                                                        <h4 style="color: red;">Supprimer profil</h4>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        {/if}
                                                    </ul>
                                                </li>
                                            {/if}
                                        {/each}
                                    </ul>
                                </div>
                                <a href="#/Account" on:click={() => { actionOnProfile = 3; }}
                                   class="create-profile-btn">Créer
                                    profil</a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        {:else}
            {#if actionOnProfile === 2}
                <form class="profile-email-form" data-uia="profile-email-form" method="post" novalidate="">
                    <h1>Modifier l'adresse e-mail du profil</h1>
                    <div class="profile-data">
                        <img class="profile-icon" height="32" width="32" alt="{profiles[targetProfileId].name}"
                             src="{profiles[targetProfileId].picture}">
                        <span class="profile-name" data-uia="profile-name">{profiles[targetProfileId].name}</span>
                    </div>
                    <ul class="simpleForm structural ui-grid">
                        <li class="nfFormSpace" data-uia="field-email+wrapper">
                            <div class="nfInput" data-uia="field-email+container">
                                <div class="nfInputPlacement">
                                    <label class="input_id" placeholder="email">
                                        <input id="id_email" bind:value={profiles[targetProfileId].email}
                                               class="nfTextField hasText" class:hasText={hasTextEmail}
                                               on:focus={() => { hasTextEmail = true; error = ''; }}
                                               on:blur={() => { if (document.getElementById('id_email').value === '') { hasTextEmail = false; } else { hasTextEmail = true; } }}
                                               type="text" data-uia="field-email" name="email" tabindex="0"
                                               autocomplete="off" maxlength="50" minlength="5" dir="ltr">
                                        <label class="placeLabel" for="id_email">Adresse e-mail</label>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <p style="color: red;">{error}</p>
                    <p style="color: green;">{success}</p>
                    <div class="nf-btn-bar profile-email-buttons">
                        <button id="nf-btn-save" class="nf-btn nf-btn-primary nf-btn-solid nf-btn-small" type="button"
                                autocomplete="off" tabindex="0" data-uia="save-profile-email" placeholder=""
                                on:click={() => { changeProfileEmail(targetProfileId, profiles[targetProfileId].email); }}>
                            ENREGISTRER
                        </button>
                        <button id="btn-delete" class="nf-btn nf-btn-secondary nf-btn-solid nf-btn-small" type="button"
                                autocomplete="off" tabindex="0" data-uia="delete-profile-email" placeholder=""
                                on:click={() => { changeProfileEmail(targetProfileId, ''); profiles[targetProfileId].email = ''; }}>
                            SUPPRIMER L'ADRESSE E-MAIL
                        </button>
                        <button id="btn-cancel" class="nf-btn nf-btn-secondary nf-btn-solid nf-btn-small" type="button"
                                autocomplete="off" tabindex="0" data-uia="cancel-profile-email" placeholder=""
                                on:click={() => { actionOnProfile = -1; error = ''; success = ''; }}>ANNULER
                        </button>
                    </div>
                </form>
            {:else if (actionOnProfile === 1)}
                <form class="profile-email-form" data-uia="profile-email-form" method="post" novalidate="">
                    <h1>Ajouter une adresse e-mail au profil</h1>
                    <div class="profile-data">
                        <img class="profile-icon" height="32" width="32" alt="{profiles[targetProfileId].name}"
                             src="{profiles[targetProfileId].picture}">
                        <span id="" class="profile-name" data-uia="profile-name">{profiles[targetProfileId].name}</span>
                    </div>
                    <ul class="simpleForm structural ui-grid">
                        <li class="nfFormSpace" data-uia="field-email+wrapper">
                            <div class="nfInput" data-uia="field-email+container">
                                <div class="nfInputPlacement">
                                    <label class="input_id" placeholder="email">
                                        <input id="id_email" bind:value={profiles[targetProfileId].email}
                                               class="nfTextField" class:hasText={hasTextEmail}
                                               on:focus={() => { hasTextEmail = true; error = ''; }}
                                               on:blur={() => { if (document.getElementById('id_email').value === '') { hasTextEmail = false; } else { hasTextEmail = true; } }}
                                               type="text" data-uia="field-email" name="email" tabindex="0"
                                               autocomplete="off" maxlength="50" minlength="5" dir="ltr">
                                        <label class="placeLabel" for="id_email">Adresse e-mail</label>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <p style="color: red;">{error}</p>
                    <p style="color: green;">{success}</p>
                    <div class="nf-btn-bar profile-email-buttons">
                        <button id="nf-btn-save" class="nf-btn nf-btn-primary nf-btn-solid nf-btn-small" type="button"
                                autocomplete="off" tabindex="0" data-uia="save-profile-email" placeholder=""
                                on:click={() => { changeProfileEmail(targetProfileId, profiles[targetProfileId].email); }}>
                            ENREGISTRER
                        </button>
                        <button id="btn-cancel" class="nf-btn nf-btn-secondary nf-btn-solid nf-btn-small" type="button"
                                autocomplete="off" tabindex="0" data-uia="cancel-profile-email" placeholder=""
                                on:click={() => { actionOnProfile = -1; error = ''; success = ''; }}>ANNULER
                        </button>
                    </div>
                </form>
            {:else if (actionOnProfile == 3)}
                <form class="profile-create-form" data-uia="profile-create-form" method="post" novalidate="">
                    <h1>Créer un profil</h1>
                    <div class="profile-data">
                        <img class="profile-icon" width="150" alt="" src="{createProfilePic}">
                    </div>
                    <ul class="simpleForm structural ui-grid">
                        <li class="nfFormSpace">
                            <div class="nfInput">
                                <div class="nfInputPlacement">
                                    <label class="input_id" placeholder="name">
                                        <input id="profileName" bind:value={createProfileName} class="nfTextField"
                                               class:hasText={hasTextName}
                                               on:focus={() => { hasTextName = true; error = ''; }}
                                               on:blur={() => { if (document.getElementById('profileName').value === '') { hasTextName = false; } else { hasTextName = true; } }}
                                               type="text" data-uia="field-name" name="name" tabindex="0"
                                               autocomplete="off" maxlength="50" minlength="1" dir="ltr">
                                        <label class="placeLabel" for="profileName">Nom du profil</label>
                                    </label>
                                </div>
                            </div>
                        </li>
                        <br/><br/>
                        <li class="nfFormSpace">
                            <div class="nfInput">
                                <div class="nfInputPlacement">
                                    <label class="input_id" placeholder="picture">
                                        <input id="profilePic" bind:value={createProfilePic} class="nfTextField"
                                               class:hasText={hasTextPicture}
                                               on:focus={() => { hasTextPicture = true; error = ''; }}
                                               on:blur={() => { if (document.getElementById('profilePic').value === '') { hasTextPicture = false; } else { hasTextPicture = true; } }}
                                               type="url" data-uia="field-pic" name="pic" tabindex="0"
                                               autocomplete="off" dir="ltr">
                                        <label class="placeLabel" for="profilePic">URL de l'image</label>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <p style="color: red;">{error}</p>
                    <p style="color: green;">{success}</p>
                    <div class="nf-btn-bar profile-email-buttons">
                        <button id="nf-btn-save" class="nf-btn nf-btn-primary nf-btn-solid nf-btn-small" type="button"
                                autocomplete="off" tabindex="0" data-uia="save-profile-email" placeholder=""
                                on:click={() => { createProfile(createProfileName, createProfilePic); }}>ENREGISTRER
                        </button>
                        <button id="btn-cancel" class="nf-btn nf-btn-secondary nf-btn-solid nf-btn-small" type="button"
                                autocomplete="off" tabindex="0" data-uia="cancel-profile-email" placeholder=""
                                on:click={() => { actionOnProfile = -1; error = ''; success = ''; }}>ANNULER
                        </button>
                    </div>
                </form>
            {:else if actionOnProfile === 4}
                <h1>Êtes-vous sûr de vouloir supprimer le profil <b>{profiles[targetProfileId].name}</b> ?</h1>
                <img class="profile-icon" height="50" width="50" style="margin-bottom: 2cm;"
                     alt="{profiles[targetProfileId].name}" src="{profiles[targetProfileId].picture}">
                <p style="color: red;">{error}</p>
                <p style="color: green;">{success}</p>
                <div class="nf-btn-bar profile-email-buttons">
                    <button id="nf-btn-save" class="nf-btn nf-btn-primary nf-btn-solid nf-btn-small" type="button"
                            autocomplete="off" tabindex="0" data-uia="save-profile-email" placeholder=""
                            on:click={() => { deleteProfile(targetProfileId); }}>OUI
                    </button>
                    <button id="btn-cancel" class="nf-btn nf-btn-secondary nf-btn-solid nf-btn-small" type="button"
                            autocomplete="off" tabindex="0" placeholder="" on:click={() => { actionOnProfile = -1; }}>
                        NON
                    </button>
                </div>
            {/if}
        {/if}
    </div>
</div>
<svg style="height:0;width:0;display:block" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <symbol id="profile-lock" viewBox="0 0 14 20">
            <path d="M7,-1.26121336e-13 C9.76842707,-1.26121336e-13 12,2.30130958 12,5.125 L12,8 L14,8 L14,20 L0,20 L0,8 L2,8 L2,5.125 C2,2.30130958 4.23157293,-1.26121336e-13 7,-1.26121336e-13 Z M12,10 L2,10 L2,18 L12,18 L12,10 Z M8,12 L8,16 L6,16 L6,12 L8,12 Z M7,2 C5.35014907,2 4,3.39234123 4,5.125 L4,8 L10,8 L10,5.125 C10,3.39234123 8.64985093,2 7,2 Z"
                  fill="currentColor"></path>
        </symbol>
        <symbol id="chevron-down" viewBox="0 0 60 19">
            <path d="M59.5615866,2.44258873 L31.1899791,17.6617954 C30.7515658,17.9123173 30.2505219,18.1002088 30.0626305,18.1002088 C29.874739,18.1002088 29.6242171,18.0375783 29.5615866,18.0375783 C29.4363257,17.9749478 28.9979123,17.7244259 28.559499,17.5365344 L0.501043841,2.44258873 C0.187891441,2.31732777 0,1.94154489 0,1.62839248 C0,1.50313152 0.0626304802,1.37787056 0.12526096,1.18997912 L0.501043841,0.501043841 C0.688935282,0.187891441 1.00208768,0 1.31524008,0 C1.50313152,0 1.62839248,0 1.75365344,0.12526096 L29.1858038,14.8434238 C29.3736952,14.9686848 29.6868476,15.0313152 30,15.0313152 C30.3131524,15.0313152 30.6263048,14.9686848 30.8141962,14.8434238 L58.2463466,0.12526096 C58.6847599,-0.12526096 59.2484342,0 59.4989562,0.501043841 L59.874739,1.18997912 C60.125261,1.62839248 60,2.19206681 59.5615866,2.44258873"
                  fill="currentColor"></path>
        </symbol>
        <symbol id="chevron-left" viewBox="0 0 18 18">
            <path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" fill="currentColor"/>
        </symbol>
        <symbol id="close" viewBox="0 0 25.5 25.5">
            <polygon class="st0" fill="currentColor"
                     points="25.5,1.4 24,0 12.7,11.3 1.4,0 0,1.4 11.3,12.7 0,24 1.4,25.5 12.7,14.1 24,25.5 25.5,24 14.1,12.7 "/>
        </symbol>
        <symbol id="info" viewBox="0 0 22 22">
            <path d="M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M11,7 L11,9 L13,9 L13,7 L11,7 Z M11,11 L11,17 L13,17 L13,11 L11,11 Z"
                  fill="currentColor"
                  id="path-1"></path>
        </symbol>
    </defs>
</svg>

<style>
    header, section {
        display: block;
    }

    a {
        background-color: transparent;
    }

    a:active, a:hover {
        outline: 0;
    }

    h1 {
        font-size: 2em;
        margin: .67em 0;
    }

    img {
        border: 0;
    }

    svg:not(:root) {
        overflow: hidden;
    }

    button {
        font: inherit;
        margin: 0;
        color: inherit;
    }

    button {
        overflow: visible;
    }

    button {
        text-transform: none;
    }

    button {
        cursor: pointer;
        -webkit-appearance: button;
    }

    button::-moz-focus-inner {
        padding: 0;
        border: 0;
    }

    @font-face {
        font-family: nf-icon;
        src: url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.eot);
        src: url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.eot?#iefix) format("embedded-opentype"),
        url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.woff) format("woff"),
        url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.ttf) format("truetype"),
        url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.svg#nf-icon-v1-93) format("svg");
        font-weight: 400;
        font-style: normal;
    }

    h1 {
        font-size: 1.5em;
        font-weight: 400;
        margin: 0 0 .4em;
        color: #333;
    }

    @media screen and (min-width: 740px) {
        h1 {
            font-size: 2.15em;
            margin: 0 0 .55em;
        }
    }

    h2, h3, h4 {
        font-weight: 400;
        margin: .75em 0 .25em;
    }

    .clearfix:after {
        display: block;
        clear: both;
        overflow: hidden;
        width: 0;
        height: 0;
        content: " ";
    }

    a {
        text-decoration: none;
        color: var(--link-color-primary);
    }

    a:hover {
        text-decoration: underline;
    }

    ul {
        padding: 0;
    }

    ul > li {
        margin-bottom: 5px;
        margin-left: 1.1em;
        list-style-type: disc;
    }

    #hd .nav-wrap #global-header li.nav-item ul a:hover {
        text-decoration: underline;
    }

    #hd .subnav-wrap ul a:hover {
        text-decoration: underline;
        color: #b9090b;
    }

    #hd .subnav-wrap ul li {
        line-height: 1;
        margin-bottom: 0;
        text-align: left;
    }

    .responsive-account-container {
        font-size: 1em;
        position: relative;
        display: block;
        width: 90%;
        min-width: 300px;
        min-height: 400px;
        margin: 0 auto;
        color: #333;
        overflow-wrap: anywhere;
    }

    .responsive-account-container * {
        box-sizing: border-box;
    }

    @media only screen and (min-width: 740px) {
        .responsive-account-container {
            font-size: 1em;
            width: 95%;
            max-width: 1024px;
        }
    }

    .bd {
        background-color: #fff;
    }

    .account-section-membersince {
        font-size: .8rem;
        font-weight: 800;
        display: inline-flex;
        align-items: center;
        margin-left: 20px;
        padding: 5px 14px 5px 0;
        text-align: center;
        color: var(--text-color-secondary);
    }

    .account-section-membersince--svg {
        width: 26px;
        height: 26px;
        margin-right: 5px;
        padding-right: 26px;
        background: url(https://assets.nflxext.com/ffe/siteui/account/svg/membersince.svg) no-repeat 0 0;
    }

    .account-header-inline {
        display: inline-block;
        vertical-align: middle;
    }

    @media only screen and (max-width: 740px) {
        .account-section-membersince {
            font-size: 13px;
            margin-left: 15px;
            vertical-align: sub;
        }
    }

    @media only screen and (max-width: 499px) {
        .responsive-account-container .account-header-inline {
            display: block;
            margin-bottom: 0;
        }

        .account-section-membersince {
            margin-bottom: 10px;
            margin-left: 0;
        }
    }

    .account-section-heading {
        font-size: 1.25em;
        font-weight: 400;
    }

    @media only screen and (max-width: 740px) {
        h1 {
            font-size: 1.5em;
        }
    }

    .account-section {
        position: relative;
        margin-bottom: 5px;
        padding: 10px;
        border: 1px solid #999;
        background: #fff;
    }

    @media only screen and (min-width: 500px) {
        .account-section {
            min-height: 4.5em;
            padding: 0;
            border-top: 1px solid #999;
            border-right: none;
            border-bottom: none;
            border-left: none;
            background-color: inherit;
        }
    }

    .account-section-item {
        margin-bottom: 15px;
    }

    @media only screen and (min-width: 740px) {
        .account-section-item {
            margin-bottom: 10px;
        }
    }

    .account-section-item-disabled {
        color: var(--text-color-disabled);
    }

    .account-section-heading {
        font-size: 1.14em;
        font-weight: 400;
        margin-top: 15px;
        margin-bottom: 20px;
        padding: 0;
        color: #757575;
    }

    @media only screen and (min-width: 500px) {
        .account-section-heading {
            font-size: 1.125em;
        }
    }

    @media only screen and (min-width: 740px) {
        .account-section-header {
            position: absolute;
            z-index: 2;
            left: 0;
            width: 270px;
            padding-right: 10px;
        }
    }

    .account-section-content {
        position: relative;
    }

    @media only screen and (min-width: 740px) {
        .account-section-content {
            margin-top: 15px;
            padding-left: 270px;
        }
    }

    .account-subsection {
        position: relative;
    }


    @media only screen and (max-width: 500px) {
        .account-subsection ~ .account-subsection.is-external-gift-redemption .account-section-link:first-child {
            border-top: 0;
        }
    }

    @media only screen and (min-width: 500px) {
        .account-section-group {
            float: left;
            width: 50%;
            background-color: inherit;
        }
    }

    @media only screen and (min-width: 500px) {
        .account-section-group + .account-section-group {
            float: right;
            text-align: right;
        }
    }

    .profile-hub li {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .profile-hub li:first-child .profile-header {
        padding: 0 0 20px 0;
    }

    .profile-hub li:last-of-type .profile-header {
        border-bottom: 0;
    }

    .profile-hub .profile-header {
        display: flex;
        padding: 15px 0;
        cursor: pointer;
        border-bottom: 1px solid #ccc;
    }

    .profile-hub .profile-header img {
        height: 60px;
        border-radius: 4px
    }

    .profile-hub .profile-header svg {
        width: 20px;
        height: 20px;
        fill: #aaa;
    }

    .profile-hub .profile-summary {
        font-size: .8em;
        align-self: center;
        flex-grow: 1;
        padding-left: 20px;
        color: #787878;
    }

    .profile-hub .profile-action-icons {
        display: flex;
        align-items: center;
        align-self: center;
        border: none;
        background-color: transparent;
    }

    .profile-hub .profile-action-icons svg {
        color: #333;
    }

    .profile-hub .profile-links {
        display: none;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
    }

    .profile-hub .expanded .profile-links {
        display: block;
    }

    .profile-hub .expanded .profile-action-icons svg.svg-icon-chevron-down {
        transform: rotate(180deg);
    }

    .profile-hub h3 {
        font-size: 1.2em;
        font-weight: 700;
        margin: 0 0 .3em 0;
        color: #333;
    }

    .profile-hub h4 {
        font-size: 1.2em;
        margin: 4px 0;
        color: #333;
    }

    .profile-hub .profile-link {
        display: flex;
        min-height: 90px;
        margin-left: 84px;
        padding: 16px 0 20px;
        border-top: 1px solid #ccc;
    }

    .profile-hub .profile-link:hover {
        text-decoration: none;
    }

    .profile-hub .profile-link:hover .profile-change {
        text-decoration: underline;
    }

    .profile-hub .profile-main {
        font-size: .8em;
        align-self: center;
        flex-grow: 1;
        color: #787878;
    }

    .profile-hub .profile-change {
        font-size: .8em;
        align-self: center;
    }

    .profile-hub .account-section-item:first-child .profile-link {
        border: none;
    }

    .ui-message-security-pass > .ui-message-svg-icon svg path {
        fill: #fff;
    }

    .membership-section-wrapper {
        padding-bottom: 10px;
    }

    .account-section-email {
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .profile-data {
        margin: 15px 0
    }

    .profile-icon {
        vertical-align: middle;
        margin: 0 10px 0 0
    }

    .profile-name {
        vertical-align: middle;
        white-space: nowrap;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis
    }

    .profile-email-buttons .nf-btn {
        margin: 10px 0
    }

    @media only screen and (min-width: 500px) {
        .profile-email-buttons .nf-btn {
            margin: 0 10px 0 0
        }
    }

    ul.structural {
        padding: 0;
        margin: 0
    }

    ul.structural > li {
        list-style: none;
        margin-left: 0
    }

    .nfFormSpace {
        margin-bottom: 10px
    }

    .nfInput {
        max-width: 500px;
        position: relative
    }

    .nfInput .nfInputPlacement {
        position: relative;
        border: 1px solid #333;
    }

    .nfInput .nfInputPlacement.showInvalidIcon .nfTextField,
    .nfInput .nfInputPlacement.showValidIcon .nfTextField {
        padding-right: 40px
    }

    .nfInput .placeLabel {
        position: absolute;
        top: 50%;
        left: 10px;
        color: #8c8c8c;
        font-size: 14px;
        -webkit-transition: font .1s ease, top .1s ease, -webkit-transform .1s ease;
        transition: font .1s ease, top .1s ease, -webkit-transform .1s ease;
        -o-transition: font .1s ease, top .1s ease, -o-transform .1s ease;
        -moz-transition: font .1s ease, top .1s ease, transform .1s ease, -moz-transform .1s ease;
        transition: font .1s ease, top .1s ease, transform .1s ease;
        transition: font .1s ease, top .1s ease, transform .1s ease, -webkit-transform .1s ease, -moz-transform .1s ease, -o-transform .1s ease;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%)
    }

    @media only screen and (min-width: 740px) {
        .nfInput .placeLabel {
            font-size: 16px
        }
    }

    .nfInput .nfTextField {
        height: 48px;
        padding: 10px 10px 0;
        width: 100%
    }

    .nfInput .hasText + .placeLabel,
    .nfInput .nfTextField:focus + .placeLabel {
        top: 4px;
        font-size: 11px;
        -webkit-transform: translateY(0);
        -moz-transform: translateY(0);
        -ms-transform: translateY(0);
        -o-transform: translateY(0);
        transform: translateY(0)
    }

    .nfInput .nfTextField:-webkit-autofill + .placeLabel {
        top: 4px;
        font-size: 11px;
        -webkit-transform: translateY(0);
        transform: translateY(0)
    }

    .profile-email-buttons .nf-btn {
        margin: 10px 0
    }

    @media only screen and (min-width: 500px) {
        .profile-email-buttons .nf-btn {
            margin: 0 10px 0 0
        }
    }

    .nf-btn {
        display: inline-block;
        text-decoration: none;
        line-height: 1rem;
        vertical-align: middle;
        cursor: pointer;
        font-weight: 700;
        letter-spacing: .025rem;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: none;
        position: relative;
        min-height: 48px;
        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .25);
        -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .25);
        box-shadow: 0 1px 1px rgba(0, 0, 0, .25);
        color: #000
    }

    .nf-btn:disabled {
        cursor: default;
        opacity: .5;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none
    }

    .nf-btn:hover {
        text-decoration: none;
        background: #d9d9d9
    }

    .nf-btn:active {
        background: #ccc
    }

    .nf-btn-solid.nf-btn-primary {
        color: #fff;
        background-color: #e50914
    }

    .nf-btn-solid.nf-btn-primary:hover {
        background-color: #f6121d
    }

    .nf-btn-solid.nf-btn-primary:active {
        background-color: #e50914
    }

    .nf-btn-solid.nf-btn-primary:disabled {
        opacity: .5
    }

    .nf-btn-solid.nf-btn-secondary {
        color: #000;
        background-color: #ccc
    }

    .nf-btn-solid.nf-btn-secondary:hover {
        background: #d9d9d9
    }

    .nf-btn-solid.nf-btn-secondary:active {
        background: #ccc
    }

    .nf-btn-solid.nf-btn-secondary:disabled {
        color: #737373
    }

    .nf-btn {
        position: relative;
        font-size: 1rem;
        padding: .75rem 1.33333333rem;
        min-width: 74px;
        min-height: 48px;
        width: 100%
    }

    @media only screen and (min-width: 500px) {
        .nf-btn {
            width: auto
        }
    }

    .nf-btn.nf-btn-small {
        display: block;
        padding: 0;
        line-height: 50px
    }

    @media only screen and (min-width: 500px) {
        .nf-btn.nf-btn-small {
            display: inline-block;
            font-size: 13px;
            padding: .75rem 17.33333333px;
            min-width: 98px;
            min-height: 37px;
            margin-right: .5rem;
            padding-left: 1rem;
            padding-right: 1rem;
            width: auto;
            line-height: 1rem
        }
    }

    .create-profile-btn {
        margin-top: 1cm;
        margin-bottom: 1cm;
        margin-left: 50%;
        box-shadow: 3px 4px 0px 0px #899599;
        background: linear-gradient(to bottom, #ededed 5%, #bab1ba 100%);
        background-color: #ededed;
        border-radius: 15px;
        border: 1px solid #d6bcd6;
        display: inline-block;
        cursor: pointer;
        color: #3a8a9e;
        font-family: Arial;
        font-size: 17px;
        padding: 7px 25px;
        text-decoration: none;
        text-shadow: 0px 1px 0px #e1e2ed;
    }

    .create-profile-btn:hover {
        background: linear-gradient(to bottom, #bab1ba 5%, #ededed 100%);
        background-color: #bab1ba;
    }

    .create-profile-btn:active {
        position: relative;
        top: 1px;
    }

</style>
