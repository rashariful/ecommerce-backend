const fs = require('fs');
const path = require('path');

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

 
 const controllerTemplate = `
  // Your controller code here

  // create ${fileName}
  const create${fileName} = async (req, res) => {

    const ${fileName}Data = req.body
  try {
      const new${fileName} = await create${fileName}Src(${fileName}Data);
      res.status(200).json({
        success: true,
        message: "create ${fileName} successfully",
        data: new${fileName},
      });
  
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Can't create ${fileName}",
      data: error,
    });
  }
};

// get All ${fileName}
const getall${fileName} = asyncHandler(async (req, res) => {
    try {
      const getAll${fileName} = await getAll${fileName}Src();

      res.status(200).json({
        success: true,
        message: "Get all ${fileName} successfully",
        data: getAll${fileName},
      });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "No Found ${fileName}",
            data: error,
          });
    }
  });

  // Get single ${fileName}
  const getSingle${fileName} = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const getSingle${fileName} = await ${fileName}.findById(id);
      
      res.status(200).json({
        success: true,
        message: "Get single ${fileName} successfully",
        data: getSingle${fileName},
      });

    } catch (error) {

     res.status(400).json({
            success: false,
            message: "No found single ${fileName}",
            data: error,
          });
    }
  });

  // Update ${fileName}
  const update${fileName} = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updated${fileName} = await ${fileName}.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json({
        success: true,
        message: "Update ${fileName} successfully",
        data: updated${fileName},
      });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Can't update ${fileName}",
            data: error,
          });
    }
  });
  

  // Delete ${fileName}

  const delete${fileName} = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deleted${fileName} = await ${fileName}.findByIdAndDelete(id);
      
      res.status(200).json({
        success: true,
        message: "Delete ${fileName} successfully",
        data: deleted${fileName},
      });
    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Can't Delete ${fileName}",
            data: error,
          });
    }
  });
  

  module.exports = {
    create${fileName},
    getall${fileName},
    getSingle${fileName},
    update${fileName},
    delete${fileName},
  };
  
  
`;

module.exports={
    controllerTemplate
}