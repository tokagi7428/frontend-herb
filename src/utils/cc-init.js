const config = {
    current_lang: "th",
    autorun: true,
    autoclear_cookies: true,
    // page_scripts: true,
    force_consent: true, // hidden bar
    cookie_expiration: 365,
    eookie_name: "cc_cookie_demo2",
    gui_options: {
        consent_modal: {
            layout: 'cloud', // box/cloud/bar
            position: 'bottom center', // bottom/middle/top + left/right/center
            transition: 'slide', // zoom/slide
            swap_buttons: false, // enable to invert buttons
        },
        settings_modal: {
            layout: 'box', // box/bar
            // position: 'left',           // left/right
            transition: 'slide', // zoom/slide
        },
    },
    onAccept: function (cookie) { },
    onChange: function (cookie, changed_preferences) { },
    languages: {
        th: {
            consent_modal: {
                title: "เว็บนี้ใช้คุกกี้",
                description:
                    'ยินดีต้อนรับสู่เว็บไซต์ศึกษาความรู้เกี่ยวกับสมุนไพร เพื่อช่วยให้ผู้ใช้ได้รับบริการที่จากการใช้บริการของเรา ในกรณีที่ข้อมูลที่ถูกจัดเก็บรวบรวมจากการใช้คุกกี้และเทคโนโลยีอื่นมีลักษณะเป็นข้อมูลส่วนบุคคลตามที่กฎหมายว่าด้วยการคุ้มครองข้อมูลส่วนบุคคล เราจะเก็บรวบรวมตามรายละเอียดที่ระบุในนโยบายคุ้มครองข้อมูลส่วนบุคคล<button type="button" data-cc="c-settings" class="cc-link" style="color:red; margin-left:5px;">Private Policy</button>ของเรา.',
                primary_btn: {
                    text: "ยอมรับคุกกี้ทั้งหมด",
                    role: "accept_all", // 'accept_selected' or 'accept_all'
                },
                secondary_btn: {
                    text: "ปฎิเสธทั้งหมด",
                    role: "accept_necessary", // 'settings' or 'accept_necessary'
                },
                // secondary_btn: {
                //     text: "ตั้งค่าคุกกี้",
                //     role: "setting", // 'settings'
                // },
            },
            settings_modal: {
                title: "ตั้งค่าความเป็นส่วนตัว",
                save_settings_btn: "บันทึกการตั้งค่าทั้งหมด",
                accept_all_btn: "ยอมรับทั้งหมด",
                reject_all_btn: "ปฎิเสธทั้งหมด",
                // close_btn_label: "ปิด",
                cookie_table_headers: [
                    { col1: 'Name' },
                    { col2: 'Domain' },
                    { col3: 'Expiration' },
                    { col4: 'Description' },
                    { col5: 'Type' },
                ],
                blocks: [
                    {
                        title: "เว็บนี้ใช้คุกกี้ 📢",
                        description:
                            'ยินดีต้อนรับสู่เว็บไซต์ศึกษาความรู้เกี่ยวกับสมุนไพร เพื่อช่วยให้ผู้ใช้ได้รับบริการที่จากการใช้บริการของเรา ในกรณีที่ข้อมูลที่ถูกจัดเก็บรวบรวมจากการใช้คุกกี้และเทคโนโลยีอื่นมีลักษณะเป็นข้อมูลส่วนบุคคลตามที่กฎหมายว่าด้วยการคุ้มครองข้อมูลส่วนบุคคล เราจะเก็บรวบรวมตามรายละเอียดที่ระบุในนโยบายคุ้มครองข้อมูลส่วนบุคคล<button type="button" data-cc="c-settings" class="cc-link" style="color:red; margin: 0 5px;">Private Policy</button>ของเรา.',
                    },
                    {
                        title: "คุกกี้พื้นฐานที่จำเป็น",
                        description:
                            "คุกกี้พื้นฐานที่จำเป็น เพื่อช่วยให้การทำงานหลักของเว็บไซต์ใช้งานได้ รวมถึงการเข้าถึงพื้นที่ที่ปลอดภัยต่าง ๆ ของเว็บไซต์ หากไม่มีคุกกี้นี้เว็บไซต์จะไม่สามารถทำงานได้อย่างเหมาะสม และจะใช้งานได้โดยการตั้งค่าเริ่มต้น โดยไม่สามารถปิดการใช้งานได้",
                        toggle: {
                            value: "necessary",
                            enabled: true,
                            readonly: true, // cookie categories with readonly=true are all treated as "necessary cookies"
                        },
                    },
                    {
                        title: "คุกกี้ส่วนการวิเคราะห์",
                        description:
                            "คุกกี้ในส่วนวิเคราะห์ จะช่วยให้เว็บไซต์เข้าใจรูปแบบการใช้งานของผู้เข้าชมและจะช่วยปรับปรุงประสบการณ์การใช้งาน โดยการเก็บรวบรวมข้อมูลและรายงานผลการใช้งานของผู้ใช้งาน",
                        toggle: {
                            value: "necessary",
                            enabled: true,
                            readonly: true, // cookie categories with readonly=true are all treated as "necessary cookies"
                        },
                    },
                    // {
                    //     title: "Performance and Analytics cookies",
                    //     description:
                    //         "These cookies allow the website to remember the choices you have made in the past",
                    //     toggle: {
                    //         value: "analytics", // your cookie category
                    //         enabled: false,
                    //         readonly: false,
                    //     },
                    //     cookie_table: [
                    //         // list of all expected cookies
                    //         {
                    //             col1: "^_ga", // match all cookies starting with "_ga"
                    //             col2: "google.com",
                    //             col3: "2 years",
                    //             col4: "description ...",
                    //             is_regex: true,
                    //         },
                    //         {
                    //             col1: "_gid",
                    //             col2: "google.com",
                    //             col3: "1 day",
                    //             col4: "description ...",
                    //         },
                    //     ],
                    // },
                    // {
                    //     title: "Advertisement and Targeting cookies",
                    //     description:
                    //         "These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you",
                    //     toggle: {
                    //         value: "targeting",
                    //         enabled: false,
                    //         readonly: false,
                    //     },
                    // },
                    {
                        title: "จัดการการกำหนดลักษณะความยินยอม",
                        description:
                            'คุกกี้พื้นฐานที่จำเป็น เพื่อช่วยให้การทำงานหลักของเว็บไซต์ใช้งานได้ รวมถึงการเข้าถึงพื้นที่ที่ปลอดภัยต่าง ๆ ของเว็บไซต์ หากไม่มีคุกกี้นี้เว็บไซต์จะไม่สามารถทำงานได้อย่างเหมาะสม และจะใช้งานได้โดยการตั้งค่าเริ่มต้น โดยไม่สามารถปิดการใช้งานได้',
                    },
                ],
            },
        },
    },
};
let cc = initCookieConsent();
cc.run(config);

