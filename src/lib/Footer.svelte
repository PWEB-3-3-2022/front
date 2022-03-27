<footer class="footer">
    <div class="contain">
        <div class="col">
            <h1>Company</h1>
            <ul>
                <li>About</li>
                <li>Mission</li>
                <li>Services</li>
                <li>Social</li>
                <li>Get in touch</li>
            </ul>
        </div>
        <div class="col">
            <h1>Support</h1>
            <ul>
                <li>Contact us</li>
                <li>Web chat</li>
                <li>Open ticket</li>
            </ul>
        </div>
        <div class="col social">
            <h1>Social</h1>
            <ul>
                <li><img alt="Social Network" src="https://svgshare.com/i/5fq.svg" style="width: 32px;" width="32"></li>
                <li><img alt="Social Network" src="https://svgshare.com/i/5eA.svg" style="width: 32px;" width="32"></li>
                <li><img alt="Social Network" src="https://svgshare.com/i/5f_.svg" style="width: 32px;" width="32"></li>
            </ul>
        </div>
        <div class="clearfix"></div>
    </div>
</footer>

<style>
    .footer {
        width: 100%;
        height: 220px;
        background-color: #000000;
    }

    .footer .col {
        float: left;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 190px;
        height: auto;
        padding: 0 20px 20px 20px;
    }

    .footer .col h1 {
        font-family: inherit;
        font-size: 12px;
        font-weight: normal;
        line-height: 17px;
        margin: 0;
        padding: 20px 0 5px 0;
        letter-spacing: 0.250em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.2);
    }

    .footer .col ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .footer .col ul li {
        font-family: inherit;
        font-size: 14px;
        font-weight: bold;
        padding: 5px 0 5px 0;
        cursor: pointer;
        -moz-transition: .2s;
        -webkit-transition: .2s;
        transition: .2s;
        color: #999999;
    }

    .social ul li {
        display: inline-block;
        padding-right: 5px !important;
    }

    .footer .col ul li:hover {
        -moz-transition: .1s;
        -webkit-transition: .1s;
        transition: .1s;
        color: #ffffff;
    }

    .clearfix {
        clear: both;
    }

    @media only screen and (min-width: 1280px) {
        .contain {
            width: 1200px;
            margin: 0 auto;
        }
    }

    @media only screen and (max-width: 1139px) {
        .contain .social {
            display: block;
            width: 1000px;
        }

        .social h1 {
            margin: 0;
        }
    }

    @media only screen and (max-width: 950px) {
        .footer .col {
            width: 33%;
        }

        .footer .col h1 {
            font-size: 14px;
        }

        .footer .col ul li {
            font-size: 13px;
        }
    }

    @media only screen and (max-width: 500px) {
        .footer .col {
            width: 50%;
        }

        .footer .col h1 {
            font-size: 14px;
        }

        .footer .col ul li {
            font-size: 13px;
        }
    }

    @media only screen and (max-width: 340px) {
        .footer .col {
            width: 100%;
        }
    }
</style>
