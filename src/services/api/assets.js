import { Apis } from 'bitsharesjs-ws';
import * as utils from '../../utils';

/**
 * Fetches array of assets from bitsharesjs-ws
 */
const fetch = async (assets) => {
  try {
    const result = await Apis.instance().db_api().exec('lookup_asset_symbols', [assets]);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};


/**
 * Returns prices bistory between base and quote assets from the last specified number of days
 * @param {String} base - base id
 * @param {String} quote - quote id
 * @param {number} days - number of days
 */
const fetchPriceHistory = async (baseId, quoteId, days) => {
  try {
    const bucketSize = 3600;
    const endDate = new Date();
    const startDate = new Date(endDate - (1000 * 60 * 60 * 24 * days));
    const endDateISO = endDate.toISOString().slice(0, -5);
    const startDateISO = startDate.toISOString().slice(0, -5);
    const history = await Apis.instance().history_api().exec(
      'get_market_history',
      [baseId, quoteId, bucketSize, startDateISO, endDateISO]
    );
    // const prices = utils.formatPrices(utils.getPrices(history), base, quote);
    const prices = utils.getPrices(history);
    return prices;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  fetch,
  fetchPriceHistory
};
