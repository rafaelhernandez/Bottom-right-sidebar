/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application strings into before sending it to the client.
 */
const HtmlApi = ({ body, initialState }) => `
      <script>window.__SIDEBAR_INITIAL_STATE__ = ${initialState}</script>
      <div id="right_bottom_sidebar">${body}</div>
`;

module.exports = HtmlApi;
