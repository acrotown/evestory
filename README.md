# evestory

## Development (nix)

Add `use flake` to `.envrc` file (create if you don't have it) and run `direnv allow` to allow [direnv](https://direnv.net/) to use flake.nix.
or you can run `nix develop` to enter the development shell.

## Description

evetory is a web application that allows users to create and share their event or wedding invitation with their friends and family.

## Deploy to preview environment

```bash
url="$(pnpm run vercel deploy)"
pnpm run vercel alias set "$url" preview.evestory.day
```

## Maintainers

- [kevan](https://github.com/kevanantha)
- [wisma](https://github.com/wismaeka)
