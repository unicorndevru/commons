import { HISTORY_CHANGE } from 'commons/containers/constants';
import { takeEvery } from 'redux-saga';
import { select } from 'redux-saga/effects';

export default (googleTrackingCode, yandexCode) => function* trackSaga() {
  if (typeof window !== 'undefined' && !window.location.host.startsWith('dev.') && window.location.hostname !== 'localhost') {
    if (!!googleTrackingCode) {
      (function(window, document, script, url, r, tag, firstScriptTag) {
        window['GoogleAnalyticsObject'] = r;
        window[r] = window[r] || function() {
            (window[r].q = window[r].q || []).push(arguments)
          };
        window[r].l = 1 * new Date();
        tag = document.createElement(script),
          firstScriptTag = document.getElementsByTagName(script)[0];
        tag.async = 1;
        tag.src = url;
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      })(
        window,
        document,
        'script',
        '//www.google-analytics.com/analytics.js',
        'ga'
      );

      const ga = window.ga;

      ga('create', googleTrackingCode, 'auto');
    }

    if (!!yandexCode) {
      (function(d, w, c) {
        (w[c] = w[c] || []).push(function() {
          try {
            w[`yaCounter${yandexCode}`] = new Ya.Metrika({
              id: yandexCode,
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true
            });
          } catch (e) {
          }
        });

        var n = d.getElementsByTagName('script')[0],
          s = d.createElement('script'),
          f = function() {
            n.parentNode.insertBefore(s, n);
          };
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://mc.yandex.ru/metrika/watch.js';

        if (w.opera == '[object Opera]') {
          d.addEventListener('DOMContentLoaded', f, false);
        } else {
          f();
        }
      })(document, window, 'yandex_metrika_callbacks');
    }

    yield* takeEvery([HISTORY_CHANGE], function*(action) {
      const page = location.pathname;
      googleTrackingCode && ga('send', 'pageview', {
        page,
        title: document.title,
        hitCallback: () => console.log('ga pageview sent', page)
      })
      yandexCode && window[`yaCounter${yandexCode}`].hit(page)

    })
  }

}
