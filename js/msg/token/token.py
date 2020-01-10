#https://blog.mozilla.org/services/2016/04/04/using-vapid-with-webpush/
import base64
import time
import json
import ecdsa
from jose import jws

def make_jwt(header, claims, key):
    vk = key.get_verifying_key()
    raw_public_key = "\x04" + vk.to_string()
    public_key = base64.urlsafe_b64encode(raw_public_key).strip("=")

    jwt = jws.sign( claims, key, algorithm=header.get("alg", "ES256")).strip("=")
    return (jwt, public_key)


def main():
    header = {"typ": "JWT", "alg": "ES256"}
    claims = {"aud": "https://push.services.mozilla.com",
              "exp": int(time.time()) + 86400,
              "sub": "mailto:webpush_ops@catfacts.example.com"}
    my_key = ecdsa.SigningKey.generate(curve=ecdsa.NIST256p)
    # You can store the private key by writing
    #   my_key.to_pem() to a file.
    # You can reload the private key by reading
    #   my_key.from_pem(file_contents)

    (jwt, public_key) = make_jwt(header, claims, my_key)

    # Return the headers we'll use.
    headers = {
        "Authorization": "Bearer %s" % jwt,
        "Crypto-Key": "p256ecdsa=%s" % public_key,
    }
    s=json.dumps(headers, sort_keys=True, indent=4)
    print s

main()
