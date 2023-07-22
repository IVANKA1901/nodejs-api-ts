const { convertFromDirectory } = require("joi-to-typescript");

async function types(): Promise<void> {
  const result = await convertFromDirectory({
    schemaDirectory: "./src/validators",
    typeOutputDirectory: "./src/interfaces",
    debug: true,
  });

  if (result) {
    console.log("Completed joi-to-typescript");
  } else {
    console.log("Failed to run joi-to-typescript");
  }
}

types();
