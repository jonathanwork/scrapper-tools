import {JSDOM} from 'jsdom';
import fetch from 'node-fetch';
import {spawn, exec} from 'child_process';
class EntryPoint {

    static async google_trends () {
        const cmd = `
        curl 'https://trends.google.com/trends/explore?geo=US&hl=en' \\
  -H 'authority: trends.google.com' \\
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \\
  -H 'accept-language: en-US,en;q=0.9' \\
  -H 'cache-control: max-age=0' \\
  -H 'cookie: __utma=10102256.81126969.1724099742.1725053337.1725134008.9; __utmc=10102256; __utmz=10102256.1725134008.9.6.utmcsr=trends.google.com|utmccn=(referral)|utmcmd=referral|utmcct=/; __utmt=1; __utmb=10102256.1.10.1725134008; HSID=A8hTZIl5D8KucSpp1; SSID=AARRH3jhe87OE2ZUv; APISID=k3zmWP858t9RPzKk/AVcTC3W9oaVIOPjQg; SAPISID=Hwn_z80g4Ndmc_a3/ArITmWJ8V2aR_6OQb; __Secure-1PAPISID=Hwn_z80g4Ndmc_a3/ArITmWJ8V2aR_6OQb; __Secure-3PAPISID=Hwn_z80g4Ndmc_a3/ArITmWJ8V2aR_6OQb; SID=g.a000nAicEySiWMLF31DJo-gbqn626U2U9oGqeLB1ppVbjqgOJIYss9OpzpstKRkRllH5Sk8HgAACgYKAfwSAQASFQHGX2Mi2k01qYmX6cAGo_ksFvTrPhoVAUF8yKoxMmodtftuprXFOCLQCsrs0076; __Secure-1PSID=g.a000nAicEySiWMLF31DJo-gbqn626U2U9oGqeLB1ppVbjqgOJIYsXj11okNP4Ut_OvQgpEHvWAACgYKARcSAQASFQHGX2Min3LUNrkoSN6GlKvZiQuAWRoVAUF8yKroB5umam--NQtzmttsiIsr0076; __Secure-3PSID=g.a000nAicEySiWMLF31DJo-gbqn626U2U9oGqeLB1ppVbjqgOJIYsrf58nPBu_22SKVfmYJuwWwACgYKAYsSAQASFQHGX2MiUMEfNxZcTot2IPme90pIWxoVAUF8yKrNUHn6gcIclTH01gOFkrTD0076; OTZ=7696596_84_88_104280_84_446940; _gid=GA1.3.1910117949.1724915068; AEC=AVYB7coqNTbxhtX6f0kMN28iCJ0q9XgsDXnzypWU6TyK1ca3xzJkVSwQjTE; _gat_gtag_UA_4401283=1; NID=517=hR-FM0Xa_jev4lEjWyrcgoV9q_K27obhV1OP9eKCR3SsDX59tXvrF2ixedsWdyMUnKb19umm64Ra1H5pY49BuHsQFJPRD4XOMO4GzXRZ6UHPtY4P4t4wUFr0hyyWvihpYGf7VvsxDKoks7fB46jmGETAo9gWSMEjTRg4B4l4wG5dQyzT6JGqAHI6M_xF5HRceRuxezjp9JMQbelWr_5HkW6exMOJYhXh54G_B1rajGi74kJ31tlT5lfdHnMVNy-wb_HhuaRGVloJO4bSTCidZN1V-C2doyI8eAzAwVnOq9kgVZonrySDaTraahFTsie62kk6VqmmlkXZ_OcdL-1m-xwEDX44REY0l_RyIJzdWWiZLt7QxcMCq7sMNkQdF2LmunXufR2GN0J0vxCbJGTXlhuiFWvKc-_6jpLkRafi27Zx3rxnvuzCIMFN_v8YOT-S8C5eTWUCT2wZC7THIkufy-boyC1098ulh2Aq_eKMNpNIl1meItcqotrYhmoF8PUvPIWS2oa_r9Oqd3xjUK4H-firuofS9Wn6oREKf308hCkL17tQGEHi44ZUf_ZCgbfCwG5ipBiw8UGxH4OS6ugPc7tKFrYE2YpxYQ_JMjX-9m72SB-2-RT6xxYZIRKNbqqsaQCPG87_xmhBlU852j5VBKL5w-dQwO1B2FeXPmmq08C2Q16Sob24ho1SLec9S5RHuctLEK0pRbBYdabx6qqfV7cSKYlVOGRk3244XuUKPPPI2Dn5Tu20QJ0eUf_Do1snOpE5ou5FfLV3DEP2pcK6AZlHJLDEDOsw1Gw; __Secure-1PSIDTS=sidts-CjEBUFGohyXY-ldXSoVNjsuzhZ6yQVMajacMeGupCytpPxgdblYYIGsJZ44tifFqyDcUEAA; __Secure-3PSIDTS=sidts-CjEBUFGohyXY-ldXSoVNjsuzhZ6yQVMajacMeGupCytpPxgdblYYIGsJZ44tifFqyDcUEAA; _ga=GA1.3.81126969.1724099742; _ga_VWZPXDNJJB=GS1.1.1725134005.11.1.1725134009.0.0.0; SIDCC=AKEyXzUsQHeDw-tBEtsHKMMYDPEb75Wk8GBsB-Ak4SPXhP2586fYg9CppUmIcHebtnaY8x5mu-_O; __Secure-1PSIDCC=AKEyXzVYfc1MFoAwzf-8kruH1bmSRgIeMuJkBeOWv24HpY33GBRbClBBgXU1TlK65oQCnMafycLa; __Secure-3PSIDCC=AKEyXzWX1Hq6QOo_R3Qqqu0GDW3uF-KSxK04nuA0OBCuyR17awLBc_qMO-cOOqo59njoOzv85v4' \\
  -H 'referer: https://trends.google.com/' \\
  -H 'sec-ch-ua: "Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"' \\
  -H 'sec-ch-ua-arch: "x86"' \\
  -H 'sec-ch-ua-bitness: "64"' \\
  -H 'sec-ch-ua-full-version: "115.0.1901.203"' \\
  -H 'sec-ch-ua-full-version-list: "Not/A)Brand";v="99.0.0.0", "Microsoft Edge";v="115.0.1901.203", "Chromium";v="115.0.5790.171"' \\
  -H 'sec-ch-ua-mobile: ?0' \\
  -H 'sec-ch-ua-model: ""' \\
  -H 'sec-ch-ua-platform: "Linux"' \\
  -H 'sec-ch-ua-platform-version: "5.15.0"' \\
  -H 'sec-ch-ua-wow64: ?0' \\
  -H 'sec-fetch-dest: document' \\
  -H 'sec-fetch-mode: navigate' \\
  -H 'sec-fetch-site: same-origin' \\
  -H 'sec-fetch-user: ?1' \\
  -H 'upgrade-insecure-requests: 1' \\
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203' \\
  --compressed
        `
        exec(cmd, (err, stdout, stderr) =>{
            // console.log(stdout);
            let output = stdout

            console.log(output)
            // const { document } = (new JSDOM(output,  { runScripts: "dangerously" })).window;
            // // let dom = new JSDOM(output);
            // console.log(`${document.body.innerHTML}`)

        })
//         spawn(`
//         curl 'https://trends.google.com/trends/explore?geo=US&hl=en'   -H 'authority: trends.google.com'   -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'   -H 'accept-language: en-US,en;q=0.9'   -H 'cache-control: max-age=0'   -H 'cookie: __utma=10102256.81126969.1724099742.1725053337.1725134008.9; __utmc=10102256; __utmz=10102256.1725134008.9.6.utmcsr=trends.google.com|utmccn=(referral)|utmcmd=referral|utmcct=/; __utmt=1; __utmb=10102256.1.10.1725134008; HSID=A8hTZIl5D8KucSpp1; SSID=AARRH3jhe87OE2ZUv; APISID=k3zmWP858t9RPzKk/AVcTC3W9oaVIOPjQg; SAPISID=Hwn_z80g4Ndmc_a3/ArITmWJ8V2aR_6OQb; __Secure-1PAPISID=Hwn_z80g4Ndmc_a3/ArITmWJ8V2aR_6OQb; __Secure-3PAPISID=Hwn_z80g4Ndmc_a3/ArITmWJ8V2aR_6OQb; SID=g.a000nAicEySiWMLF31DJo-gbqn626U2U9oGqeLB1ppVbjqgOJIYss9OpzpstKRkRllH5Sk8HgAACgYKAfwSAQASFQHGX2Mi2k01qYmX6cAGo_ksFvTrPhoVAUF8yKoxMmodtftuprXFOCLQCsrs0076; __Secure-1PSID=g.a000nAicEySiWMLF31DJo-gbqn626U2U9oGqeLB1ppVbjqgOJIYsXj11okNP4Ut_OvQgpEHvWAACgYKARcSAQASFQHGX2Min3LUNrkoSN6GlKvZiQuAWRoVAUF8yKroB5umam--NQtzmttsiIsr0076; __Secure-3PSID=g.a000nAicEySiWMLF31DJo-gbqn626U2U9oGqeLB1ppVbjqgOJIYsrf58nPBu_22SKVfmYJuwWwACgYKAYsSAQASFQHGX2MiUMEfNxZcTot2IPme90pIWxoVAUF8yKrNUHn6gcIclTH01gOFkrTD0076; OTZ=7696596_84_88_104280_84_446940; _gid=GA1.3.1910117949.1724915068; AEC=AVYB7coqNTbxhtX6f0kMN28iCJ0q9XgsDXnzypWU6TyK1ca3xzJkVSwQjTE; _gat_gtag_UA_4401283=1; NID=517=hR-FM0Xa_jev4lEjWyrcgoV9q_K27obhV1OP9eKCR3SsDX59tXvrF2ixedsWdyMUnKb19umm64Ra1H5pY49BuHsQFJPRD4XOMO4GzXRZ6UHPtY4P4t4wUFr0hyyWvihpYGf7VvsxDKoks7fB46jmGETAo9gWSMEjTRg4B4l4wG5dQyzT6JGqAHI6M_xF5HRceRuxezjp9JMQbelWr_5HkW6exMOJYhXh54G_B1rajGi74kJ31tlT5lfdHnMVNy-wb_HhuaRGVloJO4bSTCidZN1V-C2doyI8eAzAwVnOq9kgVZonrySDaTraahFTsie62kk6VqmmlkXZ_OcdL-1m-xwEDX44REY0l_RyIJzdWWiZLt7QxcMCq7sMNkQdF2LmunXufR2GN0J0vxCbJGTXlhuiFWvKc-_6jpLkRafi27Zx3rxnvuzCIMFN_v8YOT-S8C5eTWUCT2wZC7THIkufy-boyC1098ulh2Aq_eKMNpNIl1meItcqotrYhmoF8PUvPIWS2oa_r9Oqd3xjUK4H-firuofS9Wn6oREKf308hCkL17tQGEHi44ZUf_ZCgbfCwG5ipBiw8UGxH4OS6ugPc7tKFrYE2YpxYQ_JMjX-9m72SB-2-RT6xxYZIRKNbqqsaQCPG87_xmhBlU852j5VBKL5w-dQwO1B2FeXPmmq08C2Q16Sob24ho1SLec9S5RHuctLEK0pRbBYdabx6qqfV7cSKYlVOGRk3244XuUKPPPI2Dn5Tu20QJ0eUf_Do1snOpE5ou5FfLV3DEP2pcK6AZlHJLDEDOsw1Gw; __Secure-1PSIDTS=sidts-CjEBUFGohyXY-ldXSoVNjsuzhZ6yQVMajacMeGupCytpPxgdblYYIGsJZ44tifFqyDcUEAA; __Secure-3PSIDTS=sidts-CjEBUFGohyXY-ldXSoVNjsuzhZ6yQVMajacMeGupCytpPxgdblYYIGsJZ44tifFqyDcUEAA; _ga=GA1.3.81126969.1724099742; _ga_VWZPXDNJJB=GS1.1.1725134005.11.1.1725134009.0.0.0; SIDCC=AKEyXzUsQHeDw-tBEtsHKMMYDPEb75Wk8GBsB-Ak4SPXhP2586fYg9CppUmIcHebtnaY8x5mu-_O; __Secure-1PSIDCC=AKEyXzVYfc1MFoAwzf-8kruH1bmSRgIeMuJkBeOWv24HpY33GBRbClBBgXU1TlK65oQCnMafycLa; __Secure-3PSIDCC=AKEyXzWX1Hq6QOo_R3Qqqu0GDW3uF-KSxK04nuA0OBCuyR17awLBc_qMO-cOOqo59njoOzv85v4'   -H 'referer: https://trends.google.com/'   -H 'sec-ch-ua: "Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"'   -H 'sec-ch-ua-arch: "x86"'   -H 'sec-ch-ua-bitness: "64"'   -H 'sec-ch-ua-full-version: "115.0.1901.203"'   -H 'sec-ch-ua-full-version-list: "Not/A)Brand";v="99.0.0.0", "Microsoft Edge";v="115.0.1901.203", "Chromium";v="115.0.5790.171"'   -H 'sec-ch-ua-mobile: ?0'   -H 'sec-ch-ua-model: ""'   -H 'sec-ch-ua-platform: "Linux"'   -H 'sec-ch-ua-platform-version: "5.15.0"'   -H 'sec-ch-ua-wow64: ?0'   -H 'sec-fetch-dest: document'   -H 'sec-fetch-mode: navigate'   -H 'sec-fetch-site: same-origin'   -H 'sec-fetch-user: ?1'   -H 'upgrade-insecure-requests: 1'   -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203'   --compressed
// `)
//         let resp = await fetch("https://trends.google.com/trends/explore?geo=US&hl=en", {
//             "headers": {
//                 "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//                 "accept-language": "en-US,en;q=0.9",
//                 "cache-control": "max-age=0",
//                 "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Microsoft Edge\";v=\"115\", \"Chromium\";v=\"115\"",
//                 "sec-ch-ua-arch": "\"x86\"",
//                 "sec-ch-ua-bitness": "\"64\"",
//                 "sec-ch-ua-full-version": "\"115.0.1901.203\"",
//                 "sec-ch-ua-full-version-list": "\"Not/A)Brand\";v=\"99.0.0.0\", \"Microsoft Edge\";v=\"115.0.1901.203\", \"Chromium\";v=\"115.0.5790.171\"",
//                 "sec-ch-ua-mobile": "?0",
//                 "sec-ch-ua-model": "\"\"",
//                 "sec-ch-ua-platform": "\"Linux\"",
//                 "sec-ch-ua-platform-version": "\"5.15.0\"",
//                 "sec-ch-ua-wow64": "?0",
//                 "sec-fetch-dest": "document",
//                 "sec-fetch-mode": "navigate",
//                 "sec-fetch-site": "same-origin",
//                 "sec-fetch-user": "?1",
//                 "upgrade-insecure-requests": "1"
//             },
//             "referrer": "https://trends.google.com/",
//             "referrerPolicy": "origin",
//             "body": null,
//             "method": "GET",
//             "mode": "cors",
//             "credentials": "include"
//         });
//
    }

}

EntryPoint.google_trends()