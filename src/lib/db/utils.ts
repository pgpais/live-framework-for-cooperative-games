// import db from '$lib/db';
// import { games, type NewGame } from '$lib/db/schema';
// import { eq } from 'drizzle-orm';

// export async function findOrInsertGame(game: NewGame) {
//   return await db.query.games.findFirst({
//     where: eq(games.id, game.id),
//   }).then((res) => {
//     if (res === null) {
//       return db.query.games.insert(game);

// 	return games
// 		.select(games.id)
// 		.where(games.igdbId.equals(game.igdbId))
// 		.then((res) => {
// 			if (res.length === 0) {
// 				return games.insert(game);
// 			} else {
// 				return res[0];
// 			}
// 		});
// }
