import Unit from '@civ-clone/core-unit/Unit';
import UnitSupportFood from '@civ-clone/base-city-yield-unit-support-food/UnitSupportFood';
import UnitSupportProduction from '@civ-clone/base-city-yield-unit-support-production/UnitSupportProduction';
import Yield from '@civ-clone/core-yield/Yield';

export type UnitPredicate = (unit: Unit) => boolean;

/**
 * Whether a city pays support for `unit`: it is one of `UnitTypes` and none of `ExemptTypes`. A ruleset names the kinds
 *  of unit that cost support and the ones that never do (units that only carry out diplomatic or trade missions, say).
 */
export const isSupportedBy =
  (
    UnitTypes: (typeof Unit)[],
    ExemptTypes: (typeof Unit)[] = []
  ): UnitPredicate =>
  (unit: Unit): boolean =>
    UnitTypes.some(
      (UnitType: typeof Unit): boolean => unit instanceof UnitType
    ) &&
    !ExemptTypes.some(
      (ExemptType: typeof Unit): boolean => unit instanceof ExemptType
    );

/**
 * Whether more of `units` need support than the `free` number a city supports at no cost.
 */
export const exceedsFreeSupport = (
  units: Unit[],
  isSupported: UnitPredicate,
  free: number
): boolean => units.filter(isSupported).length > free;

/**
 * The production each of `units` that needs support costs, `cost` per unit, after the first `free` of them (in the order
 *  given: a city's units in the order they were registered).
 */
export const productionSupport = (
  units: Unit[],
  isSupported: UnitPredicate,
  free: number = 0,
  cost: number = 1
): Yield[] =>
  units
    .filter(isSupported)
    .slice(free)
    .map((unit: Unit): Yield => new UnitSupportProduction(cost, unit) as Yield);

/**
 * The food each of `units` that eats costs, `cost` per unit, in the order given.
 */
export const foodSupport = (
  units: Unit[],
  eats: UnitPredicate,
  cost: number
): Yield[] =>
  units
    .filter(eats)
    .map((unit: Unit): Yield => new UnitSupportFood(cost, unit) as Yield);
