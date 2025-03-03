document.getElementById('addConfig').addEventListener('click', addDomainConfig);

// Load existing configs and display them
chrome.storage.sync.get('domainConfigs', function(data) {
  if (data.domainConfigs) {
    data.domainConfigs.forEach(config => createConfigElement(config));
  }
});

function createConfigElement(config = { regex: '', domains: [] }) {
  const container = document.createElement('div');
  
  const regexInput = document.createElement('input');
  regexInput.placeholder = 'Regex Pattern';
  regexInput.value = config.regex;

  // Container for domains
  const domainsList = document.createElement('ul');
  config.domains.forEach(domain => addDomainToList(domain, domainsList));

  const domainInput = document.createElement('input');
  domainInput.placeholder = 'New Domain';

  const addDomainButton = document.createElement('button');
  addDomainButton.textContent = '+';
  addDomainButton.onclick = function() {
    const domain = domainInput.value.trim();
    if (domain) {
      addDomainToList(domain, domainsList); // Add domain to the list
      saveConfigs();
    }
  };

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Remove Config';
  deleteButton.classList.add('delete');
  deleteButton.onclick = function() {
    container.remove();
    saveConfigs();
  };

  container.appendChild(regexInput);
  container.appendChild(domainInput);
  container.appendChild(addDomainButton);
  container.appendChild(deleteButton);
  container.appendChild(domainsList);

  document.getElementById('domainConfigs').appendChild(container);
}

function addDomainToList(domain, domainsList) {
  const listItem = document.createElement('li');
  const domainText = document.createElement('span');

  domainText.textContent = domain;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'X';
  removeButton.onclick = function() {
    listItem.remove();
    saveConfigs();
  };
  
  listItem.appendChild(domainText);
  listItem.appendChild(removeButton);
  domainsList.appendChild(listItem);
}

function addDomainConfig() {
  createConfigElement();
}

function saveConfigs() {
  const configs = Array.from(document.querySelectorAll('#domainConfigs div')).map(container => {
    const regex = container.children[0].value;
    const domainsList = Array.from(container.querySelectorAll('li span')).map(listItem => listItem.textContent.trim());
    return { regex, domains: domainsList };
  });
  chrome.storage.sync.set({ domainConfigs: configs });
}

// Save configs on input changes
document.getElementById('domainConfigs').addEventListener('input', saveConfigs);

