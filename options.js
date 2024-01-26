document.getElementById('addConfig').addEventListener('click', addDomainConfig);

// Load existing configs and display them
chrome.storage.sync.get('domainConfigs', function(data) {
  if (data.domainConfigs) {
    data.domainConfigs.forEach(config => createConfigElement(config));
  }
});

function createConfigElement(config = { regex: '', domains: '' }) {
  const container = document.createElement('div');
  const regexInput = document.createElement('input');
  regexInput.placeholder = 'Regex Pattern';
  regexInput.value = config.regex;
  container.appendChild(regexInput);

  const domainsInput = document.createElement('input');
  domainsInput.classList.add('domains');
  domainsInput.placeholder = 'Comma-separated Domains';
  domainsInput.value = config.domains;
  container.appendChild(domainsInput);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function() {
    container.remove();
    saveConfigs();
  };
  container.appendChild(deleteButton);
  document.getElementById('domainConfigs').appendChild(container);
}

function addDomainConfig() {
  createConfigElement();
}

function saveConfigs() {
  const configs = Array.from(document.querySelectorAll('#domainConfigs div')).map(container => {
    return {
      regex: container.children[0].value,
      domains: container.children[1].value
    };
  });
  chrome.storage.sync.set({domainConfigs: configs});
}

// Save configs on input changes
document.getElementById('domainConfigs').addEventListener('input', saveConfigs);

