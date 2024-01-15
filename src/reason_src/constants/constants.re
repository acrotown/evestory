[@mel.scope ("process", "env")]
external next_public_vercel_env: string = "NEXT_PUBLIC_VERCEL_ENV";

let home_hostnames = [|"evestory.day", "home.localhost:3000"|];

let home_domain = "https://evestory.day";

let souvenirs_hostnames = [|
  "souvenirs.evestory.day",
  "souvenirs.localhost:3000",
|];

let is_home_hostname = domain => Js.Array.includes(domain, home_hostnames);

let app_hostnames = [|
  "app.evestory.day",
  "preview.evestory.day",
  "localhost:3000",
  "app.localhost:3000",
|];

let app_domain =
  switch (next_public_vercel_env) {
  | "production" => "https://app.evestory.day"
  | "preview" => "https://preview.evestory.day"
  | "development" => "http://localhost:3000"
  | _ => "http://localhost:3000"
  };
