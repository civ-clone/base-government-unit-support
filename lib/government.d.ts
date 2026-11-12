import { PlayerGovernmentRegistry } from '@civ-clone/core-government/PlayerGovernmentRegistry';
import City from '@civ-clone/core-city/City';
import Government from '@civ-clone/core-government/Government';
/**
 * Whether `city`'s player has one of `governments`, for support that differs by government.
 */
export declare const isUnderGovernment: (
  city: City,
  governments: (typeof Government)[],
  playerGovernmentRegistry?: PlayerGovernmentRegistry
) => boolean;
