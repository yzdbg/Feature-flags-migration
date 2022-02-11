import fetch from 'node-fetch';

const TOKEN = ""

// const API = "http://media.evercam.io"
const API = "http://localhost:4000"

const FEATURE = "gate_report"

const CAMERAS = [
    "carro-vrpxc",
    "bluej-egpbh",
    "bartr-xgemj",
    "budim-truvq",
    "roadb-syxjf",
    "centr-fdsol",
    "aibba-xezpi",
    "clancourt-hatch-st",
    "hikvis-u7j",
    "manni-yerts",
    "tbd-djwvg",
    "truck-dnaiz",
    "conac-tmycl",
    "manni-kmjws",
    "siskp-tbzcg",
    "tcdsi-jgucq",
    "carnl-snodt",
    "colin-qgdbk",
    "siskb-omkri",
    "bluej-batwn",
    "trave-tjxmy",
    "siskd-xytjm",
    "irish-tiera",
    "skans-lwbxt",
    "scape-hzmvt",
    "sisk2-xnfgz",
    "sisk2-sqoib",
    "torca-ipgxd",
    "purce-ityju",
    "eagle-brpzd",
    "poolb-yhdjz",
    "aumar-pygnu",
    "manni-oabsd",
    "auiva-qzbsv",
    "corkc-qfogd",
    "azzan-dyfuk",
    "budim-vzlpq",
    "400hg-luhib",
    "jpcsw-cqhsx",
    "mercu-guyba",
    "mercu-ctfyn"
]

const FETCH_CAMERA = (TOKEN, exid) => {
    return fetch(`${API}/v2/admin/cameras/${exid}`, {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "authorization": `Bearer ${TOKEN}`,
        },
        "referrer": `${API}`,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      });
}

const UPDATE_CAMERA = async function(TOKEN, exid, feature_flags) {
    return fetch(`${API}/v2/cameras/${exid}`, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "authorization": `${TOKEN}`,
      "content-type": "application/json",

    },
    "referrer": `${API}`,
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": `{\"feature_flags\":${JSON.stringify(feature_flags)}}`,
    "method": "PATCH",
    "mode": "cors",
    "credentials": "include"
  });
}

CAMERAS.forEach(async function(cameraId) {
     try {
        const response = await FETCH_CAMERA(TOKEN, cameraId)
        const camera = await response.json();
        console.log(camera.feature_flags);
        if (response.ok) {
            //check if camera already has the feature flag
            if (!camera.feature_flags.includes(FEATURE)) {
                //add the new feature flag to the existing ones
                const feature_flags = [...camera.feature_flags, FEATURE]
                //patch the camera with the new feature flags
                await UPDATE_CAMERA(TOKEN, cameraId, feature_flags)
                console.log("Camera :", cameraId," Updated successfuly");
                //console.log("Old feature flags :", camera.feature_flags, "New feature flags :", JSON.stringify(feature_flags));
            }
            else{
                console.log("Camera :",cameraId," already has the specified feature flag :", camera.feature_flags," skipping...");
            }
        }
        else{
            console.log("Request failed :", response.status, " | Camera :", cameraId);
        }
     } 
     catch (error) {
        console.log(error);
     }
 });