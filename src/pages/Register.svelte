<script>
  import * as api from '../api';
  import { validateEmail } from '../utils.js';

  let name = '';
  let email = '';
  let errors = {};
  let authSuccess = '';
  let isLoading = false;

  let passwordInput;

  let showPasswordToggle = false;
  let showPassword = false;
  let hasTextName = false;
  let hasTextEmail = false;
  let hasTextPswd = false;

  function onSubmit() {
    errors = [];
    const password = passwordInput.value;

    if (name.length === 0) {
      errors.push('Name should not be empty');
    }
    if (email.length === 0) {
      errors.push('Email should not be empty');
    } else if (!validateEmail(email)) {
      errors.push('Email is not correct.');
    }

    if (password.length === 0) {
      errors.push('Password should not be empty');
    }

    if (Object.keys(errors).length === 0) {
      isLoading = true;
      api.register({ name, email, password }).then(async (response) => {
        // Handle errors here
        if (response.ok) {
          const body = await response.json();
          if ('response' in body && body.response === 'OK') {
            authSuccess = 'Account successfully created!';
          } else if ('error' in body) {
            if (body.error === 'AccountAlreadyExistsError') {
              errors.push('Un compte est déjà enregistré avec cette addresse mail !');
            } else if (body.error === 'IncorrectEmailError') {
              errors.push('Email is not correct.');
            }
          } else {
            errors.push('A problem happened');
          }
        } else if (response.status === 400) {
          errors.push('Bad Request');
        } else if (response.status === 500) {
          errors.push('Internal Server Error: could not create a new account');
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
            <h1>Créer un compte</h1>
            <form on:submit|preventDefault={onSubmit}>
                <div class="nfInput nfEmailPhoneInput login-input login-input-email">
                    <div class="nfInputPlacement">
                        <div class="nfEmailPhoneControls">
                            <input autocomplete="name" bind:value={name} class="nfTextField" class:hasText={hasTextName}
                                   on:focus={() => { hasTextName = true; }}
                                   on:blur={() => { if (document.getElementById('userLoginName').value === '') { hasTextName = false; } else { hasTextName = true; } }}
                                   id="userLoginName"
                                   name="userLoginName" tabindex="0" type="text"/>
                            <label class="placeLabel" for="id_userLoginId">Nom complet</label>
                        </div>
                    </div>
                </div>
                <div class="nfInput nfEmailPhoneInput login-input login-input-email">
                    <div class="nfInputPlacement">
                        <div class="nfEmailPhoneControls">
                            <input autocomplete="email" bind:value={email} class="nfTextField"
                                   class:hasText={hasTextEmail} on:focus={() => { hasTextEmail = true; }}
                                   on:blur={() => { if (document.getElementById('id_userLoginId').value === '') { hasTextEmail = false; } else { hasTextEmail = true; } }}
                                   id="id_userLoginId"
                                   name="userLoginId" tabindex="0" type="text"/>
                            <label class="placeLabel" for="id_userLoginId">E-mail</label>
                        </div>
                    </div>
                </div>
                <div class="nfInput nfPasswordInput login-input login-input-password"
                     class:nfPasswordHasToggle={showPasswordToggle}
                     id="pasw_control">
                    <div class="nfInputPlacement">
                        <div class="nfPasswordControls">
                            <input autocomplete="password" bind:this={passwordInput}
                                   class="nfTextField" class:hasText={hasTextPswd}
                                   on:focus={() => { hasTextPswd = true; }}
                                   on:blur={() => { if (document.getElementById('passwordInput').value === '') { hasTextPswd = false; } else { hasTextPswd = true; } }}
                                   id="passwordInput" name="password"
                                   on:blur={() => { setTimeout(() => { showPasswordToggle = false; }, 100); }}
                                   on:focus={() => { setTimeout(() => { showPasswordToggle = true; }, 100); }}
                                   tabindex="0"
                                   type={showPassword ? 'text' : 'password'}/>
                            <label class="placeLabel" for="passwordInput">Mot de passe</label>
                            <button class="nfPasswordToggle" id="id_password_toggle"
                                    on:click={() => { showPassword = !showPassword; document.getElementById('passwordInput').focus(); }}
                                    style:display={showPasswordToggle ? 'block' : 'none'}
                                    title="Afficher le mot de passe"
                                    type="button">{showPassword
                                ? 'MASQUER'
                                : 'AFFICHER'}
                            </button>
                        </div>
                    </div>
                </div>
                {#if isLoading}
                    <button value="disabled" disabled class="btn login-button btn-submit btn-small" type="submit"
                            tabindex="0">Creating account...
                    </button>
                {:else}
                    <button class="btn login-button btn-submit btn-small" type="submit" autoComplete="off"
                            tabindex="0">Create account
                    </button>
                {/if}

                {#if errors.length > 0}
                    <ul class="errors">
                        {#each errors as error}
                            <li>{error}</li>
                        {/each}
                    </ul>
                {/if}
                {#if authSuccess === 'Account successfully created!'}
                    <ul class="success">
                        <li>{authSuccess}</li>
                    </ul>
                {/if}
            </form>
        </div>
        <div class="hybrid-login-form-other">
            <div class="login-signup-now">Vous avez déjà un compte ?
                <a class=" " href="#/login" target="_self">Connectez-vous</a>
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

    .nfPasswordInput .nfTextField::-webkit-credentials-auto-fill-button {
        margin-top: -11px;
        background-color: #8c8c8c;
    }

    .nfPasswordInput .nfTextField::-webkit-caps-lock-indicator {
        width: 14px;
        height: 14px;
        margin: 6px 2px 0 3px;
        content: "";
        -webkit-user-select: none;
        user-select: none;
        background-color: #8c8c8c;
        -webkit-mask-image: url("data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"17\" height=\"17\"><path fill=\"black\" d=\"M12.5 0.5A 4 4 0 0 1 16.5 4.5L 16.5 12.5A 4 4 0 0 1 12.5 16.5L 4.5 16.5A 4 4 0 0 1 0.5 12.5L 0.5 4.5A 4 4 0 0 1 4.5 0.5L 12.5 0.5M 8.5 2L 4 7L 6.25 7L 6.25 10.25L 10.75 10.25L 10.75 7L 13 7L 8.5 2M 10.75 12L 6.25 12L 6.25 14.25L 10.75 14.25L 10.75 12\"/></svg>");
        mask-image: url("data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"17\" height=\"17\"><path fill=\"black\" d=\"M12.5 0.5A 4 4 0 0 1 16.5 4.5L 16.5 12.5A 4 4 0 0 1 12.5 16.5L 4.5 16.5A 4 4 0 0 1 0.5 12.5L 0.5 4.5A 4 4 0 0 1 4.5 0.5L 12.5 0.5M 8.5 2L 4 7L 6.25 7L 6.25 10.25L 10.75 10.25L 10.75 7L 13 7L 8.5 2M 10.75 12L 6.25 12L 6.25 14.25L 10.75 14.25L 10.75 12\"/></svg>");
        -webkit-mask-size: 14px 14px;
        mask-size: 14px 14px;
        -webkit-appearance: none;
        appearance: none;
    }

    .nfPasswordInput .nfTextField::-ms-clear,
    .nfPasswordInput .nfTextField::-ms-reveal {
        width: 24px;
        height: 24px;
        margin-top: -10px;
        color: #8c8c8c;
        background: 0 0;
    }

    .nfPasswordControls {
        display: flex;
        background: #fff;
    }

    .nfPasswordControls > label {
        flex-grow: 1;
    }

    .nfPasswordHasToggle .nfPasswordControls .nfPasswordToggle,
    .nfPasswordHasToggle .nfPasswordControls .nfTextField {
        height: 46px;
        border: 0;
        border-radius: 0;
    }

    .nfPasswordToggle {
        font-size: 14px;
        flex-grow: 0;
        flex-shrink: 0;
        color: #8c8c8c;
        border: 0;
        background: 0 0;
        appearance: none;
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

    a {
        text-decoration: none;
        color: #0080ff;
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

    a {
        background-color: transparent;
    }

    a:active,
    a:hover {
        outline: 0;
    }

    h1 {
        font-size: 2em;
        margin: .67em 0;
    }

    button,
    input {
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

    button[disabled] {
        cursor: default;
    }

    button::-moz-focus-inner,
    input::-moz-focus-inner {
        padding: 0;
        border: 0;
    }

    input {
        line-height: normal;
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
        margin: 0 0 10px 0;
        padding: 0;
    }

    @media only screen and (min-width: 740px) {
        h1 {
            margin-bottom: 20px;
        }
    }

    .login-content {
        padding-top: 20px;
        background-color: #f3f3f3;
    }

    @media only screen and (min-width: 740px) {
        .login-content {
            padding: 40px;
        }
    }

    @media only screen and (min-width: 500px) {
        .login-content {
            min-width: 380px;
        }
    }

    .login-body {
        color: #333;
    }

    @media only screen and (min-width: 740px) {
        .login-body {
            max-width: 450px;
            margin: 0 auto;
            background-color: transparent;
        }

        .login-body:before {
            display: block;
            height: 2rem;
            content: "";
        }

        .login-body:after {
            display: block;
            height: 2rem;
            content: "";
        }
    }

    .nfTextField {
        font-size: 16px;
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 44px;
        padding: 10px 11px;
        color: #000;
        border: solid 1px #8c8c8c;
        border-radius: 2px;
        appearance: none;
    }

    .nfTextField:invalid,
    .nfTextField:valid {
        box-shadow: none;
    }

    .nfTextField:focus {
        border-color: #0071eb;
        outline: 0;
    }

    .nfTextField:disabled {
        color: #a6a6a6;
        border-color: #ccc;
    }

    .nfInput {
        position: relative;
        max-width: 500px;
    }

    .nfInput .nfInputPlacement {
        position: relative;
    }

    .nfInput .nfInputPlacement.showInvalidIcon .nfTextField,
    .nfInput .nfInputPlacement.showValidIcon .nfTextField {
        padding-right: 40px;
    }

    .nfInput .placeLabel {
        font-size: 14px;
        position: absolute;
        top: 50%;
        left: 10px;
        transition: font .1s ease, top .1s ease, transform .1s ease;
        transform: translateY(-50%);
        color: #8c8c8c;
    }

    @media only screen and (min-width: 740px) {
        .nfInput .placeLabel {
            font-size: 16px;
        }
    }

    .nfInput .nfTextField {
        width: 100%;
        height: 48px;
        padding: 10px 10px 0;
    }

    .nfInput .hasText + .placeLabel,
    .nfInput .nfTextField:focus + .placeLabel {
        font-size: 11px;
        top: 4px;
        transform: translateY(0);
    }

    .nfInput .nfTextField:-webkit-autofill + .placeLabel {
        font-size: 11px;
        top: 4px;
        transform: translateY(0);
    }

    .nfEmailPhoneControls {
        position: relative;
    }

    .nfEmailPhoneControls .nfTextField::-webkit-credentials-auto-fill-button {
        margin-top: -11px;
        background-color: #8c8c8c;
    }

    .nfEmailPhoneControls .nfTextField::-ms-clear {
        width: 24px;
        height: 24px;
        margin-top: -10px;
        color: #8c8c8c;
        background: 0 0;
    }

    .nfPasswordInput {
        position: relative;
        z-index: 0
    }

    .nfPasswordInput .nfTextField {
        background: 0 0
    }

    .nfPasswordInput .nfTextField::-webkit-credentials-auto-fill-button {
        margin-top: -11px;
        background-color: #8c8c8c;
    }

    .nfPasswordInput .nfTextField::-webkit-caps-lock-indicator {
        width: 14px;
        height: 14px;
        margin: 6px 2px 0 3px;
        content: "";
        user-select: none;
        background-color: #8c8c8c;
        mask-image: url("data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"17\" height=\"17\"><path fill=\"black\" d=\"M12.5 0.5A 4 4 0 0 1 16.5 4.5L 16.5 12.5A 4 4 0 0 1 12.5 16.5L 4.5 16.5A 4 4 0 0 1 0.5 12.5L 0.5 4.5A 4 4 0 0 1 4.5 0.5L 12.5 0.5M 8.5 2L 4 7L 6.25 7L 6.25 10.25L 10.75 10.25L 10.75 7L 13 7L 8.5 2M 10.75 12L 6.25 12L 6.25 14.25L 10.75 14.25L 10.75 12\"/></svg>");
        mask-size: 14px 14px;
        appearance: none;
    }

    .nfPasswordInput .nfTextField::-ms-clear,
    .nfPasswordInput .nfTextField::-ms-reveal {
        width: 24px;
        height: 24px;
        margin-top: -10px;
        color: #8c8c8c;
        background: 0 0;
    }

    .nfPasswordControls {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        background: #fff;
    }

    .nfPasswordControls > label {
        -webkit-flex-grow: 1;
        flex-grow: 1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -ms-flex-positive: 1;
    }

    .nfPasswordHasToggle .nfPasswordControls .nfPasswordToggle,
    .nfPasswordHasToggle .nfPasswordControls .nfTextField {
        height: 46px;
        border: 0;
        -moz-border-radius: 0;
        -webkit-border-radius: 0;
        border-radius: 0;
    }

    .nfPasswordToggle {
        font-size: 14px;
        flex-grow: 0;
        flex-shrink: 0;
        color: #8c8c8c;
        border: 0;
        background: 0 0;
        appearance: none;
    }

    .btn {
        font-weight: 400;
        line-height: 1em;
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        cursor: pointer;
        user-select: none;
        text-align: center;
        vertical-align: middle;
        text-decoration: none;
        letter-spacing: .1px;
        color: #000;
        border: 0;
        border-radius: 2px;
        background-color: #e6e6e6;
        background-image: linear-gradient(to bottom, #e6e6e6, #ddd);
        box-shadow: 0 1px 0 rgba(0, 0, 0, .2);
    }

    .btn:hover {
        text-decoration: none;
        background: #eaeaea;
        box-shadow: 0 1px 0 rgba(0, 0, 0, .2);
    }

    .btn:active {
        background: #c2c2c2;
    }

    .btn-submit {
        color: #fff;
        background-color: #0080ff;
        background-image: linear-gradient(to bottom, #0080ff, #0277ec);
        box-shadow: 0 1px 0 rgba(0, 0, 0, .55);
    }

    .btn-submit:hover {
        background: #2490fd;
        box-shadow: 0 1px 0 rgba(0, 0, 0, .55);
    }

    .btn-submit:active {
        background: #0166c9;
    }

    .btn {
        font-size: 1em;
        position: relative;
        min-width: 74px;
        min-height: 50px;
        margin: .5em .5em .5em 0;
        padding: 25px 2em;
    }

    @media only screen and (max-width: 500px) {
        .btn {
            width: 100%;
            margin: .5em auto;
        }
    }

    .btn.btn-small {
        line-height: 50px;
        display: block;
        width: 100%;
        margin: .5em auto;
        padding: 0;
    }

    @media only screen and (min-width: 500px) {
        .btn.btn-small {
            font-size: 13px;
            line-height: 1em;
            display: inline-block;
            width: auto;
            min-width: 98px;
            min-height: 37px;
            margin-right: .5em;
            padding: 12px 1em;
        }
    }

    .login-input {
        padding-bottom: 24px;
    }

    .login-form {
        margin-bottom: 10px;
    }

    .login-button.btn {
        width: 100%;
        background: #e50914;
    }

    .login-button.btn:disabled {
        background: #808080;
    }

    @media only screen and (min-width: 500px) {
        .login-button.btn {
            font-size: 18px;
            padding: 16px;
        }
    }

    @media only screen and (min-width: 360px) {
        .login-button.btn {
            width: 100%;
            max-width: 100%
        }
    }

    .hybrid-login-form {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        min-height: 515px;
        margin: 0;
        padding: 20px 0 30px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .75);
    }

    .hybrid-login-form.hybrid-login-form-signup {
        min-height: 550px;
    }

    @media only screen and (min-width: 740px) {
        .hybrid-login-form {
            min-height: 625px;
            margin-bottom: 90px;
            padding: 60px 68px 40px;
        }

        .hybrid-login-form.hybrid-login-form-signup {
            min-height: 540px;
        }
    }

    .hybrid-login-form .hybrid-login-form-main {
        flex-grow: 1;
    }

    .hybrid-login-form h1 {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 28px;
        color: #fff;
    }

    .hybrid-login-form .nfInput {
        max-width: 100%;
    }

    .hybrid-login-form .nfTextField {
        line-height: 50px;
        height: 50px;
        padding: 16px 20px 0;
        color: #fff;
        border: 0;
        border-radius: 4px;
    }

    .hybrid-login-form .login-input {
        padding-bottom: 16px;
    }

    .hybrid-login-form .placeLabel {
        left: 20px;
    }

    .hybrid-login-form .nfTextField:-webkit-autofill + .placeLabel {
        top: 7px;
        color: #000;
    }

    .hybrid-login-form .nfTextField:focus + .placeLabel {
        top: 7px;
    }

    .hybrid-login-form .login-input-static .nfTextField + .placeLabel {
        font-size: 11px;
        top: 7px;
        transform: translateY(0);
    }

    .hybrid-login-form .nfEmailPhoneInError .nfEmailPhoneControls,
    .hybrid-login-form .nfPasswordInError .nfPasswordControls {
        position: relative;
    }

    .hybrid-login-form .nfEmailPhoneInError .nfEmailPhoneControls::after,
    .hybrid-login-form .nfPasswordInError .nfPasswordControls::after {
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 6px;
        content: "";
        pointer-events: none;
        border-bottom: 2px solid #e87c03;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .hybrid-login-form .nfEmailPhoneControls {
        border: 0;
        border-radius: 4px;
    }

    .hybrid-login-form .nfEmailPhoneControls .nfTextField {
        background: #333;
    }

    .hybrid-login-form .nfEmailPhoneControls .nfTextField:focus {
        background: #454545;
    }

    .hybrid-login-form .nfEmailPhoneControls .nfTextField::-webkit-credentials-auto-fill-button {
        margin-top: -14px;
        background-color: #8c8c8c;
    }

    .hybrid-login-form .nfEmailPhoneControls .nfTextField::-ms-clear {
        margin-top: -15px;
        color: #8c8c8c;
    }

    .hybrid-login-form .nfEmailPhoneControls.nfEmailPhoneHasSelector .nfTextField {
        padding-right: 88px;
    }

    .hybrid-login-form .nfPasswordControls {
        border: 0;
        border-radius: 4px;
        background: #333;
    }

    .hybrid-login-form .nfPasswordControls .nfTextField {
        height: 50px;
    }

    .hybrid-login-form .nfPasswordControls .nfTextField::-webkit-credentials-auto-fill-button {
        margin-top: -14px;
        background-color: #8c8c8c;
    }

    .hybrid-login-form .nfPasswordControls .nfTextField::-webkit-caps-lock-indicator {
        margin-top: 3px;
        background-color: #8c8c8c;
    }

    .hybrid-login-form .nfPasswordControls .nfTextField::-ms-clear,
    .hybrid-login-form .nfPasswordControls .nfTextField::-ms-reveal {
        margin-top: -15px;
        color: #8c8c8c;
    }

    .hybrid-login-form .nfPasswordControls .nfPasswordToggle {
        display: none;
        height: 50px;
        padding: 0 12px;
    }

    .hybrid-login-form .nfPasswordHasToggle .nfPasswordControls {
        background: #454545;
    }

    .hybrid-login-form .nfPasswordHasToggle .nfPasswordControls .nfTextField {
        padding-right: 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .hybrid-login-form .nfPasswordHasToggle .nfPasswordControls .nfTextField:-webkit-autofill {
        padding-right: 20px;
    }

    .hybrid-login-form .nfPasswordHasToggle .nfPasswordControls .nfPasswordToggle {
        display: block;
    }

    .hybrid-login-form .login-button {
        font-size: 16px;
        font-weight: 700;
        margin: 24px 0 12px;
        border-radius: 4px;
    }


    .hybrid-login-form .hybrid-login-form-other {
        flex: 0 0 1;
    }

    .hybrid-login-form .facebookForm .btn-submit {
        min-height: 0;
        margin-top: 16px;
    }

    .hybrid-login-form .login-signup-now {
        font-size: 16px;
        font-weight: 500;
        margin-top: 16px;
        color: #737373;
    }

    .hybrid-login-form .login-signup-now a {
        color: #fff;
    }

    .errors {
        margin: 0;
        padding: 10px;
        list-style-type: none;
        color: #be6283;
        border: 2px solid #be6283;
        background: rgba(190, 98, 131, 0.3);
    }

    .success {
        margin: 0;
        padding: 10px;
        list-style-type: none;
        color: #33cccc;
        border: 2px solid #33cccc;
        background: rgba(98, 190, 131, 0.3);
    }
</style>
  