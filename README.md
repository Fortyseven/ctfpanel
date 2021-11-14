# ctfpanel
![](https://i.imgur.com/DHscrQE.png)

## Boring Backstory
Late 2019 I started shifting my interests from decades of game development, and into the infosec world. During that time I've developed a bit of a minor addiction to participating in CTFs, finding red team pentesting and especially OSINT research to be favorites.

## Great, But What is This?

I figured it would be extremely helpful to have all of the common tools I find myself using, together in one place. And I wanted this pack of curated tools to be available anywhere I go. Desktop or mobile.

So that's what this is.

The intention is for the page to become my default "home" page in my browsers. Always just an ALT+HOME away. (Or an icon on my phone's desktop.)

It can always be accessed here: https://fortyseven.github.io/ctfpanel/

## Building and Misc Notes
- You shouldn't _need_ to build this, but if you do it's a simple `npm install`, `npx grunt`, `npx grunt watch` affair.

- When the page is built, the output goes into `/docs` (which is picked up on by the github.io page instantly on push).

- The `/views/data.json` file contains most of the link-specific content that the Twig templates are compiled from. It's getting to be a bit much as this project grows, so I may look for a way to break this down a bit more. But for now, it's an ugly monolith.

- My intention was to make this as self-reliant as possible. Yes, the bulk of this is external links -- a glorified bookmark panel. But if there's a way to make a small tool self-hosted, I'll do it. (The reverse shell tool, for instance. Or the absurd ASCII chart.)

- I'm using Zepto (a tiny jQuery clone) for rapid JS'ing, but I'm probably going to remove that at some point. There's little need for jQuery in 202x. Just need to start swapping out the "jQuery" meats in my head for "native JS" meats and build up that muscle memory.

- Speaking of which, I'm also encouraging the use of native HTML5 controls where possible. Such as the accordion panels provided by `<details>` and `<summary>`.

## But Most Importantly...

- This collection is focused specifically on my own needs as I proceed on my journey through self-education.

- It is by no means exhaustive.

- It may not even have the best tools for the job.

- And, considering I'm new to this field (relatively speaking), there may even be glaring errors.

  - With this in mind I'm _generally_ not inviting pull requests. But I don't mind suggestions and bug fixes in the [Issues section](https://github.com/Fortyseven/ctfpanel/issues).