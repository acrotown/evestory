{
  description = "A Nix-flake-based Node.js (18) development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:
    utils.lib.eachDefaultSystem (system:
      let
        nodejsVersion = 18;
        overlays = [
          (final: prev: rec {
            nodejs = prev."nodejs-${toString nodejsVersion}_x";
            pnpm = prev.nodePackages.pnpm;
            yarn = (prev.yarn.override { inherit nodejs; });
          })
        ];

        pkgs = import nixpkgs { inherit overlays system; };

        run = pkg: "${pkgs.${pkg}}/bin/${pkg}";

        scripts = with pkgs;[
          (writeScriptBin "dev" ''
            until ${run "bun"} prettier -v > /dev/null 2>&1; do
              ${run "bun"} install
            done
            ${run "bun"} dev
          '')
        ];

      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [ nodejs pnpm yarn bun ] ++ scripts;

          shellHook = with pkgs;''
            echo "node `${nodejs}/bin/node --version`"
            echo "yarn `${yarn}/bin/yarn --version`"
            echo "pnpm `${pnpm}/bin/pnpm --version`"
            echo "bun `${bun}/bin/bun --version`"
          '';
        };
      });
}