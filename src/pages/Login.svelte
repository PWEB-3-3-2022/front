<div class="login-body">
    <div>
        <noscript>
            <div class="ui-message-container ui-message-error">
                <div class="ui-message-icon"></div>
                <div class="ui-message-contents">Il semble que JavaScript soit désactivé. Veuillez l'activer pour restaurer toutes les fonctionnalités de la page.</div>
            </div>
        </noscript>
        <div class="login-content login-form hybrid-login-form hybrid-login-form-signup">
            <div class="hybrid-login-form-main">
                <h1>S&#x27;identifier</h1>
                <form on:submit|preventDefault={handleSubmit}>
                    <div class="nfInput nfEmailPhoneInput login-input login-input-email">
                        <div class="nfInputPlacement">
                            <div class="nfEmailPhoneControls">
                                <label class="input_id" placeholder="">
                                    <input type="text" name="userLoginId" class="nfTextField" id="id_userLoginId" tabindex="0" autocomplete="email" dir="" bind:value={email} />
                                    <label for="id_userLoginId" class="placeLabel">E-mail</label>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div id="pasw_control" class="nfInput nfPasswordInput login-input login-input-password">
                        <div class="nfInputPlacement">
                            <div class="nfPasswordControls">
                                <label class="input_id" placeholder="">
                                    <input type="password" name="password" class="nfTextField" id="id_password" tabindex="0" autocomplete="password" dir="" bind:value={password} />
                                    <label for="id_password" class="placeLabel">Mot de passe</label>
                                </label>
                                <button id="id_password_toggle" type="button" class="nfPasswordToggle" title="Afficher le mot de passe">AFFICHER</button>
                            </div>
                        </div>
                    </div>
                    {#if isLoading}
                        <button value="disabled" disabled class="btn login-button btn-submit btn-small" type="submit" autoComplete="off" tabindex="0" >Logging in...</button>
                    {:else}
                        <button class="btn login-button btn-submit btn-small" type="submit" autoComplete="off" tabindex="0" >S&#x27;identifier</button>
                    {/if}
                    <div class="hybrid-login-form-help">
                        <div class="ui-binary-input login-remember-me">
                            <input type="checkbox" class="" name="rememberMe" id="bxid_rememberMe_true" value="true" tabindex="0" checked="" />
                            <label for="bxid_rememberMe_true"><span class="login-remember-me-label-text">Se souvenir de moi</span></label>
                            <div class="helper"></div>
                        </div>
                        <a class="link login-help-link" href="#/LoginHelp" target="_self">Besoin d&#x27;aide ?</a>
                    </div>
                    <input type="hidden" name="flow" value="websiteSignUp" /><input type="hidden" name="mode" value="login" /><input type="hidden" name="action" value="loginAction" />
                    <input type="hidden" name="withFields" value="rememberMe,nextPage,userLoginId,password,countryCode,countryIsoCode" />
                    <input type="hidden" name="authURL" value="1647434433622.2vFmHXgwSu/BS9wdI19FQ9meBkg=" /><input type="hidden" name="nextPage" value="" /><input type="hidden" name="showPassword" value="" />
                    <input type="hidden" name="countryCode" value="+33" /><input type="hidden" name="countryIsoCode" value="FR" />
                    {#if Object.keys(errors).length > 0}
                        <ul class="errors">
                        {#each Object.keys(errors) as field}
                            <li>{field}: {errors[field]}</li>
                        {/each}
                        </ul>
                    {/if}
                    {#if auth_success == "Successfully logged in!"}
                        <ul class="success">
                            <li>{auth_success}</li>
                        </ul>
                    {/if}
                </form>
            </div>
            <div class="hybrid-login-form-other">
                <form method="post" class="login-form" action="">
                    <input type="hidden" name="flow" value="websiteSignUp" /><input type="hidden" name="mode" value="login" /><input type="hidden" name="action" value="facebookLoginAction" />
                    <input type="hidden" name="withFields" value="rememberMe,nextPage,accessToken" /><input type="hidden" name="authURL" value="1647434433622.2vFmHXgwSu/BS9wdI19FQ9meBkg=" />
                    <input type="hidden" name="nextPage" value="" /><input type="hidden" name="showPassword" value="" /><input type="hidden" name="countryCode" value="+33" />
                    <input type="hidden" name="countryIsoCode" value="FR" /><input type="hidden" name="accessToken" value="" />
                </form>
                <div class="login-signup-now">Première visite sur TCflix ? <a class=" " target="_self" href="#/register">Inscrivez-vous</a>.</div>
            </div>
        </div>
    </div>
</div>

<style>
.nfPasswordInput {
 position:relative;
 z-index:0
}
.nfPasswordInput .nfTextField {
 background:0 0
}
.nfPasswordInput .nfTextField::-webkit-credentials-auto-fill-button {
 background-color:#8c8c8c;
 margin-top:-11px
}
.nfPasswordInput .nfTextField::-webkit-caps-lock-indicator {
 -webkit-mask-image:url("data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"17\" height=\"17\"><path fill=\"black\" d=\"M12.5 0.5A 4 4 0 0 1 16.5 4.5L 16.5 12.5A 4 4 0 0 1 12.5 16.5L 4.5 16.5A 4 4 0 0 1 0.5 12.5L 0.5 4.5A 4 4 0 0 1 4.5 0.5L 12.5 0.5M 8.5 2L 4 7L 6.25 7L 6.25 10.25L 10.75 10.25L 10.75 7L 13 7L 8.5 2M 10.75 12L 6.25 12L 6.25 14.25L 10.75 14.25L 10.75 12\"/></svg>");
 mask-image:url("data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"17\" height=\"17\"><path fill=\"black\" d=\"M12.5 0.5A 4 4 0 0 1 16.5 4.5L 16.5 12.5A 4 4 0 0 1 12.5 16.5L 4.5 16.5A 4 4 0 0 1 0.5 12.5L 0.5 4.5A 4 4 0 0 1 4.5 0.5L 12.5 0.5M 8.5 2L 4 7L 6.25 7L 6.25 10.25L 10.75 10.25L 10.75 7L 13 7L 8.5 2M 10.75 12L 6.25 12L 6.25 14.25L 10.75 14.25L 10.75 12\"/></svg>");
 -webkit-mask-size:14px 14px;
 mask-size:14px 14px;
 -webkit-user-select:none;
 user-select:none;
 -webkit-appearance:none;
 appearance:none;
 background-color:#8c8c8c;
 content:'';
 height:14px;
 margin:6px 2px 0 3px;
 width:14px
}
.nfPasswordInput .nfTextField::-ms-clear,
.nfPasswordInput .nfTextField::-ms-reveal {
 background:0 0;
 color:#8c8c8c;
 height:24px;
 margin-top:-10px;
 width:24px
}
.nfPasswordControls {
 display:-webkit-box;
 display:-webkit-flex;
 display:-moz-box;
 display:-ms-flexbox;
 display:flex;
 background:#fff
}
.nfPasswordControls>label {
 -webkit-box-flex:1;
 -webkit-flex-grow:1;
 -moz-box-flex:1;
 -ms-flex-positive:1;
 flex-grow:1
}
.nfPasswordHasToggle .nfPasswordControls .nfPasswordToggle,
.nfPasswordHasToggle .nfPasswordControls .nfTextField {
 border:0;
 -webkit-border-radius:0;
 -moz-border-radius:0;
 border-radius:0;
 height:46px
}
.nfPasswordToggle {
 -webkit-appearance:none;
 -moz-appearance:none;
 appearance:none;
 color:#8c8c8c;
 font-size:14px;
 border:0;
 background:0 0;
 -webkit-box-flex:0;
 -webkit-flex-grow:0;
 -moz-box-flex:0;
 -ms-flex-positive:0;
 flex-grow:0;
 -webkit-flex-shrink:0;
 -ms-flex-negative:0;
 flex-shrink:0
}
h1 {
 font-size:1.5em;
 color:#333;
 margin:0 0 .4em;
 font-weight:400
}
@media screen and (min-width:740px) {
 h1 {
  font-size:2.15em;
  margin:0 0 .55em
 }
}
a {
 text-decoration:none;
 color:#0080ff
}
a:hover {
 text-decoration:underline
}
ul {
 padding:0
}
ul>li {
 margin-left:1.1em;
 margin-bottom:5px;
 list-style-type:disc
}
a {
 background-color:transparent
}
a:active,
a:hover {
 outline:0
}
h1 {
 font-size:2em;
 margin:.67em 0
}
button,
input {
 color:inherit;
 font:inherit;
 margin:0
}
button {
 overflow:visible
}
button {
 text-transform:none
}
button {
 -webkit-appearance:button;
 cursor:pointer
}
button[disabled] {
 cursor:default
}
button::-moz-focus-inner,
input::-moz-focus-inner {
 border:0;
 padding:0
}
input {
 line-height:normal
}
input[type=checkbox] {
 -webkit-box-sizing:border-box;
 -moz-box-sizing:border-box;
 box-sizing:border-box;
 padding:0
}
@font-face {
 font-family:nf-icon;
 src:url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.eot);
 src:url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.eot?#iefix) format('embedded-opentype'),
 url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.woff) format('woff'),
 url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.ttf) format('truetype'),
 url(https://assets.nflxext.com/ffe/siteui/fonts/nf-icon-v1-93.svg#nf-icon-v1-93) format('svg');
 font-weight:400;
 font-style:normal
}
.login-remember-me {
 display:inline-block;
 margin-bottom:-5px
}
.login-remember-me input {
 margin-right:10px
}
.login-remember-me-label-text {
 font-size:14px
}
h1 {
 margin:0 0 10px 0;
 padding:0
}
@media only screen and (min-width:740px) {
 h1 {
  margin-bottom:20px
 }
}
.login-content {
 padding-top:20px;
 background-color:#f3f3f3
}
@media only screen and (min-width:740px) {
 .login-content {
  padding:40px
 }
}
@media only screen and (min-width:500px) {
 .login-content {
  min-width:380px
 }
}
.login-body {
 color:#333;
 margin:0 auto;
 padding:0 5%
}
@media only screen and (min-width:740px) {
 .login-body {
  margin:0 auto -236px;
  min-height:100vh;
  background-color:transparent;
  max-width:450px
 }
 .login-body:before {
  content:"";
  height:91px;
  display:block
 }
 .login-body:after {
  content:"";
  height:236px;
  display:block
 }
}
.ui-binary-input {
 position:relative;
 -webkit-box-sizing:border-box;
 -moz-box-sizing:border-box;
 box-sizing:border-box;
 padding-left:36px;
 -webkit-user-select:none;
 -moz-user-select:none;
 -ms-user-select:none;
 user-select:none;
 font-size:16px
}
.ui-binary-input input:disabled~.helper,
.ui-binary-input input[type=checkbox]:disabled+label {
 color:#b3b3b3
}
.ui-binary-input .helper {
 font-size:14px;
 line-height:1.3em;
 color:grey
}
.ui-binary-input input[type=checkbox] {
 position:absolute;
 top:0;
 left:0;
 opacity:0
}
.ui-binary-input input[type=checkbox]:focus+label::before {
 -webkit-box-shadow:0 0 5px 2px rgba(150,200,255,.6);
 -moz-box-shadow:0 0 5px 2px rgba(150,200,255,.6);
 box-shadow:0 0 5px 2px rgba(150,200,255,.6);
 border-color:grey
}
.ui-binary-input input[type=checkbox]+label {
 color:#333;
 position:relative;
 display:block;
 line-height:1.2;
 padding:6px 0
}
.ui-binary-input input[type=checkbox]+label:before {
 content:"";
 position:absolute;
 display:block;
 top:2px;
 left:-36px;
 padding:0;
 border:1px solid #b3b3b3;
 background-color:#fff
}
.ui-binary-input input[type=checkbox]+label:after {
 position:absolute
}
.ui-binary-input input[type=checkbox]+label:before {
 width:25px;
 height:25px
}
.ui-binary-input input[type=checkbox]:checked+label:after {
 color:#0080ff;
 content:"\e804";
 top:-2px;
 left:-36px;
 font-family:nf-icon;
 font-size:28px
}
.ui-binary-input input[type=checkbox]:disabled+label:after {
 color:#dcdcdc
}

.nfTextField {
 -webkit-box-sizing:border-box;
 -moz-box-sizing:border-box;
 box-sizing:border-box;
 font-size:16px;
 border:solid 1px #8c8c8c;
 -webkit-border-radius:2px;
 -moz-border-radius:2px;
 border-radius:2px;
 display:block;
 -webkit-appearance:none;
 -moz-appearance:none;
 appearance:none;
 width:100%;
 color:#000;
 padding:10px 11px;
 height:44px
}
.nfTextField:invalid,
.nfTextField:valid {
 -webkit-box-shadow:none;
 -moz-box-shadow:none;
 box-shadow:none
}
.nfTextField:focus {
 border-color:#0071eb;
 outline:0
}
.nfTextField:disabled {
 color:#a6a6a6;
 border-color:#ccc
}
.nfInput {
 max-width:500px;
 position:relative
}
.nfInput .nfInputPlacement {
 position:relative
}
.nfInput .nfInputPlacement.showInvalidIcon .nfTextField,
.nfInput .nfInputPlacement.showValidIcon .nfTextField {
 padding-right:40px
}
.nfInput .placeLabel {
 position:absolute;
 top:50%;
 left:10px;
 color:#8c8c8c;
 font-size:14px;
 -webkit-transition:font .1s ease,top .1s ease,-webkit-transform .1s ease;
 transition:font .1s ease,top .1s ease,-webkit-transform .1s ease;
 -o-transition:font .1s ease,top .1s ease,-o-transform .1s ease;
 -moz-transition:font .1s ease,top .1s ease,transform .1s ease,-moz-transform .1s ease;
 transition:font .1s ease,top .1s ease,transform .1s ease;
 transition:font .1s ease,top .1s ease,transform .1s ease,-webkit-transform .1s ease,-moz-transform .1s ease,-o-transform .1s ease;
 -webkit-transform:translateY(-50%);
 -moz-transform:translateY(-50%);
 -ms-transform:translateY(-50%);
 -o-transform:translateY(-50%);
 transform:translateY(-50%)
}
@media only screen and (min-width:740px) {
 .nfInput .placeLabel {
  font-size:16px
 }
}
.nfInput .nfTextField {
 height:48px;
 padding:10px 10px 0;
 width:100%
}
.nfInput .nfTextField:focus+.placeLabel {
 top:4px;
 font-size:11px;
 -webkit-transform:translateY(0);
 -moz-transform:translateY(0);
 -ms-transform:translateY(0);
 -o-transform:translateY(0);
 transform:translateY(0)
}
.nfInput .nfTextField:-webkit-autofill+.placeLabel {
 top:4px;
 font-size:11px;
 -webkit-transform:translateY(0);
 transform:translateY(0)
}
.nfEmailPhoneControls {
 position:relative
}
.nfEmailPhoneControls .nfTextField::-webkit-credentials-auto-fill-button {
 background-color:#8c8c8c;
 margin-top:-11px
}
.nfEmailPhoneControls .nfTextField::-ms-clear {
 background:0 0;
 color:#8c8c8c;
 height:24px;
 margin-top:-10px;
 width:24px
}
.nfPasswordInput {
 position:relative;
 z-index:0
}
.nfPasswordInput .nfTextField {
 background:0 0
}
.nfPasswordInput .nfTextField::-webkit-credentials-auto-fill-button {
 background-color:#8c8c8c;
 margin-top:-11px
}
.nfPasswordInput .nfTextField::-webkit-caps-lock-indicator {
 -webkit-mask-image:url("data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"17\" height=\"17\"><path fill=\"black\" d=\"M12.5 0.5A 4 4 0 0 1 16.5 4.5L 16.5 12.5A 4 4 0 0 1 12.5 16.5L 4.5 16.5A 4 4 0 0 1 0.5 12.5L 0.5 4.5A 4 4 0 0 1 4.5 0.5L 12.5 0.5M 8.5 2L 4 7L 6.25 7L 6.25 10.25L 10.75 10.25L 10.75 7L 13 7L 8.5 2M 10.75 12L 6.25 12L 6.25 14.25L 10.75 14.25L 10.75 12\"/></svg>");
 mask-image:url("data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"17\" height=\"17\"><path fill=\"black\" d=\"M12.5 0.5A 4 4 0 0 1 16.5 4.5L 16.5 12.5A 4 4 0 0 1 12.5 16.5L 4.5 16.5A 4 4 0 0 1 0.5 12.5L 0.5 4.5A 4 4 0 0 1 4.5 0.5L 12.5 0.5M 8.5 2L 4 7L 6.25 7L 6.25 10.25L 10.75 10.25L 10.75 7L 13 7L 8.5 2M 10.75 12L 6.25 12L 6.25 14.25L 10.75 14.25L 10.75 12\"/></svg>");
 -webkit-mask-size:14px 14px;
 mask-size:14px 14px;
 -webkit-user-select:none;
 user-select:none;
 -webkit-appearance:none;
 appearance:none;
 background-color:#8c8c8c;
 content:'';
 height:14px;
 margin:6px 2px 0 3px;
 width:14px
}
.nfPasswordInput .nfTextField::-ms-clear,
.nfPasswordInput .nfTextField::-ms-reveal {
 background:0 0;
 color:#8c8c8c;
 height:24px;
 margin-top:-10px;
 width:24px
}
.nfPasswordControls {
 display:-webkit-box;
 display:-webkit-flex;
 display:-moz-box;
 display:-ms-flexbox;
 display:flex;
 background:#fff
}
.nfPasswordControls>label {
 -webkit-box-flex:1;
 -webkit-flex-grow:1;
 -moz-box-flex:1;
 -ms-flex-positive:1;
 flex-grow:1
}
.nfPasswordHasToggle .nfPasswordControls .nfPasswordToggle,
.nfPasswordHasToggle .nfPasswordControls .nfTextField {
 border:0;
 -webkit-border-radius:0;
 -moz-border-radius:0;
 border-radius:0;
 height:46px
}
.nfPasswordToggle {
 -webkit-appearance:none;
 -moz-appearance:none;
 appearance:none;
 color:#8c8c8c;
 font-size:14px;
 border:0;
 background:0 0;
 -webkit-box-flex:0;
 -webkit-flex-grow:0;
 -moz-box-flex:0;
 -ms-flex-positive:0;
 flex-grow:0;
 -webkit-flex-shrink:0;
 -ms-flex-negative:0;
 flex-shrink:0
}
.btn {
 display:inline-block;
 text-decoration:none;
 line-height:1em;
 vertical-align:middle;
 cursor:pointer;
 font-weight:400;
 letter-spacing:.1px;
 -webkit-border-radius:2px;
 -moz-border-radius:2px;
 border-radius:2px;
 -webkit-user-select:none;
 -moz-user-select:none;
 -ms-user-select:none;
 user-select:none;
 text-align:center;
 -webkit-box-sizing:border-box;
 -moz-box-sizing:border-box;
 box-sizing:border-box;
 border:0;
 position:relative;
 color:#000;
 background-color:#e6e6e6;
 background-image:-webkit-gradient(linear,left top,left bottom,from(#e6e6e6),to(#ddd));
 background-image:-webkit-linear-gradient(top,#e6e6e6,#ddd);
 background-image:-moz- oldlinear-gradient(top,#e6e6e6,#ddd);
 background-image:-o-linear-gradient(top,#e6e6e6,#ddd);
 background-image:linear-gradient(to bottom,#e6e6e6,#ddd);
 -webkit-box-shadow:0 1px 0 rgba(0,0,0,.2);
 -moz-box-shadow:0 1px 0 rgba(0,0,0,.2);
 box-shadow:0 1px 0 rgba(0,0,0,.2)
}
.btn:hover {
 text-decoration:none;
 background:#eaeaea;
 -webkit-box-shadow:0 1px 0 rgba(0,0,0,.2);
 -moz-box-shadow:0 1px 0 rgba(0,0,0,.2);
 box-shadow:0 1px 0 rgba(0,0,0,.2)
}
.btn:active {
 background:#c2c2c2
}
.btn-submit {
 color:#fff;
 background-color:#0080ff;
 background-image:-webkit-gradient(linear,left top,left bottom,from(#0080ff),to(#0277ec));
 background-image:-webkit-linear-gradient(top,#0080ff,#0277ec);
 background-image:-moz- oldlinear-gradient(top,#0080ff,#0277ec);
 background-image:-o-linear-gradient(top,#0080ff,#0277ec);
 background-image:linear-gradient(to bottom,#0080ff,#0277ec);
 -webkit-box-shadow:0 1px 0 rgba(0,0,0,.55);
 -moz-box-shadow:0 1px 0 rgba(0,0,0,.55);
 box-shadow:0 1px 0 rgba(0,0,0,.55)
}
.btn-submit:hover {
 background:#2490fd;
 -webkit-box-shadow:0 1px 0 rgba(0,0,0,.55);
 -moz-box-shadow:0 1px 0 rgba(0,0,0,.55);
 box-shadow:0 1px 0 rgba(0,0,0,.55)
}
.btn-submit:active {
 background:#0166c9
}
.btn {
 position:relative;
 font-size:1em;
 padding:24.5px 2em;
 min-width:74px;
 min-height:50px;
 margin:.5em .5em .5em 0
}
@media only screen and (max-width:500px) {
 .btn {
  width:100%;
  margin:.5em auto
 }
}
.btn.btn-small {
 display:block;
 width:100%;
 padding:0;
 margin:.5em auto;
 line-height:50px
}
@media only screen and (min-width:500px) {
 .btn.btn-small {
  display:inline-block;
  font-size:13px;
  padding:12px 2em;
  min-width:98px;
  min-height:37px;
  margin-right:.5em;
  padding-left:1em;
  padding-right:1em;
  width:auto;
  line-height:1em
 }
}
.ui-message-container {
 display:table;
 width:100%;
 margin:10px 0;
 -webkit-border-radius:2px;
 -moz-border-radius:2px;
 border-radius:2px
}
.ui-message-contents {
 display:table-cell;
 vertical-align:middle;
 padding:20px 10px;
 color:#fff
}
.ui-message-icon {
 display:table-cell;
 vertical-align:middle;
 color:#fff;
 width:53px
}
.ui-message-icon:before {
 font-family:nf-icon;
 line-height:1.5em;
 padding-left:20px;
 font-size:1.5em
}
.ui-message-error {
 background:#ffa00a
}
.ui-message-error>.ui-message-icon:before {
 content:'\e805'
}
.login-input {
 padding-bottom:24px
}
.login-form {
 margin-bottom:10px
}
.login-button.btn {
 width:100%;
 background:#e50914
}
.login-button.btn:disabled {
 background:#808080
}
@media only screen and (min-width:500px) {
 .login-button.btn {
  padding:16px;
  font-size:18px
 }
}
@media only screen and (min-width:360px) {
 .login-button.btn {
  width:100%;
  max-width:100%
 }
}
.ui-message-container {
 background:#999
}
.ui-message-icon {
 display:none
}
.hybrid-login-form {
 background-color:rgba(0,0,0,.75);
 -webkit-border-radius:4px;
 -moz-border-radius:4px;
 border-radius:4px;
 -webkit-box-sizing:border-box;
 -moz-box-sizing:border-box;
 box-sizing:border-box;
 display:-webkit-box;
 display:-webkit-flex;
 display:-moz-box;
 display:-ms-flexbox;
 display:flex;
 -webkit-box-orient:vertical;
 -webkit-box-direction:normal;
 -webkit-flex-direction:column;
 -moz-box-orient:vertical;
 -moz-box-direction:normal;
 -ms-flex-direction:column;
 flex-direction:column;
 margin:0;
 min-height:515px;
 padding:20px 0 30px;
 width:100%
}
.hybrid-login-form.hybrid-login-form-signup {
 min-height:550px
}
@media only screen and (min-width:740px) {
 .hybrid-login-form {
  min-height:625px;
  padding:60px 68px 40px;
  margin-bottom:90px
 }
 .hybrid-login-form.hybrid-login-form-signup {
  min-height:660px
 }
}
.hybrid-login-form .hybrid-login-form-main {
 -webkit-box-flex:1;
 -webkit-flex-grow:1;
 -moz-box-flex:1;
 -ms-flex-positive:1;
 flex-grow:1
}
.hybrid-login-form h1 {
 color:#fff;
 font-size:32px;
 font-weight:700;
 margin-bottom:28px
}
.hybrid-login-form .nfInput {
 max-width:100%
}
.hybrid-login-form .nfTextField {
 -webkit-border-radius:4px;
 -moz-border-radius:4px;
 border-radius:4px;
 border:0;
 color:#fff;
 height:50px;
 line-height:50px;
 padding:16px 20px 0
}
.hybrid-login-form .login-input {
 padding-bottom:16px
}
.hybrid-login-form .placeLabel {
 left:20px
}
.hybrid-login-form .nfTextField:-webkit-autofill+.placeLabel {
 color:#000;
 top:7px
}
.hybrid-login-form .nfTextField:focus+.placeLabel {
 top:7px
}
.hybrid-login-form .login-input-static .nfTextField+.placeLabel {
 top:7px;
 font-size:11px;
 -webkit-transform:translateY(0);
 -moz-transform:translateY(0);
 -ms-transform:translateY(0);
 -o-transform:translateY(0);
 transform:translateY(0)
}
.hybrid-login-form .nfEmailPhoneInError .nfEmailPhoneControls,
.hybrid-login-form .nfPasswordInError .nfPasswordControls {
 position:relative
}
.hybrid-login-form .nfEmailPhoneInError .nfEmailPhoneControls::after,
.hybrid-login-form .nfPasswordInError .nfPasswordControls::after {
 border-bottom:2px solid #e87c03;
 -webkit-border-bottom-left-radius:4px;
 -moz-border-radius-bottomleft:4px;
 border-bottom-left-radius:4px;
 -webkit-border-bottom-right-radius:4px;
 -moz-border-radius-bottomright:4px;
 border-bottom-right-radius:4px;
 bottom:0;
 content:'';
 display:block;
 height:6px;
 left:0;
 pointer-events:none;
 position:absolute;
 width:100%
}
.hybrid-login-form .nfEmailPhoneControls {
 -webkit-border-radius:4px;
 -moz-border-radius:4px;
 border-radius:4px;
 border:0
}
.hybrid-login-form .nfEmailPhoneControls .nfTextField {
 background:#333
}
.hybrid-login-form .nfEmailPhoneControls .nfTextField:focus {
 background:#454545
}
.hybrid-login-form .nfEmailPhoneControls .nfTextField::-webkit-credentials-auto-fill-button {
 background-color:#8c8c8c;
 margin-top:-14px
}
.hybrid-login-form .nfEmailPhoneControls .nfTextField::-ms-clear {
 color:#8c8c8c;
 margin-top:-15px
}
.hybrid-login-form .nfEmailPhoneControls.nfEmailPhoneHasSelector .nfTextField {
 padding-right:88px
}
.hybrid-login-form .nfPasswordControls {
 -webkit-border-radius:4px;
 -moz-border-radius:4px;
 border-radius:4px;
 border:0;
 background:#333
}
.hybrid-login-form .nfPasswordControls .nfTextField {
 height:50px
}
.hybrid-login-form .nfPasswordControls .nfTextField::-webkit-credentials-auto-fill-button {
 background-color:#8c8c8c;
 margin-top:-14px
}
.hybrid-login-form .nfPasswordControls .nfTextField::-webkit-caps-lock-indicator {
 background-color:#8c8c8c;
 margin-top:3px
}
.hybrid-login-form .nfPasswordControls .nfTextField::-ms-clear,
.hybrid-login-form .nfPasswordControls .nfTextField::-ms-reveal {
 color:#8c8c8c;
 margin-top:-15px
}
.hybrid-login-form .nfPasswordControls .nfPasswordToggle {
 height:50px;
 padding:0 12px;
 display:none
}
.hybrid-login-form .nfPasswordHasToggle .nfPasswordControls {
 background:#454545
}
.hybrid-login-form .nfPasswordHasToggle .nfPasswordControls .nfTextField {
 -webkit-border-top-left-radius:4px;
 -moz-border-radius-topleft:4px;
 border-top-left-radius:4px;
 -webkit-border-bottom-left-radius:4px;
 -moz-border-radius-bottomleft:4px;
 border-bottom-left-radius:4px;
 padding-right:0
}
.hybrid-login-form .nfPasswordHasToggle .nfPasswordControls .nfTextField:-webkit-autofill {
 padding-right:20px
}
.hybrid-login-form .nfPasswordHasToggle .nfPasswordControls .nfPasswordToggle {
 display:block
}
.hybrid-login-form .login-button {
 -webkit-border-radius:4px;
 -moz-border-radius:4px;
 border-radius:4px;
 font-size:16px;
 font-weight:700;
 margin:24px 0 12px
}
.hybrid-login-form .hybrid-login-form-help {
 display:-webkit-box;
 display:-webkit-flex;
 display:-moz-box;
 display:-ms-flexbox;
 display:flex
}
.hybrid-login-form .login-remember-me {
 -webkit-box-flex:1;
 -webkit-flex-grow:1;
 -moz-box-flex:1;
 -ms-flex-positive:1;
 flex-grow:1;
 padding-left:20px
}
.hybrid-login-form .login-remember-me input[type=checkbox]+label {
 padding:0
}
.hybrid-login-form .login-remember-me input[type=checkbox]+label::before {
 background:#737373;
 -webkit-border-radius:2px;
 -moz-border-radius:2px;
 border-radius:2px;
 border:0;
 height:16px;
 left:-20px;
 width:16px
}
.hybrid-login-form .login-remember-me input[type=checkbox]:active+label::before,
.hybrid-login-form .login-remember-me input[type=checkbox]:focus+label::before {
 background:#e6e6e6;
 -webkit-box-shadow:none;
 -moz-box-shadow:none;
 box-shadow:none
}
.hybrid-login-form .login-remember-me input[type=checkbox]:checked+label::after {
 color:#000;
 font-size:18px;
 left:-21px;
 top:0
}
.hybrid-login-form .login-remember-me-label-text {
 color:#b3b3b3;
 font-size:13px;
 font-weight:500
}
.hybrid-login-form .login-help-link {
 cursor:pointer;
 color:#b3b3b3;
 -webkit-box-flex:0;
 -webkit-flex:0 0 1;
 -moz-box-flex:0;
 -ms-flex:0 0 1;
 flex:0 0 1;
 font-size:13px;
 font-weight:500;
 padding-top:2px
}
.hybrid-login-form .hybrid-login-form-other {
 -webkit-box-flex:0;
 -webkit-flex:0 0 1;
 -moz-box-flex:0;
 -ms-flex:0 0 1;
 flex:0 0 1
}
.hybrid-login-form .login-form {
 margin-bottom:0
}
.hybrid-login-form .facebookForm .btn-submit {
 margin-top:16px;
 min-height:0
}
.hybrid-login-form .login-signup-now {
 color:#737373;
 font-size:16px;
 font-weight:500;
 margin-top:16px
}
.hybrid-login-form .login-signup-now a {
 color:#fff
}
#appMountPoint .login-wrapper.isTvLogin .hybrid-login-form h1 {
 color:#000;
 margin-bottom:0
}
#appMountPoint .login-wrapper.isTvLogin .hybrid-login-form h1::before {
 background:url(https://assets.nflxext.com/ffe/siteui/login/images/Check_Icon.svg) no-repeat;
 content:'';
 display:block;
 height:45px;
 width:45px;
 margin:0 auto;
 text-align:center
}
#appMountPoint .login-wrapper.isTvLogin .hybrid-login-form .pageSubtitle span {
 display:block;
 color:#000;
 margin-top:5px;
 font-weight:400
}
#appMountPoint .login-wrapper.isTvLogin .hybrid-login-form .pageSubtitle span::before {
 background:url(https://assets.nflxext.com/ffe/siteui/login/images/TV_Icon.svg) no-repeat;
 content:'';
 display:inline-block;
 height:21px;
 width:21px;
 vertical-align:middle;
 margin:3px 6px 0 0
}
#appMountPoint .login-wrapper.isTvLogin .hybrid-login-form .login-help-link {
 font-weight:800;
 color:#0080ff;
 font-size:1rem
}
#appMountPoint .login-wrapper.isTvLogin .hybrid-login-form .hybrid-login-form-main {
 text-align:center
}
#appMountPoint .login-wrapper.isTvLogin .hybrid-login-form .hybrid-login-form-other .facebookForm .btn-submit {
 margin-left:auto;
 margin-right:auto
}
#appMountPoint .login-wrapper.isTvLogin .hybrid-login-form .hybrid-login-form-help .login-remember-me label {
 text-align:left
}
#appMountPoint .login-wrapper.isTvLogin .hybrid-login-form .hybrid-login-form-help .login-remember-me input[type=checkbox]+label::before {
 background:#b2b3b2
}
#appMountPoint .login-wrapper.isTvLogin .hybrid-login-form .hybrid-login-form-help .login-remember-me input[type=checkbox]:focus+label::before {
 background:#b2b3b2
}
#appMountPoint .login-wrapper.isTvLogin .hybrid-login-form .hybrid-login-form-help .login-remember-me input[type=checkbox]:checked+label::after {
 color:#fefffe
}
#appMountPoint .login-wrapper.isTvLogin .hybrid-login-form .login-signup-now a {
 color:#000;
 font-weight:600
}
#appMountPoint .login-wrapper.isTvLogin .nfEmailPhoneControls .nfTextField,
#appMountPoint .login-wrapper.isTvLogin .nfPasswordControls .nfTextField {
 background-color:#fff;
 color:#000
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

<script>
    let email = "";
    let password = "";
    let errors = {};
    let auth_success = "";
    let isLoading = false;
    const handleSubmit = () => {
        errors = {};
        if (email.length == 0) {
            errors.email = "Field should not be empty";
        }
        if (password.length == 0) {
            errors.password = "Field should not be empty";
        }
        
        if (Object.keys(errors).length === 0) {
            isLoading = true;
            fetch("http://localhost:3001/auth", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email, password: password})
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                //Handle errors here
                if (response.status == 400) {
                    errors.error = "Bad Request";
                } else if (response.status == 404) {
                    errors.error = "Cannot connect to auth server.";
                } else {
                    errors.error = "Error code "+response.status;
                }
                isLoading = false;
            })
            .then((responseJson) => {
                console.log("Checking : "+responseJson.check);
                if (responseJson.check == "NOPE") {
                    console.log("c'est pas bon");
                    errors.not_found = "Account not found";
                } else if (responseJson.check == "noice") {
                    console.log("okay");
                    auth_success = "Successfully logged in!";
                }
                isLoading = false;
            })
            .catch((error) => {
                if (error.message.includes("NetworkError")) {
                    errors.error = "Unable to reach auth server.";
                } else {
                    errors.error = error;
                } 
                isLoading = false;
            })
        }
    };

    window.addEventListener('load', () => {
        const password_box = document.querySelector('input[type = "password"]');
        const password_show = document.getElementById('id_password_toggle');
        const show_me = document.getElementById("id_password_toggle");
        const pswd_control = document.getElementById("pasw_control");
        password_box.addEventListener('focus', (event) => {
            password_show.style.display = "block";
            pswd_control.classList.add("nfPasswordHasToggle")
        }, true);
        password_box.addEventListener("focusout", () => {
            password_show.style.display = "none";
            pswd_control.classList.remove("nfPasswordHasToggle");
        }, true);
        show_me.addEventListener("click", () => {
            if (password_box.type == "password") {
                password_box.type = "text";
                show_me.textContent = "MASQUER";
            } else {
                password_box.type = "password";
                show_me.textContent = "AFFICHER";
            }
        });
    });
</script>