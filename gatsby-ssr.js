/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */
import { warapWithPropsSrv } from "./src/state/wrap-with-provider";
export const wrapRootElement = warapWithPropsSrv;