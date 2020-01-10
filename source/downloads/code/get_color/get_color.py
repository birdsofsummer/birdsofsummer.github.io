import json

def f(x):
    print(x)
    d=dict(x,**requests.post(u,x).json())
    print (d)
    return d

def color_list():
    z=""
    with open("./color.json") as ff:
        z=json.loads(ff.read())
    return z

r=[]
async def main():
    loop = asyncio.get_event_loop()
    z=color_list()
    for x in z[:]:
        future1 = loop.run_in_executor(None, f, x)
        r.append(await future1)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
