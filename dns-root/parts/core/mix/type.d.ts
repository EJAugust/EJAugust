declare interface IMix extends IPart {
 /** A map from mix factor to last-known place value multiplier,
  * (the value of routeID unit for the given factor)
  * where mix is viewed as a fixed-length mixed-radix string.
  * 
  * Used to speed up computation. */
 readonly placeValues: Map<IPart, bigint>

 /** Updates the mix's routeID and bubbles the update rootward. */
 collectRouteID(SUBPARTS: T[]): void

 /** Updates the mix's routeID and bubbles the update leafward. */
 distributeRouteID(ROUTE_ID): void
}
declare const mix: IMix
declare const CHANGED_FACTORS: IPart[]