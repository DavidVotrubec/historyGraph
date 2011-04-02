/*
TODO: Toto by melo byt generovane dynamicky
a umistene nekde jinde , ne ve statickem adresari

Postacujici jen pro demo ucely
*/

{
        name: 'Demo graf json'
        , description: 'nejaky popis...'
        , startYear: 1800 /*TODO - optional - if not provided it will be counted*/
        , endYear: 1950 /*TODO - optional - if not provided it will be counted*/
        , step: 10 /*TODO - optional - defines years increment on 'years axis' */
        , timelines: [
            {
                id: 1
                , name: '19. stoleti'
                , desc: 'popis dejove linie'
                , color: '#074216'
                , events: [
                    {
                        id: 1
                        , name: 'Narozeni KristaPana'
                        , desc: 'tento popisek se zobrazi pri najeti mysi'
                        , startDate: '-5043958118024'
                        , endDate: '-5043958118024'
                        , connectTo: {timelineId:2, 'date': '-4958758800000'}
                    },
                    {
                        id: 2
                        , name: 'Umrti KristaPana'
                        , desc: 'tento popisek se zobrazi pri najeti mysi 2'
                        , startDate: '-3615164918024'
                        , endDate: '-3615164918024'
                    }
                    , {
                        id: 3
                        , name: 'Nanebevzeti neposkrvneneho KristaPana'
                        , desc: 'tento popisek se zobrazi pri najeti mysi 3235352'
                        , startDate: '-3615275918024'
                        , endDate: '-3616164918024'
                    }
                    , {
                        id: 458545
                        , name: 'Volby v Pakistanu'
                        , desc: '<b>bold</b> html kod <a href="http://google.com">klikni</a>'
                        , startDate: '-4412106000000'
                        , endDate: '-4412106000000'
                        , connectTo: {timelineId:3, 'date': '-2629259200000'}
                    }
                    , {
                        id: 458548
                        , name: 'Volby v Indii'
                        , desc: 'Pops up a modal dialog window, blocking access to the screen and also graying out the screen Dialog is extended from ContentPane so it supports all the same parameters (href, etc.) Construct the UI for this widget from a template, setting this.domNode. Connects specified obj/event to specified method of this object and registers for disconnect() on widget destroy. Connects to the onChange function of all children to track valid state changes. You can call this function directly, ex. in the event that you programmatically add a widget to the form *after* the form has been initialized.'
                        , startDate: '-4048900000000'
                        , endDate: '-4248900986000'
                    }
                ]
            },
            {
                id: 2
                , name: '19. stoleti - globalni udalosti'
                , desc: 'Globální události ovlivňující celý svět. Katastrofy, nemoci, objevy atd...'
                , color: '#A74288'
                , events: [
                    {
                        id: 4
                        , name: 'Zemetreseni v Indocine'
                        , desc: 'Znicilo to Dilli'
                        , startDate: '-426747586756'
                        , endDate: '-926747586756'
                    }
                    , {
                        id: 445451
                        , name: 'Přepadení pacifiku'
                        , desc: 'To understand this, we need to first grasp such concepts as variable instantiation and property attributes — something that’s unfortunately rarely covered in books on Javascript. I’ll try go over these very concisely in the next few paragraphs. <br/>It’s not hard to understand them at all! If you don’t care about why things work the way they work, feel free to skip this chapter.'
                        , startDate: '-4958758800000'
                        , endDate: '-4958758801234'
                    }
                    , {
                        id: 445785
                        , name: 'Tučnácí v antaktidě napadli polárníky'
                        , desc: 'We all know that web performance optimization is important, especially if you care about Google/SEO value and your users. But most developers only consider the checklist items in YSlow and PageSpeed. These tools, however, barely scratch the surface. Get ready to get your hands really dirty. <br/> Just confirmed: Tom Hughes-Croucher , Platform Evangelist for Yahoo! and web infrastructure guru, will be joining me for this talk! Please go vote for us now , we’d really appreciate it!'
                        , startDate: '-2618269200000'
                        , endDate: '  -2618269200000'
                    }
                ]
            }
            , {
                id: 3
                , name: 'huho'
                , desc: 'huhuhuh'
                , color: '#19A789'
                , events: [
                    {
                        id: 478513
                        , name: 'Zlooo'
                        , desc: '456756434!'
                        , startDate: '-2618257200000'
                        , endDate: '  -2618257200000'
                    },{
                        id: 477888513
                        , name: 'Globalizase'
                        , desc: 'Kolo kolo mlynsky4!'
                        , startDate: '-2629259200000'
                        , endDate: '  -2618257200000'
                    }
                    ,{
                        id: 7888513
                        , name: 'Velka udaost'
                        , desc: 'Kolo kolo mlynsky 44!'
                        , startDate: '-3629259200000'
                        , endDate: '  -3618257200000'
                    }
                    ,{
                        id: 7888843
                        , name: 'Svobodni zednari'
                        , desc: 'Kolo kolo mlynsky 44!'
                        , startDate: '-5129259200000'
                        , endDate: '  -5618257200000'
                    }
                ]
            }
                        , {
                id: 32
                , name: 'huho timeline'
                , desc: 'huhuhuh'
                , color: '#120089'
                , events: [
                    {
                        id: 478513
                        , name: 'Zlooo'
                        , desc: '456756434!'
                        , startDate: '-2611257200000'
                        , endDate: '  -2618257200000'
                    }
                ]
            }
                        , {
                id: 37
                , name: 'Liberec'
                , desc: 'huhuhuh'
                , color: '#123789'
                , events: [
                    {
                        id: 478513
                        , name: 'Zlooo'
                        , desc: '456756434!'
                        , startDate: '-2618257200000'
                        , endDate: '  -2618257200000'
                    }
                ]
            }
                        , {
                id: 378
                , name: 'huho'
                , desc: 'huhuhuh'
                , color: '#9E8F89'
                , events: [
                    {
                        id: 478513
                        , name: 'Zlooo'
                        , desc: '456756434!'
                        , startDate: '-2168257200000'
                        , endDate: '  -2168257200000'
                    }
                    ,{
                        id: 4785783
                        , name: 'Zlooo 56'
                        , desc: '4567ku ku ku 56434!'
                        , startDate: '-2198257200000'
                        , endDate: '  -2198257200000'
                    }
                    ,{
                        id: 1255783
                        , name: 'Dobro je dobre'
                        , desc: '4567ku ku ku 5 lololo dofspospas6434!'
                        , startDate: '-1098157200000'
                        , endDate: '  -2198257200000'
                    }
                ]
            }
        ] /*timelines [] */
}