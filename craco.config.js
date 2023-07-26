const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@config": path.resolve(__dirname, "./src/config/"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@store": path.resolve(__dirname, "./src/services/store/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@hooks": path.resolve(__dirname, "./src/hooks/"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@layouts": path.resolve(__dirname, "./src/layouts/"),
      "@images": path.resolve(__dirname, "./src/images/"),
    },
  },
  jest: {
    configure: {
      preset: "ts-jest",
      testMatch: ["<rootDir>/src/**/*.tet.{ts,tsx}"],
      verbose: true,
      moduleNameMapper: {
        "^@store/(.*)$": "<rootDir>/src/services/store/$1",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
        "^@config/(.*)$": "<rootDir>/src/config/$1",
      },
    },
  },
};
