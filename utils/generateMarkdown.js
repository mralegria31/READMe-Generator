function renderLicenseSection(data) {
  if (!data.license) {
    return '';
  }
  return `
  ## License
  ![licenseBadge](https://img.shields.io/badge/License-${data.license}-blue.svg)
  ${data.license}
  [Full license information](${data.licenseLink}).
  `;
}

function generateMarkdown(data) {
  return `
  # ${data.title}
  ${renderLicenseSection(data)}
  
  ## Description
  ${data.description}
  
  ## Table of Contents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [Tests](#tests)
  - [Questions](#contact)
  
  
  <a name="installation"></a>
  ## Installation
  ${data.installation}
  
  <a name="usage"></a>
  ## Usage
  ${data.usage}
  
  <a name="credits"></a>
  ## Credits
  ${data.credits}
  <a name="tests"></a>
  ## Tests
  ${data.tests}
  
  <a name="contact"></a>
  ## Questions
  Contact for questions and suggestions:

  ${data.name}

  [email](mailto:${data.email})

  [GitHub](https://github.com/${data.github})
  
`;
}

module.exports = generateMarkdown;

module.exports = generateMarkdown;
