/* ================================================================
   EMAIL MAILTO ENHANCER — email-mailto.js
   ✅ Zero changes to existing HTML, CSS, or JavaScript
   ✅ Works after Cloudflare decodes the obfuscated email
   ✅ Opens default mail app with pre-filled To / Subject / Body
   ================================================================ */

(function () {
  'use strict';

  var EMAIL   = 'zzyphercode@gmail.com';
  var SUBJECT = encodeURIComponent('Course Inquiry');
  var BODY    = encodeURIComponent('Hello,\n\nI am contacting you from your website.\n\nMessage:\n\n');
  var MAILTO  = 'mailto:' + EMAIL + '?subject=' + SUBJECT + '&body=' + BODY;

  function enhance() {
    /* ── 1. Upgrade the Cloudflare-decoded email anchor ── */
    var anchors = document.querySelectorAll('a[href*="email-protection"], a[href*="cdn-cgi"]');
    anchors.forEach(function (a) {
      a.href   = MAILTO;
      a.target = '_self';           // open in same tab (triggers mail client)
      a.title  = 'Email us: ' + EMAIL;
      a.setAttribute('rel', 'noopener');
    });

    /* ── 2. Also upgrade any __cf_email__ spans whose parent isn't fixed yet ── */
    var cfSpans = document.querySelectorAll('span.__cf_email__');
    cfSpans.forEach(function (span) {
      var parent = span.parentElement;
      if (parent && parent.tagName === 'A') {
        parent.href   = MAILTO;
        parent.target = '_self';
        parent.title  = 'Email us: ' + EMAIL;
        parent.setAttribute('rel', 'noopener');
      }
    });

    /* ── 3. Fallback: find any plain-text node that looks like the email ── */
    var allLinks = document.querySelectorAll('a');
    allLinks.forEach(function (a) {
      var text = (a.textContent || '').trim().toLowerCase();
      if (
        text === EMAIL.toLowerCase() ||
        text.indexOf('zzyphercode') !== -1
      ) {
        a.href   = MAILTO;
        a.target = '_self';
        a.title  = 'Email us: ' + EMAIL;
        a.setAttribute('rel', 'noopener');
      }
    });
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhance);
  } else {
    enhance();
  }

  /* Run again after a short delay to catch Cloudflare's async decode */
  setTimeout(enhance, 800);
  setTimeout(enhance, 2000);

})();
