
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var url = new URL(tabs[0].url);
  const isPropertiesPage =  url.href.match('/mnt/overlay/wcm/core/content/sites/properties')

  var contentPath = (isPropertiesPage ? url.search : url.href).match(/(\/content\/[^?]+)/)[0];
  contentPath = contentPath.split('.html')[0];
  var baseUrl = url.origin;

  const urls = {
    preview: `${baseUrl}${contentPath}.html?wcmmode=disabled`,
    editor: `${baseUrl}/editor.html${contentPath}.html`,
    properties: `${baseUrl}/mnt/overlay/wcm/core/content/sites/properties.html?item=${contentPath}`,
    crx: `${baseUrl}/crx/de/index.jsp#${contentPath}`
  }

  if (contentPath) {
    document.getElementById('status').textContent = 'AEM Page Detected!';
    document.getElementById('links').style.display = '';
    document.getElementById('crxde').onclick = () => openLink(urls['crx'])
    document.getElementById('properties').onclick = () => openLink(urls['properties'])
    document.getElementById('preview').onclick = () => openLink(urls['preview'])
    document.getElementById('editor').onclick = () => openLink(urls['editor'])
  } else {
    document.getElementById('status').textContent = 'Not an AEM Page.';
  }
});


function openLink(link) {
  chrome.tabs.create({url: link});
}


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var url = new URL(tabs[0].url);

  chrome.storage.sync.get('domainConfigs', function(data) {
    if (data.domainConfigs) {
      let matchedConfigs = data.domainConfigs.filter(config => url.href.match(new RegExp(config.regex)));
      if (matchedConfigs.length > 0) {
        // Assuming the first matched configuration is used
        let domains = matchedConfigs[0].domains.split(',');
        populateDomainSelector(domains, url.origin);
        // Rest of your existing code with modifications...
      } else {
        document.getElementById('status').textContent = 'Not an AEM Page.';
      }
    }
  });
});

function normalizeDomain(domain) {
  return domain.replace(/^(https?:\/\/)?/i, '') // Remove protocol
              .replace(/\/+$/, ''); // Remove trailing slashes
}

function populateDomainSelector(domains, currentDomain) {
  const selector = document.getElementById('domainSelector');
  selector.innerHTML = ''; // Clear existing options
  const normalizedCurrentDomain = normalizeDomain(currentDomain);

  domains.forEach(domain => {
    domain = domain.trim();
    if (domain) {
      let option = document.createElement('option');
      option.value = domain;
      option.textContent = domain;
      option.selected = normalizeDomain(domain) === normalizedCurrentDomain;
      selector.appendChild(option);
    }
  });
  selector.style.display = '';
  selector.onchange = () => swapDomain(selector.value);
}

function swapDomain(newDomain) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var oldUrl = new URL(tabs[0].url);
    var newUrlBase = newDomain.includes('://') ? newDomain : `http://${newDomain}`;
    var newUrl = oldUrl.href.replace(oldUrl.origin, newUrlBase);
    openLink(newUrl); // Open the new URL in a new tab
  });
}
