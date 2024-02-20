import {
  Tailwind as TailwindReact,
  TailwindProps,
} from "@react-email/components";

export const Tailwind = ({ children }: TailwindProps) => {
  return (
    <TailwindReact
      config={{
        darkMode: "class",
        theme: {
          container: {
            center: true,
            padding: "2rem",
            screens: {
              "2xl": "1400px",
            },
          },
          extend: {
            fontFamily: {
              display: ["var(--font-cal)", "system-ui", "sans-serif"],
              default: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            colors: {
              border: "hsl(var(--border))",
              input: "hsl(var(--input))",
              ring: "hsl(var(--ring))",
              "governor-bay": "#4A55A2",
              swamp: "hsl(var(--solitude))",
              solitude: "#F4F5F8",
              background: "#222323",
            },
          },
        },
      }}
    >
      {children}
    </TailwindReact>
  );
};
