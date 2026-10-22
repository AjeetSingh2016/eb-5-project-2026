/* Minimal typing for topojson-client (it ships without types). Put this file in src/types/. */
declare module "topojson-client" {
  export function feature(
    topology: unknown,
    object: unknown,
  ): { type: string; features?: object[] };
}
