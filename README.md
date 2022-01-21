# memebot

A discord bot to play memes from [meme-archive](https://github.com/arjunchib/meme-archive).

## Getting started

### Install dependencies

```bash
pnpm i
```

### Add env variables

```
BOT_TOKEN=
MEME_ARCHIVE_BASE_URL=
GUILD_ID=
```

### Start dev server

```bash
pnpm start
```

## Deployment

Running with the following disables watching file changes and logging to the console:

```bash
pnpm serve
```

## Commands

### play

Plays meme in guilds default discord voice channel

```
/play meme: <name>
```

### random

Plays a random meme

```
/random
```

### list

TODO: List top memes (right now links to website)

```
/list
```

### search

Searchs for memes containing the query

```
/search meme: <name>
```
