/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import wrapWithProvider from "./src/state/wrap-with-provider";
export const wrapRootElement = wrapWithProvider;