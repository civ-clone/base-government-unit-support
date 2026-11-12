import {
  exceedsFreeSupport,
  foodSupport,
  isSupportedBy,
  productionSupport,
} from '../lib/unitSupport';
import City from '@civ-clone/core-city/City';
import Government from '@civ-clone/core-government/Government';
import Unit from '@civ-clone/core-unit/Unit';
import UnitSupportFood from '@civ-clone/base-city-yield-unit-support-food/UnitSupportFood';
import UnitSupportProduction from '@civ-clone/base-city-yield-unit-support-production/UnitSupportProduction';
import Yield from '@civ-clone/core-yield/Yield';
import { expect } from 'chai';
import { isUnderGovernment } from '../lib/government';

class Land extends Unit {}
class Sea extends Unit {}
class Envoy extends Land {}
class Founder extends Unit {}
class Other extends Unit {}

class Autocracy extends Government {}
class Assembly extends Government {}
class Council extends Government {}

let ids = 0;

const standInUnit = (UnitType: typeof Unit): Unit => {
    const id = `unit-${++ids}`;

    return Object.assign(Object.create(UnitType.prototype), {
      id: () => id,
    }) as Unit;
  },
  describeYields = (yields: Yield[]) =>
    yields.map((yieldValue: Yield) => [
      yieldValue.constructor,
      yieldValue.value(),
      (yieldValue as UnitSupportFood | UnitSupportProduction).unit(),
    ]);

describe('base-government-unit-support', (): void => {
  const supported = isSupportedBy([Land, Sea], [Envoy]);

  it('supports units of the listed types, except the exempt ones', (): void => {
    expect(supported(standInUnit(Land))).true;
    expect(supported(standInUnit(Sea))).true;
    expect(supported(standInUnit(Envoy))).false;
    expect(supported(standInUnit(Other))).false;
    expect(isSupportedBy([Land])(standInUnit(Envoy))).true;
  });

  it('charges production for each supported unit after the free ones, in order', (): void => {
    const units = [
      standInUnit(Land),
      standInUnit(Envoy),
      standInUnit(Sea),
      standInUnit(Other),
      standInUnit(Land),
    ];

    expect(describeYields(productionSupport(units, supported))).eql([
      [UnitSupportProduction, -1, units[0]],
      [UnitSupportProduction, -1, units[2]],
      [UnitSupportProduction, -1, units[4]],
    ]);
    expect(describeYields(productionSupport(units, supported, 2))).eql([
      [UnitSupportProduction, -1, units[4]],
    ]);
    expect(describeYields(productionSupport(units, supported, 1, 2))).eql([
      [UnitSupportProduction, -2, units[2]],
      [UnitSupportProduction, -2, units[4]],
    ]);
    expect(productionSupport(units, supported, 3)).eql([]);
  });

  it('says whether more units need support than are free', (): void => {
    const units = [standInUnit(Land), standInUnit(Envoy), standInUnit(Sea)];

    expect(exceedsFreeSupport(units, supported, 1)).true;
    expect(exceedsFreeSupport(units, supported, 2)).false;
    expect(exceedsFreeSupport([], supported, 0)).false;
  });

  it('charges food for each unit that eats', (): void => {
    const units = [
        standInUnit(Founder),
        standInUnit(Land),
        standInUnit(Founder),
      ],
      eats = (unit: Unit): boolean => unit instanceof Founder;

    expect(describeYields(foodSupport(units, eats, 2))).eql([
      [UnitSupportFood, -2, units[0]],
      [UnitSupportFood, -2, units[2]],
    ]);
    expect(foodSupport(units, () => false, 1)).eql([]);
  });

  it("checks the city's player's government", (): void => {
    const player = {},
      city = { player: () => player } as unknown as City,
      registry = {
        getByPlayer: (asked: unknown) => {
          expect(asked).equal(player);

          return {
            is: (...governments: (typeof Government)[]) =>
              governments.includes(Autocracy),
          };
        },
      } as any;

    expect(isUnderGovernment(city, [Autocracy, Council], registry)).true;
    expect(isUnderGovernment(city, [Assembly], registry)).false;
  });
});
