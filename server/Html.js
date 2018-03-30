/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application strings into before sending it to the client.
 */
const Html = ({ body, initialState }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <script>window.__SIDEBAR_INITIAL_STATE__ = ${initialState}</script>
      <meta charset="UTF-8">
      <title>BRSidebar</title>
    </head>
    <body>
      <div id="right_bottom_sidebar">${body}</div>
      <script src="/bundle.js" type="text/javascript"></script>
    </body>
  </html>
`;

module.exports = Html;
