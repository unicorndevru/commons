import {HISTORY_CHANGE} from "commons/containers/constants";
import {takeEvery} from "redux-saga";
import {select} from "redux-saga/effects";

export default (trackingCode) => function* trackSaga() {
  if (typeof window !== 'undefined' && !window.location.host.startsWith("dev.") && window.location.hostname !== "localhost") {
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

    ga('create', trackingCode, 'auto');

    yield* takeEvery([HISTORY_CHANGE], function*(action) {
      const page = location.pathname
      ga('send', 'pageview', {
        page,
        title: document.title,
        hitCallback: () => console.log("pageview sent", page)
      })
    })
  }

}