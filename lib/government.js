"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnderGovernment = void 0;
const PlayerGovernmentRegistry_1 = require("@civ-clone/core-government/PlayerGovernmentRegistry");
/**
 * Whether `city`'s player has one of `governments`, for support that differs by government.
 */
const isUnderGovernment = (city, governments, playerGovernmentRegistry = PlayerGovernmentRegistry_1.instance) => playerGovernmentRegistry.getByPlayer(city.player()).is(...governments);
exports.isUnderGovernment = isUnderGovernment;
//# sourceMappingURL=government.js.map