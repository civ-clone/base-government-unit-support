"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodSupport = exports.productionSupport = exports.exceedsFreeSupport = exports.isSupportedBy = void 0;
const UnitSupportFood_1 = require("@civ-clone/base-city-yield-unit-support-food/UnitSupportFood");
const UnitSupportProduction_1 = require("@civ-clone/base-city-yield-unit-support-production/UnitSupportProduction");
/**
 * Whether a city pays support for `unit`: it is one of `UnitTypes` and none of `ExemptTypes`. A ruleset names the kinds
 *  of unit that cost support and the ones that never do (units that only carry out diplomatic or trade missions, say).
 */
const isSupportedBy = (UnitTypes, ExemptTypes = []) => (unit) => UnitTypes.some((UnitType) => unit instanceof UnitType) &&
    !ExemptTypes.some((ExemptType) => unit instanceof ExemptType);
exports.isSupportedBy = isSupportedBy;
/**
 * Whether more of `units` need support than the `free` number a city supports at no cost.
 */
const exceedsFreeSupport = (units, isSupported, free) => units.filter(isSupported).length > free;
exports.exceedsFreeSupport = exceedsFreeSupport;
/**
 * The production each of `units` that needs support costs, `cost` per unit, after the first `free` of them (in the order
 *  given: a city's units in the order they were registered).
 */
const productionSupport = (units, isSupported, free = 0, cost = 1) => units
    .filter(isSupported)
    .slice(free)
    .map((unit) => new UnitSupportProduction_1.default(cost, unit));
exports.productionSupport = productionSupport;
/**
 * The food each of `units` that eats costs, `cost` per unit, in the order given.
 */
const foodSupport = (units, eats, cost) => units
    .filter(eats)
    .map((unit) => new UnitSupportFood_1.default(cost, unit));
exports.foodSupport = foodSupport;
//# sourceMappingURL=unitSupport.js.map