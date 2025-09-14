import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://0.0.0.0:4200",
    experimentalRunAllSpecs: true,
    experimentalStudio: true
  },
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack"
    },
    specPattern: "**/*.cy.ts"
  }
});
