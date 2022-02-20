const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username',
            validate: githubUsernameInput => {
                if (githubUsernameInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter your email!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?',
            validate: projectTitleInput => {
                if (projectTitleInput) {
                    return true;
                } else {
                    console.log('Please enter your project title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a short description explaining the what, why, and how of your project. (Required)',
            validate: projectDescriptionInput => {
                if (projectDescriptionInput) {
                    return true;
                } else {
                    console.log('Please enter your project description!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmLicense',
            message: 'Does your project include a license?',
            default: true
        },
        {
            type: 'checkbox',
            name: 'license',
            message: 'What license is your project under?',
            choices: ['MIT', 'GPLv2', 'Apache', 'GPLv3', 'BSD-3-clause', 'Unlicense', 'BSD 2-clause', 'LGPLv3', 'AGPLv3'],
            when: ({ confirmLicense }) => {
                if (confirmLicense) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: licenseChoice => {
                if (licenseChoice) {
                    return true;
                } else {
                    console.log('Please select a license!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'licenseLink',
            message: 'Enter the link to your project license. (Required)',
            when: ({ confirmLicense }) => {
                if (confirmLicense) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: licenseLinkInput => {
                if (licenseLinkInput) {
                    return true;
                } else {
                    console.log('Please enter a link to your project license!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running. (Required)',
            validate: installationInput => {
                if (installationInput) {
                    return true;
                } else {
                    console.log('Please enter installation instructions!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions and examples for use.'
        },
        {
            type: 'input',
            name: 'credits',
            message: `List your collaborators, if any, with their GitHub profiles. If you used any third-party assets that require attribution, list the creators. If you followed tutorials, include those as well.`
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Provide examples on how to run tests of your application'
        },
    ])
        .then(data => {
            return data;
        });
};

function writeToFile(readmeFile) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', readmeFile, err => {
            if (err) {
                reject(err)
                return;
            }
            resolve({
                ok: true,
                message: 'README.md created!'
            });
        });
    });
};

function init() {
    promptUser()
        .then(data => {
            return generateMarkdown(data)
        })
        .then(readmeFile => {
            return writeToFile(readmeFile)
        })
        .then(writeToFileResponse => {
            console.log(writeToFileResponse)
        })
        .catch(err => {
            console.log(err)
        })
}

init();