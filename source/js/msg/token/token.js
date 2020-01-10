//https://www.npmjs.com/package/web-push

const webpush = require('web-push');
const urlBase64 = require('urlsafe-base64');

const get_keys=()=>{
    const vapidKeys = webpush.generateVAPIDKeys();
    console.log(vapidKeys);
    return vapidKeys
}

pub={"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABdFf83iDZE26eIIP20WCaX8c_jYREEjJQ37X4ANzs95tZfy5BSwKdgcWoR6eH7SI0cDFHeSd-tWoe0g3H_CtSz9c2oZCawA2xaKqeTE_CplNnPlRu3BoMmrb0KyhrOeFrcjY7TpCb3JVFnnnxU2PGX46CTHZUFPPy743j0izbrn4pIoeE","keys":{"auth":"x9TJZco2AzDorsPdIeQH1g","p256dh":"BJX6z8-L83hykeuWSQjYRFH5TAp88sB2Gs2eWViy00Q4q0KzRnhVDhp3c-m_OSZRn_FHIeTDGXFSFUN2OoWw51Q"}}

send=async (pushSubscription=pub,d="ccc")=>{
    const k={"publicKey":"BNEkc6Na1Irog6binY12NgSez-pe3ejTatnLSTnW-LvnzWVUdNoA7ZIY2qaDSuijxbLYeu7wMvq59lvNU6izm7A","privateKey":"0zzOjG01L9NWxGHIEty3OCk2YAjRTrJN9P_sSuzilXE"}
    options = {
     // gcmAPIKey: '< GCM API Key >', //https://console.developers.google.com/iam-admin/settings/project
      vapidDetails: {
        subject: "mailto:1052334039@qq.com",
        publicKey:k.publicKey,
        privateKey:k.privateKey, //urlBase64.encode(k.privateKey)
      },
      TTL: 86400,
      headers: {
          "x":1,
          "Topic":"zzz",
      //  authorization: "Bearer 00secret00",
      },
      //contentEncoding: 'aesgcm',
     // contentEncoding: '< Encoding type, e.g.: aesgcm or aes128gcm >',
     // proxy: '< proxy server options >'
    }

  //  d1=await webpush.encrypt( pushSubscription.keys.p256dh, pushSubscription.keys.auth, d, 'aes128gcm')
  //  d2=webpush.generateRequestDetails( pushSubscription, d, options);
    z=await webpush.sendNotification(pushSubscription,d,options);
    console.log(z)
}

setInterval(send,1000)


  /*
{
  "code": 401,
  "errno": 109,
  "error": "Unauthorized",
  "more_info": "http://autopush.readthedocs.io/en/latest/http.html#error-codes",
  "message": "Request did not validate missing authorization header"
}

http://autopush.readthedocs.io/en/latest/http.html#error-codes


    Access-Control-Allow-Headers: content-encoding,encryption,crypto-key,ttl,encryption-key,content-type,authorization
    Access-Control-Allow-Methods: POST
    Access-Control-Allow-Origin: *
    Access-Control-Expose-Headers: location,www-authenticate
    Content-Type: application/json
    Date: Thu, 27 Jun 2019 13:48:29 GMT
    Server: nginx
    Strict-Transport-Security: max-age=31536000;includeSubDomains
    Content-Length: 199
    Connection: keep-alive
*/
o={
    "aud": "https://push.services.mozilla.com",
    "exp": Math.floor(Date.now() * .001 + 86400),
    "sub": "mailto:webpush_ops@catfacts.example.com"
}


