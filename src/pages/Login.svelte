<script>
  import { push } from 'svelte-spa-router';
  import * as api from '../api';
  import * as account from '../account';

  if (account.isLoggedIn()) {
    push('#/');
  }

  let rememberMe = false;

  let email = '';
  let errors = {};
  let authSuccess = '';
  let isLoading = false;

  let passwordInput;

  let showPasswordToggle = false;
  let showPassword = false;

  function onSubmit() {
    errors = [];
    const password = passwordInput.value;

    if (email.length === 0) {
      errors.push('Email should not be empty');
    }
    if (password.length === 0) {
      errors.push('Password should not be empty');
    }

    if (Object.keys(errors).length === 0) {
      isLoading = true;
      api.login({ email, password, rememberMe }).then(async (response) => {
        // Handle errors here
        if (response.ok) {
          const body = await response.json();
          if ('error' in body && body.error === 'NoAccountError') {
            errors.push('Invalid credentials');
          } else if ('authToken' in body && body.authToken !== '') {
            authSuccess = 'Successfully logged in!';
            document.cookie = `authToken=${body.authToken}; path=/; ${rememberMe ? `expires=${body.expires}` : ''}`;
            await account.reloadAccount(body.authToken);
            await push('#/');
          }
        } else if (response.status === 400) {
          errors.push('Bad Request');
        } else if (response.status === 500) {
          errors.push('Internal Server Error: could not log in.');
        } else {
          errors.push(`Error code ${response.status}`);
        }

        isLoading = false;
      }).catch((error) => {
        if (error.message.includes('NetworkError')) {
          errors.push('Unable to reach server.');
        } else {
          errors.push(error);
        }
        isLoading = false;
      });
    }
  }
</script>

<div class="login-body">
    <div class="login-content login-form hybrid-login-form hybrid-login-form-signup">
        <div class="hybrid-login-form-main">
            <h1>S&#x27;identifier</h1>
            <form on:submit|preventDefault={onSubmit}>
                <div class="nfInput nfEmailPhoneInput login-input login-input-email">
                    <div class="nfInputPlacement">
                        <div class="nfEmailPhoneControls">
                            <input type="text" name="userLoginId" class="nfTextField" id="id_userLoginId"
                                   tabindex="0" autocomplete="email" bind:value={email}/>
                            <label for="id_userLoginId" class="placeLabel">E-mail</label>
                        </div>
                    </div>
                </div>
                <div id="pasw_control" class="nfInput nfPasswordInput login-input login-input-password"
                     class:nfPasswordHasToggle={showPasswordToggle}>
                    <div class="nfInputPlacement">
                        <div class="nfPasswordControls">
                            <input bind:this={passwordInput} type={showPassword ? 'text' : 'password'}
                                   name="password"
                                   class="nfTextField" id="passwordInput"
                                   tabindex="0" autocomplete="password"
                                   on:focus={() => { showPasswordToggle = true; }}
                                   on:blur={() => { showPasswordToggle = false; }}/>
                            <label for="passwordInput" class="placeLabel">Mot de passe</label>
                            <button id="id_password_toggle" type="button" class="nfPasswordToggle"
                                    style:display={showPasswordToggle ? 'block' : 'none'}
                                    title="Afficher le mot de passe"
                                    on:click={() => { showPassword = !showPassword; }}>{showPassword
                                ? 'MASQUER'
                                : 'AFFICHER'}
                            </button>
                        </div>
                    </div>
                </div>
                {#if isLoading}
                    <button value="disabled" disabled class="btn login-button btn-submit btn-small" type="submit"
                            tabindex="0">Logging in...
                    </button>
                {:else}
                    <button class="btn login-button btn-submit btn-small" type="submit" autoComplete="off"
                            tabindex="0">S&#x27;identifier
                    </button>
                {/if}
                <div class="hybrid-login-form-help">
                    <div class="ui-binary-input login-remember-me">
                        <input type="checkbox" class="" name="rememberMe" id="bxid_rememberMe_true" value="true"
                               tabindex="0" bind:checked={rememberMe}/>
                        <label for="bxid_rememberMe_true"><span
                                class="login-remember-me-label-text">Se souvenir de moi</span></label>
                        <div class="helper"></div>
                    </div>
                    <a class="link login-help-link" href="#/LoginHelp" target="_self">Besoin d&#x27;aide ?</a>
                </div>

                {#if errors.length > 0}
                    <ul class="errors">
                        {#each errors as error}
                            <li>{error}</li>
                        {/each}
                    </ul>
                {/if}
                {#if authSuccess === 'Successfully logged in!'}
                    <ul class="success">
                        <li>{authSuccess}</li>
                    </ul>
                {/if}
            </form>
        </div>
        <div class="hybrid-login-form-other">
            <div class="login-signup-now">Première visite sur TCflix ?
                <a class=" " target="_self" href="#/register">Inscrivez-vous</a>
            </div>
        </div>
    </div>
</div>

<style>
    .nfPasswordInput {
        position: relative;
        z-index: 0
    }

    .nfPasswordInput .nfTextField {
        background: 0 0
    }

    .nfPasswordControls {
        display: flex;
        background: #fff
    }

    .nfPasswordControls > label {
        flex-grow: 1
    }

    .nfPasswordHasToggle .nfPasswordControls .nfPasswordToggle,
    .nfPasswordHasToggle .nfPasswordControls .nfTextField {
        border: 0;
        border-radius: 0;
        height: 46px
    }

    .nfPasswordToggle {
        appearance: none;
        color: #8c8c8c;
        font-size: 14px;
        border: 0;
        background: 0 0;
        flex-grow: 0;
        flex-shrink: 0
    }

    h1 {
        font-size: 1.5em;
        color: #333;
        margin: 0 0 .4em;
        font-weight: 400
    }

    @media screen and (min-width: 740px) {
        h1 {
            font-size: 2.15em;
            margin: 0 0 .55em
        }
    }

    a {
        text-decoration: none;
        color: #0080ff
    }

    a:hover {
        text-decoration: underline
    }

    ul {
        padding: 0
    }

    ul > li {
        margin-left: 1.1em;
        margin-bottom: 5px;
        list-style-type: disc
    }

    a {
        background-color: transparent
    }

    a:active,
    a:hover {
        outline: 0
    }

    h1 {
        font-size: 2em;
        margin: .67em 0
    }

    button,
    input {
        color: inherit;
        font: inherit;
        margin: 0
    }

    button {
        overflow: visible
    }

    button {
        text-transform: none
    }

    button {
        -webkit-appearance: button;
        cursor: pointer
    }

    button[disabled] {
        cursor: default
    }

    input {
        line-height: normal
    }

    input[type=checkbox] {
        box-sizing: border-box;
        padding: 0
    }

    @font-face {
        font-family: nf-icon;
        src: url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.eot);
        src: url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.eot?#iefix) format('embedded-opentype'),
        url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.woff) format('woff'),
        url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.ttf) format('truetype'),
        url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.svg#nf-icon-v1-93) format('svg');
        font-weight: 400;
        font-style: normal
    }

    .login-remember-me {
        display: inline-block;
        margin-bottom: -5px
    }

    .login-remember-me input {
        margin-right: 10px
    }

    .login-remember-me-label-text {
        font-size: 14px
    }

    h1 {
        margin: 0 0 10px 0;
        padding: 0
    }

    @media only screen and (min-width: 740px) {
        h1 {
            margin-bottom: 20px
        }
    }

    .login-content {
        padding-top: 20px;
        background-color: #f3f3f3
    }

    @media only screen and (min-width: 740px) {
        .login-content {
            padding: 40px
        }
    }

    @media only screen and (min-width: 500px) {
        .login-content {
            min-width: 380px
        }
    }

    .login-body {
        color: #333;
    }

    @media only screen and (min-width: 740px) {
        .login-body {
            margin: 0 auto;
            background-color: transparent;
            max-width: 450px
        }

        .login-body:before {
            content: "";
            height: 2rem;
            display: block
        }

        .login-body:after {
            content: "";
            height: 2rem;
            display: block
        }
    }

    .ui-binary-input {
        position: relative;
        box-sizing: border-box;
        padding-left: 36px;
        user-select: none;
        font-size: 16px
    }

    .ui-binary-input input:disabled ~ .helper,
    .ui-binary-input input[type=checkbox]:disabled + label {
        color: #b3b3b3
    }

    .ui-binary-input .helper {
        font-size: 14px;
        line-height: 1.3em;
        color: grey
    }

    .ui-binary-input input[type=checkbox] {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0
    }

    .ui-binary-input input[type=checkbox]:focus + label::before {
        -webkit-box-shadow: 0 0 5px 2px rgba(150, 200, 255, .6);
        -moz-box-shadow: 0 0 5px 2px rgba(150, 200, 255, .6);
        box-shadow: 0 0 5px 2px rgba(150, 200, 255, .6);
        border-color: grey
    }

    .ui-binary-input input[type=checkbox] + label {
        color: #333;
        position: relative;
        display: block;
        line-height: 1.2;
        padding: 6px 0
    }

    .ui-binary-input input[type=checkbox] + label:before {
        content: "";
        position: absolute;
        display: block;
        top: 2px;
        left: -36px;
        padding: 0;
        border: 1px solid #b3b3b3;
        background-color: #fff
    }

    .ui-binary-input input[type=checkbox] + label:after {
        position: absolute
    }

    .ui-binary-input input[type=checkbox] + label:before {
        width: 25px;
        height: 25px
    }

    .ui-binary-input input[type=checkbox]:checked + label:after {
        color: #0080ff;
        content: "\e804";
        top: -2px;
        left: -36px;
        font-family: nf-icon;
        font-size: 28px
    }

    .ui-binary-input input[type=checkbox]:disabled + label:after {
        color: #dcdcdc
    }

    .nfTextField {
        box-sizing: border-box;
        font-size: 16px;
        border: solid 1px #8c8c8c;
        border-radius: 2px;
        display: block;
        appearance: none;
        width: 100%;
        color: #000;
        padding: 10px 11px;
        height: 44px
    }

    .nfTextField:invalid,
    .nfTextField:valid {
        box-shadow: none
    }

    .nfTextField:focus {
        border-color: #0071eb;
        outline: 0
    }

    .nfTextField:disabled {
        color: #a6a6a6;
        border-color: #ccc
    }

    .nfInput {
        max-width: 500px;
        position: relative
    }

    .nfInput .nfInputPlacement {
        position: relative
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
        transition: font .1s ease, top .1s ease, transform .1s ease;
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

    .nfInput .nfTextField:focus + .placeLabel {
        top: 4px;
        font-size: 11px;
        transform: translateY(0)
    }

    .nfInput .nfTextField:-webkit-autofill + .placeLabel {
        top: 4px;
        font-size: 11px;
        transform: translateY(0)
    }

    .nfEmailPhoneControls {
        position: relative
    }

    .nfPasswordInput {
        position: relative;
        z-index: 0
    }

    .nfPasswordInput .nfTextField {
        background: 0 0
    }

    .nfPasswordControls {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        background: #fff
    }

    .nfPasswordControls > label {
        -webkit-box-flex: 1;
        -webkit-flex-grow: 1;
        -moz-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1
    }

    .nfPasswordHasToggle .nfPasswordControls .nfPasswordToggle,
    .nfPasswordHasToggle .nfPasswordControls .nfTextField {
        border: 0;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
        height: 46px
    }

    .nfPasswordToggle {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        color: #8c8c8c;
        font-size: 14px;
        border: 0;
        background: 0 0;
        -webkit-box-flex: 0;
        -webkit-flex-grow: 0;
        -moz-box-flex: 0;
        -ms-flex-positive: 0;
        flex-grow: 0;
        -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
        flex-shrink: 0
    }

    .btn {
        display: inline-block;
        text-decoration: none;
        line-height: 1em;
        vertical-align: middle;
        cursor: pointer;
        font-weight: 400;
        letter-spacing: .1px;
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
        border: 0;
        position: relative;
        color: #000;
        background-color: #e6e6e6;
        background-image: linear-gradient(to bottom, #e6e6e6, #ddd);
        -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .2);
        -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, .2);
        box-shadow: 0 1px 0 rgba(0, 0, 0, .2)
    }

    .btn:hover {
        text-decoration: none;
        background: #eaeaea;
        -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .2);
        -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, .2);
        box-shadow: 0 1px 0 rgba(0, 0, 0, .2)
    }

    .btn:active {
        background: #c2c2c2
    }

    .btn-submit {
        color: #fff;
        background-color: #0080ff;
        background-image: linear-gradient(to bottom, #0080ff, #0277ec);
        -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .55);
        -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, .55);
        box-shadow: 0 1px 0 rgba(0, 0, 0, .55)
    }

    .btn-submit:hover {
        background: #2490fd;
        -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .55);
        -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, .55);
        box-shadow: 0 1px 0 rgba(0, 0, 0, .55)
    }

    .btn-submit:active {
        background: #0166c9
    }

    .btn {
        position: relative;
        font-size: 1em;
        padding: 25px 2em;
        min-width: 74px;
        min-height: 50px;
        margin: .5em .5em .5em 0
    }

    @media only screen and (max-width: 500px) {
        .btn {
            width: 100%;
            margin: .5em auto
        }
    }

    .btn.btn-small {
        display: block;
        width: 100%;
        padding: 0;
        margin: .5em auto;
        line-height: 50px
    }

    @media only screen and (min-width: 500px) {
        .btn.btn-small {
            display: inline-block;
            font-size: 13px;
            min-width: 98px;
            min-height: 37px;
            margin-right: .5em;
            padding: 12px 1em;
            width: auto;
            line-height: 1em
        }
    }

    .login-input {
        padding-bottom: 24px
    }

    .login-form {
        margin-bottom: 10px
    }

    .login-button.btn {
        width: 100%;
        background: #e50914
    }

    .login-button.btn:disabled {
        background: #808080
    }

    @media only screen and (min-width: 500px) {
        .login-button.btn {
            padding: 16px;
            font-size: 18px
        }
    }

    @media only screen and (min-width: 360px) {
        .login-button.btn {
            width: 100%;
            max-width: 100%
        }
    }

    .hybrid-login-form {
        background-color: rgba(0, 0, 0, .75);
        border-radius: 4px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin: 0;
        min-height: 515px;
        padding: 20px 0 30px;
        width: 100%
    }

    .hybrid-login-form.hybrid-login-form-signup {
        min-height: 550px
    }

    @media only screen and (min-width: 740px) {
        .hybrid-login-form {
            min-height: 625px;
            padding: 60px 68px 40px;
            margin-bottom: 90px
        }

        .hybrid-login-form.hybrid-login-form-signup {
            min-height: 540px
        }
    }

    .hybrid-login-form .hybrid-login-form-main {
        flex-grow: 1
    }

    .hybrid-login-form h1 {
        color: #fff;
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 28px
    }

    .hybrid-login-form .nfInput {
        max-width: 100%
    }

    .hybrid-login-form .nfTextField {
        border-radius: 4px;
        border: 0;
        color: #fff;
        height: 50px;
        line-height: 50px;
        padding: 16px 20px 0
    }

    .hybrid-login-form .login-input {
        padding-bottom: 16px
    }

    .hybrid-login-form .placeLabel {
        left: 20px
    }

    .hybrid-login-form .nfTextField:-webkit-autofill + .placeLabel {
        color: #000;
        top: 7px
    }

    .hybrid-login-form .nfTextField:focus + .placeLabel {
        top: 7px
    }

    .hybrid-login-form .login-input-static .nfTextField + .placeLabel {
        top: 7px;
        font-size: 11px;
        transform: translateY(0)
    }

    .hybrid-login-form .nfEmailPhoneInError .nfEmailPhoneControls,
    .hybrid-login-form .nfPasswordInError .nfPasswordControls {
        position: relative
    }

    .hybrid-login-form .nfEmailPhoneInError .nfEmailPhoneControls::after,
    .hybrid-login-form .nfPasswordInError .nfPasswordControls::after {
        border-bottom: 2px solid #e87c03;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        bottom: 0;
        content: '';
        display: block;
        height: 6px;
        left: 0;
        pointer-events: none;
        position: absolute;
        width: 100%
    }

    .hybrid-login-form .nfEmailPhoneControls {
        border-radius: 4px;
        border: 0
    }

    .hybrid-login-form .nfEmailPhoneControls .nfTextField {
        background: #333
    }

    .hybrid-login-form .nfEmailPhoneControls .nfTextField:focus {
        background: #454545
    }

    .hybrid-login-form .nfEmailPhoneControls .nfTextField::-ms-clear {
        color: #8c8c8c;
        margin-top: -15px
    }

    .hybrid-login-form .nfEmailPhoneControls.nfEmailPhoneHasSelector .nfTextField {
        padding-right: 88px
    }

    .hybrid-login-form .nfPasswordControls {
        border-radius: 4px;
        border: 0;
        background: #333
    }

    .hybrid-login-form .nfPasswordControls .nfTextField {
        height: 50px
    }

    .hybrid-login-form .nfPasswordControls .nfTextField::-ms-clear,
    .hybrid-login-form .nfPasswordControls .nfTextField::-ms-reveal {
        color: #8c8c8c;
        margin-top: -15px
    }

    .hybrid-login-form .nfPasswordControls .nfPasswordToggle {
        height: 50px;
        padding: 0 12px;
        display: none
    }

    .hybrid-login-form .nfPasswordHasToggle .nfPasswordControls {
        background: #454545
    }

    .hybrid-login-form .nfPasswordHasToggle .nfPasswordControls .nfTextField {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        padding-right: 0
    }

    .hybrid-login-form .nfPasswordHasToggle .nfPasswordControls .nfTextField:-webkit-autofill {
        padding-right: 20px
    }

    .hybrid-login-form .nfPasswordHasToggle .nfPasswordControls .nfPasswordToggle {
        display: block
    }

    .hybrid-login-form .login-button {
        border-radius: 4px;
        font-size: 16px;
        font-weight: 700;
        margin: 24px 0 12px
    }

    .hybrid-login-form .hybrid-login-form-help {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex
    }

    .hybrid-login-form .login-remember-me {
        flex-grow: 1;
        padding-left: 20px
    }

    .hybrid-login-form .login-remember-me input[type=checkbox] + label {
        padding: 0
    }

    .hybrid-login-form .login-remember-me input[type=checkbox] + label::before {
        background: #737373;
        border-radius: 2px;
        border: 0;
        height: 16px;
        left: -20px;
        width: 16px
    }

    .hybrid-login-form .login-remember-me input[type=checkbox]:active + label::before,
    .hybrid-login-form .login-remember-me input[type=checkbox]:focus + label::before {
        background: #e6e6e6;
        box-shadow: none
    }

    .hybrid-login-form .login-remember-me input[type=checkbox]:checked + label::after {
        color: #000;
        font-size: 18px;
        left: -21px;
        top: 0
    }

    .hybrid-login-form .login-remember-me-label-text {
        color: #b3b3b3;
        font-size: 13px;
        font-weight: 500
    }

    .hybrid-login-form .login-help-link {
        cursor: pointer;
        color: #b3b3b3;
        flex: 0 0 1;
        font-size: 13px;
        font-weight: 500;
        padding-top: 2px
    }

    .hybrid-login-form .hybrid-login-form-other {
        flex: 0 0 1
    }

    .hybrid-login-form .facebookForm .btn-submit {
        margin-top: 16px;
        min-height: 0
    }

    .hybrid-login-form .login-signup-now {
        color: #737373;
        font-size: 16px;
        font-weight: 500;
        margin-top: 16px
    }

    .hybrid-login-form .login-signup-now a {
        color: #fff
    }

    .errors {
        list-style-type: none;
        padding: 10px;
        margin: 0;
        border: 2px solid #be6283;
        color: #be6283;
        background: rgba(190, 98, 131, 0.3);
    }

    .success {
        list-style-type: none;
        padding: 10px;
        margin: 0;
        border: 2px solid #33cccc;
        color: #33cccc;
        background: rgba(98, 190, 131, 0.3);
    }
</style>
