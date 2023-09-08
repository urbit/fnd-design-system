/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      fontFamily: {
        sans: ["Urbit Sans"],
        mono: ["Urbit Sans Mono"],
        serif: ["Urbit Serif Italic"],
      },
      fontSize: {
        base: ["1rem", "1.2"], // 16px, 19.2px
        lg: ["1.125rem", "1.2"], // 18px, 21.6px
        xl: ["1.25rem", "1.2"], // 20px, 24px
        "2xl": ["1.5625rem", "1.2"], // 25px, 30px
        "3xl": ["1.875rem", "1.2"], // 30px, 36px
        "4xl": ["2.25rem", "1.1"], // 36px, 39.6px
        "5xl": ["3rem", "1.1"], // 48px, 52.8px
        "6xl": ["3.75rem", "1.1"], // 60px, 66px
        "7xl": ["5rem", "1.1"], // 80px, 88px
        "8xl": ["6.25rem", "1.1"], // 100px, 110px
        "9xl": ["7.5rem", "1.1"], // 120px, 132px
      },
      colors: {
        black: "var(--black)",
        white: "var(--white)",
        gray: "var(--gray)",
        tint: "var(--tint)",
        lite: "var(--lite)",
        brite: "var(--brite)",
        // markdown & prism
        red: "#D2232A",
        purple: "rgba(157, 82, 255, 0.8)",
        wall: {
          100: "#F3F2F0",
          200: "#E3E0DB",
          300: "#C8C4BD",
          400: "#918C84",
          500: "#5A564F",
          600: "#24221E",
        },
      },
    },
  },
};
