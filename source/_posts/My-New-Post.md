---
title: My New Post
date: 2019-07-11 08:49:23
tags:
categories:
---




A First Level Header
====================

A Second Level Header
---------------------

Now is the time for all good men to come to
the aid of their country. This is just a
regular paragraph.

The quick brown fox jumped over the lazy
dog's back.

### Header 3

> This is a blockquote.
> 
> This is the second paragraph in the blockquote.
>
> ## This is an H2 in a blockquote


Some of these words *are emphasized*.
Some of these words _are emphasized also_.

Use two asterisks for **strong emphasis**.
Or, if you prefer, __use two underscores instead__.


Lists

Unordered (bulleted) lists use asterisks, pluses, and hyphens (*, +, and -) as list markers. These three markers are interchangable; this:

*   Candy.
*   Gum.
*   Booze.

this:

+   Candy.
+   Gum.
+   Booze.

and this:

-   Candy.
-   Gum.
-   Booze.

1.  Red
2.  Green
3.  Blue

*   A list item.

    With multiple paragraphs.

*   Another item in the list.




[example link](https://daringfireball.net/projects/markdown/basics/ "With a Title").


I get 10 times more traffic from [Google][1] than from
[Yahoo][2] or [MSN][3].

[1]: http://google.com/        "Google"
[2]: http://search.yahoo.com/  "Yahoo Search"
[3]: http://search.msn.com/    "MSN Search"


I start my morning with a cup of coffee and
[The New York Times][NY Times].

[ny times]: http://www.nytimes.com/

![alt text](https://hbimg.huabanimg.com/57865414bc230edddb4797bd51fa94ce2afbeaeceea83-tE0MND_fw658 "Title")


![alt text][id]

[id]: //hbimg.huabanimg.com/22e6cc7f428aa5a1fd44805d6c6568232b3cfef310d07-uEBjFQ_fw658 "Title"

I strongly recommend against using any `<blink>` tags.

I wish SmartyPants used named entities like `&mdash;`
instead of decimal-encoded entites like `&#8212;`.


If you want your page to validate under XHTML 1.0 Strict,
you've got to put paragraph tags in your blockquotes:

    <blockquote>
        <p>For example.</p>
    </blockquote>


``` bash
rm -rf /
```

``` javascript
const add=(a,b)=>a+b
```
```python
def sum(a,b):
   return a+b
```
``` ruby
def sum(x,y):
  x+y
end
```
```php
function add($a,$b){
    return $a+$b;
}

```

```rust

use ferris_says::say; // from the previous step
use std::io::{stdout, BufWriter};

fn main() {
    let stdout = stdout();
    let out = b"Hello fellow Rustaceans!";
    let width = 24;

    let mut writer = BufWriter::new(stdout.lock());
    say(out, width, &mut writer).unwrap();
}

```

```haskell
primes = filterPrime [2..]
  where filterPrime (p:xs) =
          p : filterPrime [x | x <- xs, x `mod` p /= 0]
```

```erlang

-module(tut).
-export([double/1]).

double(X) ->
    2 * X.
```
```elixir
current_process = self()

# Spawn an Elixir process (not an operating system one!)
spawn_link(fn ->
  send(current_process, {:msg, "hello world"})
end)

# Block until the message is received
receive do
  {:msg, contents} -> IO.puts(contents)
end

```

This is an H1
=============

This is an H2
-------------

# This is an H1 #
## This is an H2 ##
### This is an H3 ######
#### This is an H4 ######
##### This is an H5 ######
###### This is an H6 

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> 
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.


> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.


Blockquotes can contain other Markdown elements, including headers, lists, and code blocks:

> ## This is a header.
> 
> 1.   This is the first list item.
> 2.   This is the second list item.
> 
> Here's some example code:
> 
>     return shell_exec("echo $input | $markdown_script");



*   Red
*   Green
*   Blue
+   Red
+   Green
+   Blue
-   Red
-   Green
-   Blue
1.  Bird
2.  McHale
3.  Parish
1.  Bird
1.  McHale
1.  Parish
3. Bird
1. McHale
8. Parish

*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
Suspendisse id sem consectetuer libero luctus adipiscing.
*   Bird
*   Magic






But this:

*   Bird

*   Magic

will turn into:

<ul>
<li><p>Bird</p></li>
<li><p>Magic</p></li>
</ul>

List items may consist of multiple paragraphs. Each subsequent paragraph in a list item must be indented by either 4 spaces or one tab:

1.  This is a list item with two paragraphs. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
    sit amet velit.

2.  Suspendisse id sem consectetuer libero luctus adipiscing.

It looks nice if you indent every line of the subsequent paragraphs, but here again, Markdown will allow you to be lazy:

*   This is a list item with two paragraphs.

    This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

*   Another item in the same list.

To put a blockquote within a list item, the blockquote’s > delimiters need to be indented:

*   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.

To put a code block within a list item, the code block needs to be indented twice — 8 spaces or two tabs:

*   A list item with a code block:

        <code goes here>

It’s worth noting that it’s possible to trigger an ordered list by accident, by writing something like this:

1986. What a great season.

In other words, a number-period-space sequence at the beginning of a line. To avoid this, you can backslash-escape the period:

1986\. What a great season.

Code Blocks

Pre-formatted code blocks are used for writing about programming or markup source code. Rather than forming normal paragraphs, the lines of a code block are interpreted literally. Markdown wraps a code block in both <pre> and <code> tags.

To produce a code block in Markdown, simply indent every line of the block by at least 4 spaces or 1 tab. For example, given this input:

This is a normal paragraph:

    This is a code block.

Markdown will generate:

<p>This is a normal paragraph:</p>

<pre><code>This is a code block.
</code></pre>

One level of indentation — 4 spaces or 1 tab — is removed from each line of the code block. For example, this:

Here is an example of AppleScript:

    tell application "Foo"
        beep
    end tell

will turn into:

<p>Here is an example of AppleScript:</p>

<pre><code>tell application "Foo"
    beep
end tell
</code></pre>

A code block continues until it reaches a line that is not indented (or the end of the article).

Within a code block, ampersands (&) and angle brackets (< and >) are automatically converted into HTML entities. This makes it very easy to include example HTML source code using Markdown — just paste it and indent it, and Markdown will handle the hassle of encoding the ampersands and angle brackets. For example, this:

    <div class="footer">
        &copy; 2004 Foo Corporation
    </div>

will turn into:

<pre><code>&lt;div class="footer"&gt;
    &amp;copy; 2004 Foo Corporation
&lt;/div&gt;
</code></pre>

Regular Markdown syntax is not processed within code blocks. E.g., asterisks are just literal asterisks within a code block. This means it’s also easy to use Markdown to write about Markdown’s own syntax.
Horizontal Rules

You can produce a horizontal rule tag (<hr />) by placing three or more hyphens, asterisks, or underscores on a line by themselves. If you wish, you may use spaces between the hyphens or asterisks. Each of the following lines will produce a horizontal rule:

* * *

***

*****

- - -

---------------------------------------

Span Elements
Links

Markdown supports two style of links: inline and reference.

In both styles, the link text is delimited by [square brackets].

To create an inline link, use a set of regular parentheses immediately after the link text’s closing square bracket. Inside the parentheses, put the URL where you want the link to point, along with an optional title for the link, surrounded in quotes. For example:

This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

Will produce:

<p>This is <a href="http://example.com/" title="Title">
an example</a> inline link.</p>

<p><a href="http://example.net/">This link</a> has no
title attribute.</p>

If you’re referring to a local resource on the same server, you can use relative paths:

See my [About](/about/) page for details.   

Reference-style links use a second set of square brackets, inside which you place a label of your choosing to identify the link:

This is [an example][id] reference-style link.

You can optionally use a space to separate the sets of brackets:

This is [an example] [id] reference-style link.

Then, anywhere in the document, you define your link label like this, on a line by itself:

[id]: http://example.com/  "Optional Title Here"

That is:

    Square brackets containing the link identifier (optionally indented from the left margin using up to three spaces);
    followed by a colon;
    followed by one or more spaces (or tabs);
    followed by the URL for the link;
    optionally followed by a title attribute for the link, enclosed in double or single quotes, or enclosed in parentheses.

The following three link definitions are equivalent:

[foo]: http://example.com/  "Optional Title Here"
[foo]: http://example.com/  'Optional Title Here'
[foo]: http://example.com/  (Optional Title Here)

Note: There is a known bug in Markdown.pl 1.0.1 which prevents single quotes from being used to delimit link titles.

The link URL may, optionally, be surrounded by angle brackets:

[id]: <http://example.com/>  "Optional Title Here"

You can put the title attribute on the next line and use extra spaces or tabs for padding, which tends to look better with longer URLs:

[id]: http://example.com/longish/path/to/resource/here
    "Optional Title Here"

Link definitions are only used for creating links during Markdown processing, and are stripped from your document in the HTML output.

Link definition names may consist of letters, numbers, spaces, and punctuation — but they are not case sensitive. E.g. these two links:

[link text][a]
[link text][A]

are equivalent.

The implicit link name shortcut allows you to omit the name of the link, in which case the link text itself is used as the name. Just use an empty set of square brackets — e.g., to link the word “Google” to the google.com web site, you could simply write:

[Google][]

And then define the link:

[Google]: http://google.com/

Because link names may contain spaces, this shortcut even works for multiple words in the link text:

Visit [Daring Fireball][] for more information.

And then define the link:

[Daring Fireball]: http://daringfireball.net/

Link definitions can be placed anywhere in your Markdown document. I tend to put them immediately after each paragraph in which they’re used, but if you want, you can put them all at the end of your document, sort of like footnotes.

Here’s an example of reference links in action:

I get 10 times more traffic from [Google] [1] than from
[Yahoo] [2] or [MSN] [3].

  [1]: http://google.com/        "Google"
  [2]: http://search.yahoo.com/  "Yahoo Search"
  [3]: http://search.msn.com/    "MSN Search"

Using the implicit link name shortcut, you could instead write:

I get 10 times more traffic from [Google][] than from
[Yahoo][] or [MSN][].

  [google]: http://google.com/        "Google"
  [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
  [msn]:    http://search.msn.com/    "MSN Search"

Both of the above examples will produce the following HTML output:

<p>I get 10 times more traffic from <a href="http://google.com/"
title="Google">Google</a> than from
<a href="http://search.yahoo.com/" title="Yahoo Search">Yahoo</a>
or <a href="http://search.msn.com/" title="MSN Search">MSN</a>.</p>

For comparison, here is the same paragraph written using Markdown’s inline link style:

I get 10 times more traffic from [Google](http://google.com/ "Google")
than from [Yahoo](http://search.yahoo.com/ "Yahoo Search") or
[MSN](http://search.msn.com/ "MSN Search").

The point of reference-style links is not that they’re easier to write. The point is that with reference-style links, your document source is vastly more readable. Compare the above examples: using reference-style links, the paragraph itself is only 81 characters long; with inline-style links, it’s 176 characters; and as raw HTML, it’s 234 characters. In the raw HTML, there’s more markup than there is text.

With Markdown’s reference-style links, a source document much more closely resembles the final output, as rendered in a browser. By allowing you to move the markup-related metadata out of the paragraph, you can add links without interrupting the narrative flow of your prose.
Emphasis

Markdown treats asterisks (*) and underscores (_) as indicators of emphasis. Text wrapped with one * or _ will be wrapped with an HTML <em> tag; double *’s or _’s will be wrapped with an HTML <strong> tag. E.g., this input:

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

will produce:

<em>single asterisks</em>

<em>single underscores</em>

<strong>double asterisks</strong>

<strong>double underscores</strong>

You can use whichever style you prefer; the lone restriction is that the same character must be used to open and close an emphasis span.

Emphasis can be used in the middle of a word:

un*frigging*believable

But if you surround an * or _ with spaces, it’ll be treated as a literal asterisk or underscore.

To produce a literal asterisk or underscore at a position where it would otherwise be used as an emphasis delimiter, you can backslash escape it:

\*this text is surrounded by literal asterisks\*

Code

To indicate a span of code, wrap it with backtick quotes (`). Unlike a pre-formatted code block, a code span indicates code within a normal paragraph. For example:

Use the `printf()` function.

will produce:

<p>Use the <code>printf()</code> function.</p>

To include a literal backtick character within a code span, you can use multiple backticks as the opening and closing delimiters:

``There is a literal backtick (`) here.``

which will produce this:

<p><code>There is a literal backtick (`) here.</code></p>

The backtick delimiters surrounding a code span may include spaces — one after the opening, one before the closing. This allows you to place literal backtick characters at the beginning or end of a code span:

A single backtick in a code span: `` ` ``

A backtick-delimited string in a code span: `` `foo` ``

will produce:

<p>A single backtick in a code span: <code>`</code></p>

<p>A backtick-delimited string in a code span: <code>`foo`</code></p>

With a code span, ampersands and angle brackets are encoded as HTML entities automatically, which makes it easy to include example HTML tags. Markdown will turn this:

Please don't use any `<blink>` tags.

into:

<p>Please don't use any <code>&lt;blink&gt;</code> tags.</p>

You can write this:

`&#8212;` is the decimal-encoded equivalent of `&mdash;`.

to produce:

<p><code>&amp;#8212;</code> is the decimal-encoded
equivalent of <code>&amp;mdash;</code>.</p>

Images

Admittedly, it’s fairly difficult to devise a “natural” syntax for placing images into a plain text document format.

Markdown uses an image syntax that is intended to resemble the syntax for links, allowing for two styles: inline and reference.

Inline image syntax looks like this:

![Alt text](/path/to/img.jpg)

![Alt text](/path/to/img.jpg "Optional title")

That is:

    An exclamation mark: !;
    followed by a set of square brackets, containing the alt attribute text for the image;
    followed by a set of parentheses, containing the URL or path to the image, and an optional title attribute enclosed in double or single quotes.

Reference-style image syntax looks like this:

![Alt text][id]

Where “id” is the name of a defined image reference. Image references are defined using syntax identical to link references:

[id]: url/to/image  "Optional title attribute"

As of this writing, Markdown has no syntax for specifying the dimensions of an image; if this is important to you, you can simply use regular HTML <img> tags.
Miscellaneous
Automatic Links

Markdown supports a shortcut style for creating “automatic” links for URLs and email addresses: simply surround the URL or email address with angle brackets. What this means is that if you want to show the actual text of a URL or email address, and also have it be a clickable link, you can do this:

<http://example.com/>

Markdown will turn this into:

<a href="http://example.com/">http://example.com/</a>

Automatic links for email addresses work similarly, except that Markdown will also perform a bit of randomized decimal and hex entity-encoding to help obscure your address from address-harvesting spambots. For example, Markdown will turn this:

<address@example.com>

into something like this:

<a href="&#x6D;&#x61;i&#x6C;&#x74;&#x6F;:&#x61;&#x64;&#x64;&#x72;&#x65;
&#115;&#115;&#64;&#101;&#120;&#x61;&#109;&#x70;&#x6C;e&#x2E;&#99;&#111;
&#109;">&#x61;&#x64;&#x64;&#x72;&#x65;&#115;&#115;&#64;&#101;&#120;&#x61;
&#109;&#x70;&#x6C;e&#x2E;&#99;&#111;&#109;</a>

which will render in a browser as a clickable link to “address@example.com”.

(This sort of entity-encoding trick will indeed fool many, if not most, address-harvesting bots, but it definitely won’t fool all of them. It’s better than nothing, but an address published in this way will probably eventually start receiving spam.)
Backslash Escapes

Markdown allows you to use backslash escapes to generate literal characters which would otherwise have special meaning in Markdown’s formatting syntax. For example, if you wanted to surround a word with literal asterisks (instead of an HTML <em> tag), you can use backslashes before the asterisks, like this:

\*literal asterisks\*

Markdown provides backslash escapes for the following characters:

\   backslash
`   backtick
*   asterisk
_   underscore
{}  curly braces
[]  square brackets
()  parentheses
#   hash mark
+   plus sign
-   minus sign (hyphen)
.   dot
!   exclamation mark
{% include_code md javascript md.js %}
```md

name | 价格 |  数量  
-|-|-
香蕉 | $1 | 5 |
苹果 | $1 | 6 |
草莓 | $1 | 7 |


name | 111 | 222 | 333 | 444
- | :-: | :-: | :-: | -:
aaa | bbb | ccc | ddd | eee| 
fff | ggg| hhh | iii | 000|


name | 111 | 222 | 333 | 444
:-: | :-: | :-: | :-: | :-:
aaa | bbb | ccc | ddd | eee|
fff | ggg| hhh | iii | 000|


```
name | 价格 |  数量  
-|-|-
香蕉 | $1 | 5 |
苹果 | $1 | 6 |
草莓 | $1 | 7 |


name | 111 | 222 | 333 | 444
- | :-: | :-: | :-: | -:
aaa | bbb | ccc | ddd | eee| 
fff | ggg| hhh | iii | 000|


name | 111 | 222 | 333 | 444
:-: | :-: | :-: | :-: | :-:
aaa | bbb | ccc | ddd | eee|
fff | ggg| hhh | iii | 000|


a|b|c|d
-|-|-|-
![](https://hbimg.huabanimg.com/22e6cc7f428aa5a1fd44805d6c6568232b3cfef310d07-uEBjFQ_fw658)|![](https://hbimg.huabanimg.com/15e3752862027f48dac9dde28773060c66b56a8f26c6a-cX0s76_fw658)|![](https://hbimg.huabanimg.com/50bbcda6600c2e145b96af5c8c19f0692e3654ec2569f-O9uud7_fw658)|![](https://hbimg.huabanimg.com/db21f9e43f26bce3939bcb7505650e0fa341d3662ca4d-QNoWzk_fw658)
![](https://hbimg.huabanimg.com/8e1c4b029f493f8da42de4b87aa12e4340a1526b2a211-HLYrMM_fw658)|![](https://hbimg.huabanimg.com/1a0ff41a1df01347476e7bf4f751726506977a4026c4c-u5JrzF_fw658)|![](https://hbimg.huabanimg.com/1405cd5420993e491c729ff0554658a117f810499a8d1-FuDiPF_fw658)|![](https://hbimg.huabanimg.com/57865414bc230edddb4797bd51fa94ce2afbeaeceea83-tE0MND_fw658)
![](https://hbimg.huabanimg.com/f1cb60eb3c94321b12c0cade91aea44d002ba05bcca73-dy4eWz_fw658)|![](https://hbimg.huabanimg.com/cbcf54521192c068a0b4baf1918f759816cddd4f1f38e-vsVdLg_fw658)|![](https://hbimg.huabanimg.com/6f703b7f3ea5e0db7e059657a5aa68062c1bd5804b6b9-3EXWLZ_fw658)|![](https://hbimg.huabanimg.com/ac860d8af5b68e57d585a4ed1cf8ac2c47b565ce80d78-uUFdz7_fw658)
![](https://hbimg.huabanimg.com/0e26c4e4722eb667cdfdd86412b28a38d486e3a3dcc8f-jfT2lp_fw658)|![](https://hbimg.huabanimg.com/d1b0b464d2eff0c778b75b24aabae81e8bf13f4faaaee-WYMNd3_fw658)|![](https://hbimg.huabanimg.com/49dde27b9b57092af600fb5edd19725a42b300f81a2b5-1QzaMC_fw658)|![](https://hbimg.huabanimg.com/a9989bebbbecb032f986d4bd648b4a8449828bdd21bac-yqE2A5_fw658)
![](https://hbimg.huabanimg.com/52f9f833d8d89514ba5d2f1e0ec74282bbc5eb6a40ab4-7ppc1F_fw658)|![](https://hbimg.huabanimg.com/0fa664deef2a3ce1bb48e5c21f95951df81858d51fd13-L2n8ZS_fw658)|![](https://hbimg.huabanimg.com/0076f604eac7be832a8b0f2c485f77b5269a64502db5c-x5zLdJ_fw658)|![](https://hbimg.huabanimg.com/f0595ba0375d377ecb19317b87e1a3426f91ad4f1e2510-jAbn1J_fw658)
![](https://hbimg.huabanimg.com/67f653e4c6e4545ac83c6dd8f1d24293e593b9d522d4b-kWoW5J_fw658)|![](https://hbimg.huabanimg.com/4b4ce3c1d8cebd16404367e3e3d684a690e77f50500d9-mhG1OY_fw658)|![](https://hbimg.huabanimg.com/0b4c81a15e4f46e9724cd58b702713836aef2c154aae5-eMirA7_fw658)|![](https://hbimg.huabanimg.com/0ebd48d8f1e8f223582929376d272ce59ee20e0a3a671-J0HPic_fw658)
![](https://hbimg.huabanimg.com/6695f7c4e27ec84b49f47517a15c1fa5f0d9f6022cab2-t0lRuy_fw658)|![](https://hbimg.huabanimg.com/2404965481c26c0d479bb5c2291b0c1b1d803957118908-8Lvumv_fw658)|![](https://hbimg.huabanimg.com/d4a604d2d2109de520d52e5fe84847a9edeb4cbf26f69-7QZmGA_fw658)|![](https://hbimg.huabanimg.com/caa5fba632ef0a90ca4d1bfb4971aa0c6bbb6dbb14ce7-pYIkWP_fw658)
![](https://hbimg.huabanimg.com/47602f760861c73e9cfec49ef64edb44290ecb7526b63-19OqQ8_fw658)|![](https://hbimg.huabanimg.com/831c20835a8e3327f18e3e2dc7a9d4560a3e287a281ab-B78Y2J_fw658)|![](https://hbimg.huabanimg.com/5a0867a0dbfb8b1565fb3e7b0301eb325051ad0b1517dd-X2AF3d_fw658)|![](https://hbimg.huabanimg.com/5913ed792e6d24956f0d47263f83ba6646e4f2629a572-ue3YUk_fw658)
![](https://hbimg.huabanimg.com/898f4f5996d5e3d462deeadfae8477d9f564d4a01be125-WLYOdo_fw658)|![](https://hbimg.huabanimg.com/c453d4e240b595cfd26e74c014eaab32b52343942d886-duhwUY_fw658)|![](https://hbimg.huabanimg.com/aa0d528c729000d93a614a79e8e60f30d6838bc11c187-tDcHUA_fw658)|![](https://hbimg.huabanimg.com/89e8cc038486ed15ea4f85d6bc50f849de832906342bc-yD9u6U_fw658)
![](https://hbimg.huabanimg.com/a80810e3695f095622fc8e3b3f4edb0676d1ff0021412e-w8nrvV_fw658)|![](https://hbimg.huabanimg.com/1f2c862089f8580abd93fb7e85fef540d3c74f0e6b718-usuX0U_fw658)|![](https://hbimg.huabanimg.com/e403b041ab21a38d23b95efb6f434d718eeab370130b8-cS8PWO_fw658)|![](https://hbimg.huabanimg.com/e2357c763ead0051951d470e80ba2c1bfc21327226b77-2NvRYf_fw658)

{% blockquote %}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit lacus ut purus iaculis feugiat. Sed nec tempor elit, quis aliquam neque. Curabitur sed diam eget dolor fermentum semper at eu lorem.
{% endblockquote %}

{% blockquote @DevDocs https://twitter.com/devdocs/status/356095192085962752 %}
NEW: DevDocs now comes with syntax highlighting. http://devdocs.io
{% endblockquote %}

{% blockquote Seth Godin http://sethgodin.typepad.com/seths_blog/2009/07/welcome-to-island-marketing.html Welcome to Island Marketing %}
Every interaction is both precious and an opportunity to delight.
{% endblockquote %}

{% blockquote David Levithan, Wide Awake %}
Do not just seek happiness for yourself. Seek happiness for all. Through kindness. Through mercy.
{% endblockquote %}

{% codeblock %}
alert('Hello World!');
{% endcodeblock %}

{% codeblock lang:objc %}
[rectangle setX: 10 y: 10 width: 20 height: 20];
{% endcodeblock %}


{% codeblock Array.map %}
array.map(callback[, thisArg])
{% endcodeblock %}


{% codeblock _.compact http://underscorejs.org/#compact Underscore.js %}
_.compact([0, 1, false, 2, '', 3]);
=> [1, 2, 3]
{% endcodeblock %}

{% pullquote  %}
pullquote

{% endpullquote %}

{% raw %}
raw
{% endraw %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
<!-- more -->
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


{% img  https://hbimg.huabanimg.com/cbf6c8a0e9e4ccf29e7469b26d203ed5d80f49073d585-ooshmN_fw658   %}
{% link bootcdn https://www.bootcdn.cn/  %}

{% iframe https://hexo.io/docs/tag-plugins  %}

{% post_path hello-world %}

----
{% post_link hello-world %}

{% asset_img 1.jpg This is an example image %}
{% asset_img "1.jpg" "spaced title" %}
![](/images/1.jpg)
