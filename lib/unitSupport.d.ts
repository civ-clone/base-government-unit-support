import Unit from '@civ-clone/core-unit/Unit';
import Yield from '@civ-clone/core-yield/Yield';
export type UnitPredicate = (unit: Unit) => boolean;
/**
 * Whether a city pays support for `unit`: it is one of `UnitTypes` and none of `ExemptTypes`. A ruleset names the kinds
 *  of unit that cost support and the ones that never do (units that only carry out diplomatic or trade missions, say).
 */
export declare const isSupportedBy: (
  UnitTypes: (typeof Unit)[],
  ExemptTypes?: (typeof Unit)[]
) => UnitPredicate;
/**
 * Whether more of `units` need support than the `free` number a city supports at no cost.
 */
export declare const exceedsFreeSupport: (
  units: Unit[],
  isSupported: UnitPredicate,
  free: number
) => boolean;
/**
 * The production each of `units` that needs support costs, `cost` per unit, after the first `free` of them (in the order
 *  given: a city's units in the order they were registered).
 */
export declare const productionSupport: (
  units: Unit[],
  isSupported: UnitPredicate,
  free?: number,
  cost?: number
) => Yield[];
/**
 * The food each of `units` that eats costs, `cost` per unit, in the order given.
 */
export declare const foodSupport: (
  units: Unit[],
  eats: UnitPredicate,
  cost: number
) => Yield[];
