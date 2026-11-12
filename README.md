# base-government-unit-support

Unit support, as a library for a ruleset's `Cost` rules:

- `lib/unitSupport`:
  - `isSupportedBy(UnitTypes, ExemptTypes?)`, a predicate: a unit costs support when it is one of `UnitTypes` and none
    of `ExemptTypes` (the per-unit-type exemption).
  - `exceedsFreeSupport(units, isSupported, free)`, whether more units need support than a city supports for free.
  - `productionSupport(units, isSupported, free?, cost?)`, a `UnitSupportProduction` of `cost` (1) for each supported
    unit after the first `free` (0), in the order given.
  - `foodSupport(units, eats, cost)`, a `UnitSupportFood` of `cost` for each unit that eats.
- `lib/government`: `isUnderGovernment(city, governments, playerGovernmentRegistry?)`, whether the city's player has
  one of `governments`.

The ruleset says which units, how many are free (a number per government, or the city's size) and what each costs
under each government. A library: it registers no rules. See `civ1-city` for Civilization's.
