
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

