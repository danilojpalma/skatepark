import fileUpload from "express-fileupload";

export const fileConfig = fileUpload({
    limits: { fieldSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "File size limit has been reached!",
});
