(function () {
  var id =
    document.currentScript?.getAttribute('data-id') ||
    new URLSearchParams(document.currentScript?.src.split('?')[1]).get('id')
  if (!id) return

  var ua = navigator.userAgent
  var device = /Mobile|Android|iPhone/i.test(ua) ? 'mobile' : 'desktop'
  var browser = /Chrome/i.test(ua)
    ? 'Chrome'
    : /Firefox/i.test(ua)
      ? 'Firefox'
      : /Safari/i.test(ua)
        ? 'Safari'
        : /Edge/i.test(ua)
          ? 'Edge'
          : 'Other'
  var os = /Windows/i.test(ua)
    ? 'Windows'
    : /Mac/i.test(ua)
      ? 'Mac'
      : /Android/i.test(ua)
        ? 'Android'
        : /iPhone|iPad/i.test(ua)
          ? 'iOS'
          : 'Other'

  fetch('https://wastedape.org/api/tracker', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tracking_id: id,
      page: window.location.pathname,
      referrer: document.referrer || null,
      device: device,
      browser: browser,
      os: os
    })
  }).catch(function () {})
})()
