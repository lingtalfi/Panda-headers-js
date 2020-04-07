Panda headers (js client)
===========
2020-04-06 -> 2020-04-07

A js helper to implement the [panda headers](https://github.com/lingtalfi/TheBar/blob/master/discussions/panda-headers-protocol.md) protocol.



Install
=======

```js
npm install panda-headers
```




Usage
===========

Assuming the following response headers given by the server:

```txt 
panda__arrays: tags,names
panda_author: boris
panda_names: alice, maurice
panda_tags: judo, karate, 1__panda_comma__2__panda_comma__3__panda_comma__ soleil 
```



If you are using the **fetch** api, then we can use the helper like this:

```js
const panda = require("panda-headers");
console.log(panda.getPandaHeaders(headers));

/**
- author: "boris"​
- names: Array [ "alice", "maurice" ]
- tags: Array(3) [ "judo", "karate", "1,2,3, soleil" ]
*/


```


Otherwise if you are using the **XMLHttpRequest** object, you can use the **getPandaHeadersByXMLHttpRequest** method
which accepts the (xmlhttp) request as its argument and will yield equivalent results.





History Log
=============
    
- 1.3.0 -- 2020-04-07

    - add getPandaHeadersByXMLHttpRequest function
    
- 1.2.0 -- 2020-04-06

    - fix wrong export declaration
    
- 1.1.0 -- 2020-04-06

    - fix missing jsx dependency
    
- 1.0.0 -- 2020-04-06

    - initial commit 