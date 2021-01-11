import { NextApiHandler } from 'next';
import { SitemapItem, SitemapStream, streamToPromise } from 'sitemap';

export interface SitemapData extends Partial<SitemapItem> {}

export interface SitemapHandlerOptions {
  cacheMaxAge?: number;
}

/**
 *
 * @description This handler will generate a sitemap for NextJS applications based on the data you pass it.
 * You can use this handler within an api page.
 * @param dataFetcher An async function which returns the data to be used in the sitemap
 * @param {Object} [options] - Optional options.
 * @param {number} [options.cacheMaxAge] - The number of seconds the sitemap should be cached.
 * @example
 * // pages/api/sitemap.ts
 *
 * const dataFetcher = async () => {
 *  const res = await remoteFetch();
 *  return res.map(item => {
 *    url: item.href,
 *    lastmod: new Date(item.publishedAt)
 *  });
 * }
 *
 * export default sitemapHandler(dataFetcher, { cacheMaxAge: 60 });
 *
 *
 */

export const sitemapHandler: (
  dataFetcher: () => Promise<SitemapData[]> | SitemapData[],
  options?: SitemapHandlerOptions,
) => NextApiHandler = (dataFetcher, options = {}) => async (req, res) => {
  try {
    const data = await dataFetcher();

    if (options.cacheMaxAge) {
      res.setHeader(
        'Cache-Control',
        `s-maxage=${options.cacheMaxAge}, stale-while-revalidate`,
      );
    }

    const smStream = new SitemapStream({
      hostname: 'https://' + req.headers.host,
    });

    for (const smItem of data) {
      smStream.write(smItem);
    }

    smStream.end();
    const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());
    res.write(sitemap);
    smStream.end();
    res.end();
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.end();
  }
};
