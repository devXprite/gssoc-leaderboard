import _ from "lodash";
import projects from "../data/projects.js";
import fs from "fs";



const uniqueProjects = _.uniqBy(projects, "project_link");
fs.writeFileSync("./data/projects.js", `export default ${JSON.stringify(uniqueProjects)}`);

