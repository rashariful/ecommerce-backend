/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { controllerTemplate } = require('./controllerTemplate');


if (process.argv.length < 3) {
  console.error(
    'Usage: node generate-folder-structure.js <FolderName> <FileName>'
  );
  process.exit(1);
}

// Get folder and file names from command-line arguments
const folderName = process.argv[2];
const fileName = process.argv[3];

// Define the target directory
const targetDirectory = path.join(
  __dirname,
  'src',
  'app',
  'modules',
  folderName
);

// Create the target directory
fs.mkdirSync(targetDirectory, { recursive: true });

// Create and write the files in the target directory


fs.writeFileSync(
  path.join(targetDirectory, `${fileName}.controller.js`),
  controllerTemplate
);

const modelTemplate = `
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const nameOfSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("collectionName", nameOfSchema);


`;

fs.writeFileSync(
  path.join(targetDirectory, `${fileName}.model.js`),
  modelTemplate
)

const serviceTemplate = `
  // Your service code here
  const  create${fileName} = ()=>{}
`;

fs.writeFileSync(
  path.join(targetDirectory, `${fileName}.service.js`),
  serviceTemplate,
);


const routesTemplate = `
// Define your routes here
const express = require("express");
const router = express.Router();

router.post("/create-${fileName}", create${fileName});
router.get("/", getall${fileName});
router.get("/:id", getSingle${fileName});
router.put("/:id", update${fileName});
router.delete("/:id", delete${fileName});

module.exports = router;

`;
fs.writeFileSync(
  path.join(targetDirectory, `${fileName}.routes.js`),
  routesTemplate
);


// const interfacesTemplate = `
// // Define your interfaces here
// `;
// fs.writeFileSync(
//   path.join(targetDirectory, `${fileName}.interfaces.ts`),
//   interfacesTemplate
// );

// const constantsTemplate = `
// // Define your constants here
// `;
// fs.writeFileSync(
//   path.join(targetDirectory, `${fileName}.constants.ts`),
//   constantsTemplate
// );

// const validationTemplate = `
// // Define your validations here
// `;
// fs.writeFileSync(
//   path.join(targetDirectory, `${fileName}.validation.ts`),
//   validationTemplate
// );

console.log(
  `Folder '${folderName}' and files created successfully in 'src/app/modules'.`
);